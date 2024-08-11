'use strict'
class PhotonTorpedoFireAndForget extends Weapon {

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    name : "photonTorpedoFireAndForget_01",
    fileName : "photonTorpedoFireAndForget_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedoFireAndForget/images/"
  })

  static soundResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "photonShoot",
    filename : "photonShoot",
    type : ResourceObject.TYPES.wav,
    resourcePath : "/resources/sounds/photonFireAndForget.wav"
  })

  static soundResource;
  static imageResource;

  static async init(){
    PhotonTorpedoFireAndForget.imageResource = await e8.global.resourceHandler.fetchImageResource({
      resourceObject: PhotonTorpedoFireAndForget.resourceObject
    });
    PhotonTorpedoFireAndForget.soundResource = await e8.global.resourceHandler.fetchSoundResource({
      resourceObject: PhotonTorpedoFireAndForget.soundResourceObject
    });
  }

  constructor ({
                 canvas,
                 posDX,
                 posDY,
                 controlAssignment
  }){
    super({
      identification: "weaponPlayer",
      controlAssignment: controlAssignment,
      canvas: canvas,
      image: PhotonTorpedoFireAndForget.imageResource.image,
      sound: PhotonTorpedoFireAndForget.soundResource,
      width: PhotonTorpedoFireAndForget.imageResource.image.width,
      height: PhotonTorpedoFireAndForget.imageResource.image.height,
      posX: 0,
      posY: 0,
      posDX: posDX,
      posDY: posDY,
      velX: 7,
      velY: 0,
      isHittable: false,
      isDestroyable: false
    })

    this.uniqueIdentifier = this.constructor.name;
    this.target = null;
    this.ready = true;
    this.retention = 200;
    this.quotient = 0;
    this.pathSmoothing = 0.03;
  }

  /**
   *
   * @param hitBy
   */
  hit = (hitBy) => {
    if (hitBy.identification !== "playerShip") {
      this.destroy();
    }
  }

  cleanupAndDestroy = () => {
    //this.subscriber.subscriptionsUpdate("objectRemovedFromGameLoop", this);
    this.destroy();
  }

  /**
   *
   * @param posX
   * @param posY
   */
  activate = ({posX, posY}) => {

    this.target = null;
    const enemyShips = Object.values(EnemyShipHandler.enemyShips);
    if (enemyShips.length > 0) {
      for (const enemyShip of enemyShips) {
        if ((posX + this.retention) < enemyShip.posX) {
          this.target = enemyShip;
          break;
        }
      }
      if (this.target) {
        super.activate({posX, posY});
      } else {
        this.cleanupAndDestroy();
      }
    } else {
      this.cleanupAndDestroy();
    }
  }

  /**
   *
   * @param dt
   */
  update = (dt) => {
    const isEnemyShipAlive = EnemyShipHandler.enemyShips[this.target.id];

    if (isEnemyShipAlive) {
      this.quotient = (this.target.posX - this.posX) / (this.target.posY - (this.posY+this.posDY));
    }

    if (Math.abs(this.quotient) < 0.01) {
      this.quotient = 0.01; // Set to a default value
    }

    this.posY = (this.posY + (this.posX / this.quotient) * this.pathSmoothing);
    this.posX = this.posX + (this.velX*dt);
    const isOutsideScreen = this.posX > e8.global.screenWidth || this.posX < 0 || this.posY > e8.global.screenHeight || this.posY < 0;

    if (isOutsideScreen) {
      this.destroy();
    }
  }
}
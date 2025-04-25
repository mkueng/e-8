'use strict'
class Laser extends Weapon {

  static imageResource;
  static soundResource;

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    name : "laser",
    fileName : "laser",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/laser/"
  })

  static soundResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "laser",
    filename : "laser",
    type : ResourceObject.TYPES.wav,
    resourcePath : "/resources/sounds/laser.wav"
  })

  static async invoke({
                        resourceHandler
  }){
    Laser.imageResource = await resourceHandler.fetchImageResource({
      resourceObject : Laser.imageResourceObject
    });
    Laser.soundResource = await resourceHandler.fetchSoundResource({
      resourceObject:Laser.soundResourceObject
    });
  }

  constructor({
                canvas,
                controlAssignment,
                posDX,
                posDY
              }){
    super({
      animationLoop: true,
      canvas: canvas,
      controlAssignment: controlAssignment,
      currentFrame: 0,
      frames: 3,
      height: Laser.imageResource.image.height / 3,
      identification: "weaponPlayer",
      isDestroyable: false,
      isHittable: false,
      posDX: posDX,
      posDY: posDY,
      rechargeTime: 5000,
      sound: Laser.soundResource,
      spriteSheet: Laser.imageResource.image,
      spriteSheetColumns: 1,
      spriteSheetRows: 3,
      stride: Laser.imageResource.image.height / 3,
      strideX: Laser.imageResource.image.width / 1,
      strideY: Laser.imageResource.image.height / 3,
      width: e8.global.screenWidth
    });

    this.currentLoad = 0;
    this.loadIncrement = 10;
    this.loadIncrement = 10;
    this.overLoad = 100;
    this.ready = true;
    this.shootTime = 100;
    this.timer = 0;
    this.uniqueIdentifier = this.constructor.name;
    this.overLoad = 100;
    this.shootTime = 100;
  }

  update = () => {
    this.posX = this.dependency.posX;
    this.posY = this.dependency.posY;

    this.timer+= 1;
    if (this.timer > this.shootTime) {
      this.destroy();
      this.ready = false;
      //SpeechHandler.playStatement(SpeechHandler.statements.weaponDischarged);
      this.recharge();
    }
  }

  activate = ({posX, posY, dependency})=> {
    this.timer = 0;
    this.dependency = dependency;
    if (this.ready) {
      this.posX = posX;
      this.posY = posY;
      this.previousPosX = this.posX;
      this.previousPosY = this.posY;
      GameObjectsHandler.instance.addGameObject(this);
      SoundHandler.playFX(this.sound);
      this.currentLoad += this.loadIncrement;
      if (this.currentLoad >= this.overLoad) {
        this.ready = false;
        SpeechHandler.playStatement(SpeechHandler.statements.weaponDischarged);
        this.recharge();
      }
    }
  }
}
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

  static async invoke(){
    Laser.imageResource = await e8.global.resourceHandler.fetchImageResource({
      resourceObject : Laser.imageResourceObject
    });
    Laser.soundResource = await e8.global.resourceHandler.fetchSoundResource({
      resourceObject:Laser.soundResourceObject
    });
  }

  constructor({
                canvas,
                posDX,
                posDY,
                controlAssignment
              }){
    super({
      identification : "weaponPlayer",
      controlAssignment,
      canvas : canvas,
      spriteSheet :  Laser.imageResource.image,
      spriteSheetRows : 3,
      spriteSheetColumns : 1,
      width : e8.global.screenWidth,
      height : 16,
      frames : 3,
      currentFrame : 0,
      sound : Laser.soundResource,
      strideX : Laser.imageResource.image.width / 1,
      strideY : Laser.imageResource.image.height / 3,
      stride : Laser.imageResource.image.height / 3,
      posDX : posDX,
      posDY : posDY,
      animationLoop : true,
      rechargeTime: 5000,
      isHittable : false,
      isDestroyable : false
    });

    this.uniqueIdentifier = this.constructor.name;
    this.currentLoad = 0;
    this.loadIncrement = 10;
    this.overLoad = 100;
    this.ready = true;
    this.timer = 0;
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
    if (this.ready === true) {
      this.posX = posX;
      this.posY = posY;
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
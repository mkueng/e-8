'use strict'
class Laser extends Weapon {

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "laser",
    filename : "laser",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/laser/laser.png"
  })

  static soundResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "laser",
    filename : "laser",
    type : ResourceObject.TYPES.wav,
    resourcePath : "/resources/sounds/laser.wav"
  })

  static imageResource;
  static soundResource;

  static async invoke(resourceHandler){
    Laser.imageResource = await resourceHandler.fetchImageResource({
      resourceObject : Laser.imageResourceObject
    });
    Laser.soundResource = await resourceHandler.fetchSoundResource({
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
      uniqueIdentifier : "Laser",
      controlAssignment,
      canvas : canvas,
      spriteSheet :  Laser.imageResource.image,
      spriteSheetRows : 3,
      spriteSheetColumns : 1,
      width : window.global.screenWidth,
      height : 16,
      frames : 3,
      currentFrame : 0,
      step : 50,
      sound : Laser.soundResource,
      strideX : Laser.imageResource.image.width / 1,
      strideY : Laser.imageResource.image.height / 3,
      stride : Laser.imageResource.image.height / 3,
      posDX : posDX,
      posDY : posDY,
      rechargeTime: 5000,
      isHittable : false,
      isDestroyable : false
    });

    this.currentLoad = 0;
    this.overLoad = 100;
    this.ready = true;
  }

  update = ()=> {
    this.posX = this.dependency.posX;
    this.posY = this.dependency.posY;
  }

  activate = (posX, posY, dependency)=> {
    this.dependency = dependency;
    if (this.ready === true) {
      this.posX = posX;
      this.posY = posY;
      GameObjectsHandler.instance.addGameObject(this);
      SoundHandler.playFX(this.sound);
      this.currentLoad += 10;
      if (this.currentLoad >= this.overLoad) {
        this.ready = false;
        SpeechHandler.playStatement(SpeechHandler.statements.weaponDischarged);
        this.recharge();
      }
    }











  }


}
'use strict'
class Laser extends Weapon {
  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "laser",
    filename : "laser",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/laser/laser.png"
  })

  static imageResource;
  static soundResourceObject = "/resources/sounds/laser.wav";
  static soundResource;

  static async invoke(resourceHandler){
    Laser.imageResource = await resourceHandler.fetchResource(Laser.imageResourceObject);
    Laser.soundResource = await SoundHandler.fetchAudioAndReturnAudioBuffer(Laser.soundResourceObject);
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
      isHittable : false,
      isDestroyable : false
    });
  }

  update(dt) {
    this.posX = this.dependency.posX;
    this.posY = this.dependency.posY;
  }

  activate(posX, posY, dependency){
    this.dependency = dependency;
    this.posX = posX;
    this.posY = posY;

  }


}
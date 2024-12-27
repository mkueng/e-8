'use strict'
class Weapon extends GameObject {

  constructor({
                animationLoop,
                canvas,
                controlAssignment,
                currentFrame,
                frames,
                height,
                identification,
                image,
                isDestroyable,
                isHittable,
                posDX,
                posDY,
                rechargeTime,
                sound,
                spriteSheet,
                spriteSheetColumns,
                spriteSheetRows,
                stride,
                strideX,
                strideY,
                vector,
                velX,
                velY,
                width
              })
  {
    super({
      animationLoop,
      canvas,
      canDestroy: true,
      currentFrame,
      frames,
      hasMass: false,
      height,
      identification,
      image,
      isActive: true,
      isDestroyable,
      isHittable,
      posDX,
      posDY,
      sound,
      spriteSheet,
      spriteSheetColumns,
      spriteSheetRows,
      stride,
      strideX,
      strideY,
      vector,
      velX,
      velY,
      width
    });

    this.controlAssignment = controlAssignment;
    this.rechargeTime = rechargeTime;
  }

  /**
   * @name activate
   * @param posX
   * @param posY
   */
  activate ({posX, posY}) {
    this.posX = this.previousPosX = posX;
    this.posY = this.previousPosY = posY;

    GameObjectsHandler.instance.addGameObject(this);
    SoundHandler.playFX(this.sound);
  };

  /**
   * @name recharge
   */
  recharge = () =>{
    setTimeout(()=>{
      SpeechHandler.playStatement(SpeechHandler.statements.weaponRecharged);
      this.currentLoad = 0;
      this.ready = true;
    },this.rechargeTime)
  }
}
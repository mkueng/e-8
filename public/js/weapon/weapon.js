'use strict'
class Weapon extends GameObject {

  constructor({
                identification,
                controlAssignment,
                image,
                spriteSheet,
                canvas,
                spriteSheetRows,
                spriteSheetColumns,
                frames,
                currentFrame,
                stride,
                strideX,
                strideY,
                width,
                height,
                posDX,
                posDY,
                velX,
                velY,
                sound,
                activeOnKeyHold,
                animationLoop,
                rechargeTime,
                isDestroyable,
                isHittable
              })
  {
    super({
      isActive: true,
      identification,
      canvas,
      spriteSheet,
      spriteSheetRows,
      spriteSheetColumns,
      image,
      sound,
      width,
      height,
      frames,
      currentFrame,
      strideX,
      strideY,
      stride,
      posDX,
      posDY,
      velX,
      velY,
      animationLoop,
      isHittable,
      isDestroyable,
      canDestroy: true
    });

    this.controlAssignment = controlAssignment;
    this.rechargeTime = rechargeTime;
    this.activeOnKeyHold = activeOnKeyHold;
  }

  activate ({posX, posY}) {
    this.posX = posX;
    this.posY = posY;
    GameObjectsHandler.instance.addGameObject(this);
    SoundHandler.playFX(this.sound);
  };

  recharge = () =>{
    setTimeout(()=>{
      SpeechHandler.playStatement(SpeechHandler.statements.weaponRecharged);
      this.currentLoad = 0;
      this.ready = true;
    },this.rechargeTime)
  }

  update = (dt) =>{
    this.posX = (this.posX < e8.global.screenWidth && this.posX > 0) ? this.posX + (this.velX * dt) : this.destroy();
    this.posY = this.posY + (this.velY);
  }

}
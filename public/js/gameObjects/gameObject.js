'use strict'
class GameObject {

  /**
   *
   * @param accX
   * @param accY
   * @param alpha
   * @param animationLoop
   * @param canDestroy
   * @param canvas
   * @param currentFrame
   * @param dependencies
   * @param frames
   * @param height
   * @param hitWidth
   * @param identification
   * @param image
   * @param imageData
   * @param isActive
   * @param isHittable
   * @param isDestroyable
   * @param maxVelX
   * @param maxVelY
   * @param posDX
   * @param posDY
   * @param posX
   * @param posY
   * @param posZ
   * @param sound
   * @param spriteSheet
   * @param spriteSheetColumns
   * @param spriteSheetRows
   * @param stride
   * @param strideX
   * @param strideY
   * @param subscriber
   * @param velX
   * @param velY
   * @param width
   * @param rotation
   */
  constructor({
                accX,
                accY,
                alpha,
                animationLoop,
                canDestroy,
                canvas,
                currentFrame,
                dependencies,
                frames,
                height,
                hitWidth,
                identification,
                image,
                isActive,
                isHittable,
                isDestroyable,
                maxVelX,
                maxVelY,
                posDX,
                posDY,
                posX,
                posY,
                posZ,
                sound,
                spriteSheet,
                spriteSheetColumns,
                spriteSheetRows,
                stride,
                strideX,
                strideY,
                subscriber,
                velX,
                velY,
                width,
                rotation
              }) {
    this.accX = accX || 0;
    this.accY = accY || 0;
    this.alpha = alpha || 1;
    this.animationLoop = animationLoop || null;
    this.canDestroy = canDestroy || false;
    this.canvas = canvas || null;
    this.currentFrame = currentFrame || 0;
    this.dependencies = dependencies || [];
    this.frames = frames || 1;
    this.height = height || 0;
    this.hitWidth = hitWidth || width;
    this.identification = identification || "";
    this.image = image;
    this.isActive = isActive || false;
    this.isDestroyable = isDestroyable || false;
    this.isHittable = isHittable || false;
    this.maxVelX = maxVelX || 0;
    this.maxVelY = maxVelY || 0;
    this.posDX = posDX || 0;
    this.posDY = posDY || 0;
    this.posX = posX || 0;
    this.posY = posY || 0;
    this.posZ = posZ || 0;
    this.sound = sound || null;
    this.spriteSheet = spriteSheet || null;
    this.spriteSheetColumns = spriteSheetColumns || null;
    this.spriteSheetRows = spriteSheetRows || null;
    this.stride = stride || null;
    this.strideX = strideX || null;
    this.strideY = strideY;
    this.subscriber = subscriber;
    this.velX = velX || 0;
    this.velY = velY || 0;
    this.width = width;
    this.id = crypto.randomUUID();
    this.context = null;
    this.rotation = rotation || 0;

    if (canvas) {
      this.context = canvas.getContext("2d");
    }
  }

  addDependencies(){
    this.dependencies.forEach(dependency => GameObjectsHandler.instance.addGameObject(dependency));
  }

  /**
   *
   * @param subscriber
   */
  subscribe(subscriber){
    this.subscriber = subscriber;
  }

  unsubscribe(){
    this.subscriber = null;
  }


  activate(){
    this.isActive = true;
    GameObjectsHandler.instance.addGameObject(this);
    this.dependencies.forEach(dependency => {
      dependency.isActive = true;
      GameObjectsHandler.instance.addGameObject(dependency);
    });
  };

  deactivate(){};

  /**
   *
   * @param hitBy
   */
  hit (hitBy){};

  destroy(){
    GameObjectsHandler.instance.addGameObjectToRemoveQueue(this.id);
    if (this.dependencies) {
      this.destroyDependencies();
    }

  };

  destroyDependencies(){
    for (const dependency of this.dependencies) {
      dependency.destroy();
    }
  }

  render() {

    if (this.isActive === false)  {
      return;
    }
    if (this.alpha) {
      this.context.globalAlpha = this.alpha;
    }
    if (this.spriteSheet) {
      if (this.animationLoop) {
        this.currentFrame = (this.currentFrame + 1) % this.frames;
      } else {
        this.currentFrame++;
        if (this.currentFrame >= this.frames) {
          this.isActive = false;
          this.currentFrame = 0;
          return;
        }
      }

      const column = this.currentFrame % this.spriteSheetColumns;
      const row = Math.floor(this.currentFrame / this.spriteSheetColumns);

      this.context.drawImage(
        this.spriteSheet,
        column * this.strideX,
        row * this.strideY,
        this.strideX,
        this.strideY,
        this.posX + this.posDX,
        this.posY + this.posDY,
        this.width,
        this.height
      );
    } else if (this.image) {

      this.context.drawImage(
        this.image,
        this.posX + this.posDX,
        this.posY + this.posDY,
        this.width,
        this.height
      );
    }
    if (this.alpha) {
      this.context.globalAlpha = 1;
    }

  }

  /**
   *
   * @param deltaTime
   */
  update(deltaTime) {
    if (this.isActive) {
      if (this.posX+this.posDX > 0 - this.width) {
        this.posX = this.posX + this.velX*deltaTime+(PlayerShip.velX*this.posZ);
      } else {
        this.destroy();
        if (this.dependencies) {
          for (const dependency of this.dependencies){
            dependency.destroy();
          }
        }
      }
      this.posY = this.posY +(PlayerShip.velY*this.posZ*deltaTime);

      // positioning dependencies
      if (this.dependencies) {
        for (const dependency of this.dependencies){
          dependency.posX = this.posX;
          dependency.posY = this.posY;
        }
      }
    }
  }
}
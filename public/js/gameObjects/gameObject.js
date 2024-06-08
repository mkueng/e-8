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
   * @param isHittable
   * @param isDestroyable
   * @param maxVelX
   * @param maxVelY
   * @param posDX
   * @param posDY
   * @param posX
   * @param posY
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
   * @param isActive
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
                imageData,
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
              }){
    this.accX = accX;
    this.accY = accY;
    this.alpha = alpha || 1;
    this.animationLoop = animationLoop || null;
    this.canDestroy = canDestroy || false;
    this.canvas = canvas;
    this.currentFrame = currentFrame;
    this.dependencies = dependencies;
    this.frames = frames;
    this.height = height;
    this.hitWidth = hitWidth || width;
    this.identification = identification;
    this.image = image;
    this.isActive = isActive || false;
    this.isDestroyable = isDestroyable || false;
    this.isHittable = isHittable || false;
    this.maxVelX = maxVelX;
    this.maxVelY = maxVelY;
    this.posDX = posDX || 0;
    this.posDY = posDY || 0;
    this.posX = posX;
    this.posY = posY;
    this.posZ = posZ || 0;
    this.sound = sound;
    this.spriteSheet = spriteSheet;
    this.spriteSheetColumns = spriteSheetColumns;
    this.spriteSheetRows = spriteSheetRows;
    this.stride = stride;
    this.strideX = strideX;
    this.strideY = strideY;
    this.subscriber = subscriber;
    this.velX = velX || 0;
    this.velY = velY || 0;
    this.width = width;
    this.id = crypto.randomUUID();
    this.context = null;
    this.rotation = rotation;

    if (canvas){
      this.context = canvas.getContext("2d");
    }
  }

  /**
   *
   */
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

  /**
   *
   */
  unsubscribe(){
    this.subscriber = null;
  }

  /**
   *
   */
  activate(){};

  /**
   *
   */
  deactivate(){};

  /**
   *
   * @param hitBy
   */
  hit (hitBy){};

  /**
   *
   */
  destroy(){
    GameObjectsHandler.instance.addGameObjectToRemoveQueue(this.id);
  };

  /**
   *
   */
  destroyDependencies(){
    for (const dependency of this.dependencies) {
      dependency.destroy();
    }
  }

  /**
   *
   */
  render() {
    if (!this.isActive) return;
    if (this.alpha) {
      this.context.globalAlpha = this.alpha;
    }
    if (this.spriteSheet) {
      if (this.animationLoop) {
        this.currentFrame = (this.currentFrame + 1) % this.frames;
      } else {
        this.currentFrame++;
        if (this.currentFrame >= this.frames) {
          this.destroy();
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
        this.posX = this.posX + (this.velX*deltaTime)
      } else {
        this.destroy();
        if (this.dependencies) {
          for (const dependency of this.dependencies){
            dependency.destroy();
          }
        }
      }
      this.posY = this.posY +(this.velY*deltaTime);


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
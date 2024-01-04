'use strict'

class GameObject {

  /**
   *
   * @param identification
   * @param image
   * @param sound
   * @param imageData
   * @param spriteSheet
   * @param animationLoop
   * @param alpha
   * @param spriteSheetColumns
   * @param spriteSheetRows
   * @param currentFrame
   * @param stride
   * @param strideX
   * @param strideY
   * @param step
   * @param frames
   * @param width
   * @param height
   * @param posX
   * @param posY
   * @param posDX
   * @param posDY
   * @param velX
   * @param velY
   * @param maxVelX
   * @param maxVelY
   * @param accX
   * @param accY
   * @param canvas
   * @param isHittable
   * @param hitWidth
   * @param isDestroyable
   * @param canDestroy
   * @param subscriber
   * @param dependencies
   */
  constructor({
                identification,
                image,
                sound,
                imageData,
                spriteSheet,
                animationLoop,
                alpha,
                spriteSheetColumns,
                spriteSheetRows,
                currentFrame,
                stride,
                strideX,
                strideY,
                step,
                frames,
                width,
                height,
                posX,
                posY,
                posDX,
                posDY,
                velX,
                velY,
                maxVelX,
                maxVelY,
                accX,
                accY,
                canvas,
                isHittable,
                hitWidth,
                isDestroyable,
                canDestroy,
                subscriber,
                dependencies
              }){
    this.id = crypto.randomUUID();
    this.identification = identification;
    this.active = false;
    this.image = image;
    this.sound = sound;
    this.currentFrame = currentFrame;
    this.stride = stride;
    this.strideX = strideX;
    this.strideY = strideY;
    this.spriteSheet = spriteSheet;
    this.spriteSheetColumns = spriteSheetColumns;
    this.spriteSheetRows = spriteSheetRows;
    this.step = step;
    this.frames = frames;
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.posDX = posDX || 0;
    this.posDY = posDY || 0;
    this.velX = velX || 0;
    this.velY = velY || 0;
    this.maxVelX = maxVelX;
    this.maxVelY = maxVelY;
    this.accX = accX;
    this.accY = accY;
    this.canvas = canvas;
    this.isHitable = isHittable || false;
    this.isDestroyable = isDestroyable || false;
    this.canDestroy = canDestroy || false;
    this.animationLoop = animationLoop || null;
    this.alpha = alpha || null;
    this.hitWidth = hitWidth || width;
    this.subscriber = subscriber;
    this.dependencies = dependencies;

    if (canvas){
      this.context = canvas.getContext("2d");
    }

    if (this.dependencies){
      this.addDependencies();
    }
  }

  addDependencies(){
    this.dependencies.forEach(dependency => GameObjectsHandler.instance.addGameObject(dependency));
  }

  subscribe(subscriber){
    this.subscriber = subscriber;
  }

  unsubscribe(subscriber){
    this.subscriber = null;
  }

  activate(){};
  deactivate(){};
  hit (hitBy){};

  destroy(){
    GameObjectsHandler.instance.addGameObjectToRemoveQueue(this.id);
  };

  destroyDependencies(){
    for (const dependency of this.dependencies) {
      dependency.destroy();
    }
  }

  render() {
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
    if (this.posX > 0 - this.width) {
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

    // position dependencies
    if (this.dependencies) {
      for (const dependency of this.dependencies){
        dependency.posX = this.posX;
        dependency.posY = this.posY;
      }
    }
  };
}
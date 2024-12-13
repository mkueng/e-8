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
   * @param coordinates
   * @param currentFrame
   * @param dependencies
   * @param frames
   * @param height
   * @param hitWidth
   * @param identification
   * @param image
   * @param isActive
   * @param isContextPreventedOfBeingCleared
   * @param isHittable
   * @param isDestroyable
   * @param maxVelX
   * @param maxVelY
   * @param posDX
   * @param posDY
   * @param posX
   * @param posY
   * @param posZ
   * @param rotation
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
   */
  constructor({
                accX,
                accY,
                alpha,
                animationLoop,
                canDestroy,
                canvas,
                coordinates,
                currentFrame,
                dependencies,
                frames,
                height,
                hitWidth,
                identification,
                image,
                isActive,
                isContextPreventedOfBeingCleared,
                isHittable,
                isDestroyable,
                maxVelX,
                maxVelY,
                posDX,
                posDY,
                posX,
                posY,
                posZ,
                rotation,
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
              }) {
    this.accX = accX || 0;
    this.accY = accY || 0;
    this.alpha = alpha || 1;
    this.animationLoop = animationLoop || null;
    this.canDestroy = canDestroy || false;
    this.canvas = canvas || null;
    this.context = null;
    this.coordinates = coordinates || null;
    this.currentFrame = currentFrame || 0;
    this.dependencies = dependencies || [];
    this.frames = frames || 1;
    this.height = height || 0;
    this.hitWidth = hitWidth || width;
    this.id = crypto.randomUUID();
    this.identification = identification || "";
    this.image = image;
    this.isActive = isActive || false;
    this.isContextPreventedOfBeingCleared = isContextPreventedOfBeingCleared || false;
    this.isDestroyable = isDestroyable || false;
    this.isHittable = isHittable || false;
    this.maxVelX = maxVelX || 0;
    this.maxVelY = maxVelY || 0;
    this.posDX = posDX || 0;
    this.posDY = posDY || 0;
    this.posX = posX || 0;
    this.previousPosX = posX || 0;
    this.previousPosY = posY || 0;
    this.posY = posY || 0;
    this.posZ = posZ;
    this.rotation = rotation || 0;
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

    if (canvas) {
      this.context = canvas.getContext("2d");
    }

    if (this.spriteSheet) this.render = this.renderSpriteSheet;
    if (this.image) this.render = this.renderImage;
  }

  /**
   * @name addDependencies
   */
  addDependencies(){
    this.dependencies.forEach(dependency => GameObjectsHandler.instance.addGameObject(dependency));
  }

  /**
   * @name subscribe
   * @param subscriber
   */
  subscribe(subscriber){
    this.subscriber = subscriber;
  }

  /**
   * @name unsubscribe
   */
  unsubscribe(){
    this.subscriber = null;
  }

  /**
   * @name activate
   */
  activate(){
    this.isActive = true;
    GameObjectsHandler.instance.addGameObject(this);
    this.dependencies.forEach(dependency => {
      dependency.isActive = true;
      GameObjectsHandler.instance.addGameObject(dependency);
    });
  };

  /**
   * @name deactivate
   */
  deactivate(){};

  /**
   * @name hit
   * @param hitBy
   */
  hit (hitBy){};

  /**
   * @name destroy
   */
  destroy(){
    GameObjectsHandler.instance.addGameObjectToRemoveQueue(this.id);
    if (this.dependencies) {
      this.destroyDependencies();
    }
  };

  /**
   * @name destroyDependencies
   */
  destroyDependencies(){
    for (const dependency of this.dependencies) {
      dependency.destroy();
    }
  }

  /**
   * @name renderImage
   * @param interpolation
   */
  renderImage (interpolation) {

    const interpolatedX = (this.previousPosX + (this.posX - this.previousPosX) * interpolation) + this.posDX;
    const interpolatedY = (this.previousPosY + (this.posY - this.previousPosY) * interpolation) + this.posDY;

    this.previousPosX = this.posX;
    this.previousPosY = this.posY;

    if (!this.isActive) return;

    // Only update alpha if it's different to minimize context state changes.
    const newAlpha = this.alpha || 1;
    if (this.context.globalAlpha !== newAlpha) {
      this.context.globalAlpha = newAlpha;
    }

    // image
    if (this.image) {
      this.context.drawImage(
        this.image,
        interpolatedX,
        interpolatedY,
        this.width,
        this.height
      );
    }
    // Reset alpha to default if it was changed.
    if (newAlpha !== 1) {
      this.context.globalAlpha = 1;
    }

  }

  /**
   * @name renderSpriteSheet
   * @param interpolation
   */
  renderSpriteSheet(interpolation) {

    const interpolatedX = (this.previousPosX + (this.posX - this.previousPosX) * interpolation) + this.posDX;
    const interpolatedY = (this.previousPosY + (this.posY - this.previousPosY) * interpolation) + this.posDY;

    this.previousPosX = this.posX;
    this.previousPosY = this.posY;

    // Only update alpha if it's different to minimize context state changes.
    if (!this.isActive) return;

    const newAlpha = this.alpha || 1;

    if (this.context.globalAlpha !== newAlpha) {
      this.context.globalAlpha = newAlpha;
    }

    if (this.animationLoop || this.currentFrame + 1 < this.frames) {
      this.currentFrame = (this.currentFrame + 1) % this.frames;

      if (!this.animationLoop) {
        this.isActive = this.currentFrame !== 0;
      }
    }

    // Pre-compute sprite sheet frame position.
    const column = this.currentFrame % this.spriteSheetColumns;
    const row = Math.floor(this.currentFrame / this.spriteSheetColumns);
    const sourceX = column * this.strideX;
    const sourceY = row * this.strideY;

    // Render the sprite sheet frame.
    this.context.drawImage(
      this.spriteSheet,
      sourceX,
      sourceY,
      this.strideX,
      this.strideY,
      interpolatedX,
      interpolatedY,
      this.width,
      this.height
    );
    // Reset alpha to default if it was changed.
    if (newAlpha !== 1) {
      this.context.globalAlpha = 1;
    }
  }

  /**
   * @name update
   * @param deltaTime
   */
  update(deltaTime) {
    if (!this.isActive) return;

    // Check if out of bounds
    if (this.posX + this.posDX <= 0 - this.width || this.posX+this.posDX > e8.global.screenWidth) {
      this.destroy();
      this.dependencies.forEach(dependency => dependency.destroy());
      return
    }

    // Update velocity with scaling based on posZ
    const zScale = (this.posZ > 0) ? 1 / this.posZ : 1;
    this.velX += this.accX * (deltaTime / 10);
    this.velY += this.accY * (deltaTime / 10);

    // Update position
    this.posX += this.velX * deltaTime;
    this.posY += this.velY * deltaTime;

    // Sync dependencies
    this.dependencies.forEach(dependency => {
      dependency.posX = this.posX;
      dependency.posY = this.posY;
    });
  }
}
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
   * @param coordinates
   * @param contextClear
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
                rotation,
                coordinates,
                isContextPreventedOfBeingCleared
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
    this.coordinates = coordinates || null;
    this.isContextPreventedOfBeingCleared = isContextPreventedOfBeingCleared || false;


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
    if (!this.isActive) return;

    // Only update alpha if it's different to minimize context state changes.
    const newAlpha = this.alpha || 1;
    if (this.context.globalAlpha !== newAlpha) {
      this.context.globalAlpha = newAlpha;
    }

    const posX = this.posX + this.posDX, posY = this.posY + this.posDY;

    // Direct path for static images.
    if (this.image && !this.spriteSheet) {
      this.context.drawImage(
        this.image,
        posX,
        posY,
        this.width,
        this.height
      );
    }
    // Path for sprite sheets.
    else if (this.spriteSheet) {
      // Optimized frame calculation.
      let frame = this.currentFrame;
      if (this.animationLoop) {
        frame = (frame + 1) % this.frames;
      } else {
        frame = frame + 1 < this.frames ? frame + 1 : 0;
        this.isActive = frame !== 0;
      }
      this.currentFrame = frame;
      const column = frame % this.spriteSheetColumns;
      const row = Math.floor(frame / this.spriteSheetColumns);
      this.context.drawImage(
        this.spriteSheet,
        column * this.strideX,
        row * this.strideY,
        this.strideX,
        this.strideY,
        posX,
        posY,
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
   *
   * @param deltaTime
   */
  update(deltaTime) {
    if (!this.isActive) return;

    if (this.posX + this.posDX <= 0 - this.width) {
      this.destroy();
      this.dependencies.forEach(dependency => dependency.destroy());
    } else {
      this.posX += this.velX * deltaTime + PlayerShip.velX * this.posZ;
      this.posY += PlayerShip.velY * this.posZ * deltaTime;
      this.dependencies.forEach(dependency => {
        dependency.posX = this.posX;
        dependency.posY = this.posY;
      });
    }
  }
}
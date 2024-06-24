class Tractor  {

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.placeholder,
    name : "placeholder",
    fileName : "placeholder",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/placeholder"
  })

  static soundResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.placeholder,
    id : "placeholder",
    filename : "placeholder",
    type : ResourceObject.TYPES.mp3,
    resourcePath : "/resources/placeholder"
  })

  static async invoke(resourceHandler){
    Tractor.imageResource = await resourceHandler.fetchImageResource({
      resourceObject : Tractor.imageResourceObject
    });

    Tractor.soundResource = await resourceHandler.fetchSoundResource({
      resourceObject : Tractor.soundResourceObject
    });
  }

  constructor({
                canvas,
                posDX,
                posDY
  }){
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
    this.context.strokeStyle = "#11e1ff";
    this.context.lineWidth = 1;
    this.width = 120;
    this.height = 300;
    this.posDX = posDX || 60;
    this.posDY = posDY || 40;
    this.lockedYDiff = 0;
    this.lockedFreighter = null;
    this.isLocked = false;
    this.isActive = false;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    this.accX = 0;
    this.accY = 0;
    this.maxVelX = 0;
    this.maxVelY = 0;
  }

  activate = ({dependency}) =>{
    if (this.isActive === false) {
      this.posX = dependency.posX;
      this.posY = dependency.posY;
      this.isActive = true;
      this.dependency = dependency;
      this.id = crypto.randomUUID();
      this.targetCargoInfo = InfoHandler.initInfo({infoType:InfoHandler.INFO_TYPES.freighterCargoInfo})
      GameObjectsHandler.instance.addGameObject(this);
    } else {
      this.isActive = false;
      this.releaseTarget();
      this.targetCargoInfo.destroy();
      GameObjectsHandler.instance.addGameObjectToRemoveQueue(this.id);
    }
  }

  lockTarget = (freighter) =>{
    this.isLocked = true;
    this.lockedFreighter = freighter;
    this.targetCargoInfo.show({posX: this.posX, posY: this.posY, properties: this.lockedFreighter.cargo});
    this.lockDiff = this.posX - this.lockedFreighter.posX;
    this.accX = this.dependency.accX;
    this.accY = this.dependency.accY;
    this.maxVelX = this.dependency.maxVelX;
    this.maxVelY = this.dependency.maxVelY;
    this.dependency.accY = this.dependency.accY / 2;
    this.dependency.accX = this.dependency.accX / 2;
    this.dependency.maxVelX = this.dependency.maxVelX / 4;
    this.dependency.maxVelY = this.dependency.maxVelY / 4;
  }

  releaseTarget = () => {
    this.targetCargoInfo.hide();
    this.dependency.accY = this.accY;
    this.dependency.accX = this.accX;
    this.dependency.maxVelX = this.maxVelX;
    this.dependency.maxVelY = this.maxVelY;
    this.isLocked = false;
    this.lockedYDiff = 0;
    this.lockedFreighter = null;
  }

  update = ()=>{
    this.posX = this.dependency.posX + this.posDX;
    this.posY = this.dependency.posY + this.posDY;

    const gradient = this.context.createLinearGradient(this.posX, this.posY, this.posX,this.posY + this.height);
    gradient.addColorStop(0.4, "#1AA396");
    gradient.addColorStop(0.8, "#0A6396");
    gradient.addColorStop(1, "#000");
    this.context.strokeStyle = gradient;
    this.context.fillStyle = gradient;

    // no freighter locked? scan for freighter within tractor beam range
    if (this.isLocked === false){
      Object.values(FreighterHandler.freighters).forEach(freighter => {
        if (
          freighter.posX < this.posX-this.width
          && freighter.posX + freighter.width > this.posX+this.width
          && freighter.posY > this.posY
          && freighter.posY + freighter.height  < this.posY+this.height
        ){
        this.lockTarget(freighter);
        }
      })
    }
    // if we've established lock, fixate freighter position and withdraw cargo
    else {
      this.targetCargoInfo.update({posX: this.posX, posY:this.posY,properties: this.lockedFreighter.cargo})

      for (const [key] of Object.entries(this.lockedFreighter.cargo)) {
        if (this.lockedFreighter.cargo[key] > 0) {
          this.dependency.loadCargo(key)

          /*
          typeof this.dependency.cargo[key] !=="undefined" ?
            this.dependency.cargo[key] = this.dependency.cargo[key]+1 :
            this.dependency.cargo[key] = 0;*/
          this.lockedFreighter.cargo[key]--
          this.targetCargoInfo.update({posX: this.posX, posY:this.posY, properties:this.lockedFreighter.cargo})
        }
      }

      this.lockedFreighter.posX = this.posX - this.lockDiff
      this.lockedYDiff = this.lockedFreighter.posY - this.posY;

      // release lock if we're not in vertical range anymore
      if (this.posY > this.lockedFreighter.posY - this.posDY
        || this.posY < this.lockedFreighter.posY - this.height
      ){
       this.releaseTarget();
      }
    }
  }


  render = () => {

    const context = this.context; //block scope for faster access
    context.save();
    context.beginPath();

    //draw tractor search beams
    let searchTargetX = this.posX + Math.random() * this.width - (this.halfWidth);
    let searchTargetY = this.isLocked ? this.posY + this.lockedYDiff + 20 : this.posY + this.height;

    context.moveTo(this.posX, this.posY);
    context.lineTo(searchTargetX, searchTargetY);
    context.stroke();

    // draw tractor beam
    if (this.isLocked) {
      context.globalAlpha = Math.random() * 0.2 + 0.1;
      context.moveTo(this.posX, this.posY);
      context.lineTo(this.posX + this.halfWidth, this.posY + this.lockedYDiff + 50);
      context.lineTo(this.posX - this.halfWidth, this.posY + this.lockedYDiff + 50);
      context.closePath();
      context.fill();
    }

    context.restore();
  }
}
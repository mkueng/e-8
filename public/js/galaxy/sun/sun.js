class Sun extends GameObject{

  constructor({
    width,
    height,
    color,
    posX,
    posY
              }) {
    super({
      width,
      height,
      posX,
      posY,
      isContextPreventedOfBeingCleared : true,
      isActive: true,
      velX: 0,
      isHittable: false,
      isDestroyable: false,
      canDestroy : false
    })

    this.posV = -0.00008/(10/width);
    const sunDiv = document.createElement("div");
    sunDiv.id = this.id;
    sunDiv.classList.add("sun");
    document.getElementById("game").append(sunDiv);
    this.sun = document.getElementById(this.id);
    this.posXCenter = this.posX - this.width/2;
    this.sun.style.left = this.posXCenter+"px";
    this.sun.style.width = this.width+"px";
    this.sun.style.height = this.height+"px";
    this.sun.style.top = this.posY-this.height/2+"px"

    const newTranslatePx = this.width/2-30-(100/this.width*70); // New value for translate
    const newTranslatePx50 = this.width/2-30-(100/this.width*70); // New value for 50% translate

    this.style = document.createElement('style');

    const keyframesCSS = `
    .sun_fire {
      position: absolute;
      top: ${0}px;
      left: ${0}px;
      z-index:1;
    }
    
    #sun-fire {
      position: absolute;
      top: ${this.posY-40}px;
      left: ${this.posXCenter+this.width/2-60}px;
      z-index:1;
    }
    
@keyframes sunFireInner {
    0% {
        transform: translate(${newTranslatePx}px, -50%) rotateZ(0deg);
    }
    50% {
        transform: translate(${newTranslatePx50}px, -50%) rotateZ(180deg);
    }
    100% {
        transform: translate(${newTranslatePx}px, -50%) rotateZ(360deg);
    }
}

@keyframes sunFireInnerLeft {
    0% {
        transform: translate(${newTranslatePx}px, -50%) rotateZ(0deg);
    }
    50% {
        transform: translate(${newTranslatePx50}px, -50%) rotateZ(-180deg);
    }
    100% {
        transform: translate(${newTranslatePx}px, -50%) rotateZ(-360deg);
    }
}`;

    this.style.appendChild(document.createTextNode(keyframesCSS));
    document.head.appendChild(this.style);
    this.sunFire = document.getElementById("sun-fire");

  }


  render=()=>{
  }

  update=(deltaTime) =>{
    if (PlayerShip.velX) {
      if (this.isActive === false) return;
      this.posXCenter = this.posXCenter + this.velX*deltaTime+(PlayerShip.velX*this.posV);
      if (this.sun) {
        this.sun.style.left = this.posXCenter+"px";
        this.sunFire.style.left = this.posXCenter+this.width/2-60+"px";
      }

      /*
      if (this.posXCenter < -this.width) {
        this.isActive = false;
        this.sunFire.remove();
        this.sun.remove();

        this.destroy();

      }*/
    }
  }
}
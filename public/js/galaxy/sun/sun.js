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
      isContextPreventedOfBeingCleared: true,
      isActive: true,
      velX: 0,
      isHittable: false,
      isDestroyable: false,
      canDestroy: false
    })

    this.posV = -0.00003 / (10 / width);
    const sunDiv = document.createElement("div");
    sunDiv.id = this.id;
    sunDiv.classList.add("sun");
    document.getElementById("game").append(sunDiv);
    this.sun = document.getElementById(this.id);
    this.posXCenter = this.posX - this.width / 2;
    this.sun.style.left = this.posXCenter + "px";
    this.sun.style.width = this.width + "px";
    this.sun.style.height = this.height + "px";
    this.sun.style.top = this.posY - this.height / 2 + "px";
    this.sun.style.background = color
  }

  render=()=>{
  }

  destroy= () =>{
    console.log("Destroying sun");
    if (this.sun) {
      this.sun.remove();
      this.sun = null;
    }
  }

  update=(deltaTime) =>{
    if (PlayerShip.velX) {
      if (this.isActive === false) return;
      this.posXCenter = this.posXCenter + this.velX*deltaTime+(PlayerShip.velX*this.posV);
      this.posX = this.posXCenter;
      if (this.sun) {
        this.sun.style.left = this.posXCenter+"px";

      }
      if (this.posX + this.posDX <= -this.width*2) {
        this.isActive = false;
        this.destroy();
      }
    }
  }
}
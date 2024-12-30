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

    console.log("sun color", color);

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

  update=(deltaTime) =>{
    if (PlayerShip.velX) {
      if (this.isActive === false) return;
      this.posXCenter = this.posXCenter + this.velX*deltaTime+(PlayerShip.velX*this.posV);
      if (this.sun) {
        this.sun.style.left = this.posXCenter+"px";

      }
    }
  }
}
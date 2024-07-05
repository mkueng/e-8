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

    this.posV = -0.0001/(10/width);
    const sunDiv = document.createElement("div");
    sunDiv.id = this.id;
    sunDiv.classList.add("sun");
    document.getElementById("game").append(sunDiv);
    this.sun = document.getElementById(this.id);
    this.sun.style.left = this.posX+"px";
    this.sun.style.width = this.width+"px";
    this.sun.style.height = this.height+"px";
    this.sun.style.top = this.posY+"px"


    this.sune =   document.getElementById("sune");
    this.sune.style.left = this.posX+"px";
    this.sune.style.top = this.posY+"px";
    this.sune.style.width = this.width;
    this.sune.style.height = this.height;

    console.log("sun:", this);
    GameObjectsHandler.instance.addGameObject(this);
  }




  render=()=>{
  }

  update=(deltaTime) =>{
    if (PlayerShip.velX) {
      this.posX = this.posX + this.velX*deltaTime+(PlayerShip.velX*this.posV);
      this.sun.style.left = this.posX+"px";
      this.sune.style.left = this.posX+"px";
    }
  }
}
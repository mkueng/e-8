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
    console.log("posX:", this.posX);




    // Step 1: Define new pixel values
    const newTranslatePx = this.width-240; // New value for translate
    const newTranslatePx50 = this.width-200; // New value for 50% translate

// Step 2: Create a style element
    const style = document.createElement('style');
    style.type = 'text/css';

// Step 3: Generate CSS text with new pixel values
    const keyframesCSS = `
    
 
    
    #ui .sun_fire {
    position: absolute;
    top: ${this.posY+160}px;
    left: ${this.posX+140}px;
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

// Step 4: Append the style to the document
    if (style.styleSheet) {
      style.styleSheet.cssText = keyframesCSS;
    } else {
      style.appendChild(document.createTextNode(keyframesCSS));
    }

    document.head.appendChild(style);


    console.log("sun:", this);
    GameObjectsHandler.instance.addGameObject(this);
  }




  render=()=>{
  }

  update=(deltaTime) =>{
    if (PlayerShip.velX) {
      this.posX = this.posX + this.velX*deltaTime+(PlayerShip.velX*this.posV);
      this.sun.style.left = this.posX+"px";
      //this.sune.style.left = this.posX+"px";
    }
  }
}
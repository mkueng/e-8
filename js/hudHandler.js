class HudHandler {

  static props = {
    shotsFired : 0
  }

  static updateHud=(props)=>{
    HudHandler.props["shotsFired"]=props.shotsFired;
  }

  #staticContext;
  #dynamicContextLeft;
  #dynamicContextRight;
  #dynamicContextFarRight;
  #dynamicContextFarLeft;


  #initContexts = ()=>{
    // static

    this.#staticContext = this.canvasHandler.getCanvas("hudStatic").context;
    this.#staticContext.width = this.canvasHandler.getCanvas("hudStatic").width;
    this.#staticContext.height = this.canvasHandler.getCanvas("hudStatic").height;

    //dynamic middle
    this.dynamicContextMiddle = this.canvasHandler.getCanvas("hudDynamicMiddle").context;
    this.dynamicContextMiddle.width = this.canvasHandler.getCanvas("hudDynamicMiddle").width;
    this.dynamicContextMiddle.height = this.canvasHandler.getCanvas("hudDynamicMiddle").height;


    //dynamic left
    this.#dynamicContextLeft = this.canvasHandler.getCanvas("hudDynamicLeft").context;
    this.#dynamicContextLeft.width = this.canvasHandler.getCanvas("hudDynamicLeft").width;
    this.#dynamicContextLeft.height = this.canvasHandler.getCanvas("hudDynamicLeft").height;
    this.#dynamicContextLeft.setTransform(1, (-0.08), 0, 1, 0, 0);

    //dynamic right
    this.#dynamicContextRight = this.canvasHandler.getCanvas("hudDynamicRight").context;
    this.#dynamicContextRight.width = this.canvasHandler.getCanvas("hudDynamicRight").width;
    this.#dynamicContextRight.height = this.canvasHandler.getCanvas("hudDynamicRight").height;
    this.#dynamicContextRight.setTransform(1, 0.07, 0, 1, 0, 0);

    //dynamic far right
    this.#dynamicContextFarRight = this.canvasHandler.getCanvas("hudDynamicFarRight").context;
    this.#dynamicContextFarRight.width = this.canvasHandler.getCanvas("hudDynamicFarRight").width;
    this.#dynamicContextFarRight.height = this.canvasHandler.getCanvas("hudDynamicFarRight").height;
    this.#dynamicContextFarRight.setTransform(1, 0.10, 0, 1, 0, 0);

    //dynamic far left
    this.#dynamicContextFarLeft = this.canvasHandler.getCanvas("hudDynamicFarLeft").context;
    this.#dynamicContextFarLeft.width = this.canvasHandler.getCanvas("hudDynamicFarLeft").width;
    this.#dynamicContextFarLeft.height = this.canvasHandler.getCanvas("hudDynamicFarLeft").height;
    this.#dynamicContextFarLeft.setTransform(1, -0.10, 0, 1, 0, 0);

  }
  constructor(canvasHandler){
    this.canvasHandler = canvasHandler;
   /*
    this.hudImage = document.querySelector("#hud");

    this.naviImage = document.querySelector("#navi");
    this.naviOrbImage = document.querySelector("#navi-orb");
    this.naviImagePosX = (window.global.screenWidth/6-this.naviImage.width)/2
    this.naviOrbImagePosX = (window.global.screenWidth/6-this.naviImage.width)/2;


    this.shieldInfoBarColor = "green";
    this.propulsionInfoBarColor = "green";
    this.laserInfoBarColor = "#829399";
    this.laserEnergyColor = "#f86624"
    this.toggleRender = true;
    this.toggle2Render = true;
    this.#initContexts();
    this.fillRectNavi = this.dynamicContextMiddle.fillRect.bind(this.dynamicContextMiddle);
    this.fillRectRight = this.#dynamicContextRight.fillRect.bind(this.#dynamicContextRight);
    this.fillRectLeft = this.#dynamicContextLeft.fillRect.bind(this.#dynamicContextLeft);
    */

  }

  render = (dt) =>{
    this.toggleRender = !this.toggleRender;
    if (this.toggleRender) {
      this.toggle2Render = !this.toggle2Render;
      if (this.toggle2Render){
        this.renderDisplayLeft();
        this.renderNavi();
        this.renderDisplayRight();
        this.renderDisplayFarRight();
        this.renderDisplayFarLeft(dt);
      }

    }
  }

  renderStatic = () =>{
    //this.#staticContext.clearRect(0,0,this.#staticContext.width, this.#staticContext.length);
    this.#staticContext.drawImage(this.hudImage,0,0, this.#staticContext.width,this.#staticContext.height);
  }

  renderDisplayLeft = (dt)=>{
    this.#dynamicContextLeft.clearRect(0,0,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    this.#dynamicContextLeft.fillStyle =  "#222e50"
    this.#dynamicContextLeft.fillRect(0,45,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height-55)
    this.renderShield();
    this.renderProp();
  }

  renderDisplayFarLeft = (dt)=>{
    this.#dynamicContextFarLeft.clearRect(0,0, this.#dynamicContextFarLeft.width,  this.#dynamicContextFarLeft.height);
    this.#dynamicContextFarLeft.fillStyle =  "#222e50"
    this.#dynamicContextFarLeft.fillRect(0,15,this.#dynamicContextFarLeft.width, this.#dynamicContextFarLeft.height-20);
    this.#dynamicContextFarLeft.fillStyle =  "white";
    this.#dynamicContextFarLeft.fillText(dt, 5,28);
  }

  renderDisplayRight = (dt)=>{
    this.#dynamicContextRight.clearRect(0,0, this.#dynamicContextRight.width,  this.#dynamicContextRight.height);
    this.#dynamicContextRight.fillStyle =  "#222e50"
    this.#dynamicContextRight.fillRect(0,30,this.#dynamicContextRight.width, this.#dynamicContextRight.height-57);
    this.renderLaser();
    this.renderPhotonTorpedos();
  }

  renderDisplayFarRight = ()=>{
    this.#dynamicContextFarRight.clearRect(0,0, this.#dynamicContextFarRight.width,  this.#dynamicContextFarRight.height);
    this.#dynamicContextFarRight.fillStyle =  "#222e50"
    this.#dynamicContextFarRight.fillRect(0,5,this.#dynamicContextFarRight.width, this.#dynamicContextFarRight.height-15)
  }

  renderDisplayMiddle = ()=>{
    this.dynamicContextMiddle.clearRect(0,0,this.dynamicContextMiddle.width, this.dynamicContextMiddle.height);

  }

  renderNavi = ()=>{
    this.dynamicContextMiddle.clearRect(0,0,this.dynamicContextMiddle.width, this.dynamicContextMiddle.height);
    this.dynamicContextMiddle.drawImage(this.naviImage, this.naviImagePosX ,25);
    this.dynamicContextMiddle.drawImage(this.naviOrbImage, this.naviOrbImagePosX ,-10);

    for (let i = 0, len = SpriteHandler.enemies.length; i < len; i++) {
      const enemy =  SpriteHandler.enemies[i];
      const xPercentage = 100 / (window.global.screenWidth / enemy.x);
      const yPercentage = 100 / (window.global.screenHeight / enemy.y);
      const xPosition = this.naviImagePosX + 50+ xPercentage / 2;
      const yPosition = 30 + yPercentage / 2;

      this.dynamicContextMiddle.fillStyle ="red";
      this.fillRectNavi(xPosition, yPosition, 5, 5);
    }
  }

  renderLaser =()=>{
    this.#dynamicContextRight.fillStyle =  this.laserInfoBarColor;
    this.#dynamicContextRight.fillText("LASER", 20,45);
    this.fillRectRight(70,37,100,8);
    this.#dynamicContextRight.fillStyle = this.laserEnergyColor;
    this.fillRectRight(70,37,Spaceship_01.laserPercentage,8);
  }

  renderPhotonTorpedos =()=>{
    this.#dynamicContextRight.fillStyle = "white";
    this.#dynamicContextRight.fillText("PT", 20,55);
    this.fillRectRight(70,50,100,8);
  }

  renderShield = ()=>{
    const shieldPercentage = Spaceship_01.shieldPercentage;



    this.shieldInfoBarColor =
      shieldPercentage < 30 ? "red" :
        shieldPercentage < 50 ? "orange" :
          "lightgreen";

    this.#dynamicContextLeft.fillStyle = "aquamarine";
    this.#dynamicContextLeft.fillText("SHIELDS", this.#dynamicContextLeft.width - 190, 65);
    this.fillRectLeft(this.#dynamicContextLeft.width - 120, 55,  100, 10);

    this.#dynamicContextLeft.fillStyle = this.shieldInfoBarColor;
    this.fillRectLeft( this.#dynamicContextLeft.width - 120, 55, shieldPercentage, 10);}

  renderProp = () => {




    this.propulsionInfoBarColor =
      Spaceship_01.propulsionPercentage < 30 ? "red" :
        Spaceship_01.propulsionPercentage < 50 ? "orange" :
          "lightgreen";

    this.#dynamicContextLeft.fillStyle = "aquamarine";
    this.#dynamicContextLeft.fillText("PROP", this.#dynamicContextLeft.width - 190, 80);
    this.fillRectLeft(this.#dynamicContextLeft.width - 120, 70, 100, 10);

    this.#dynamicContextLeft.fillStyle = this.propulsionInfoBarColor;
    this.fillRectLeft(this.#dynamicContextLeft.width - 120, 70, Spaceship_01.propulsionPercentage, 10);
  }
}
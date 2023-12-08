class HudHandler {


   static instance = new this();

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

    this.#staticContext = CanvasHandler.instance.getCanvas("hudStatic").context;
    this.#staticContext.width = CanvasHandler.instance.getCanvas("hudStatic").width;
    this.#staticContext.height = CanvasHandler.instance.getCanvas("hudStatic").height;


        this.dynamicContextMiddle = CanvasHandler.instance.getCanvas("hudDynamicMiddle").context;
        this.dynamicContextMiddle.width = CanvasHandler.instance.getCanvas("hudDynamicMiddle").width;
        this.dynamicContextMiddle.height = CanvasHandler.instance.getCanvas("hudDynamicMiddle").height;


        //dynamic left
        this.#dynamicContextLeft = CanvasHandler.instance.getCanvas("hudDynamicLeft").context;
        this.#dynamicContextLeft.width = CanvasHandler.instance.getCanvas("hudDynamicLeft").width;
        this.#dynamicContextLeft.height = CanvasHandler.instance.getCanvas("hudDynamicLeft").height;
        this.#dynamicContextLeft.transform(0.1, 1, 1, 0, 0, 0)
        this.#dynamicContextLeft.font = "12px myFont";

        //dynamic right
        this.#dynamicContextRight = CanvasHandler.instance.getCanvas("hudDynamicRight").context;
        this.#dynamicContextRight.width = CanvasHandler.instance.getCanvas("hudDynamicRight").width;
        this.#dynamicContextRight.height = CanvasHandler.instance.getCanvas("hudDynamicRight").height;
        this.#dynamicContextRight.transform(-0.1, 1, 1, 0, 15, 0);
        this.#dynamicContextRight.font = "8px myFont";

        //dynamic far right
        this.#dynamicContextFarRight = CanvasHandler.instance.getCanvas("hudDynamicFarRight").context;
        this.#dynamicContextFarRight.width = CanvasHandler.instance.getCanvas("hudDynamicFarRight").width;
        this.#dynamicContextFarRight.height = CanvasHandler.instance.getCanvas("hudDynamicFarRight").height;
        this.#dynamicContextFarRight.setTransform(1, 0.10, 0, 1, 0, 0);

        //dynamic far left
        this.#dynamicContextFarLeft = CanvasHandler.instance.getCanvas("hudDynamicFarLeft").context;
        this.#dynamicContextFarLeft.width = CanvasHandler.instance.getCanvas("hudDynamicFarLeft").width;
        this.#dynamicContextFarLeft.height = CanvasHandler.instance.getCanvas("hudDynamicFarLeft").height;
        this.#dynamicContextFarLeft.setTransform(1, -0.10, 0, 1, 0, 0);

  }
  init(){

    this.#initContexts();

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

    this.#renderStatic();
    this.#renderNavi();
    this.renderDisplayLeft();
    this.renderDisplayRight();



  }

  updateShield = (percentage)=>{
   this.#renderShield(percentage)
  }
/*
  render = (dt) =>{
    this.toggleRender = !this.toggleRender;
    if (this.toggleRender) {
      this.toggle2Render = !this.toggle2Render;
      if (this.toggle2Render){
        this.renderDisplayLeft();

        this.renderDisplayRight();
        this.renderDisplayFarRight();
        this.renderDisplayFarLeft(dt);
      }
    }
  }
*/
  #renderStatic = () =>{
    //this.#staticContext.clearRect(0,0,this.#staticContext.width, this.#staticContext.length);
    this.#staticContext.drawImage(this.hudImage,0,0, this.#staticContext.width,this.#staticContext.height);
  }

  renderDisplayLeft = (dt)=>{
    this.#dynamicContextLeft.clearRect(0,0,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);

    this.#dynamicContextLeft.fillRect(0,0,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height)
    this.#renderShield();
    //this.renderProp();
  }

  renderDisplayRight = (dt)=>{
    this.#dynamicContextRight.fillStyle = "white"
    this.#dynamicContextRight.clearRect(0,0, this.#dynamicContextRight.width,  this.#dynamicContextRight.height);
    this.#dynamicContextRight.fillRect(0,0,this.#dynamicContextRight.width, this.#dynamicContextRight.height);
    this.#renderLaser();
    //this.#renderPhotonTorpedos();
  }

  renderDisplayFarLeft = (dt)=>{
    this.#dynamicContextFarLeft.clearRect(0,0, this.#dynamicContextFarLeft.width,  this.#dynamicContextFarLeft.height);
    this.#dynamicContextFarLeft.fillStyle =  "#222e50"
    this.#dynamicContextFarLeft.fillRect(0,15,this.#dynamicContextFarLeft.width, this.#dynamicContextFarLeft.height-20);
    this.#dynamicContextFarLeft.fillStyle =  "white";
    this.#dynamicContextFarLeft.fillText(dt, 5,28);
  }



  renderDisplayFarRight = ()=>{
    this.#dynamicContextFarRight.clearRect(0,0, this.#dynamicContextFarRight.width,  this.#dynamicContextFarRight.height);
    this.#dynamicContextFarRight.fillStyle =  "#222e50"
    this.#dynamicContextFarRight.fillRect(0,5,this.#dynamicContextFarRight.width, this.#dynamicContextFarRight.height-15)
  }

  renderDisplayMiddle = ()=>{
    this.dynamicContextMiddle.clearRect(0,0,this.dynamicContextMiddle.width, this.dynamicContextMiddle.height);

  }

  #renderNavi = ()=>{
    this.dynamicContextMiddle.clearRect(0,0,this.dynamicContextMiddle.width, this.dynamicContextMiddle.height);
    this.dynamicContextMiddle.drawImage(this.naviImage, this.naviImagePosX ,40);
    this.dynamicContextMiddle.drawImage(this.naviOrbImage, this.naviOrbImagePosX ,20);
/*
    for (let i = 0, len = SpriteHandler.enemies.length; i < len; i++) {
      const enemy =  SpriteHandler.enemies[i];
      const xPercentage = 100 / (window.global.screenWidth / enemy.x);
      const yPercentage = 100 / (window.global.screenHeight / enemy.y);
      const xPosition = this.naviImagePosX + 50+ xPercentage / 2;
      const yPosition = 30 + yPercentage / 2;

      this.dynamicContextMiddle.fillStyle ="red";
      this.fillRectNavi(xPosition, yPosition, 5, 5);
    }*/
  }

  #renderLaser =()=>{
    this.#dynamicContextRight.fillStyle = "white";
    this.#dynamicContextRight.fillText("LASER", 5,12);
   // this.fillRectRight(70,37,100,8);
   // this.#dynamicContextRight.fillStyle = this.laserEnergyColor;
   // this.fillRectRight(70,37,Spaceship_01_old.laserPercentage,8);
  }

  #renderPhotonTorpedos =()=>{
    this.#dynamicContextRight.fillStyle = "white";
    this.#dynamicContextRight.fillText("PT", 20,55);
    this.fillRectRight(70,50,100,8);
  }

  #renderShield = (percentage)=>{
    this.#dynamicContextLeft.clearRect(-5,-5,this.#dynamicContextLeft.width+10, this.#dynamicContextLeft.height+10);


    this.shieldInfoBarColor =
      percentage < 30 ? "red" :
        percentage < 60 ? "yellow":
          "lightgreen";

    this.#dynamicContextLeft.fillStyle = percentage;
    this.#dynamicContextLeft.fillRect(0,0,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height)

    this.#dynamicContextLeft.fillStyle = "white"
    this.#dynamicContextLeft.fillText("Shields", this.#dynamicContextLeft.width - 130, 14);
    this.#dynamicContextLeft.fillStyle = "black"
    this.fillRectLeft(this.#dynamicContextLeft.width - 70,5,  50, 10);

    this.#dynamicContextLeft.fillStyle = this.shieldInfoBarColor;
    this.fillRectLeft( this.#dynamicContextLeft.width - 68, 7, percentage/2-4, 6);}

  renderProp = () => {




    this.propulsionInfoBarColor =
      Spaceship_01_old.propulsionPercentage < 30 ? "red" :
        Spaceship_01_old.propulsionPercentage < 50 ? "yellow" :
          "lightgreen";

    this.#dynamicContextLeft.fillStyle = "aquamarine";
    this.#dynamicContextLeft.fillText("PROP", this.#dynamicContextLeft.width - 190, 80);
    this.fillRectLeft(this.#dynamicContextLeft.width - 120, 70, 80, 10);

    this.#dynamicContextLeft.fillStyle = this.propulsionInfoBarColor;
    this.fillRectLeft(this.#dynamicContextLeft.width - 120, 70, Spaceship_01_old.propulsionPercentage, 10);
  }
}
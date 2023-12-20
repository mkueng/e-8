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


        this.dynamicContextMiddle = this.canvasHandler.getCanvas("hudDynamicMiddle").context;
        this.dynamicContextMiddle.width = this.canvasHandler.getCanvas("hudDynamicMiddle").width;
        this.dynamicContextMiddle.height = this.canvasHandler.getCanvas("hudDynamicMiddle").height;


        //dynamic left
        this.#dynamicContextLeft = this.canvasHandler.getCanvas("hudDynamicLeft").context;
        this.#dynamicContextLeft.width = this.canvasHandler.getCanvas("hudDynamicLeft").width;
        this.#dynamicContextLeft.height = this.canvasHandler.getCanvas("hudDynamicLeft").height;
        this.#dynamicContextLeft.transform(0.08, 1, 1, 0, 0, 0)
        this.#dynamicContextLeft.font = "12px myFont";

        //dynamic right
        this.#dynamicContextRight = this.canvasHandler.getCanvas("hudDynamicRight").context;
        this.#dynamicContextRight.width = this.canvasHandler.getCanvas("hudDynamicRight").width;
        this.#dynamicContextRight.height = this.canvasHandler.getCanvas("hudDynamicRight").height;
        this.#dynamicContextRight.transform(-0.1, 1.2, 1, 0, 30, 0);
        this.#dynamicContextRight.font = "8px myFont";

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
  constructor({canvasHandler}){
    this.canvasHandler = canvasHandler;
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

    //this.#renderStatic();
    //this.#renderNavi();
    this.renderDisplayLeft();
    this.renderDisplayRight();

    setInterval(()=>{
      this.#updateDisplayRight();
      this.#updateDisplayLeft();
    }, 1000);


  }

  #time;
  #coordinates;
  #fuel;
  #shield;
  #systemsStatus;


  updateHudInfo = ({
                     time,
                     coordinates,
                     fuel,
                     shield,
                     systemsStatus
                   }) => {
    this.#time = time || this.#time;
    this.#fuel = fuel || this.#fuel;
    this.#shield = shield || this.#shield;
    this.#coordinates = coordinates || this.#coordinates;
    this.#systemsStatus = systemsStatus || this.#systemsStatus;


  }


  #renderStatic = () =>{
    //this.#staticContext.clearRect(0,0,this.#staticContext.width, this.#staticContext.length);
    this.#staticContext.drawImage(this.hudImage,0,0, this.#staticContext.width,this.#staticContext.height);
  }

  renderDisplayLeft = ()=>{
    this.#dynamicContextLeft.clearRect(0,0,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    this.#dynamicContextLeft.font = '13px myFont';
    this.#dynamicContextLeft.lineWidth = 2;
    this.#dynamicContextLeft.strokeStyle = "cyan";
    this.#dynamicContextLeft.strokeRect(-20,5,this.#dynamicContextLeft.width-20, this.#dynamicContextLeft.height);

  }

  #updateDisplayLeft = ()=>{
    this.#dynamicContextLeft.clearRect(-20,-10,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    this.#dynamicContextLeft.strokeRect(-20,5,this.#dynamicContextLeft.width-20, this.#dynamicContextLeft.height);

    this.#dynamicContextLeft.fillStyle = "white";
    this.#dynamicContextLeft.fillText("TIME - "+this.#time, 5,20);
    this.#dynamicContextLeft.fillText("COORDINATES - "+this.#coordinates, 5,35);
    this.#dynamicContextLeft.fillText("SYSTEMS STATUS - "+this.#systemsStatus, 5,50);

  }

  renderDisplayRight = ()=>{

    this.#dynamicContextRight.clearRect(0,0,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    this.#dynamicContextRight.font = '10px myFont';
    this.#dynamicContextRight.lineWidth = 2;
    this.#dynamicContextRight.strokeStyle = "cyan";
    this.#dynamicContextRight.clearRect(-10,-10,this.#dynamicContextRight.width+10, this.#dynamicContextRight.height+10);
    this.#dynamicContextRight.strokeRect(0,0,this.#dynamicContextRight.width, this.#dynamicContextRight.height);

  }



  #updateDisplayRight =()=>{
    this.#dynamicContextRight.clearRect(-10,-10,this.#dynamicContextRight.width+10, this.#dynamicContextRight.height+10);
    this.#dynamicContextRight.strokeRect(0,0,this.#dynamicContextRight.width, this.#dynamicContextRight.height);

    this.#dynamicContextRight.fillStyle = "white";
    this.#dynamicContextRight.fillText("TIME - "+this.#time, 5,15);
    this.#dynamicContextRight.fillText("COORDINATES - "+this.#coordinates, 5,30);
    this.#dynamicContextRight.fillText("SYSTEMS STATUS - "+this.#systemsStatus, 5,45);
    this.#dynamicContextRight.fillText("FUEL", 5,70);
    this.fillRectRight(45,62,100,8);
    this.#dynamicContextRight.fillText("SHIELD", 5,85);

    let shieldInfoBarColor;
    if (this.#shield) {

      shieldInfoBarColor =
        this.#shield < 30 ? "red" :
          this.#shield < 60 ? "yellow" :
            "lightgreen";
    } else shieldInfoBarColor = "grey";

    this.#dynamicContextRight.strokeRect(60,77,100,8);

    this.#dynamicContextRight.fillStyle = shieldInfoBarColor;
    this.fillRectRight(60,78,this.#shield,6);

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



  #renderPhotonTorpedos =()=>{
    this.#dynamicContextRight.fillStyle = "white";
    this.#dynamicContextRight.fillText("PT", 20,55);
    this.fillRectRight(70,50,100,8);
  }

  #renderShield = (percentage)=>{

    /*

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
    this.#dynamicContextLeft.strokeStyle = "white";
    this.fillRectLeft( this.#dynamicContextLeft.width - 68, 7, percentage/2-4, 6);

    const gradient = this.#dynamicContextLeft.createLinearGradient(0, 0, 220, 0);

// Add three color stops
    gradient.addColorStop(0, "green");
    gradient.addColorStop(0.5, "cyan");
    gradient.addColorStop(1, "green");

// Set the fill style and draw a rectangle
    this.#dynamicContextLeft.fillStyle = gradient;
    this.#dynamicContextLeft.fillRect(0,0,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);

    //this.#dynamicContextLeft.strokeRect(0,0,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);

*/
  }


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
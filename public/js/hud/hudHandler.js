class HudHandler {

  #staticContext;
  #dynamicContextLeft;
  #dynamicContextRight;

  #initContexts = ()=>{

    //dynamic middle
    this.dynamicContextMiddle = this.canvasHandler.getCanvas("hudDynamicMiddle").context;
    this.dynamicContextMiddle.width = this.canvasHandler.getCanvas("hudDynamicMiddle").width;
    this.dynamicContextMiddle.height = this.canvasHandler.getCanvas("hudDynamicMiddle").height;

    //dynamic left
    this.#dynamicContextLeft = this.canvasHandler.getCanvas("hudDynamicLeft").context;
    this.#dynamicContextLeft.width = this.canvasHandler.getCanvas("hudDynamicLeft").width;
    this.#dynamicContextLeft.height = this.canvasHandler.getCanvas("hudDynamicLeft").height;
    this.#dynamicContextLeft.transform(0.1, 1.2, 1, 0, 0, 0)
    this.#dynamicContextLeft.font = "10px myFont";

    //dynamic right
    this.#dynamicContextRight = this.canvasHandler.getCanvas("hudDynamicRight").context;
    this.#dynamicContextRight.width = this.canvasHandler.getCanvas("hudDynamicRight").width;
    this.#dynamicContextRight.height = this.canvasHandler.getCanvas("hudDynamicRight").height;
    this.#dynamicContextRight.transform(-0.15, 1.2, 1, 0, 50, 0);
    this.#dynamicContextRight.font = "10px myFont";
  }

  constructor({canvasHandler}){
    this.canvasHandler = canvasHandler;
    this.#initContexts();

    this.hudImage = document.querySelector("#hud");
    this.naviImage = document.querySelector("#navi");
    this.naviOrbImage = document.querySelector("#navi-orb");
    this.naviImagePosX = (e8.global.screenWidth/6-this.naviImage.width)/2
    this.naviOrbImagePosX = (e8.global.screenWidth/6-(this.naviOrbImage.width/2));
    this.propulsionInfoBarColor = "green";
    this.#initContexts();
    this.fillRectNavi = this.dynamicContextMiddle.fillRect.bind(this.dynamicContextMiddle);
    this.fillRectRight = this.#dynamicContextRight.fillRect.bind(this.#dynamicContextRight);
    this.fillRectLeft = this.#dynamicContextLeft.fillRect.bind(this.#dynamicContextLeft);

    // this.renderDisplayMiddle();
    //this.#renderNavi();
    //this.renderDisplayLeft();
    //this.renderDisplayRight();

    setInterval(()=>{
      this.#updateDisplayRight();
      this.#updateDisplayLeft();
      //this.#renderNavi();



    }, 2000);


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
    this.#dynamicContextLeft.lineWidth = 2;
    this.#dynamicContextLeft.strokeStyle = "grey";
    this.#dynamicContextLeft.strokeRect(-20,5,this.#dynamicContextLeft.width-20, this.#dynamicContextLeft.height);

  }

  #updateDisplayLeft = ()=>{
    this.#dynamicContextLeft.clearRect(-20,-10,this.#dynamicContextLeft.width-100, this.#dynamicContextLeft.height);
    this.#dynamicContextLeft.lineWidth = 7;
    this.#dynamicContextLeft.strokeStyle = "grey";
    this.#dynamicContextLeft.strokeRect(-20,5,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    this.#dynamicContextLeft.globalAlpha = 0.15;
   // this.#dynamicContextLeft.fillRect(-20,0,this.#dynamicContextLeft.width-100, this.#dynamicContextLeft.height);
    this.#dynamicContextLeft.fillStyle =  e8.global.colors.info;
    this.#dynamicContextLeft.globalAlpha = 1;
    this.#dynamicContextLeft.fillText("TIME - "+this.#time, 5,20);
    this.#dynamicContextLeft.fillText("COORDINATES - "+this.#coordinates, 5,35);
    this.#dynamicContextLeft.fillText("SYSTEMS STATUS - "+this.#systemsStatus, 5,50);
  }

  renderDisplayRight = ()=>{
    this.#dynamicContextRight.clearRect(0,0,this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    this.#dynamicContextRight.lineWidth = 2;
    this.#dynamicContextRight.strokeStyle = "grey";
    this.#dynamicContextRight.clearRect(-10,-10,this.#dynamicContextRight.width+10, this.#dynamicContextRight.height+10);
    this.#dynamicContextRight.strokeRect(0,0,this.#dynamicContextRight.width, this.#dynamicContextRight.height);
  }

  #updateDisplayRight =()=>{
    this.#dynamicContextRight.clearRect(-10,-10,this.#dynamicContextRight.width+10, this.#dynamicContextRight.height+10);
    this.#dynamicContextRight.lineWidth = 7;
    this.#dynamicContextRight.strokeStyle = "grey";
    this.#dynamicContextRight.strokeRect(-100,0,this.#dynamicContextRight.width+20, this.#dynamicContextRight.height);
    this.#dynamicContextRight.globalAlpha = 0.15;
    //this.#dynamicContextRight.fillRect(0,0,this.#dynamicContextRight.width, this.#dynamicContextRight.height);
    this.#dynamicContextRight.globalAlpha = 1
    this.#dynamicContextRight.fillStyle = e8.global.colors.neutral;
    this.#dynamicContextRight.fillText("TIME - "+this.#time, 5,15);
    this.#dynamicContextRight.fillText("COORDINATES - "+this.#coordinates, 5,30);
    this.#dynamicContextRight.fillStyle = e8.global.colors.neutral;
    this.#dynamicContextRight.fillText("SYSTEMS STATUS - "+this.#systemsStatus, 5,45);
    this.#dynamicContextRight.fillStyle = e8.global.colors.info;
    this.#dynamicContextRight.fillText("FUEL", 5,60);
    this.fillRectRight(60,55,this.#fuel,6);
    this.#dynamicContextRight.fillText("SHIELD", 5,75);

    let shieldInfoBarColor;
    if (this.#shield) {

      shieldInfoBarColor =
        this.#shield < 30 ? "red" :
          this.#shield < 60 ? "yellow" :
            "lightgreen";
    } else shieldInfoBarColor = "grey";

    this.#dynamicContextRight.strokeRect(80,67,100,8);

    this.#dynamicContextRight.fillStyle = shieldInfoBarColor;
    this.fillRectRight(80,68,this.#shield,6);

  }


 renderNavi = () => {
  const { dynamicContextMiddle, naviOrbImagePosX, naviOrbImage, hudImage } = this;
  const { screenWidth, screenHeight, colors } = e8.global;
  const { enemyShips } = EnemyShipHandler;

  dynamicContextMiddle.clearRect(0, 0, dynamicContextMiddle.width, dynamicContextMiddle.height);

  for (const enemyShip in enemyShips) {

    const { posX, posY, width } = enemyShips[enemyShip];
    const naviCoordXQuotient = screenWidth / posX * 3.5;
    const naviCoordYQuotient = screenHeight / posY * 2.2;
    const rectX = naviOrbImagePosX + naviOrbImage.width / naviCoordXQuotient + 77;
    const rectY = 30 + naviOrbImage.height / naviCoordYQuotient;

    if (width >150 ) {
      dynamicContextMiddle.fillStyle = colors.alloyOrange;
    } else {
        dynamicContextMiddle.fillStyle = colors.tiffanyBlue;
    }

    dynamicContextMiddle.fillRect(rectX, rectY, 5, 5);
  }

  dynamicContextMiddle.drawImage(naviOrbImage, naviOrbImagePosX, 10);
  dynamicContextMiddle.drawImage(hudImage, 0, 0, dynamicContextMiddle.width, dynamicContextMiddle.height);
}



  #renderPhotonTorpedos =()=>{
    this.#dynamicContextRight.fillStyle = "white";
    this.#dynamicContextRight.fillText("PT", 20,55);
    this.fillRectRight(70,50,100,8);
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
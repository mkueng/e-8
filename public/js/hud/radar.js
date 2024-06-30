class Radar extends GameObject {

  constructor() {

    super({
      canvas: e8.global.canvasHandler.getCanvas("hudDynamicMiddle").canvas
    });

  }

  init = async () => {
    this.naviOrbImage = document.querySelector("#navi-orb");
    this.naviOrbImagePosX = (e8.global.screenWidth / 6 - (this.naviOrbImage.width / 2));
    GameObjectsHandler.instance.addGameObject(this);
  }

  update = () => {
  }

  render = ()=>{

    const {context: ctx, naviOrbImagePosX, naviOrbImage, hudImage, canvas } = this;
    const {screenWidth, screenHeight, colors} = e8.global;
    const enemyShips = EnemyShipHandler.enemyShips;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    Object.values(enemyShips).forEach(({ posX, posY, width }) => {
      const rectX = naviOrbImagePosX + naviOrbImage.width / (screenWidth / posX * 3.5) + 65;
      const rectY = 20 + naviOrbImage.height / (screenHeight / posY * 2);

      ctx.fillStyle = width > 150 ? colors.alloyOrange : colors.tiffanyBlue;
      ctx.fillRect(rectX, rectY, 5, 5);
    });

    ctx.drawImage(naviOrbImage, naviOrbImagePosX, 10);


  }
}
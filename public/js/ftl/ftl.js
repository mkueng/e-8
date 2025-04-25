'use strict'
class FTL {

  constructor({
                canvasHandler
  }) {
    Object.assign(this, {
      canvasHandler
    })
    this.isActive = false;
    this.canvas = this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFace).canvas;
    this.context = this.canvas.getContext("2d");
    this.backDropCanvas = this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.backdrop).canvas;
    this.backDropContext = this.backDropCanvas.getContext("2d");

    this.stars = []; // Array to hold star objects
    this.maxStars = 100; // Number of stars for the effect
    this.speed = 0;
    this.starMaxSpeed = 400; // Maximum speed for stars
    this.coordinates = 0;
    this.id = crypto.randomUUID();

    this.dots=[{}];
    this.mx = 0;
    this.my = 0;
    this.md = 200;
    this.maxWidth = 15;
    this.minWidth = 2;
    this.maxHeight = e8.global.screenHeight*.9
    this.minHeight = e8.global.screenWidth*.5;
    this.maxSpeed = 35;
    this.minSpeed = 6;
    this.hue = 230;
    this.hueDif = 50; // Hue +/-
    this.glow = 10; // Set to 0 for better performance
    this.backDropContext.globalCompositeOperation = "lighter";
  }

  pushDots = ()=>{
    for(let i=1; i < this.md; i++){
      this.dots.push({
        x:Math.random()*e8.global.screenWidth+e8.global.screenWidth,
        y:Math.random()*e8.global.screenHeight,
        h:Math.random()*(this.maxHeight-this.minHeight)+this.minHeight,
        w:Math.random()*(this.maxWidth-this.minWidth)+this.minWidth,
        c:Math.random()*((this.hue+this.hueDif)-(this.hue-this.hueDif))+(this.hue-this.hueDif),
        m:Math.random()*(this.maxSpeed-this.minSpeed)+this.minSpeed
      });
    }
  }

  activate = ({ dependency }) => {
    if (!this.isActive) {
      this.isActive = true;
      this.dependency = dependency;
      this.id = crypto.randomUUID();

      this.pushDots();


      GameObjectsHandler.instance.addGameObject(this);
      this.initializeStars();
      this.coordinates = PlayerShip.coordinates;
      console.log("FTL activated");
    } else {
      GameObjectsHandler.instance.addGameObjectToRemoveQueue(this.id);

      this.isActive = false;
      console.log("FTL deactivated");
    }
  };

  initializeStars = () => {
    this.stars = Array.from({ length: this.maxStars }, () => {
      const r = Math.floor(Math.random() * 10);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 150);
      return {
        x: Math.random() * this.canvas.width, // Random starting x position
        y: Math.random() * this.canvas.height, // Random y position
        size: Math.random() * 5 + 1, // Random star size
        speed: Math.random() * 3 + 2, // Random speed for perspective effect
        color: `rgba(${r}, ${g}, ${b}, 1)` // Random color
      };
    });
    this.speed = 1; // Start slow
  };

  update = () => {
    this.coordinates = this.coordinates + 10000;
    PlayerShip.coordinates = this.coordinates;

    GameObjectsHandler.gameObjects.forEach((gameObject) => {
      if (gameObject.id !== this.id && gameObject.identification !=="playerShip" && gameObject.width > 0) {
        gameObject.fadeOut();
        //gameObject.posZ -= 0.1;
        gameObject.width = gameObject.width * 0.95;
      }

    })

    if (this.isActive) {
      // Gradually increase speed up to max speed
      if (this.speed < this.starMaxSpeed) {
        this.speed += 4;
      }

      // Update star positions
      this.stars.forEach((star) => {
        star.x -= star.speed * this.speed * 0.1; // Move star to the left

        // Reset star if it goes off-screen
        if (star.x < 0) {
          star.x = this.canvas.width; // Reset to right edge
          star.y = Math.random() * this.canvas.height; // Randomize y position
          star.speed = Math.random() * 3 + 2; // Randomize speed again
        }
      });
    }
  };

  render = () => {
    if (this.isActive) {

      const ctx = this.context;
      const backDropCtx = this.backDropContext;
      const width = this.backDropCanvas.width;
      const height = this.backDropCanvas.height;


      backDropCtx.clearRect(0, 0, this.backDropCanvas.width, this.backDropCanvas.height);
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);




      for(let i=1; i<this.dots.length; i++){
        this.backDropContext.beginPath();
        let grd = this.backDropContext.createLinearGradient(this.dots[i].x, this.dots[i].y, this.dots[i].x+this.dots[i].w, this.dots[i].y+this.dots[i].h);
        grd.addColorStop(.0, "hsla("+this.dots[i].c+",50%,50%,.0)");
        grd.addColorStop(.2, "hsla("+this.dots[i].c+20+",50%,50%,.5)");
        grd.addColorStop(.5, "hsla("+this.dots[i].c+50+",70%,60%,.8)");
        grd.addColorStop(.8, "hsla("+this.dots[i].c+80+",50%,50%,.5)");
        grd.addColorStop(1., "hsla("+(this.dots[i].c+100)+",50%,50%,.0)");
        //this.backDropContext.shadowBlur = this.glow;
        this.backDropContext.shadowColor = "hsla("+(this.dots[i].c)+",50%,50%,1)";
        this.backDropContext.fillStyle=grd;
        this.backDropContext.fillRect(this.dots[i].x,this.dots[i].y,1000,50);
        this.backDropContext.closePath();
        this.dots[i].x -= this.dots[i].m;
        if(this.dots[i].x < 0){
          this.dots[i].x = e8.global.screenWidth;
          // dots.splice(i,1);
          // dots.push({
          //   x:0,
          //   y:Math.random()*h,
          //   h:Math.random()*(maxHeight-minHeight)+minHeight,
          //   w:Math.random()*(maxWidth-minWidth)+minWidth,
          //   c:Math.random()*((hue+hueDif)-(hue-hueDif))+(hue-hueDif),
          //   m:Math.random()*(maxSpeed-minSpeed)+minSpeed
          // });
        }
      }





      // Optional: Add a streak effect

      /*
      this.stars.forEach((star) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.speed * this.speed * 0.5, star.y); // Create a streak
        ctx.strokeStyle = star.color;
        ctx.lineWidth = star.size*0.5;
        ctx.stroke();
      });*/
    }
  };
}

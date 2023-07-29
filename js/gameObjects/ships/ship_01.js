class Ship_01 extends Ship{

  constructor(params) {
    super(params);

    this.id = "ship_01";
    this.type = "ship";
    this.imageId = "ship_01";
    this.width = 136;
    this.height = 35;
    this.dx = 0;
    this.dy = 0;
    this.active = true;
    this.spriteSheet = false;
    this.canvas = "ship"

    this.exhaust = new Exhaust_01({
      dx: -15,
      dy: +17,
      canvas: "ship"
    })

    this.photonTorpedo = new PhotonTorpedo_01({
      dx: 105,
      dy: 5,
      vx: 25,
      vy: 0,
      canvas: "ship"
    })

    this.laser = new Laser_01({
      canvas : "ship"
    })
  }
}
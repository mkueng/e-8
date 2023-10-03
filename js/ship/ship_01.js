'use strict'
class Ship_01 extends Ship{

  constructor(params = {}) {
    super({
      id: "ship_01",
      type: "ship",
      imageId: "ship_01",
      width: 136,
      height: 35,
      dx: 0,
      dy: 0,
      active: true,
      spriteSheet: false,
      canvas: "ship"
    });

/*

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
*/
  }
}
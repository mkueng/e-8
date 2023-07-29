ns.enemy_01= {
  "enemy_01" : {
    id : "enemy_01",
    type :"enemy_01",
    class : "Enemy_01",
    imageId: "enemy_01",
    width : 130,
    height: 31,
    dx : 0,
    dy : 0,
    active : false,
    spriteSheet : false,
    canvas: "enemies"
  },
  "enemy_01_shoot": {
    id : "enemy_01_shoot",
    type : "enemy_01",
    class : "Enemy_01_shoot",
    imageId: "enemy_01_shoot",
    width: 16,
    height: 16,
    dx:0,
    dy:0,
    active : false,
    loop : false,
    canvas: "enemies"
  },
  "enemy_01_explosion": {
    id : "enemy_01",
    type : "enemy_01",
    class : "Enemy_01_explosion",
    imageId: "enemy_01_explosion",
    width: 100,
    height: 90,
    dx: 0,
    dy: -20,
    frames: 14,
    currentFrame: 0,
    step : 50,
    currentStep : 0,
    stride : 304,
    spriteSheet : true,
    active : true,
    loop : false,
    canvas: "enemies"
  }
}
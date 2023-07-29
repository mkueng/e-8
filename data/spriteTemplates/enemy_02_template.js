ns.enemy_02= {
  "enemy_02" : {
    id : "enemy_02",
    type :"enemy_02",
    class : "Enemy_02",
    imageId: "enemy_02",
    width : 70,
    height: 52,
    dx : 0,
    dy : 0,
    active : false,
    spriteSheet : false,
    canvas: "enemies"
  },
  "enemy_02_shoot": {
    id : "enemy_02",
    class : "Enemy_02_shoot",
    type : "enemy_02_shoot",
    imageId: "enemy_02_shoot",
    width: 16,
    height: 16,
    dx:-5,
    dy:5,
    active : false,
    loop : false,
    canvas: "enemies"
  },
  "enemy_02_explosion": {
    id : "enemy_02",
    class : "Enemy_02_explosion",
    type : "enemy_02_explosion",
    imageId: "enemy_02_explosion",
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
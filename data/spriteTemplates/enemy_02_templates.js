ns.enemy_02= {
  "enemy_02" : {
    id : "enemy_02",
    class : "Enemy_02",
    imageId: "enemy_02",
    width : 8,
    height: 6,
    dx : 0,
    dy : 0,
    active : false,
    spriteSheet : false,
    canvas: "enemies"
  },
  "enemy_02_shoot": {
    id : "enemy_02_shoot",
    class : "Enemy_02_shoot",
    imageId: "enemy_02_shoot",
    width: 5,
    height: 3,
    dx:-5,
    dy:5,
    active : false,
    loop : false,
    canvas: "enemies"
  },
  "enemy_02_explosion": {
    id : "enemy_02_explosion",
    class : "Enemy_02_explosion",
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
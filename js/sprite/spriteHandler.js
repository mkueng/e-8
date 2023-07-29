'use strict'
class SpriteHandler{
  //static fields

  static spriteTypes = Object.freeze({
    spaceships : "spaceships",
    enemies : "enemies",
    weapons : "weapons",
    explosions: "explosions"
  })

  static spaceships = [];
  static weapons = [];
  static enemies = [];
  static explosions = [];

  static spaceshipsRemoveQueue = [];
  static enemiesRemoveQueue = [];
  static weaponsRemoveQueue = [];
  static explosionsRemoveQueue = [];

  static createSprite = (props) => {
    props.context = CanvasHandler.getCanvas(props.canvas).context;
    props.image = document.querySelector("#" + props.imageId);

    if (props.width === 0) props.width = window.global.screenWidth;

    let sprites = {};

    for (let i = 0; i < props.quantity; i++) {
      const newSprite = new (this.spriteClasses.get(spriteClass))(spriteTemplate, this)
      sprites[newSprite.id] = newSprite;
    }
    return sprites;

}

  constructor(canvasHandler){
    this.canvasHandler = canvasHandler;

    this.spriteClasses = new Map([
      ['Spaceship_01', Spaceship_01],
      ['Shoot_01', Spaceship_01_photonTorpedo],
      ['Enemy_01', Enemy_01],
      ['Enemy_01_shoot', Enemy_01_shoot],
      ['Enemy_01_explosion', Enemy_01_explosion],
      ['Enemy_02', Enemy_02],
      ['Enemy_02_shoot', Enemy_02_shoot],
      ['Enemy_02_explosion', Enemy_02_explosion]
    ])

    this.spriteCompositionTemplates = {
      "spaceship_01": {
        class: Spaceship_01,
        id: "spaceship_01",
        spriteTemplates: {
          "spaceship_01": ns.spaceship_01["spaceship_01"],
          "exhaust_01": ns.spaceship_01["exhaust_01"],
          "laser": ns.spaceship_01["laser"],
          "shield": ns.spaceship_01["shield"]
        },
        //spriteTemplates: [this.spriteTemplates["spaceship_01"], this.spriteTemplates["exhaust_01"],this.spriteTemplates["laser"] ],
        context: this.canvasHandler.getCanvas("spaceship").context,
        width: 136,
        height: 35,
        x: 200,
        y: 200,
        vx: 0,
        vy: 0,
        callback: null
      }
    }
  }

  createSprite = (args) => {
    const spriteTemplate = ns[args.type][args.sprite];
    const spriteClass = spriteTemplate.class;
    spriteTemplate.context = this.canvasHandler.getCanvas(spriteTemplate.canvas).context;
    spriteTemplate.image = document.querySelector("#" + spriteTemplate.imageId);
    if (spriteTemplate.width === 0) spriteTemplate.width = window.global.screenWidth;
    spriteTemplate.stage = args.stage;
    let sprites = {};

    for (let i = 0; i < args.quantity; i++) {
      const newSprite = new (this.spriteClasses.get(spriteClass))(spriteTemplate, this)
      sprites[newSprite.id] = newSprite;
    }
    return sprites;
  }

  createSpriteComposition = (compositionName, args = {})=>{
    let template = this.spriteCompositionTemplates[compositionName];
    for (const compTemplate in template.spriteTemplates){
      template.spriteTemplates[compTemplate].context = this.canvasHandler.getCanvas(template.spriteTemplates[compTemplate].canvas).context;
      template.spriteTemplates[compTemplate].image = document.querySelector("#" + template.spriteTemplates[compTemplate].imageId);
      if (template.spriteTemplates[compTemplate].width === 0 ) template.spriteTemplates[compTemplate].width=window.global.screenWidth;
    }
    return new this.spriteCompositionTemplates[compositionName].class(this.spriteCompositionTemplates[compositionName], this, args);
  }

  addSpriteToGame = (type, sprite) =>{
    SpriteHandler[SpriteHandler.spriteTypes[type]].push(sprite);
  }

  removeSpriteFromGame = (type, id) =>{
    SpriteHandler[type+"RemoveQueue"].push(id);

  }
}
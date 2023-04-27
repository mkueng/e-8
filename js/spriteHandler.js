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
          "laser": ns.spaceship_01["laser"]
        },
        //spriteTemplates: [this.spriteTemplates["spaceship_01"], this.spriteTemplates["exhaust_01"],this.spriteTemplates["laser"] ],
        context: this.canvasHandler.getCanvas("spaceship").context,
        width: 200,
        height: 50,
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
    if (spriteTemplate.width === 0) spriteTemplate.width = window.global.gameWidth;
    spriteTemplate.stage = args.stage;
    let sprites = {};

    for (let i = 0; i < args.quantity; i++) {
      const newSprite = new (this.spriteClasses.get(spriteClass))(spriteTemplate, this)
      sprites[newSprite.id] = newSprite;
    }
    return sprites;
  }

  createSpriteComposition = (compositionName)=>{
    let template = this.spriteCompositionTemplates[compositionName];
    console.log("template:", template);
    for (const compTemplate in template.spriteTemplates){
      template.spriteTemplates[compTemplate].context = this.canvasHandler.getCanvas(template.spriteTemplates[compTemplate].canvas).context;
      template.spriteTemplates[compTemplate].image = document.querySelector("#" + template.spriteTemplates[compTemplate].imageId);
      if (template.spriteTemplates[compTemplate].width === 0 ) template.spriteTemplates[compTemplate].width=window.global.gameWidth;
    }
    return new this.spriteCompositionTemplates[compositionName].class(this.spriteCompositionTemplates[compositionName], this);
  }

  addSpriteToGame = (type, sprite) =>{
    SpriteHandler[SpriteHandler.spriteTypes[type]].push(sprite);
  }

  removeSpriteFromGame = (type, id) =>{
    SpriteHandler[type+"RemoveQueue"].push(id);

  }
}
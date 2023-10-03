'use strict'
class ProceduralEnemyShipImage extends ProceduralShipImage {

  #tiles = new Map([
    ["feature", 3],
    ["pattern", 3],
    ["gadget" ,4],
    ["front", 10],
    ["middle", 10],
    ["back", 10]
  ])

  #resourcePath =  "/resources/procedural/enemyShips/";
  #shipSize = 2;
  #scale = 1;
  #tileSize = 64;
  #imageData = null;
  #offset = this.#tileSize*this.#scale;
  #orientation = false;

  constructor(){
    super({
    })
    return this;
  }

  /**
   *
   * @returns {Promise<null>}
   */
  create = async ()=>{

    const tileResourceObjects = await this.loadResources({
      tiles: this.#tiles,
      tilesResourcePath: this.#resourcePath
    });

    this.createShape({
      resourceObjects : tileResourceObjects,
      offset : this.#offset,
      shipSize : this.#shipSize,
      orientation : this.#orientation
    })

    this.addDecoration({
      resourceObjects : tileResourceObjects["feature"],
      category : "feature",
      startTile : 0,
      endTile : this.#shipSize+2,
      offset : this.#offset,
      alpha : 1,
      globalCompositionType : "source-atop"
    })

    this.addDecoration({
      resourceObjects : tileResourceObjects["pattern"],
      category : "pattern",
      startTile : 0,
      endTile : this.#shipSize+2,
      offset : this.#offset,
      alpha : 1,
      globalCompositionType : "source-atop"
    })

    this.addDecoration({
      resourceObjects : tileResourceObjects["gadget"],
      category : "gadget",
      startTile : 1,
      endTile : this.#shipSize+1,
      offset : this.#offset,
      alpha : 1,
      globalCompositionType : "source-over"
    })

    this.addColor({
      shipSize : this.#shipSize,
      offset : this.#offset,
      alpha : 0.6
    })

    this.#imageData = this.getImageData({
      shipSize : this.#shipSize,
      offset : this.#offset,
      tileSize : this.#tileSize
    })

    console.log("imageData:", this.#imageData);
    return this.#imageData;

  }
}
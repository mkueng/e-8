'use strict'
class ProceduralEnemyShipImageType1 extends ProceduralShipImage {

  #tiles = new Map([
    ["feature", 3],
    ["pattern", 3],
    ["gadget" ,4],
    ["front", 10],
    ["middle", 10],
    ["back", 10]
  ])

  #resourcePath =  "/resources/procedural/enemyShips/";
  #filePrefix = "enemy_ship";
  #tileSize = 64;
  #orientation = false;
  #tilesResourceObjects;

  constructor(){
    super({
    });
  }

  /**
   *
   * @returns {Promise<void>}
   */
  invoke = async () => {
    this.#tilesResourceObjects = await this.fetchResources({
      tiles : this.#tiles,
      filePrefix : this.#filePrefix,
      resourcePath : this.#resourcePath
    })
  }

  /**
   *
   * @param shipSize
   * @param scale
   * @returns {Promise<ImageData>}
   */
  create = async ({ shipSize, scale })=>{
    if (typeof shipSize !== 'number' || typeof scale !== 'number' || shipSize <= 0 || scale <= 0) {
      throw new Error('Invalid parameters: shipSize and scale must be positive numbers.');
    }
    const offset = this.#tileSize*scale;
    this.setupCanvas({
      shipSize : shipSize,
      offset : offset
    })

    this.createShape({
      resourceObjects : this.#tilesResourceObjects,
      offset : offset,
      filePrefix : this.#filePrefix,
      shipSize : shipSize,
      orientation : this.#orientation
    })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["feature"],
      category : "feature",
      startTile : 0,
      endTile : shipSize+2,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 1,
      globalCompositionType : "source-atop"
    })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["pattern"],
      category : "pattern",
      startTile : 0,
      endTile : shipSize+2,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 1,
      globalCompositionType : "source-atop"
    })

    this.addColor({
      shipSize : shipSize,
      offset : offset,
      alpha : 0.2
    })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 1,
      endTile : shipSize+1,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 1,
      globalCompositionType : "source-over"
    })

    this.addColor({
      shipSize : shipSize,
      offset : offset,
      alpha : 0.7
    })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 1,
      endTile : shipSize+1,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 0.6,
      globalCompositionType : "source-over"
    })

    return this.getImageData()
  }
}
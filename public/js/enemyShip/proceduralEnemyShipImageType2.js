'use strict'
class ProceduralEnemyShipImageType2 extends ProceduralShipImage {

  #tiles = new Map([
    ["back", 3],
    ["front", 3],
    ["gadget" ,4],
    ["middle", 5]
  ])

  #resourcePath =  "/procedural/enemyShips/shipType2/";
  #filePrefix = "";
  #tileSize = 48;
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
    console.log("invoke ProceduralEnemyShipImageType2");
    this.#tilesResourceObjects = await this.fetchResources({
      tiles : this.#tiles,
      filePrefix : this.#filePrefix,
      resourcePath : this.#resourcePath
    })

    console.log("this.#tilesResourceObjects:", this.#tilesResourceObjects);
  }

  /**
   *
   * @param shipSize
   * @param scale
   * @returns {Promise<ImageData>}
   */
  create = async ({ shipSize, scale })=>{
    console.log("shipSize:", shipSize, "scale:", scale);
    if (typeof shipSize !== 'number' || typeof scale !== 'number' || shipSize <= 0 || scale <= 0) {
      throw new Error('Invalid parameters: shipSize and scale must be positive numbers.');
    }
    const offset = this.#tileSize*scale;
    this.setupCanvas({
      shipSize : shipSize,
      offset : offset
    })

    console.log("this.#tilesResourceObjects:", this.#tilesResourceObjects);

    this.createShape({
      resourceObjects : this.#tilesResourceObjects,
      offset : offset,
      filePrefix : this.#filePrefix,
      shipSize : shipSize,
      orientation : this.#orientation
    })


    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 1,
      endTile : shipSize-1,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 1,
      globalCompositionType : "source-over"
    })



    this.addColor({
      shipSize : shipSize,
      offset : offset,
      alpha : 0.5
    })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 1,
      endTile : shipSize-1,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 0.3,
      globalCompositionType : "source-over"
    })

    this.addColor({
      shipSize : shipSize,
      offset : offset,
      alpha : 0.3
    })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 2,
      endTile : shipSize-2,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 1,
      globalCompositionType : "source-over"
    })

    this.addColor({
      shipSize : shipSize,
      offset : offset,
      alpha : 0.3
    })





    return this.getImageData()
  }
}
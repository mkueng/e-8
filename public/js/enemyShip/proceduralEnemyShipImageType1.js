'use strict'
class ProceduralEnemyShipImageType1 extends ProceduralShipImage {

  #tiles = new Map([
    ["feature", 3],
    ["pattern", 3],
    ["gadget" ,7],
    ["front", 10],
    ["middle", 10],
    ["back", 10]
  ])

  #resourcePath =  "resources/procedural/enemyShips/shipType1/";
  #filePrefix = "";
  #tileSize = 56;
  #orientation = false;
  #tilesResourceObjects;

  constructor({
                resourceHandler,
                canvasHandler
              }){
    super({
      resourceHandler,
      canvasHandler
    });
  }

  /**
   *
   * @returns {Promise<void>}
   */
  invoke = async () => {
    console.log("invoke ProceduralEnemyShipImageType1");
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
    //console.log("shipSize:", shipSize, "scale:", scale);
    if (typeof shipSize !== 'number' || typeof scale !== 'number' || shipSize <= 0 || scale <= 0) {
      throw new Error('Invalid parameters: shipSize and scale must be positive numbers.');
    }
    const offset = this.#tileSize*scale;
    this.setupCanvas({
      shipSize : shipSize,
      offset : offset
    })

    //
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
       startTile : 1,
       endTile : shipSize,
       offset : offset,
       filePrefix : this.#filePrefix,
       alpha : 1,
       globalCompositionType : "source-atop"
     })

     this.addDecoration({
       resourceObjects : this.#tilesResourceObjects["pattern"],
       category : "pattern",
       startTile : 0,
       endTile : shipSize,
       offset : offset,
       filePrefix : this.#filePrefix,
       alpha : 1,
       globalCompositionType : "source-atop"
     })



      this.addGradient({
          shipSize : shipSize,
          offset : offset,
          alpha : 1
      })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 2,
      endTile : shipSize+1,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 1,
      globalCompositionType : "source-atop"
    })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 0,
      endTile : shipSize+2,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 1,
      globalCompositionType : "source-atop"
    })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 1,
      endTile : shipSize+1,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 0.8,
      globalCompositionType : "source-over"
    })

    this.addColor({
      shipSize : shipSize,
      offset : offset,
      alpha : 0.2
    })

      this.addGradient({
          shipSize : shipSize,
          offset : offset,
          alpha : 0.8
      })

    return this.getImageData()
  }
}
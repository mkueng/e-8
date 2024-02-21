'use strict'
class ResourceLoader {

  #resourceWorker;

  constructor(){
    //this.#resourceWorker = new Worker('js/workers/fetchResourcesWorker.js');
  }

  /**
   *
   * @param resourceObject ResourceObject
   * @returns {Promise<unknown>}
   */
  #loadImage = (resourceObject) => {
    return new Promise((resolve, reject) => {
      const resourcePath = resourceObject.resourcePath+resourceObject.filename+"."+resourceObject.type;
      resourceObject.image = new Image();
      resourceObject.image.src = resourcePath;
      resourceObject.image.onload = () => resolve(resourceObject);
      resourceObject.image.onerror = () => reject(new Error('failed to load:'+resourceObject.resourcePath));
      resourceObject.image.onabort = () => reject(new Error('resource loading aborted'));
      resourceObject.image.onstalled = () => reject(new Error('resource loading stalled'));
    });
  };


  /**
   *
   * @param category string (feature, gadget, pattern etc...)
   * @param filename string (feature, gadget, pattern etc...)
   * @param fileType string (png, jpeg etc..)
   * @param filePath string (relative path to file)
   * @param lowerLimit integer
   * @param upperLimit integer
   * @returns {Promise<Awaited<*>[]>}
   */
  fetchResourceBatch = async ({category, fileName, fileType, filePath, lowerLimit, upperLimit})=>{
    let resourceObjects = [];

    for (let i = lowerLimit; i < upperLimit; i++){
      resourceObjects.push(new ResourceObject({
        id : fileName+i,
        category : category,
        fileName : fileName+"_"+i,
        fileType : ResourceObject.TYPES[fileType],
        resourcePath : filePath,
        image : null
      }))
    }
    return await this.fetchResources(resourceObjects);
  }


  /**
   *
   * @param resourceObject
   * @returns {Promise<*>}
   */
  fetchResource = async (resourceObject) => {
    return await this.#loadImage(resourceObject)
  }


  /**
   *
   * @param resourceObjects []
   * @returns {Promise<Awaited<unknown>[]>}
   */
  fetchResources = async (resourceObjects)=>{
    //console.log("resourceObjects:", resourceObjects);
    try {
      const resourcePromises = resourceObjects.map((resourceObject) => this.#loadImage(resourceObject));
      const resultsArray = await Promise.all(resourcePromises);
      return  [].concat(...resultsArray)

    }catch(e){
      console.error(e)
    }
  }
}
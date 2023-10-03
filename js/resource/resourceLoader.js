class ResourceLoader {

  constructor(){
  }

  #loadImage = (resourceObject) => {
    return new Promise((resolve, reject) => {
      resourceObject.image = new Image();
      resourceObject.image.src = resourceObject.resourcePath;
      resourceObject.image.onload = () => resolve(resourceObject);
      resourceObject.image.onerror = () => reject(new Error('failed to load:'+resourceObject.resourcePath));
      resourceObject.image.onabort = () => reject(new Error('resource loading aborted'));
      resourceObject.image.onstalled = () => reject(new Error('resource loading stalled'));
    });
  };

  #loadSound = (id,path)=>{
  }


  loadResourceBatch = async ({category, filename, fileType, filePath, lowerLimit, upperLimit})=>{
    let resourceObjects = [];

    for (let i = lowerLimit; i < upperLimit; i++){
      resourceObjects.push(new ResourceObject({
        id : filename+i,
        category : category,
        filename : filename+i,
        type : ResourceObject.types[fileType],
        resourcePath : filePath+filename+i+ResourceObject.types[fileType],
        image : null
      }))
    }
    return await this.loadResources(resourceObjects);
  }

  /**
   *
   * @param resourceObjects
   * @returns {Promise<Awaited<unknown>[]>}
   */
  loadResources = async (resourceObjects)=>{
    try {
      const resourcePromises = resourceObjects.map((resourceObject) => this.#loadImage(resourceObject));
      const resultsArray = await Promise.all(resourcePromises);
      return  [].concat(...resultsArray)

    }catch(e){
      Log.error(e);
    }
  }
}
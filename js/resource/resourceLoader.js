class ResourceLoader {

  constructor(){
  }

  #loadImage = (id,path) => {
    console.log("load image");
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = path;
      image.onload = () => resolve({id: id, image:image});
      image.onerror = () => reject(new Error('failed to load resource'));
      image.onabort = () => reject(new Error('resource loading aborted'));
      image.onstalled = () => reject(new Error('resource loading stalled'));

    });
  };

  #loadSound = (id,path)=>{
  }


  /**
   *
   * @param resourceObjects
   * @returns {Promise<Awaited<unknown>[]>}
   */
  loadResources = async (resourceObjects)=>{
    try {
      const resourcePromises = resourceObjects.map((resourceObject) => this.#loadImage(resourceObject.id, resourceObject.path));
      return await Promise.all(resourcePromises);
    }catch(e){
      Log.error(e);
    }
  }
}
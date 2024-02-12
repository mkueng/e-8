'use strict'

class ResourceHandler {

  #resourcePool = {};
  #soundResourcePool = {};

  /**
   *
   * @returns {ResourceHandler}
   */
  constructor() {
    this.resourceLoader = new ResourceLoader();
  }

  /**
   *
   * @param category
   * @param filename
   * @param fileType
   * @param filePath
   * @param lowerLimit
   * @param upperLimit
   * @returns {Promise<Awaited<*>[]>}
   */
  fetchResourceBatch = async ({
    category,
    fileName,
    fileType,
    filePath,
    lowerLimit,
    upperLimit
  }) =>{
    return await this.resourceLoader.fetchResourceBatch({
      category,
      fileName,
      fileType,
      filePath,
      lowerLimit,
      upperLimit
    })
  }

  /**
   *
   * @param resourceObject
   * @returns {Promise<AudioBuffer>}
   */
  fetchSoundResource = async ({resourceObject})=>{
    let requestedResource;
    if (this.#soundResourcePool.hasOwnProperty(resourceObject.id)){
      requestedResource = this.#soundResourcePool[resourceObject.id];
    } else {
      requestedResource = await SoundHandler.fetchAudioAndReturnAudioBuffer(resourceObject.resourcePath)
      this.#soundResourcePool[resourceObject.id] = requestedResource;
    }
    return requestedResource;
  }

  /**
   *
   * @param resourceObject
   * @returns {Promise<*>}
   */
  fetchImageResource = async ({resourceObject})=>{
    let requestedResource;
    if (this.#resourcePool.hasOwnProperty(resourceObject.id)){
      console.log("resource from pool: ",resourceObject.id);
      requestedResource = this.#resourcePool[resourceObject.id];
    } else {
      requestedResource = await this.resourceLoader.fetchResource(resourceObject);
      console.log("resource fetched: ", resourceObject.id);
      this.#resourcePool[requestedResource.id] = requestedResource;
    }

    return requestedResource;
  }
}
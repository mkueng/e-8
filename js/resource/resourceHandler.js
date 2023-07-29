'use strict'

/**
 * singleton
 */
class ResourceHandler {

  #resourceBasePath = "resources/";
  #resourcePool = {};

  #resourceTypePath = {
    enemies : "enemies/",
    ships : "ships/",
    planets : "planets/",
    stations : "stations/",
    backgrounds : "backgrounds/",
    asteroids : "asteroids/",
    stars : "stars/",
    moons : "moons/"
  }

  #resources = {
    images : {
      enemies : {
        enemy_01 : "enemy_01.png",
        enemy_02 : "enemy_02.png"
      },
      planets : {
        planet_01 : "planet_01.png",
        planet_02 : "planet_02.png"
      },
      backgrounds : {
        background_01 : "background_01.png",
        background_02 : "background_02.png"
      },
      ships : {
        ship_01 : "ship_01.png",
        ship_02 : "ship_02.png"
      }
    },
    sounds : {
      explosions : {
        explosion_01 : "explosion_01.mp4"
      }
    }
  }

  /**
   * create map with resource-name as key from #resources object
   * @returns {Map<any, any>}
   */
  #createResourceMap = () => {
    const resourceMap = new Map();

    function traverseObject(obj, type, category) {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          traverseObject(obj[key], key, type);
        } else {
          resourceMap.set(key, {
            image: obj[key],
            type: type,
            category: category,
          });
        }
      }
    }
    traverseObject(this.#resources);
    return resourceMap;
  };

  /**
   *
   * @param id
   * @param resourceObj
   * @returns {string}
   */
  #createResourcePath = (id, resourceObj) =>{
    try {
      return this.#resourceBasePath +
        this.#resourceTypePath[resourceObj.type] +
        `/${id}/${resourceObj.category}/` +
        this.#resources[resourceObj.category][resourceObj.type][id];
    } catch (e){
      Log.error("resourcePath not valid");
    }
  }

  /**
   *
   * @returns {ResourceHandler}
   */
  constructor() {
    if (!ResourceHandler.instance) {
      this.resourceLoader = new ResourceLoader();
      this.resourceMap = this.#createResourceMap();
      ResourceHandler.instance = this;
    }
    return ResourceHandler.instance;
  }

  /**
   *
   * @param ids
   * @returns requested resources
   */
  getResources = async (ids)=>{
    let resourceObjects = [];
    let requestedResources = {};
    //creating array of resourceObject(s) {id:id, path:path) generated from resource map
    for (const id of ids){
      if (typeof this.#resourcePool[id] == 'undefined'){
        resourceObjects.push ({id: id, path:this.#createResourcePath(id,this.resourceMap.get(id))} );
      }else {
        requestedResources[id]= this.#resourcePool[id];
      }
    }
    //invoke resource loader with array of resourceObjects
    const fetchedResources = await this.resourceLoader.loadResources(resourceObjects);
    //update resourcePool with additional fetched resources
    for (const value of Object.values(fetchedResources)) {
      this.#resourcePool[value.id] = value;
    }
    //merge and return resources from pool and additional fetched resources
    return {...requestedResources, ...fetchedResources};
  }
}
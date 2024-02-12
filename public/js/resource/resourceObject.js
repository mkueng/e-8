class ResourceObject {

  static TYPES = {
    png: "png",
    jpg: "jpg",
    jpeg: "jpeg",
    mp3: "mp3",
    wav: "wav"
  }

  static CATEGORIES = {
    playerShip : "playerShip",
    enemyShip : "enemyShip",
    weapon : "weapon",
    propulsion : "propulsion",
    backdrop : "backdrop",
    shield : "shield",
    asteroid : "asteroid",
    asteroidField : "asteroidField",
    spaceStation : "spaceStation",
    explosion: "explosion"
  }

  id
  fileName
  fileType
  resourcePath
  resource
  category

  /**
   *
   * @param category
   * @param name
   * @param filename
   * @param fileType
   * @param resourcePath
   */
  constructor({category, name,  fileName, fileType, resourcePath}) {
    Object.assign(this,{category, name, fileName,fileType,resourcePath})
    this.id = crypto.randomUUID();
  }

  set resource(resource){
    this.resource = resource;
  }

  get resource(){
    return this.resource;
  }

  set category(category){
    this.category = category;
  }

  get category(){
    return this.category;
  }

  get id() {
    return this.id;
  }

  get filename() {
    return this.fileName;
  }

  get type() {
    return this.fileType;
  }

  get resourcePath() {
    return this.resourcePath
  }
}
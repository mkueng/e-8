class ResourceObject {

  static types = {
    png : ".png",
    jpg : ".jpg",
    jpeg : ".jpeg",
    mp3 : ".mp3"
  }

  #id
  #filename
  #type
  #resourcePath
  #resource
  #category

  constructor({category, id, filename,type, resourcePath}) {
    this.#category = category;
    this.#id = id;
    this.#filename = filename;
    this.#type = type;
    this.#resourcePath = resourcePath;

  }

  set resource(resource){
    this.#resource = resource;
  }

  get resource(){
    return this.#resource;
  }

  set category(category){
    this.#category = category;
  }

  get category(){
    return this.#category;
  }

  get id() {
    return this.#id;
  }

  get filename() {
    return this.#filename;
  }

  get type() {
    return this.#type;
  }

  get resourcePath() {
    return this.#resourcePath
  }
}
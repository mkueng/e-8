class LocalStorageHandler {

  #storageItems = {
    music_volume : null,
    fx_volume: null,
  };

  localStorageIsAvailable = false;

  constructor(){
    if (typeof(Storage) !== "undefined") {
      this.localStorageIsAvailable = true;
      this.readLocalStorage()
    }
  }

  readLocalStorage = () => {
    this.#storageItems.music_volume = localStorage.getItem("music_volume") || 50;
    this.#storageItems.fx_volume = localStorage.getItem("fx_volume") || 70;
    console.log("storageItems: ", this.#storageItems);
  }

  getStorageItem = (key) => {
    return this.#storageItems[key];
  }

  setStorageItem = (key, value) => {
    this.#storageItems[key] = value;
    localStorage.setItem(key,value);
  }
}
'use strict'

/**
 *
 * singleton
 */
class BackgroundHandler {

  static instance = new this();


  #backgroundWorker;


  get backgroundWorker() {
    return this.#backgroundWorker;
  }

  set backgroundWorker(value) {
    this.#backgroundWorker = value;
  }

  #backgrounds = {};
  #offScreenCanvases = {};

  async invoke(){
    await this.fetchBackgroundData();

  }

  async fetchBackgroundData(){
    fetch('js/backgroundObjects/backgroundData.json')
      .then(response => response.json())
      .then(data => {
        this.#backgrounds = data;
        this.activate();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  createOffScreenCanvases(){
    this.#offScreenCanvases = CanvasHandler.instance.getBackgroundCanvases();
    for (canvas in this.#offScreenCanvases) {
      this.#offScreenCanvases[canvas]["offscreen"] = this.#offScreenCanvases[canvas].canvas.transferControlToOffscreen();
    }
    console.log("offscreenCanvases:", this.#offScreenCanvases);

  }

  activate(backgrounds){
    this.createOffScreenCanvases();
    for (const background in this.#backgrounds) {
      this.#backgrounds[background].url  = "/"+document.querySelector("#"+this.#backgrounds[background].id).getAttribute('src');
    }
    console.log("backgrounds:", this.#backgrounds);
  }

/*
  invoke(){

    let canvas = CanvasHandler.instance.getOffscreenCanvas(this.backgrounds.backdrop_01.canvas).canvas;
    const offscreen = canvas.transferControlToOffscreen();

    const imageURL = "/"+document.querySelector("#"+this.backgrounds.backdrop_01.id).getAttribute('src');

    console.log("imageUrl:", imageURL);

    this.#backgroundWorker = new Worker ('../js/workers/backgroundWorker.js')
    this.#backgroundWorker.postMessage({
      canvas: offscreen,
      imageURL : imageURL,
    backgroundObject: this.backgrounds.backdrop_01}, [offscreen]);
  }*/
}
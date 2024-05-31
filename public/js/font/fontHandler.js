'use strict'
class FontHandler {

  constructor(){
    this.myFont = new FontFace('myFont', 'url(resources/fonts/BrunoAceSC-Regular.ttf)');
  }

  init = async() =>{
    await this.loadFont();
  }

  async loadFont() {
    await this.myFont.load().then(function (font) {
      document.fonts.add(font);
    });
  }
}
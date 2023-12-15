'use strict'

class FontHandler {

  constructor(){
    this.myFont = new FontFace('myFont', 'url(resources/fonts/BrunoAceSC-Regular.ttf)');
  }

  async loadFont() {
    await this.myFont.load().then(function (font) {
      document.fonts.add(font);
    });
  }
}
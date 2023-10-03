'use strict'

/**
 * singleton
 */
class FontHandler {

  static instance = new this();

  invoke(){
    this.myFont = new FontFace('myFont', 'url(resources/fonts/BrunoAceSC-Regular.ttf)');
  }

  async loadFont() {
    await this.myFont.load().then(function (font) {
      document.fonts.add(font);
    });
  }
}
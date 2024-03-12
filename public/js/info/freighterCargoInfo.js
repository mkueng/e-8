'use strict'
class FreighterCargoInfo extends Info {

  #template = `
    <div class="info" id="freighterCargoInfo" >
        <div class="infoTitle">CARGO</div>
        <div class="infoProperties" id="freighterCargoInfoProperties"></div>
    </div>
  `

  constructor() {
    super();
    this.init({template: this.#template, id:"freighterCargoInfo", propertiesId:"freighterCargoInfoProperties"})
  }
}
class PoiHighlight extends  GameObject {
  constructor({
    image,
    width,
    height,
    posX,
    posY,
    posDX,
    posDY,
    canvas,
    relatedPOI,
      alpha
  }){
    super({
      isActive:true,
      image,
      width,
      height,
      posX,
      posY,
      posDX,
      posDY,
      canvas,
      alpha
    });
    this.relatedPOI = relatedPOI;
  }

  setRelatedPOI(relatedPOI){
    this.relatedPOI = relatedPOI;
  }

  update(deltaTime) {
      if (this.relatedPOI) {
          this.posX = this.relatedPOI.posX;
          this.posY = this.relatedPOI.posY;
      }

  }
}
class Info {
  infoElement;

  constructor(){
  }

  /**
   *
   * @param template
   * @param id
   * @param propertiesId
   */
  init = ({template, id, propertiesId}) =>{
    this.infoElement = document.createElement('div');
    this.infoElement.id = id;
    this.infoElement.propertiesId = propertiesId;
    this.infoElement.innerHTML=template;
    this.infoElement.style.display="none";
    let infoContainer = document.getElementById("info");
    infoContainer.append(this.infoElement);
  }

  /**
   *
   * @param posX
   * @param posY
   * @param properties
   */
  update = ({posX,posY, properties}) =>{
    this.infoElement.style.top = posY+'px';
    this.infoElement.style.left = posX+'px';
    let propertyList = ``;
    const infoProperty = document.getElementById(this.infoElement.propertiesId);
    Object.keys(properties).forEach(property =>{
      propertyList=propertyList+`<div>${property}:`+" "+`${properties[property]}</div>`
    })
    infoProperty.innerHTML=propertyList
  }

  /**
   *
   * @param posX
   * @param posY
   * @param properties
   */
  show = ({posX, posY, properties}) =>{
    this.update({posX,posY,properties});
    this.infoElement .style.position = 'absolute';
    this.infoElement.style.display = "block";


  }

  /**
   *
   */
  hide = () => {
    this.infoElement.style.display = "none";
  }

  destroy = () =>{
    this.infoElement.remove()
  }

}
class InfoHandler {


  static INFO_TYPES = {
    freighterCargoInfo: FreighterCargoInfo
  }


  constructor(){

  }

  /**
   *
   * @param infoType <InfoHandler.INFO_TYPES>
   */
  static initInfo = ({infoType}) => {
    return new infoType();
  }


/*
  static updateInfo({properties}){
    let propertyList = ``;
    const infoProperty = document.getElementById("infoProperties");
    Object.keys(properties).forEach(property =>{
      propertyList=propertyList+`<div>${property}:`+" "+`${properties[property]}</div>`
    })
    infoProperty.innerHTML=propertyList
  }

  static hideInfo(){
    InfoHandler.infoElement.style.display="none";
  }

  static showInfo(){
    InfoHandler.infoElement = document.getElementById("info");
    InfoHandler.infoElement.style.display="block";

    InfoHandler.infoElement .innerHTML = InfoHandler.template;
    InfoHandler.infoElement .style.position = 'absolute';


  }

  static updatePosition(posX, posY){
    InfoHandler.infoElement .style.top = posY+ 'px';
    InfoHandler.infoElement .style.left = posX+ 'px';

  }
*/
}
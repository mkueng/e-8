class InfoHandler {

  static template
  static infoElement;

  constructor(){
    this.initializeTemplate();
  }

  initializeTemplate = () => {
    InfoHandler.template =`
  <div class="info" id="bla" >
    <div class="infoTitle">CARGO</div>
    <div class="infoProperties" id="infoProperties">
        
    </div>
  </div>
  `
  }

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

}
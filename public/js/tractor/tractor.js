class Tractor  {

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.placeholder,
    name : "placeholder",
    fileName : "placeholder",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/placeholder"
  })

  static soundResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.placeholder,
    id : "placeholder",
    filename : "placeholder",
    type : ResourceObject.TYPES.mp3,
    resourcePath : "/resources/placeholder"
  })

  static async invoke(resourceHandler){
    Tractor.imageResource = await resourceHandler.fetchImageResource({
      resourceObject : Tractor.imageResourceObject
    });

    Tractor.soundResource = await resourceHandler.fetchSoundResource({
      resourceObject : Tractor.soundResourceObject
    });
  }

  constructor(){}

  execute = () =>{
    console.log("Tractor execute");
  }


}
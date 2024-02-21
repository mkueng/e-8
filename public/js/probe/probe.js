class Probe{

  static imageResource;
  static soundResource;


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
    Probe.imageResource = await resourceHandler.fetchImageResource({
      resourceObject : Probe.imageResourceObject
    });

    Probe.soundResource = await resourceHandler.fetchSoundResource({
      resourceObject : Probe.soundResourceObject
    });
  }

  constructor(){}

  execute = () =>{
    console.log("Probe execute");
  }

}
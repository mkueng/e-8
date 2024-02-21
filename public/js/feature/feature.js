class Feature {
  static imageResource;
  static soundResource;

  static async invoke({imageResourceObject, soundResourceObject}){
    if (imageResourceObject){
      Feature.imageResource = await resourceHandler.fetchImageResource({
        resourceObject : imageResourceObject
      });
    }

    if (soundResourceObject){
      Feature.soundResource = await resourceHandler.fetchSoundResource({
        resourceObject : soundResourceObject
      });
    }
  }


  constructor() {
  }
}
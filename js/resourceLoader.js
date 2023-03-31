let ResourceLoader = (function(){
  let spriteResources = {
    "robot": {
      "run": {
        "rootName": "run",
        "path": "/resources/sprites/robot/run/",
        "fileType": "png",
        "frames": 8,
        "images": []
      },
      "jump" : {
        "rootName": "jump",
        "path": "/resources/sprites/robot/jump/",
        "fileType": "png",
        "frames": 10,
        "images": []
      }
    }
  }

  let loadImage = (path, name)=>{
    return new Promise((resolve, reject)=>{
      const img = new Image();
      img.src = path;
      img.id = name;
      img.onload = ()=> resolve (img);
      img.onerror = ()=> reject();
    })
  }


  return {
    init : ()=>{

    },

    getImageResources(){
      return spriteResources;
    },

    getSpriteResource(name){
      return spriteResources[name];
    },


    /**
     *
     * @param name
     * @returns {Promise<*>}
     */
    loadSpriteResource : async (name) =>{
      for (const sequence in spriteResources[name]){
        const imageProps = spriteResources[name][sequence];
        const promises = [];
        for (let i = 0; i < imageProps.frames; i++) {
          promises.push(loadImage(
            imageProps.path+imageProps.rootName+"_"+i+"."+imageProps.fileType,
            imageProps.rootName+"_"+i));
        }

        await Promise.all(promises).then((images)=>{
          for (let i=0, len = images.length; i<len;i++){
            imageProps.images[i] = images[i];
          }
        })

      }
      return spriteResources[name];
    },

    /**
     *
     * @returns {Promise<void>}
     */
    loadAllImageResources : async ()=>{
      const promises = [];
      for (const resource in spriteResources){
        promises.push(loadImage(spriteResources[resource].path+spriteResources[resource].filename, spriteResources[resource].name ));
      }
      await Promise.all(promises).then((images)=>{
          for (let i=0, len = images.length; i<len;i++){
            spriteResources[images[i].name].image = images[i];
          }
          console.log("resources:", spriteResources);
      })
    },

    loadResource : (name)=>{

    }

  }


})()
class SoundHandler {


  static soundTemplates = {
    "spaceship" : {
      "photonShoot": {
        "copies" : 10,
        "resource" : "../resources/spaceships/spaceship_02/sounds/photonShoot.wav",
        "volume" : 0.5
      },
      "laser" : {
        "copies" : 5,
        "resource" : "../resources/spaceships/spaceship_02/sounds/laser.wav",
        "volume" : 0.2
      }
    },
    "enemy_01" : {
      "explosion" : {
        "copies": 15,
        "resource" : "../resources/enemies/enemy_01/sounds/explosion.wav",
        "volume" : 0.3
      }
    }
  }

  static sounds = {}

  static playSound(entity, sound){
   const counter = SoundHandler.sounds[entity][sound].counter;
    SoundHandler.sounds[entity][sound].audio[counter].play();
    if (SoundHandler.sounds[entity][sound].counter < SoundHandler.sounds[entity][sound]["audio"].length-1){
      SoundHandler.sounds[entity][sound].counter ++
    } else {
      SoundHandler.sounds[entity][sound].counter = 0;
    }
    return SoundHandler.sounds[entity][sound].audio[counter];
  }

  static stopSound(entity, sound) {
    for (let i = 0; i < SoundHandler.sounds[entity][sound].audio.length; i++){
      SoundHandler.sounds[entity][sound].audio[i].pause();
    }
  }

  static getSound(entity, sound){
    return SoundHandler.sounds[entity][sound];
  }


  constructor(){

    for (const entity in SoundHandler.soundTemplates){
      SoundHandler.sounds[entity]= {};
      for (const sounds in  SoundHandler.soundTemplates[entity]){
        SoundHandler.sounds[entity][sounds]= {}
        SoundHandler.sounds[entity][sounds]["audio"] = [];
        SoundHandler.sounds[entity][sounds]["counter"] = 0;
        for (let i = 0; i < SoundHandler.soundTemplates[entity][sounds].copies; i++) {
          const newAudio = new Audio(SoundHandler.soundTemplates[entity][sounds].resource);
          newAudio.volume = SoundHandler.soundTemplates[entity][sounds].volume;
          SoundHandler.sounds[entity][sounds]["audio"].push(newAudio);
        }
      }
    }
  }
}
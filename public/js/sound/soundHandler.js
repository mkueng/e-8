class SoundHandler {


  static soundTemplates = {
    "spaceship" : {
      "photonShoot": {
        "copies" : 9,
        "resource" : "./resources/sounds/photonShoot_01.wav",
        "volume" : 1
      }
    }
  }

  static sounds = {}
  static audioCtx;
  static audioBuffer;

  static preloadSounds() {
    for (const entity in SoundHandler.soundTemplates) {
      for (const sounds in SoundHandler.soundTemplates[entity]) {
        const audio = new Audio(SoundHandler.soundTemplates[entity][sounds].resource);
        audio.load(); // Load the audio
      }
    }
  }

  static playSample(audioContext, audioBuffer){
    const sampleSource = SoundHandler.audioCtx.createBufferSource();
    sampleSource.buffer = SoundHandler.audioBuffer;
    sampleSource.connect(SoundHandler.audioCtx.destination)
    sampleSource.start(0);
  }
  /*
  static playSound(entity, sound){
    console.log("playSound");
   const counter = SoundHandler.sounds[entity][sound].counter;
   console.log("counter:", counter);
    SoundHandler.sounds[entity][sound].audio[counter].play();
    if (SoundHandler.sounds[entity][sound].counter < SoundHandler.sounds[entity][sound]["audio"].length-1){
      SoundHandler.sounds[entity][sound].counter ++
    } else {
      SoundHandler.sounds[entity][sound].counter = 0;
    }

  }
*/
  static stopSound(entity, sound) {
    for (let i = 0; i < SoundHandler.sounds[entity][sound].audio.length; i++){
      SoundHandler.sounds[entity][sound].audio[i].pause();
    }
  }

  static getSound(entity, sound){
    return SoundHandler.sounds[entity][sound];
  }


  static async invokeAudio  (){
    SoundHandler.audioCtx = new AudioContext()
    const response = await fetch("./resources/sounds/photonShoot_01.wav")
    const arrayBuffer = await response.arrayBuffer();
    SoundHandler.audioBuffer = await SoundHandler.audioCtx.decodeAudioData(arrayBuffer);
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
          newAudio.cloneNode(true);
          SoundHandler.sounds[entity][sounds]["audio"].push(newAudio);
        }
      }
    }
  }
}
'use strict'

class SoundHandler {

  static audioCtx = new AudioContext();

  static gainNode;
  /*
  static stopSound(entity, sound) {
  }
  */

  static setGain(){
    SoundHandler.gainNode = SoundHandler.audioCtx.createGain()
    SoundHandler.gainNode.gain.value = 0.3 // 10 %
    SoundHandler.gainNode.connect(SoundHandler.audioCtx.destination)

// now instead of connecting to aCtx.destination, connect to the gainNode

  }

  static playMusic(){

  }

  static playSound (audioBuffer){
    const sampleSource = SoundHandler.audioCtx.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.v
    sampleSource.connect(SoundHandler.gainNode)
    sampleSource.start(0);
  }

  static async fetchAudioAndReturnAudioBuffer (source){
    const response = await fetch(source);
    const arrayBuffer = await response.arrayBuffer();
    return await SoundHandler.audioCtx.decodeAudioData(arrayBuffer);
  }
}
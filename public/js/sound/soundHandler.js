'use strict'

class SoundHandler {

  static audioCtx = new AudioContext();

  /*
  static stopSound(entity, sound) {
  }
  */

  static playMusic(){

  }

  static playSound (audioBuffer){
    const sampleSource = SoundHandler.audioCtx.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(SoundHandler.audioCtx.destination)
    sampleSource.start(0);
  }

  static async fetchAudioAndReturnAudioBuffer (source){
    const response = await fetch(source);
    const arrayBuffer = await response.arrayBuffer();
    return await SoundHandler.audioCtx.decodeAudioData(arrayBuffer);
  }
}
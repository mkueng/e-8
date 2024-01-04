'use strict'

class SoundHandler {

  static music = new Audio("../resources/music/E-8.space_RUSH.mp3");

  static audioCtx = new AudioContext();
  static fxGainNode;
  static musicGainNode;


  /*
  static stopSound(entity, sound) {
  }
  */

  static setMusicGain({percentage}){
    SoundHandler.musicGainNode = SoundHandler.audioCtx.createGain();
    SoundHandler.musicGainNode.gain.value = percentage;
    SoundHandler.fxGainNode.connect(SoundHandler.audioCtx.destination);
  }

  static setFXGain({percentage}){
    SoundHandler.fxGainNode = SoundHandler.audioCtx.createGain()
    SoundHandler.fxGainNode.gain.value = percentage // 10 %
    SoundHandler.fxGainNode.connect(SoundHandler.audioCtx.destination)
  }

  static playMusic(){
    SoundHandler.music.play();
  }

  static playFX (audioBuffer){
    const sampleSource = SoundHandler.audioCtx.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(SoundHandler.fxGainNode)
    sampleSource.start(0);
  }

  static async fetchAudioAndReturnAudioBuffer (source){
    const response = await fetch(source);
    const arrayBuffer = await response.arrayBuffer();
    return await SoundHandler.audioCtx.decodeAudioData(arrayBuffer);
  }
}
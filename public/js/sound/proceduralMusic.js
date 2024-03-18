class ProceduralMusic {

  audioAssets = {
    BASS : {
      C : {
        120: ["/silentStar/120_C_BAS_SilentStar_Diva"]
      }
    },
    PAD : {
      C : {
        120 : ["/silentStar/120_C_PAD_SilentStar_AmpPiano","/silentStar/120_C_PAD_SilentStar_SynthWave"]
      }
    },
    TEX : {
      C : {
        120 : ["/silentStar/120_C_TEX_SilentStar_Organic","/silentStar/120_C_TEX_SilentStar_Wind"]
      }
    },
    BEAT : {
      C : {
        120 : []
      }
    },
    FX : {
      C : {
        120 : ["/silentStar/120_C_EFX_SilentStar_4444Radio"]
      }
    }
  }

  audio = {};
  basePath = "/resources/proceduralAudio/";
  fileType = ".wav";
  audioContext = new window.AudioContext || window.webkitAudioContext;
  sequencer;

  audioAssetsEnum = {
    0 : "BASS",
    1 : "PAD",
    2 : "TEX",
    3 : "FX"
  }

  constructor(){
    this.sequencer = new Sequencer(this.audioContext, 120, 4);


    //this.startSequencer();
  }

  createSequence = ()=>{

    const lengthIntro = Math.floor(Math.random()*4+4)*4;
    const lengthVerse = Math.floor(Math.random()*4+4)*4;
    const lengthChorus = Math.floor(Math.random()*4+4)*8;

    let sequence = {
      order : {
        1 : "intro",
        [8+lengthIntro] : "verse",
        [8+lengthIntro+lengthVerse] : "chorus",
        [16+lengthIntro+lengthVerse] : "verse2"
      },


      intro: {
        length : lengthIntro,
        sounds : []
      },
      verse: {
        length :lengthVerse,
        sounds : []
      },
      chorus : {
        length : lengthChorus,
        sounds : []
      },
      verse2 : {
        length : lengthChorus,
        sounds : []
      }
    }

    let selectedSounds = {

    }

    let key = "C"

    for (let i= 0; i < 1; i++){
      const soundTypeIntro = Math.floor(Math.random()*4);
      const availableSounds = this.audioAssets[this.audioAssetsEnum[soundTypeIntro]][key][120];
      const selectedSound = this.audio[this.audioAssetsEnum[soundTypeIntro]][key][120][Math.floor(Math.random()*availableSounds.length)];

      //soundsIntro.push(this.audio[this.audioAssetsEnum[soundTypeIntro]][availableSounds[Math.floor(Math.random()*availableSounds.length)]]);
      sequence["intro"]["sounds"].push(selectedSound);
    }

    for (let i= 0; i < 2; i++){
      const soundTypeVerse = Math.floor(Math.random()*4);

      const availableSounds = this.audioAssets[this.audioAssetsEnum[soundTypeVerse]][key][120];

      const selectedSound = this.audio[this.audioAssetsEnum[soundTypeVerse]][key][120][Math.floor(Math.random()*availableSounds.length)];

      //soundsIntro.push(this.audio[this.audioAssetsEnum[soundTypeIntro]][availableSounds[Math.floor(Math.random()*availableSounds.length)]]);
      sequence["verse"]["sounds"].push(selectedSound);
      sequence["verse2"]["sounds"].push(selectedSound);
    }

    for (let i= 0; i < 3; i++){
      const soundTypeChorus = Math.floor(Math.random()*4);

      const availableSounds = this.audioAssets[this.audioAssetsEnum[soundTypeChorus]][key][120];
      const selectedSound = this.audio[this.audioAssetsEnum[soundTypeChorus]][key][120][Math.floor(Math.random()*availableSounds.length)];

      //soundsIntro.push(this.audio[this.audioAssetsEnum[soundTypeIntro]][availableSounds[Math.floor(Math.random()*availableSounds.length)]]);
      sequence["chorus"]["sounds"].push(selectedSound);
      const selectedSound2 = this.audio[this.audioAssetsEnum[soundTypeChorus]][key][120][Math.floor(Math.random()*availableSounds.length)];
      sequence["chorus"]["sounds"].push(selectedSound2);
    }

    console.log("sequence:", sequence);
    return sequence;

  }


  startSequencer= (sequence)=>{
    this.sequencer. start(sequence);
  }


  playSample = (audioBuffer,callback)=>{
    const sampleSource = SoundHandler.audioCtx.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(SoundHandler.audioCtx.destination)
    sampleSource.loop = true;

    const crossFadeDuration = 0.5
    sampleSource.onended = function () {
      // Schedule the next loop
      sampleSource.start(SoundHandler.audioCtx.currentTime + crossFadeDuration);
      sampleSource.stop(SoundHandler.audioCtx.currentTime + audioBuffer.duration + crossFadeDuration);
    };

    sampleSource.start(0);

  }

  testplay = ()=>{

    const sequence = this.createSequence();
    this.startSequencer(sequence);
  }

  fetchAudioAssets = async () => {
    for (const sound in this.audioAssets) {
      this.audio[sound] = {};

      for (const scale in this.audioAssets[sound]) {
        this.audio[sound][scale] = {};

        for (const tempo in this.audioAssets[sound][scale]) {
          this.audio[sound][scale][tempo] = await Promise.all(
            this.audioAssets[sound][scale][tempo].map(
              async (sample) =>
                await SoundHandler.fetchAudioAndReturnAudioBuffer(
                  this.basePath + sample + this.fileType
                )
            )
          );
        }
      }
    }
  };
}
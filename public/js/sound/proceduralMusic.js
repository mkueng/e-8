class ProceduralMusic {

  audioAssets = {
    ARP : {
      G : {
        120: ["120_G_ARP_AllProcessors"]
      }
    },
    PAD : {
      G : {
        120 : ["120_G_PAD_ChoirInTheClouds"]
      }
    },
    PIANO : {
      G : {
        120 : ["120_G_Piano_GrandeurEcho"]
      }
    },
    BEAT : {
      G : {
        120 : ["120_X_BEAT_AlmostElectroBeat", "120_X_BEAT_AmberBeat","120_X_Beat_BendedKnee" ]
      }
    },
    FX : {
      G : {
        120 : []
      }
    }
  }

  audio = {};
  basePath = "/resources/proceduralAudio/";
  fileType = ".wav";
  audioContext = new window.AudioContext || window.webkitAudioContext;
  sequencer;

  audioAssetsEnum = {
    0 : "ARP",
    1 : "PAD",
    2 : "PIANO",
    3 : "BEAT"
  }

  constructor(){
    this.sequencer = new Sequencer(this.audioContext, 120, 4);
   // document.addEventListener("keydown", this.testplay, true);

    //this.startSequencer();
  }



  createSequence = ()=>{

    const lengthIntro = Math.floor(Math.random()*2+2)*2;
    const lengthVerse = Math.floor(Math.random()*2+2)*2;
    const lengthChorus = Math.floor(Math.random()*2+2)*2

    let sequence = {
      order : {
        1 : "intro",
        [4+lengthIntro] : "verse",
        [4+lengthIntro+lengthVerse] : "chorus"
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
      }
    }

    let selectedSounds = {

    }

    for (let i= 0; i < 3; i++){
      const soundTypeIntro = Math.floor(Math.random()*4);
      console.log("soundTyeIntro:", soundTypeIntro);
      const availableSounds = this.audioAssets[this.audioAssetsEnum[soundTypeIntro]]["G"][120];
      console.log("availableSounds:", availableSounds);
      const selectedSound = this.audio[this.audioAssetsEnum[soundTypeIntro]]["G"][120][Math.floor(Math.random()*availableSounds.length)];
      console.log("selectedSound:", selectedSound);
      //soundsIntro.push(this.audio[this.audioAssetsEnum[soundTypeIntro]][availableSounds[Math.floor(Math.random()*availableSounds.length)]]);
      sequence["intro"]["sounds"].push(selectedSound);
    }

    for (let i= 0; i < 3; i++){
      const soundTypeVerse = Math.floor(Math.random()*4);
      console.log("soundTyeIntro:", soundTypeVerse);
      const availableSounds = this.audioAssets[this.audioAssetsEnum[soundTypeVerse]]["G"][120];
      console.log("availableSounds:", availableSounds);
      const selectedSound = this.audio[this.audioAssetsEnum[soundTypeVerse]]["G"][120][Math.floor(Math.random()*availableSounds.length)];
      console.log("selectedSound:", selectedSound);
      //soundsIntro.push(this.audio[this.audioAssetsEnum[soundTypeIntro]][availableSounds[Math.floor(Math.random()*availableSounds.length)]]);
      sequence["verse"]["sounds"].push(selectedSound);
    }

    for (let i= 0; i < 3; i++){
      const soundTypeChorus = Math.floor(Math.random()*2+2);
      console.log("soundTyeIntro:", soundTypeChorus);
      const availableSounds = this.audioAssets[this.audioAssetsEnum[soundTypeChorus]]["G"][120];
      console.log("availableSounds:", availableSounds);
      const selectedSound = this.audio[this.audioAssetsEnum[soundTypeChorus]]["G"][120][Math.floor(Math.random()*availableSounds.length)];
      console.log("selectedSound:", selectedSound);
      //soundsIntro.push(this.audio[this.audioAssetsEnum[soundTypeIntro]][availableSounds[Math.floor(Math.random()*availableSounds.length)]]);
      sequence["chorus"]["sounds"].push(selectedSound);
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
    console.log("audio:", this.audio);

  };
}
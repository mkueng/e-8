class Sequencer {

  audioContext;
  stepsPerBeat;
  onStep;
  isPlaying;
  currentStep =0;
  scheduleAheadTime;
  lookahead;
  stepInterval;
  nextStepTime;

  constructor(audioContext, tempo = 120, measure) {
    this.audioContext = audioContext;
    this.tempo = tempo;
    this.measure = measure;
    this.step = 60000 / 120;
    this.isPlaying = false;
    this.currentStep = 0;
    this.scheduleAheadTime = 0.1; // Schedule events ahead in time to ensure accuracy
    this.lookahead = 25.0; // How far ahead to schedule events (in milliseconds)
    this.stepInterval = (60 / this.tempo) / this.stepsPerBeat * 1000; // Interval between steps in milliseconds
    this.nextStepTime = 0;
  }


  start(sequence) {

    let beat = 0;

    const interval = setInterval(()=>{
      this.currentStep++;
      if (this.currentStep % 8 === 0 ) {

        beat++;
        if (sequence["order"][beat]) {
          console.log("part:", sequence[sequence["order"][beat]])
          for (const sound of sequence[sequence["order"][beat]].sounds) {
            this.playSample(sound)
          }
        }
      }
    }, this.step);
  }

  playSample = (audioBuffer)=>{
    const sampleSource = SoundHandler.audioCtx.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(SoundHandler.fxGainNode)
    sampleSource.loop = true;

    const crossFadeDuration = 0.5
    sampleSource.onended = function () {
      // Schedule the next loop
      sampleSource.start(SoundHandler.audioCtx.currentTime + crossFadeDuration);
      sampleSource.stop(SoundHandler.audioCtx.currentTime + audioBuffer.duration + crossFadeDuration);
    };

    sampleSource.start(0);

  }


  stop() {
    this.isPlaying = false;
    this.currentStep = 0;
    clearTimeout(this.timerId);
  }

  scheduleSteps() {
    if (this.isPlaying) {
      const currentTime = this.audioContext.currentTime;

      // Schedule events for the next lookahead duration
      while (this.nextStepTime < currentTime + this.lookahead) {
        this.scheduleStep(this.nextStepTime);
        this.nextStepTime += this.stepInterval;

        // Advance the step
        this.currentStep++;
        if (this.currentStep === this.stepsPerBeat) {
          this.currentStep = 0;
        }
      }

      // Schedule the next round of steps
      this.timerId = setTimeout(() => this.scheduleSteps(), this.scheduleAheadTime * 1000);
    }
  }

  scheduleStep(time) {
    if (this.onStep) {
      this.onStep(this.currentStep, time);
    }
  }

}
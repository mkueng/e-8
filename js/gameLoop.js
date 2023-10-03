'use strict'
class GameLoop {

  static instance = new this();

  #elapsed = 0;
  #then = 0;
  #fps = 60;
  #fpsInterval = 0;
  #performanceCount = 0;
  #start = 0;
  #end  = 0;
  #perfDif = 0;
  #performanceCumul = 0
  #stage = null;


  invoke(){

  }

  /**
   *
   * @param dt
   */
  #render=(dt)=>{
    this.#performanceCount++;
    //start measuring render time
    this.#start = window.performance.now();

    //render


    //end measuring render time
    this.#end = window.performance.now();
    this.#perfDif = this.#end-this.#start;
    this.#performanceCumul = this.#performanceCumul+this.#perfDif;
  }

  /**
   *
   * @param newTime
   */
  #animate = (newTime)=>{
    requestAnimationFrame(this.#animate);
    this.#elapsed = newTime - this.#then;

    // if enough time has elapsed, draw the next frame
    if ( this.#elapsed > this.#fpsInterval) {
      this.#render(this.#elapsed);
      // adjust for fpsInterval not being multiple of fps
      this.#then = newTime - (this.#elapsed % this.#fpsInterval);
    }
  }




  /**
   *
   */
  start = (stage)=>{
    this.#fpsInterval = 1000 / this.#fps;
    this.#stage = stage;
    this.#then = window.performance.now();

    this.#animate();
    /*
   setInterval(()=>{
      InfoHandler.render((this.#performanceCumul/this.#performanceCount).toFixed(4),this.#performanceCount);
      this.#performanceCumul = this.#performanceCount = 0;

    },1000)

     */
  }

}
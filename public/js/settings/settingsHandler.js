class SettingsHandler {

  #localStorageHandler;
  #inputHandler;
  #stateHandler;
  #canvasHandler;''
  #settingsAreShown = false;


  #settingValues = {
    music_volume : 0,
    fx_volume: 0
  }

  #template;


  constructor({
                localStorageHandler,
                inputHandler,
                stateHandler,
                canvasHandler
  }){
    this.#localStorageHandler = localStorageHandler;
    this.#inputHandler = inputHandler;
    this.#stateHandler = stateHandler;
    this.#canvasHandler = canvasHandler;

    this.initializeSettings();
    this.#inputHandler.subscribe(this);

  }


  showSettings = () => {
    let overlayElement = document.getElementById("overlay");
    overlayElement.style.display="block";

    this.#canvasHandler.blurCanvases();
    //delay pauseGame trigger to make sure all Canvases have been rendered
    setTimeout(()=>{

      this.#stateHandler.trigger(StateHandler.actions.pauseGame);
    },100)
  }

  hideSettings = () =>{

    let overlayElement = document.getElementById("overlay");
    overlayElement.style.display="none";
    this.#canvasHandler.unblurCanvases();
    setTimeout(()=>{
      this.#stateHandler.trigger(StateHandler.actions.restartGame);
    },100)
  }

  initializeTemplate = () => {
    this.#template =`
  <div class="settings" id="settings" style="">
    <div class="title">SETTINGS</div>
    
    <div class="properties">
        <div class="property">
            <div class="label">
                Music:
            </div>
            <div class="control">
               <input type="range" id="music_volume"  value="${this.#settingValues.music_volume}" name="musicvolume" min="0" max="100">
            </div>
        </div>
        
       <div class="property">
            <div class="label">
                FX:
            </div>
            <div class="control">
               <input type="range" id="fx_volume"  value="${this.#settingValues.fx_volume}" name="fxvolume" min="0" max="100">
            </div>
        </div>
    </div>
  </div>
  `
  }

  initializeSettings = () => {

    this.#settingValues.music_volume = parseInt(this.#localStorageHandler.getStorageItem("music_volume"));
    this.#settingValues.fx_volume = parseInt(this.#localStorageHandler.getStorageItem("fx_volume"));

    this.initializeTemplate();
    document.getElementById("overlay").innerHTML = this.#template;

    let allInputs = document.querySelectorAll('input');
    allInputs.forEach((input) =>  {
      input.addEventListener('change', () => {

        let inputId = input.id;
        let inputValue = input.value;
        this.#localStorageHandler.setStorageItem(inputId, inputValue);
        console.log("Input id:", inputId);
        console.log("Input value:", inputValue);
      });
    });
  }

  keyEvent = (event, isKeyDown)=>{
    if (isKeyDown) {
      switch (event){
        case "Escape" : {
          if (this.#settingsAreShown === false) this.showSettings();
          if (this.#settingsAreShown === true) this.hideSettings();
          this.#settingsAreShown = !this.#settingsAreShown;
          break;
        }
      }
    }
  }







}
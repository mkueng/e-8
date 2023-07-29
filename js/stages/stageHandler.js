class StageHandler {

  #stages= {};

  #loadStages = async ()=>{
    const response = await fetch("/js/stages/stageConfig.json")
    return await response.json();
  }

  constructor(spriteHandler){
    this.spriteHandler = spriteHandler;
    this.stageClasses = new Map([
      ['Stage_01', Stage_01],
      ['Stage_02', Stage_02]
    ])
  }

  instantiateStages = async ()=>{
    const stageTemplates = await this.#loadStages();
    for (const stage in stageTemplates) {
      const stageClass = this.stageClasses.get(stageTemplates[stage].class);
      this.#stages[stage]= new (stageClass)(this.spriteHandler, stageTemplates[stage], this);
    }
    return this.#stages;
  }

  stageEnded= (stageId)=>{
    console.log("stage ended: ", stageId);
  }

  activateStage = (stageNumber) =>{
    this.#stages[stageNumber].activate();
    return this.#stages[stageNumber]
  }
}
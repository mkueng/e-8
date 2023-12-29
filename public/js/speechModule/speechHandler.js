class SpeechHandler {


  static statements = {
    shieldCritical : "shield_critical",
    shieldRecharged: "shield_recharged",
    weaponRecharged: "weapon_recharged"
  }

  #basePath =  "../js/speechModule/statements";
  #fileType = "m4a";

  constructor(basePath){
    this.basePath = basePath || this.#basePath;
  }

  invoke = async()=>{

    let promises = [];
    for (const statement in SpeechHandler.statements) {
      const resource = this.basePath+"/"+SpeechHandler.statements[statement]+"."+this.#fileType;
      console.log("resource:", resource);
      promises.push(SoundHandler.fetchAudioAndReturnAudioBuffer(resource));
    }
    return await Promise.all(promises);
  }
}
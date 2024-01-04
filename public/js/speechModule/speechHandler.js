class SpeechHandler {
  static statements = {
    shieldCritical: {
      fileName: "shield_critical",
      audio: null,
    },
    shieldRecharged: {
      fileName: "shield_recharged",
      audio: null,
    },
    weaponRecharged: {
      fileName: "weapon_recharged",
      audio: null,
    },
    weaponDischarged: {
      fileName: "weapon_discharged",
      audio: null,
    },
  };

  #basePath = "../js/speechModule/statements";
  #fileType = "m4a";

  constructor(basePath) {
    this.basePath = basePath || this.#basePath;
  }

  invoke = async () => {
    await this.#fetchStatements();
    console.log("statements:", SpeechHandler.statements);
  };

  static playStatement = (statement)=>{
    console.log("statement:", statement);
    SoundHandler.playFX(statement.audio);
  }

  #fetchStatements = async () => {
    await Promise.all(
      Object.entries(SpeechHandler.statements).map(async ([key, value]) => {
        const resource = `${this.basePath}/${value.fileName}.${this.#fileType}`;
        value.audio = await SoundHandler.fetchAudioAndReturnAudioBuffer(resource);
      })
    );
  };
}

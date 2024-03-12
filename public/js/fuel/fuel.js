class Fuel {
  constructor({energyDensity, amount, maximumAmount}) {
    Object.assign(this,{
      energyDensity, amount, maximumAmount
    })
  }
}

class Nuclear extends Fuel {
  constructor({amount, maximumAmount}){
    super({
      energyDensity: 50,
      amount,
      maximumAmount
    })
  }

}

class Xenon extends Fuel {
  constructor({amount, maximumAmount}){
    super({
      energyDensity: 20,
      amount,
      maximumAmount
    })
  }
}
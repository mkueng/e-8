class FuelFactory {

  static FUEL_TYPES = {
    xenon: Xenon,
    nuclear: Nuclear
  }

  createFuel = ({fuelType, amount, maximumAmount}) =>{
    return new fuelType({amount, maximumAmount});
  }
}
'use strict';
class WeaponFactory {

  static WEAPON_TYPES = {
    photonTorpedo: PhotonTorpedo,
    photonTorpedoEnemy: PhotonTorpedoEnemy,
    photonTorpedoEnemy2: PhotonTorpedoEnemy2,
    photonTorpedoFireAndForget: PhotonTorpedoFireAndForget,
    laser: Laser
  }

  /**
   *
   * @param resourceHandler
   */
  constructor({
                resourceHandler
  }){
    Object.assign(this, {
      resourceHandler
    });
  };

  /**
   *
   * @returns {Promise<void>}
   */
  init = async ()=>{

    await WeaponFactory.WEAPON_TYPES.photonTorpedo.init({
      resourceHandler:this.resourceHandler
    });
    await WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy.init({
      resourceHandler: this.resourceHandler
    });
    await WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy2.init({
      resourceHandler: this.resourceHandler
    });

    await WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget.init({
      resourceHandler:this.resourceHandler
    });
    await WeaponFactory.WEAPON_TYPES.laser.invoke({
      resourceHandler:this.resourceHandler
    });
  }

  createWeapon({
                 amount,
                 canvas,
                 controlAssignment,
                 posDX,
                 posDY,
                 type
  }) {

   //console.log("amount: ", amount, " type: ", type, " canvas: ", canvas, " controlAssignment: ", controlAssignment, " posDX: ", posDX, " posDY: ", posDY, "")
    /**
     * Creates weapon instances
     */
    const createWeaponInstances  = (type) => {
      return Array.from({ length: amount }, () => new type({
        canvas,
        controlAssignment,
        posDX,
        posDY
      }));
    };

    return createWeaponInstances(type);
  }
}

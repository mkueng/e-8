'use strict';
class WeaponFactory {

  static WEAPON_TYPES = {
    photonTorpedo: PhotonTorpedo,
    photonTorpedoEnemy: PhotonTorpedoEnemy,
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

'use strict';
class WeaponFactory {

  static WEAPON_TYPES = {
    photonTorpedo: PhotonTorpedo,
    photonTorpedoEnemy: PhotonTorpedoEnemy,
    photonTorpedoFireAndForget: PhotonTorpedoFireAndForget,
    laser: Laser
  }

  constructor(){};

  init = async ()=>{
    await WeaponFactory.WEAPON_TYPES.photonTorpedo.init(e8.global.resourceHandler);
    await WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy.init(e8.global.resourceHandler);
    await WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget.init(e8.global.resourceHandler);
    await WeaponFactory.WEAPON_TYPES.laser.invoke(e8.global.resourceHandler);
  }

  createWeapon({
                 type,
                 controlAssignment,
                 amount,
                 canvas,
                 posDX,
                 posDY
  }) {
    /**
     * Creates weapon instances
     */
    const createWeaponInstances  = (type) => {
      return Array.from({ length: amount }, () => new type({
        controlAssignment,
        posDX,
        posDY,
        canvas
      }));
    };

    return createWeaponInstances(type);
  }
}

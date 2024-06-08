'use strict';
class WeaponFactory {

  static WEAPON_TYPES = {
    photonTorpedo: PhotonTorpedo,
    photonTorpedoEnemy: PhotonTorpedoEnemy,
    photonTorpedoFireAndForget: PhotonTorpedoFireAndForget,
    laser: Laser
  }

  constructor(){};

  invoke = async ()=>{
    await WeaponFactory.WEAPON_TYPES.photonTorpedo.invoke(e8.global.resourceHandler);
    await WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy.invoke(e8.global.resourceHandler);
    await WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget.invoke(e8.global.resourceHandler);
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
     *
     * @param instance
     * @returns {*[]}
     */
    const invokeWeapon  = (instance) => {

      return Array.from({ length: amount }, () => new instance({
        controlAssignment,
        posDX,
        posDY,
        canvas
      }));
    };

    return invokeWeapon(type);
  }
}

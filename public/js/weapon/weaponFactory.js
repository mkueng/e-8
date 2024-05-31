'use strict';
class WeaponFactory {

  static WEAPON_TYPES = {
    photonTorpedo: PhotonTorpedo,
    photonTorpedoEnemy: PhotonTorpedoEnemy,
    photonTorpedoFireAndForget: PhotonTorpedoFireAndForget,
    laser: Laser
  }

  constructor(){
    this.resourceHandler = e8.global.resourceHandler;
  };

  invoke = async ()=>{
    await WeaponFactory.WEAPON_TYPES.photonTorpedo.invoke(this.resourceHandler);
    await WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy.invoke(this.resourceHandler);
    await WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget.invoke(this.resourceHandler);
    await WeaponFactory.WEAPON_TYPES.laser.invoke(this.resourceHandler);
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

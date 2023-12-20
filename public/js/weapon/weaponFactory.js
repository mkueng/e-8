'use strict';

class WeaponFactory {

  static WEAPON_TYPES = {
    photonTorpedo: PhotonTorpedo,
    photonTorpedoEnemy: PhotonTorpedoEnemy,
    photonTorpedoFireAndForget: PhotonTorpedoFireAndForget
  }

  constructor({resourceHandler}){
    this.resourceHandler = resourceHandler;
  };

  async createWeapon({
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
     * @returns {Promise<*[]>}
     */
    const invokeWeapon = async (instance) => {
      await instance.invoke(this.resourceHandler);
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

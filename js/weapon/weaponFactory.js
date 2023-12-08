'use strict';

/**
 * singleton
 */
class WeaponFactory {

  static instance = new this();

  static WEAPON_TYPES = {
    photonTorpedo: PhotonTorpedo,
    photonTorpedoEnemy: PhotonTorpedoEnemy,
    photonTorpedoFireAndForget: PhotonTorpedoFireAndForget
  }

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
      await instance.invoke();
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

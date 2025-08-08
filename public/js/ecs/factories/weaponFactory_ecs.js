'use strict';

/**
 * @class WeaponFactory_ecs
 */
class WeaponFactory_ecs {
  static WEAPON_TYPES = {
    photonTorpedo: PhotonTorpedo,
    fireAndForget: FireAndForget
  }

  constructor({
    resourceHandler
  }) {
    Object.assign(this, {
      resourceHandler
    });
  }


  async init() {

    for (const weaponType of Object.values(WeaponFactory_ecs.WEAPON_TYPES)) {
        await weaponType.init({
          resourceHandler: this.resourceHandler
      })
    }

    /*
    await WeaponFactory_ecs.WEAPON_TYPES.photonTorpedo.init({
      resourceHandler: this.resourceHandler
    });
    await WeaponFactory_ecs.WEAPON_TYPES.photonTorpedoEnemy.init({
      resourceHandler: this.resourceHandler
    });
    await WeaponFactory_ecs.WEAPON_TYPES.photonTorpedoEnemy2.init({
      resourceHandler: this.resourceHandler
    });

    await WeaponFactory_ecs.WEAPON_TYPES.photonTorpedoFireAndForget.init({
      resourceHandler: this.resourceHandler
    });
    await WeaponFactory_ecs.WEAPON_TYPES.laser.invoke({
      resourceHandler: this.resourceHandler
    });

*/
  }

  async createWeapon({
                       amount,
                       canvas,
                       controlAssignment,
                       posDX,
                       posDY,
                       type,
    dependency
  }) {

    const soundResource = type["soundResource"];

    const weapon = ECS.entityFactory({
      position: ECS.componentFactory('position', ECS.component.position),
      velocity: ECS.componentFactory('velocity', ECS.component.velocity),
      image: ECS.componentFactory('image', ECS.component.image),
      collision: ECS.componentFactory('collision', ECS.component.collision),
      sound: ECS.componentFactory('sound', ECS.component.sound),
      dependency: ECS.componentFactory('dependency', ECS.component.dependency),
    })

    weapon.components.image.image = type["imageResource"];
    weapon.components.image.width = type["imageResource"].image.width;
    weapon.components.image.height = type["imageResource"].image.height;
    weapon.components.position.posDX = posDX;
    weapon.components.position.posDY = posDY;
    weapon.components.position.posX = 0;
    weapon.components.position.posY = 0;

    return weapon;
  }
}

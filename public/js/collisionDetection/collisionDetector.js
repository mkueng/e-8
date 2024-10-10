'use strict'
class CollisionDetector {

  static instance = new this();

  /**
   *
   */
  performCollisionChecks = () => {
    const gameObjects = GameObjectsHandler.gameObjects;
    const len = gameObjects.length;

    for (let i = 0; i < len - 1; i++) {
      const objI = gameObjects[i];
      for (let j = i + 1; j < len; j++) {
        const objJ = gameObjects[j];
        const collides = this.checkCollision(objI, objJ);
        if (collides) {
          this.handleCollision(objI, objJ);
        }
      }
    }
  }

  /**
   *
   * @param objA
   * @param objB
   * @returns {boolean|*|boolean}
   */
  checkCollision = (objA, objB) => {
    return (
        objA.isDestroyable && objB.canDestroy ||
        objB.isDestroyable && objA.canDestroy
      ) &&
      objA.posX + objA.posDX < objB.posX + objB.posDX + objB.hitWidth &&
      objA.posX + objA.posDX + objA.hitWidth > objB.posX + objB.posDX &&
      objA.posY + objA.posDY < objB.posY + objB.posDY + objB.height &&
      objA.posY + objA.posDY + objA.height > objB.posY + objB.posDY;
  }

  /**
   *
   * @param objA
   * @param objB
   */
  handleCollision = (objA, objB) => {
    objA.hit({
      identification: objB.identification,
      object: objB
    });
    objB.hit({
      identification: objA.identification,
      object: objA
    });
  }
}



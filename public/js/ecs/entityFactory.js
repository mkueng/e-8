'use strict'

class EntityFactory {

  #entityId = 0;

  createEntity(components) {
    const entity = {
      id: this.#entityId++,
      isActive: false,
      components: {}
    }

    for (const type in components) {
      entity.components[type] = { ...components[type] };
    }
    return entity;

  }
}
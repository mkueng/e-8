'use strict'

class ComponentFactory {
  static componentTypes = {
    "bounds": ECS.component.bounds,
    "collision": ECS.component.collision,
    "dependency": ECS.component.dependency,
    "dimension": ECS.component.dimension,
    "hitBox": ECS.component.hitBox,
    "image": ECS.component.image,
    "input": ECS.component.input,
    "position": ECS.component.position,
    "sound": ECS.component.sound,
    "spriteSheet": ECS.component.spriteSheet,
    "velocity": ECS.component.velocity
  }

  createComponent(type) {
    const template = ComponentFactory.componentTypes[type];
    if (!template) {
      throw new Error(`Unknown component type: ${type}`);
    }
    return Object.assign({}, ComponentFactory.componentTypes[type]);
  }
}
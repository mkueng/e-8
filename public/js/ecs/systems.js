ECS.system = ECS.system || {};

/**
 * Factory function to create a system with a name and components.
 * @type {{movement: string[], renderImage: string[], renderSpriteSheet: string[], checkBounds: string[], checkCollision: string[]}}
 */
ECS.systemRequirements = {
  movement: ["position","velocity","dependency"],
  renderImage: ["image"],
  renderSpriteSheet: ["spriteSheet"],
  checkBounds: ["position", "dimension"],
  checkCollision: ["position", "hitBox"],
}




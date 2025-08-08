class System {
  constructor(requiredComponents = []) {
    this.requiredComponents = requiredComponents;
  }

  update(entities) {
    // This method should be overridden by subclasses to implement system-specific logic
    throw new Error("update method must be implemented by subclass");
  }

  // Optional helper
  getMatchingEntities(entities) {
    return entities.filter(entity =>
      entity.isActive &&
      this.requiredComponents.every(c => c in entity.components)
    );
  }
}
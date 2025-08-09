window.ECS = window.ECS || {};

ECS.system = ECS.system || {};
ECS.component = ECS.component || {}
ECS.entity = ECS.entity || {};

/**
 *
 * Entity
 */

ECS.entityId = 1;


/**
 *
 * @param components
 * @returns {{components: {}, id: number, isActive: boolean}}
 */
ECS.entityFactory = (components) => {
  const entity = {
    id: ECS.entityId++,
    isActive: false,
    components: {}
  };

  for (const type in components) {
    entity.components[type] = { ...components[type] };
  }
  return entity;
}

/**
 *
 * @type {*|{collision: *[], input: *[], checkBounds: *[], movement: *[], render: *[]}}
 */
ECS.systemGroups = ECS.systemGroups || {
  movement: [],
  render: [],
  collision: [],
  input: [],
  checkBounds: []
};

/**
 *
 * @param entity
 */
ECS.registerEntityToGroups = function (entity) {
  for (const systemName in ECS.systemRequirements) {
    const required = ECS.systemRequirements[systemName];
    const hasAll = required.every(comp => comp in entity.components);
    if (hasAll) {
      if (!ECS.systemGroups[systemName]) ECS.systemGroups[systemName] = [];
      ECS.systemGroups[systemName].push(entity);
    }
  }
};

/**
 * Component
 */

/**
 * Factory function to create a component with a name and data.
 * @param name
 * @param data
 * @returns {{name}}
 */
ECS.componentFactory = function (name, data) {
  return Object.assign({ name }, data);
}

/**
 * Factory function to create a system with a name and components.
 * @type {{movement: string[], renderImage: string[], renderSpriteSheet: string[], checkBounds: string[], checkCollision: string[]}}
 */
ECS.systemRequirements = {
  movement: ["position","velocity"],
  renderImage: ["image"],
  renderSpriteSheet: ["spriteSheet"],
  checkBounds: ["position", "dimension"],
  checkCollision: ["position", "hitBox"],
}
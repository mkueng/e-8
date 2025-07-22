window.ECS = window.ECS || {};

ECS.groups = ECS.groups || {
  movement: [],
  render: [],
  collision: [],
  input: [],
  checkBounds: []
};

ECS.registerEntityToGroups = function (entity) {
  for (const systemName in ECS.systemRequirements) {
    const required = ECS.systemRequirements[systemName];
    const hasAll = required.every(comp => comp in entity.components);
    if (hasAll) {
      if (!ECS.groups[systemName]) ECS.groups[systemName] = [];
      ECS.groups[systemName].push(entity);
    }
  }
};

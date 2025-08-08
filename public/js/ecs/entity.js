ECS.entity = ECS.entity || {};

ECS.entityId = 1;

ECS.entityGroups = {
  playerShips : [],
  enemyShips : [],
  projectiles : [],
  explosions : [],
  asteroids : [],
  planets : [],
};

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


/*
let lastFrameTime = performance.now();

gameLoop();

function gameLoop(currentTime) {
  requestAnimationFrame(gameLoop);

  const deltaTime = (currentTime - lastFrameTime) / 1000; // seconds
  const deltaTimeMs = currentTime - lastFrameTime; // milliseconds
  lastFrameTime = currentTime;


  // Update and render entities
  ECS.groups.movement.forEach(entity => {
    ECS.system.movement(entity, deltaTime, 0, 0); // Passing actual deltaTime
  });


  ECS.groups.render.forEach(entity => {
    ECS.system.renderImage(entity, 0.5); // Example interpolation value
  });

  ECS.groups.checkBounds.forEach(entity => {
    ECS.system.checkBounds(entity);
  });

}
*/
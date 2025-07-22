ECS.entity = ECS.entity || {};

ECS.entityId = 1;

ECS.entityGroups = {
  playerShips : [],
  enemyShips : [],
  projectiles : [],
  explosions : [],
  asteroids : [],
  planets : []
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

const playerShip = ECS.entityFactory({
  position: ECS.componentFactory('position', ECS.component.position),
  velocity: ECS.componentFactory('velocity', ECS.component.velocity),
  image: ECS.componentFactory('image', ECS.component.image),
  collision: ECS.componentFactory('collision', ECS.component.collision),
  dependency: ECS.componentFactory('dependency', ECS.component.dependency),
  //hitBox: ECS.componentFactory('hitBox', ECS.component.hitBox)

});
console.log("playerShip:", playerShip);
ECS.registerEntityToGroups(playerShip);

for (let i = 0; i <10000; i++) {
  const asteroid = ECS.entityFactory({
    position: ECS.componentFactory('position', ECS.component.position),
    velocity: ECS.componentFactory('velocity', ECS.component.velocity),
    image: ECS.componentFactory('image', ECS.component.image),
    collision: ECS.componentFactory('collision', ECS.component.collision),
    dimension: ECS.componentFactory('dimension', ECS.component.dimension),
    dependency: ECS.componentFactory('dependency', ECS.component.dependency),
  });
  ECS.registerEntityToGroups(asteroid);
}
console.log("ECS.groups:", ECS.groups);
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

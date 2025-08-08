for (let i = 0; i <10000; i++) {
  const enemyShip = ECS.entityFactory({
    position: ECS.componentFactory('position', ECS.component.position),
    velocity: ECS.componentFactory('velocity', ECS.component.velocity),
    image: ECS.componentFactory('image', ECS.component.image),
    collision: ECS.componentFactory('collision', ECS.component.collision),
    dimension: ECS.componentFactory('dimension', ECS.component.dimension),
    dependency: ECS.componentFactory('dependency', ECS.component.dependency),
  });
  ECS.registerEntityToGroups(enemyShip);
}
console.log("ECS.groups:", ECS.groups);
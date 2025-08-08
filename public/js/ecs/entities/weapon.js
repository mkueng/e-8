const weapon = ECS.entityFactory({
  position: ECS.componentFactory('position', ECS.component.position),
  velocity: ECS.componentFactory('velocity', ECS.component.velocity),
  image: ECS.componentFactory('image', ECS.component.image),
  dependency: ECS.componentFactory('dependency', ECS.component.dependency)
});
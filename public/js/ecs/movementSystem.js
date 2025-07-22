


class ECS {
  constructor() {
    this.nextEntityId = 0;
    this.entities = new Set();

    this.components = {}; // { Position: { 0: {x, y}, ... } }
    this.componentEntitySets = {}; // { Position: Set(0,1,2) }

    this.systems = [];
  }

  // Create a new entity
  createEntity() {
    const id = this.nextEntityId++;
    this.entities.add(id);
    return id;
  }

  // Remove an entity and all of its components
  deleteEntity(entity) {
    this.entities.delete(entity);
    for (const type in this.components) {
      if (this.components[type][entity]) {
        delete this.components[type][entity];
        this.componentEntitySets[type]?.delete(entity);
      }
    }
  }

  // Add a component to an entity
  addComponent(entity, type, data = {}) {
    if (!this.components[type]) {
      this.components[type] = {};
      this.componentEntitySets[type] = new Set();
    }
    this.components[type][entity] = data;
    this.componentEntitySets[type].add(entity);
  }

  // Remove a component from an entity
  removeComponent(entity, type) {
    if (this.components[type]?.[entity]) {
      delete this.components[type][entity];
      this.componentEntitySets[type].delete(entity);
    }
  }

  // Check if entity has component
  hasComponent(entity, type) {
    return this.componentEntitySets[type]?.has(entity) ?? false;
  }

  // Get component data
  getComponent(entity, type) {
    return this.components[type]?.[entity];
  }

  // Register a system
  registerSystem(requiredComponents, fn) {
    this.systems.push({ requiredComponents, fn });
  }

  // Run all systems
  runSystems(dt) {
    for (const { requiredComponents, fn } of this.systems) {
      const candidates = this.getEntitiesWith(...requiredComponents);
      const relevantComponents = Object.fromEntries(
        requiredComponents.map(type => [type, this.components[type]])
      );
      fn(candidates, relevantComponents, dt);
    }
  }

  // Efficient entity filtering
  getEntitiesWith(...types) {
    if (types.length === 0) return [...this.entities];

    let smallestSet = this.componentEntitySets[types[0]] ?? new Set();
    let candidates = [...smallestSet];

    return candidates.filter(entity =>
      types.every(type => this.componentEntitySets[type]?.has(entity))
    );
  }
}


const ecs = new ECS();
const playerShip = ecs.createEntity();
ecs.addComponent(playerShip, "Position", { x: 100, y: 100, z: 1 });
ecs.addComponent(playerShip, "Velocity", { x: 0, y: 0, vector : 1 });
ecs.addComponent(playerShip, "Acceleration", { x: 0, y: 0 });
ecs.addComponent(playerShip, "Fuel", { value: 100 });
ecs.addComponent(playerShip, "PlayerControl");

// Destroy System
ecs.registerSystem(["Destroy"], (entities) => {
  for (const e of entities) {
    ecs.deleteEntity(e);
  }
});

// Movement System
ecs.registerSystem(["Position", "Velocity", "Acceleration"], (entities, components, dt) => {
  for (const e of entities) {
    const pos = components.Position[e];
    const vel = components.Velocity[e];
    const acc = components.Acceleration[e];

    vel.x += acc.x * dt;
    vel.y += acc.y * dt;

    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
  }
});




/*

// --- ECS Core ---
class ECS {
  constructor() {
    this.entities = new Set();
    this.components = new Map(); // type -> Map<entityId, data>
    this.systems = [];
    this.nextEntityId = 0;
  }

  createEntity() {
    const id = this.nextEntityId++;
    this.entities.add(id);
    return id;
  }

  addComponent(entity, type, data) {
    if (!this.components.has(type)) {
      this.components.set(type, new Map());
    }
    this.components.get(type).set(entity, data);
  }

  getComponent(entity, type) {
    return this.components.get(type)?.get(entity);
  }

  getEntitiesWith(...types) {
    return [...this.entities].filter(entity =>
      types.every(type => this.components.get(type)?.has(entity))
    );
  }

  addSystem(fn) {
    this.systems.push(fn);
  }

  update(dt) {
    for (const system of this.systems) {
      system(this, dt);
    }
  }
}

// --- Components (just strings as keys) ---
const Position = "Position";
const Velocity = "Velocity";
const PlayerControl = "PlayerControl";

// --- Input State ---
const input = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

window.addEventListener("keydown", e => { if (e.key in input) input[e.key] = true; });
window.addEventListener("keyup", e => { if (e.key in input) input[e.key] = false; });

// --- Systems ---
function playerControlSystem(ecs, dt) {
  const speed = 100; // px per second
  for (const entity of ecs.getEntitiesWith(Position, Velocity, PlayerControl)) {
    const vel = ecs.getComponent(entity, Velocity);
    vel.x = vel.y = 0;

    if (input.ArrowUp)    vel.y = -speed;
    if (input.ArrowDown)  vel.y = speed;
    if (input.ArrowLeft)  vel.x = -speed;
    if (input.ArrowRight) vel.x = speed;
  }
}

function movementSystem(ecs, dt) {
  for (const entity of ecs.getEntitiesWith(Position, Velocity)) {
    const pos = ecs.getComponent(entity, Position);
    const vel = ecs.getComponent(entity, Velocity);
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
  }
}

function renderSystem(ecs, dt) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const entity of ecs.getEntitiesWith(Position)) {
    const pos = ecs.getComponent(entity, Position);
    ctx.fillStyle = "blue";
    ctx.fillRect(pos.x, pos.y, 20, 20);
  }
}

// --- Game Setup ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ecs = new ECS();

const player = ecs.createEntity();
ecs.addComponent(player, Position, { x: 200, y: 200 });
ecs.addComponent(player, Velocity, { x: 0, y: 0 });
ecs.addComponent(player, PlayerControl, {}); // tag

ecs.addSystem(playerControlSystem);
ecs.addSystem(movementSystem);
ecs.addSystem(renderSystem);

// --- Game Loop ---
let lastTime = performance.now();
function gameLoop(now) {
  const dt = (now - lastTime) / 1000;
  lastTime = now;
  ecs.update(dt);
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
*/
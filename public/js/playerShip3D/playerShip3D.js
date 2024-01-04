class PlayerShip3D {

  #mtlLoader
  #objLoader;
  #scene;
  #camera;
  #ship;
  #renderer;

  constructor() {
    this.#scene = window.global.scene;
    this.#camera = window.global.camera;
    this.#renderer = window.global.renderer;
    this.#mtlLoader = new THREE.MTLLoader();
    this.#objLoader = new THREE.OBJLoader();
    this.id = "9384783";
    this.loadShip();
    console.log("this:", this);
    this.#camera.position.x = -100;

    GameObjectsHandler.instance.addGameObject(this);
  }


  loadShip = ()=>{
    this.#mtlLoader.load('/three/StarShip2.mtl', (materials)=> {
      materials.preload();
      this.#objLoader.setMaterials(materials);
      this.#objLoader.load( '/three/StarShip2.obj', ( object )=> {
        object.position.set(-100, 0, -80);
        object.rotation.x = 0;
        object.rotation.y =1.5;
        this.#ship = object;

        this.#scene.add(  this.#ship );

      });
    });
  }

  update = ()=>{
    //this.#ship.rotation.x +=0.01;
    this.#ship.position.x +=1;
    this.#ship.position.z -=1;
    //this.#ship.position.z +=0.01;
    //this.#camera.position.x +=0.1;
    this.#camera.position.y +=0;
  }


  render = ()=>{

    this.#renderer.render(this.#scene, this.#camera)
  }
}
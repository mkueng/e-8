

let loader = new THREE.OBJLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.global.screenWidth / window.global.screenHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.global.screenWidth, window.global.screenHeight );

document.body.appendChild( renderer.domElement );


const directionalLight = new THREE.PointLight( 0xaaaaaa, 0.8,200   );
directionalLight.position.set(1,0,0)
scene.add( directionalLight );


var light2 = new THREE.AmbientLight( 0x909090, 1.2);
light2.position.set( -10, -10, -20 );
scene.add( light2 );


let ship = null;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('/three/StarShip2.mtl', function (materials) {
  materials.preload();
  loader.setMaterials(materials);
  loader.load( '/three/StarShip2.obj', function ( object ) {
    object.position.set(0, 0, -110);
    object.rotation.x = 0;
    object.rotation.y =1.5;
    ship = object;

    scene.add( ship );
    animate();
  });
});



camera.position.z = 20;

let z =10;
function animate() {
  requestAnimationFrame( animate );
  ship.rotation.x += 0.01;
  //ship.rotation.y += 0.01;
  //object.position.x+=0.1;
  ship.position.x+=0.1;
  camera.position.x+=0.1;
  camera.position.y+=0;
  //camera.position.z-=0.1;
  //ship.position.y+=0.1;
  ship.position.z+=0.01;
  renderer.render( scene, camera );
}

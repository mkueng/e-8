let enemyShipFactory;
let particleGenerator;
let resourceHandler;


onmessage = async (evt)=>{
  switch (evt.data.type) {

    case "init" : {
      importScripts('../../particles/particleGenerator.js');


      importScripts('../../gameObjects/gameObject.js');
      importScripts('../../weapon/weapon.js');
      importScripts('../../weapon/photonTorpedo.js');
      importScripts('../../weapon/photonTorpedoEnemy.js');
      importScripts('../../weapon/photonTorpedoFireAndForget.js');
      importScripts('../../weapon/laser.js');
      importScripts('../../shield/shield.js');
      importScripts('../../shield/classAShield.js');
      importScripts('../../shield/classBShield.js');
      importScripts('../../shield/shieldFactory.js');


      importScripts('../../weapon/weaponFactory.js');
      importScripts('../../procedural/ships/proceduralShipImage.js');
      importScripts('../../enemyShip/enemyShipType1.js');
      importScripts('../../enemyShip/proceduralEnemyShipImageType1.js');

      importScripts('../../explosion/explosion.js');
      importScripts('../../explosion/classAPlayerShipExplosion.js');
      importScripts('../../explosion/classAEnemyShipExplosion.js');
      importScripts('../../explosion/explosionFactory.js');


      resourceHandler = new ResourceHandler();
      particleGenerator = new ParticleGenerator();

     /*
      enemyShipFactory = new EnemyShipFactory({
        enemyShipHandler: null,
        resourceHandler: resourceHandler,
        particleGenerator: particleGenerator,
        canvasHandler: null
      })
*/



      break;
    }

    case "create": {



      break;
    }
  }
}


const Stats = require('stats.js');
const THREE = require('three');
const Physics3 = require('../lib/physics');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const stats = new Stats();
const phys = new Physics3(scene, clock);
document.body.appendChild(stats.dom);

let cubes = new THREE.Object3D();
initScene();

camera.position.z = 50;

function render() {
  requestAnimationFrame(render);
  scene.traverse((c) => {
    if(c instanceof THREE.Mesh) {
      // let mult = c.position.distanceTo(new THREE.Vector3(0, 0, 0)) > 40 ? 1 : -1;
      // c.velocity.magnitude *= mult;
    }
  })
  phys.update();
  stats.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene() {
  let c = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3, 3, 3),
    new THREE.MeshNormalMaterial(),
  )
  for (var i = -1; i <= 1; i++) {
    let cube = new THREE.Object3D();
    for (var j = -1; j <= 1; j++) {
      let tmp = c.clone();
      tmp.position.setX(i * 4)
      tmp.position.setY(j * 4)
      tmp.velocity = {
        direction: new THREE.Vector3(i, j, 0),
        magnitude: 1,
      }
      cube.add(tmp)
    }
    cubes.add(cube);
  }
  window.c = scene;
  scene.add(cubes)
}

window.addEventListener('resize', onWindowResize, false);
render();

const Stats = require('stats.js');
const THREE = require('three');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const stats = new Stats();
document.body.appendChild(stats.dom);

let cube;
initScene();

camera.position.z = 50;

function render() {
  requestAnimationFrame(render);
  cube.rotation.x += Math.PI / 128;
  cube.rotation.y += Math.PI / 128;
  stats.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene() {
  cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3, 3, 3),
    new THREE.MeshNormalMaterial(),
  );
  scene.add(cube)
}

window.addEventListener('resize', onWindowResize, false);
render();

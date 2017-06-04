const Stats = require('stats.js');
const THREE = require('three');

const scene = new THREE.Scene();
const orthoCamera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 300)
const persCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
let camera = persCamera;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const stats = new Stats();
document.body.appendChild(stats.dom);

let cubes = [];
initScene();

camera.position.z = 40;

function render() {
  requestAnimationFrame(render);
  for (const cube of cubes) {
    cube.rotateZ(Math.PI / 128);
    cube.rotateY(Math.PI / 128);
    cube.rotateX(Math.PI / 128);
  }
  stats.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

function initScene() {
  for (var i = -5; i <= 5; i += 2) {
    initCube(i, 0, 0);
  }
}

function initCube(x, y, z) {
  let cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
  let normalMaterial = new THREE.MeshNormalMaterial();
  let cube = new THREE.Mesh(cubeGeometry, normalMaterial);
  cube.add(new THREE.AxisHelper(16));
  cube.translateX(x);
  cube.translateY(y);
  cube.translateZ(z);
  cube.rotateZ(Math.PI / 4);
  cube.rotateY(Math.PI / 8);
  cube.rotateX(-Math.PI / 8);
  // window.cube = cube;
  cubes.push(cube);
  scene.add(cube);
}

render();

const Stats = require('stats.js');
const THREE = require('three');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const stats = new Stats();
document.body.appendChild(stats.dom);

let torusGeometry = new THREE.TorusBufferGeometry(1, 0.4, 32, 32);
let normalMaterial = new THREE.MeshNormalMaterial();
let basicMaterial = new THREE.MeshBasicMaterial({
  color: 0xaafff0
});

let textWrap, blades, post;
initScene();

camera.position.z = 50;

function render() {
  requestAnimationFrame(render);
  if (textWrap) {
    textWrap.rotation.y += 0.01
  }
  post.rotation.y += 0.01
  blades.rotation.z += 0.01;
  blades.children.forEach((c, ind) => {
    switch(ind) {
      case 0:
        c.rotation.x += 0.02;
        c.rotation.y += 0.02;
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        c.rotation.x += 0.02;
        break;
      case 5:
      case 6:
      case 7:
      case 8:
        c.rotation.y += 0.02;
        break;
      case 9:
      case 10:
      case 11:
      case 12:
        c.rotation.x += 0.02;
        break;
      case 13:
      case 14:
      case 15:
      case 16:
        c.rotation.y += 0.02;
        break;
    }
  })
  // cubes.rotation.x += 0.02;
  // cubes.rotation.y += 0.02;
  stats.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene() {
  addPost();
  addBlades();
  addText();
}

function addPost() {
  let postBoxGeometry = new THREE.BoxBufferGeometry(1.5, 16, 1.5);
  let postCylinderGeometry = new THREE.CylinderBufferGeometry(0.75, 2, 16, 4);
  let postTopperGeometry = new THREE.SphereBufferGeometry(1, 8, 8);
  post = new THREE.Mesh(postCylinderGeometry, normalMaterial);
  post.position.y -= 8.5;
  post.position.z -= 2;
  let postTopper = new THREE.Mesh(postTopperGeometry, basicMaterial);
  scene.add(post);
  scene.add(postTopper);
}

function addBlades() {
  let oneBit = new THREE.Mesh(torusGeometry, normalMaterial)

  blades = new THREE.Object3D().add(oneBit)
  let tmp;
  for (var i = 3; i <= 12; i += 3) {
    tmp = oneBit.clone();
    tmp.position.x = i;
    blades.add(tmp);
    tmp = oneBit.clone();
    tmp.position.x = -i;
    blades.add(tmp);
    tmp = oneBit.clone();
    tmp.position.y = i;
    blades.add(tmp);
    tmp = oneBit.clone();
    tmp.position.y = -i;
    blades.add(tmp);
  }
  scene.add(blades);
}

function addText() {
  let loader = new THREE.FontLoader();
  loader.load('Open_Sans_Regular.json', (font) => {
    let textGeometry = new THREE.TextGeometry('Donut Mill', {
      font: font,
      size: 2,
      height: 0.4,
      curveSegments: 16,
    });
    let text = new THREE.Mesh(textGeometry, normalMaterial);
    textWrap = new THREE.Object3D().add(text);
    let bbox = new THREE.Box3().setFromObject(textWrap);
    console.log(bbox);
    text.position.x -= (bbox.max.x - bbox.min.x) / 2;
    text.position.y += 15;
    scene.add(textWrap);
  });
}

window.addEventListener('resize', onWindowResize, false);
render();

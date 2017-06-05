// Core
import {App} from '@whs/core/App';
const WHS = require('whs/src/index');
const THREE = require('three');

import {
  ElementModule,
  SceneModule,
  CameraModule,
  RenderingModule,
  ResizeModule,
} from 'whs/src/modules/app';

import {FancyMaterialModule} from './modules/FancyMaterialModule';

// Components
import {Plane} from '@whs+meshes/Plane';
import {BasicComponent} from './components/BasicComponent';

const app = new App([
  new ElementModule(),
  new SceneModule(),
  new CameraModule({
    position: new THREE.Vector3(0, 0, 50)
  }),
  new RenderingModule({bgColor: 0x162129}),
  new ResizeModule()
]);

const sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },
  // material: new THREE.FancyMaterialModule(),
  material: new THREE.MeshNormalMaterial(),
  position: [0, 10, 0],
}).addTo(app);

app.add(new BasicComponent({
  modules: [
    new FancyMaterialModule(app)
  ]
}));

app.start();

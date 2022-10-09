import {
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
  WebGLRenderer,
  MeshBasicMaterial,
  DoubleSide,
  AxesHelper
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { generateValidMoves } from "./parser/notation";
import { RubiksCube } from "./three-cuber/cubelets";
import { COLORS } from './constants';

// console.log(generateValidMoves({ cubeSize: [6, 6, 6] }));
const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new RubiksCube([3,3,3], COLORS);
const axesHelper = new AxesHelper( 150 );
scene.add(cube);
scene.add(axesHelper);
camera.position.z = 200;
var controls = new OrbitControls(camera, renderer.domElement);
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

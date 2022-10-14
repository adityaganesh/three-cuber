import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { generateValidMoves } from "./parser/notation";
import { RubiksCube } from "./three-cuber/three-cuber";
import { cubeMatrix } from "./cubeMatrix/cubeMatrix";
import "./style.css";
import { domText } from "./domText";
import { dcText } from "./dcText";

console.log(generateValidMoves({ cubeSize: [6, 6, 6] }));
console.log(JSON.stringify(cubeMatrix([3, 3, 3])));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  50000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// domText("Hee", { x: 200, y: 200 });

const cube = new RubiksCube();
const light = new THREE.AmbientLight(0xffffff); // soft white light
const axesHelper = new THREE.AxesHelper(150);

scene.add(cube);
scene.add(axesHelper);
scene.add(light);

camera.position.z = 500;
camera.position.x = 150;
camera.position.y = 200;

var controls = new OrbitControls(camera, renderer.domElement);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onResize, false);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

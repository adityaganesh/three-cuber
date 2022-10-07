import { 
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
  WebGLRenderer,
  MeshBasicMaterial,
  DoubleSide,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new BoxGeometry( 1, 1, 1 );
const material = new MeshBasicMaterial( 
  {
  color: 0xffffff,
  wireframe: false, //@ts-ignore
  transparent: true,
  opacity: 1,
  side: DoubleSide,} );
const cube = new Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
var controls = new OrbitControls(camera, renderer.domElement);
function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
};

//chutiyapa hai vscode 
animate();


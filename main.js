import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene(); // it is a class so we have to use new

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // This is the geometry
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" }); // This is basic mesh, does not interact with light

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh); // we have to explicitly say that this is the child of the scene

// initialize camera
const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  30,
); // (FOV, Aspect Ratio, camera near, camera far)

// const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200,
// );

// camera near -> anything near than this it won't be visible
// camera far -> anything further than this it won't be visible
// console.log(window.innerWidth / window.innerHeight)

// position the camera

camera.position.z = 5;

scene.add(camera);

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");

// const canvasCollection = document.getElementsByClassName("threejs");
// // You must access the first element with [0]
// const canvas = canvasCollection[0];
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio)

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();

import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene() // it is a class so we have to use new

const cubeGeometry = new THREE.BoxGeometry(1,1,1) // This is the geometry
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"}) // This is basic mesh, does not interact with light

const cubeMesh = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
)

scene.add(cubeMesh) // we have to explicitly say that this is the child of the scene

// initialize camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 30) // (FOV, Aspect Ratio, camera near, camera far)

// camera near -> anything near than this it won't be visible
// camera far -> anything further than this it won't be visible
// console.log(window.innerWidth / window.innerHeight)

// position the camera

camera.position.z = 5

scene.add(camera)

// initialize the renderer
const canvas = document.querySelector("canvas.threejs")

// const canvasCollection = document.getElementsByClassName("threejs");
// // You must access the first element with [0]
// const canvas = canvasCollection[0];
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

// Initiate the controls
const controls = new OrbitControls(camera, canvas)

const renderLoop = () => {

    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop)
    // Schedules a function (callback) to run before the next repaint of the browser,
    // creating a smooth loop for animations (usually called repeatedly inside the callback)
}

renderLoop()
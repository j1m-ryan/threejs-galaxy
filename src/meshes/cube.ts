import * as THREE from "three";
import gsap from "gsap";
import { cubeMaterial } from "../shared/materials";

const cubeProperties = {
  subdivisions: 20,
  animation: () => {},
};

const geometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  cubeProperties.subdivisions,
  cubeProperties.subdivisions,
  cubeProperties.subdivisions
);

const cube = new THREE.Mesh(geometry, cubeMaterial);

cube.castShadow = true;

cubeProperties.animation = () => {
  gsap.to(cube.rotation, { x: cube.rotation.x + Math.PI });
};

export default cube;

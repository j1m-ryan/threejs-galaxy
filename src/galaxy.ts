import * as THREE from "three";
import scene from "./scene";
import { galaxyFolder } from "./lilgui";

type Galaxy = {
  count: number;
  size: number;
  distanceFactor: number;
  color: THREE.Color;
  outsideColor: THREE.Color;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
};

const galaxy: Galaxy = {
  count: 10000,
  size: 0.02,
  color: new THREE.Color("blue"),
  outsideColor: new THREE.Color("yellow"),
  distanceFactor: 1,
  radius: 5,
  branches: 3,
  spin: 3,
  randomness: 0.1,
  randomnessPower: 3,
};

galaxyFolder
  .add(galaxy, "count")
  .min(100)
  .max(100000)
  .step(100)
  .onChange(() => generateGalaxy(galaxy));
galaxyFolder
  .add(galaxy, "size")
  .min(0.001)
  .max(0.2)
  .step(0.001)
  .onChange(() => generateGalaxy(galaxy));
galaxyFolder
  .add(galaxy, "distanceFactor")
  .min(0.01)
  .max(100)
  .step(0.01)
  .onChange(() => generateGalaxy(galaxy));
galaxyFolder
  .add(galaxy, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onChange(() => generateGalaxy(galaxy));
galaxyFolder
  .add(galaxy, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onChange(() => generateGalaxy(galaxy));
galaxyFolder
  .add(galaxy, "spin")
  .min(-10)
  .max(10)
  .step(0.1)
  .onChange(() => generateGalaxy(galaxy));
galaxyFolder
  .add(galaxy, "randomness")
  .min(0)
  .max(2)
  .step(0.1)
  .onChange(() => generateGalaxy(galaxy));
galaxyFolder
  .add(galaxy, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.1)
  .onChange(() => generateGalaxy(galaxy));
galaxyFolder
  .addColor(galaxy, "color")
  .onChange((v: { r: number; g: number; b: number }) => {
    galaxy.color = new THREE.Color(v.r, v.g, v.b);
    generateGalaxy(galaxy);
  });
galaxyFolder
  .addColor(galaxy, "outsideColor")
  .onChange((v: { r: number; g: number; b: number }) => {
    galaxy.outsideColor = new THREE.Color(v.r, v.g, v.b);
    generateGalaxy(galaxy);
  });

let bufferGeometry = new THREE.BufferGeometry();
let pointsMaterial = new THREE.PointsMaterial();
let particles = new THREE.Points(bufferGeometry, pointsMaterial);

const generateGalaxy = (galaxy: Galaxy) => {
  bufferGeometry.dispose();
  bufferGeometry = new THREE.BufferGeometry();

  pointsMaterial.dispose();

  scene.remove(particles);

  const vertices = new Float32Array(galaxy.count * 3);
  const colors = new Float32Array(galaxy.count * 3);
  for (let i = 0; i < galaxy.count; i++) {
    const xPosition = i * 3;
    const yPosition = xPosition + 1;
    const zPosition = yPosition + 1;

    const branchAngle = ((i % galaxy.branches) * 2 * Math.PI) / galaxy.branches;

    const radius = Math.random() * galaxy.radius;
    const spinAngle = radius * galaxy.spin;

    vertices[xPosition] =
      radius * Math.cos(branchAngle + spinAngle) +
      galaxy.randomness *
        Math.pow(Math.random(), galaxy.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1);
    vertices[yPosition] =
      galaxy.randomness *
      Math.pow(Math.random(), galaxy.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    vertices[zPosition] =
      radius * Math.sin(branchAngle + spinAngle) +
      galaxy.randomness *
        Math.pow(Math.random(), galaxy.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1);

    const colorClone = galaxy.color.clone();

    const normalizedRadius = radius / galaxy.radius;
    colorClone.lerp(galaxy.outsideColor, normalizedRadius);
    colorClone.lerp(galaxy.outsideColor, 0.5);

    colors[xPosition] = colorClone.r;
    colors[yPosition] = colorClone.g;
    colors[zPosition] = colorClone.b;
  }

  bufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertices, 3)
  );

  bufferGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  pointsMaterial = new THREE.PointsMaterial({
    size: galaxy.size,
    depthWrite: true,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  particles = new THREE.Points(bufferGeometry, pointsMaterial);
  scene.add(particles);
  console.log("generate galaxy");
};

export { generateGalaxy, galaxy };

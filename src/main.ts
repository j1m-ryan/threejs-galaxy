import { createDoubleClickListener } from "./utils/fullscreen";
import canvas from "./canvas";
import { tick } from "./timer";
import { generateGalaxy, galaxy } from "./galaxy";

function main() {
  // Meshes
  // scene.add(cube);
  // scene.add(sphere);
  // scene.add(torus);
  // scene.add(floor);

  // Points
  generateGalaxy(galaxy);

  // Lights
  // scene.add(ambientLight);
  // scene.add(hemisphereLight);
  // scene.add(directionalLight);

  // Helpers
  // scene.add(axesHelper);
  // scene.add(hemisphereLightHelper);
  // scene.add(directionalLightHelper);
  // scene.add(directionalLightShadowCameraHelper);

  // EventListeners
  createDoubleClickListener(canvas);

  tick();
}

main();

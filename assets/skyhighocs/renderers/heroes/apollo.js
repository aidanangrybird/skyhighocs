extend("skyhighocs:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:chase/apollo.tx.json",
  "rocket_legs": "skyhighocs:chase/apollo_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:chase/apollo_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:chase/apollo_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:chase/apollo_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:chase/apollo_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:chase/apollo_eyes",
  "boots_lights": "skyhighocs:chase/apollo_boots_lights",
  "arms_lights": "skyhighocs:chase/apollo_arms_lights",
  "boots": "skyhighocs:chase/apollo_boots",
  "shorts": "skyhighocs:chase/apollo_shorts",
  "cannon_lights": "skyhighocs:chase/apollo_cannon_lights",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initCustomBoosters(renderer, 0x55FF00);
  astro.initBeams(renderer, 0x55FF00);
  stuff.bindSpeedTrail(renderer, "skyhighocs:apollo_speed");
};

function getID() {
  return "4da600b8-582a-4fc3-ac2e-ada03d3e478c";
};

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  rockets.renderBoosters(entity, renderLayer, isFirstPersonArm);
  parent.render(entity, renderLayer, isFirstPersonArm);
};
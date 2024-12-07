extend("skyhighocs:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:lucas/artemis.tx.json",
  "rocket_legs": "skyhighocs:lucas/artemis_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:lucas/artemis_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:lucas/artemis_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:lucas/artemis_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:lucas/artemis_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:lucas/artemis_eyes",
  "boots_lights": "skyhighocs:lucas/artemis_boots_lights",
  "arms_lights": "skyhighocs:lucas/artemis_arms_lights",
  "boots": "skyhighocs:lucas/artemis_boots",
  "shorts": "skyhighocs:lucas/artemis_shorts",
  "cannon_lights": "skyhighocs:lucas/artemis_cannon_lights",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initCustomBoosters(renderer, 0xFF0000);
  astro.initBeams(renderer, 0xFF0000);
  stuff.bindSpeedTrail(renderer, "skyhighocs:artemis_speed");
};

function getID() {
  return "c4bc5db6-3cf6-44fe-8427-304a7b211bc4";
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
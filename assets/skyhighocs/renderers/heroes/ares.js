extend("skyhighocs:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:ace/ares.tx.json",
  "rocket_legs": "skyhighocs:ace/ares_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:ace/ares_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:ace/ares_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:ace/ares_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:ace/ares_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:ace/ares_eyes",
  "boots_lights": "skyhighocs:ace/ares_boots_lights",
  "arms_lights": "skyhighocs:ace/ares_arms_lights",
  "boots": "skyhighocs:ace/ares_boots",
  "shorts": "skyhighocs:ace/ares_shorts",
  "cannon_lights": "skyhighocs:ace/ares_cannon_lights",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initCustomBoosters(renderer, 0xFF0000);
  astro.initBeams(renderer, 0xFF0000);
  stuff.bindSpeedTrail(renderer, "skyhighocs:ares_speed");
};

function getID() {
  return "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0";
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
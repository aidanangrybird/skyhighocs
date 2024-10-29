extend("skyhighocs:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:aidan/aero.tx.json",
  "rocket_legs": "skyhighocs:aidan/aero_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:aidan/aero_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:aidan/aero_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:aidan/aero_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:aidan/aero_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:aidan/aero_eyes",
  "boots_lights": "skyhighocs:aidan/aero_boots_lights",
  "arms_lights": "skyhighocs:aidan/aero_arms_lights",
  "boots": "skyhighocs:aidan/aero_boots",
  "shorts": "skyhighocs:aidan/aero_shorts",
  "cannon_lights": "skyhighocs:aidan/aero_cannon_lights",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initCustomBoosters(renderer, 0xFF8900);
  astro.initBeams(renderer, 0xFF8900);
  stuff.bindSpeedTrail(renderer, "skyhighocs:aero_speed");
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
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
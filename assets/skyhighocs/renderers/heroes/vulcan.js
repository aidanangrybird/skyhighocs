extend("skyhighocs:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:damien/vulcan.tx.json",
  "rocket_legs": "skyhighocs:damien/vulcan_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:damien/vulcan_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:damien/vulcan_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:damien/vulcan_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:damien/vulcan_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:damien/vulcan_eyes",
  "boots_lights": "skyhighocs:damien/vulcan_boots_lights",
  "arms_lights": "skyhighocs:damien/vulcan_arms_lights",
  "boots": "skyhighocs:damien/vulcan_boots",
  "shorts": "skyhighocs:damien/vulcan_shorts",
  "cannon_lights": "skyhighocs:damien/vulcan_cannon_lights",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initCustomBoosters(renderer, 0x8000FF);
  astro.initBeams(renderer, 0x8000FF);
  stuff.bindSpeedTrail(renderer, "skyhighocs:vulcan_speed");
};

function getID() {
  return "e51532a1-19fc-4d4f-9da0-f952c4645891";
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
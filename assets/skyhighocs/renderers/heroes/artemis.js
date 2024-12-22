extend("skyhighocs:base_astro");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "full": "skyhighocs:lucas/artemis_full_base",
  "full_lights": "skyhighocs:lucas/artemis_full_lights",
  "head": "skyhighocs:lucas/artemis_head.tx.json",
  "body": "skyhighocs:lucas/artemis_body.tx.json",
  "left_arm": "skyhighocs:lucas/artemis_left_arm.tx.json",
  "right_arm": "skyhighocs:lucas/artemis_right_arm.tx.json",
  "left_leg": "skyhighocs:lucas/artemis_left_leg.tx.json",
  "right_leg": "skyhighocs:lucas/artemis_right_leg.tx.json",
  "boots": "skyhighocs:lucas/artemis_boots",
  "shorts": "skyhighocs:lucas/artemis_shorts",
  "santa_hat": "skyhighocs:lucas/artemis_santa_hat"
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
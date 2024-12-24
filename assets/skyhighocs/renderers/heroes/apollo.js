extend("skyhighocs:base_astro");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "full": "skyhighocs:chase/apollo_full_base",
  "full_lights": "skyhighocs:chase/apollo_full_lights",
  "eye_left": "skyhighocs:chase/apollo_eye_left.tx.json",
  "eye_right": "skyhighocs:chase/apollo_eye_right.tx.json",
  "head": "skyhighocs:chase/apollo_head.tx.json",
  "body": "skyhighocs:chase/apollo_body.tx.json",
  "left_arm": "skyhighocs:chase/apollo_left_arm.tx.json",
  "right_arm": "skyhighocs:chase/apollo_right_arm.tx.json",
  "left_leg": "skyhighocs:chase/apollo_left_leg.tx.json",
  "right_leg": "skyhighocs:chase/apollo_right_leg.tx.json",
  "boots": "skyhighocs:chase/apollo_boots",
  "shorts": "skyhighocs:chase/apollo_shorts",
  "santa_hat": "skyhighocs:chase/apollo_santa_hat"
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
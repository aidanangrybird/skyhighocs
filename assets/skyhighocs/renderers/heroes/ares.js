extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "full": "skyhighocs:ace/ares_full_base",
  "full_lights": "skyhighocs:ace/ares_full_lights",
  "eye_left": "skyhighocs:ace/ares_eye_left.tx.json",
  "eye_right": "skyhighocs:ace/ares_eye_right.tx.json",
  "head": "skyhighocs:ace/ares_head.tx.json",
  "body": "skyhighocs:ace/ares_body.tx.json",
  "left_arm": "skyhighocs:ace/ares_left_arm.tx.json",
  "right_arm": "skyhighocs:ace/ares_right_arm.tx.json",
  "left_leg": "skyhighocs:ace/ares_left_leg.tx.json",
  "right_leg": "skyhighocs:ace/ares_right_leg.tx.json",
  "boots": "skyhighocs:ace/ares_boots",
  "shorts": "skyhighocs:ace/ares_shorts",
  "santa_hat": "skyhighocs:ace/ares_santa_hat"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initBoosters(renderer, 0xFF0000);
  astro.initBeams(renderer, 0xFF0000);
  stuff.bindSpeedTrail(renderer, "skyhighocs:ares_speed");
};

function getID() {
  return "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "ares_shorts");
  renderer.setItemIcon("BOOTS", "ares_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  rockets.renderBoosters(entity, renderLayer, isFirstPersonArm);
  parent.render(entity, renderLayer, isFirstPersonArm);
};
extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "full": "skyhighocs:cade/poseidon_full_base",
  "full_lights": "skyhighocs:cade/poseidon_full_lights",
  "eye_left": "skyhighocs:cade/poseidon_eye_left.tx.json",
  "eye_right": "skyhighocs:cade/poseidon_eye_right.tx.json",
  "head": "skyhighocs:cade/poseidon_head.tx.json",
  "body": "skyhighocs:cade/poseidon_body.tx.json",
  "left_arm": "skyhighocs:cade/poseidon_left_arm.tx.json",
  "right_arm": "skyhighocs:cade/poseidon_right_arm.tx.json",
  "left_leg": "skyhighocs:cade/poseidon_left_leg.tx.json",
  "right_leg": "skyhighocs:cade/poseidon_right_leg.tx.json",
  "boots": "skyhighocs:cade/poseidon_boots",
  "shorts": "skyhighocs:cade/poseidon_shorts",
  //"santa_hat": "skyhighocs:cade/poseidon_santa_hat"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initBoosters(renderer, 0x0000FF);
  astro.initBeams(renderer, 0x0000FF);
  stuff.bindSpeedTrail(renderer, "skyhighocs:poseidon_speed");
};

function getID() {
  return "6982b802-8dec-460a-b1fa-6f1596944e8f";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "poseidon_shorts");
  renderer.setItemIcon("BOOTS", "poseidon_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  rockets.renderBoosters(entity, renderLayer, isFirstPersonArm);
  parent.render(entity, renderLayer, isFirstPersonArm);
};
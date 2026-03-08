extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:cade/poseidon_head_lights",
  "body_lights": "skyhighocs:cade/poseidon_body_lights",
  "left_arm_lights": "skyhighocs:cade/poseidon_left_arm_lights",
  "right_arm_lights": "skyhighocs:cade/poseidon_right_arm_lights",
  "left_leg_lights": "skyhighocs:cade/poseidon_left_leg_lights",
  "right_leg_lights": "skyhighocs:cade/poseidon_right_leg_lights",
  "head_base": "skyhighocs:cade/poseidon_head_base.tx.json",
  "head_hair_base": "skyhighocs:cade/poseidon_head_hair_base.tx.json",
  "body_base": "skyhighocs:cade/poseidon_body_base.tx.json",
  "left_arm_base": "skyhighocs:cade/poseidon_left_arm_base.tx.json",
  "right_arm_base": "skyhighocs:cade/poseidon_right_arm_base.tx.json",
  "left_leg_base": "skyhighocs:cade/poseidon_left_leg_base.tx.json",
  "right_leg_base": "skyhighocs:cade/poseidon_right_leg_base.tx.json",
  "boots": "skyhighocs:cade/poseidon_boots",
  "shorts": "skyhighocs:cade/poseidon_shorts",
  //"santa_hat": "skyhighocs:cade/poseidon_santa_hat"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "6982b802-8dec-460a-b1fa-6f1596944e8f";
};
function getColor() {
  return "0x0000FF";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "poseidon_shorts");
  renderer.setItemIcon("BOOTS", "poseidon_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
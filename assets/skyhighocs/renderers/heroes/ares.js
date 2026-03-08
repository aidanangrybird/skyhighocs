extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:ace/ares_head_lights",
  "body_lights": "skyhighocs:ace/ares_body_lights",
  "left_arm_lights": "skyhighocs:ace/ares_left_arm_lights",
  "right_arm_lights": "skyhighocs:ace/ares_right_arm_lights",
  "left_leg_lights": "skyhighocs:ace/ares_left_leg_lights",
  "right_leg_lights": "skyhighocs:ace/ares_right_leg_lights",
  "head_base": "skyhighocs:ace/ares_head_base.tx.json",
  "head_hair_base": "skyhighocs:ace/ares_head_hair_base.tx.json",
  "body_base": "skyhighocs:ace/ares_body_base.tx.json",
  "left_arm_base": "skyhighocs:ace/ares_left_arm_base.tx.json",
  "right_arm_base": "skyhighocs:ace/ares_right_arm_base.tx.json",
  "left_leg_base": "skyhighocs:ace/ares_left_leg_base.tx.json",
  "right_leg_base": "skyhighocs:ace/ares_right_leg_base.tx.json",
  "boots": "skyhighocs:ace/ares_boots",
  "shorts": "skyhighocs:ace/ares_shorts",
  "santa_hat": "skyhighocs:ace/ares_santa_hat"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0";
};
function getColor() {
  return "0xFF0000";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "ares_shorts");
  renderer.setItemIcon("BOOTS", "ares_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
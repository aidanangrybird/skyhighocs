extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:aidan/aero_head_lights",
  "body_lights": "skyhighocs:aidan/aero_body_lights",
  "left_arm_lights": "skyhighocs:aidan/aero_left_arm_lights",
  "right_arm_lights": "skyhighocs:aidan/aero_right_arm_lights",
  "left_leg_lights": "skyhighocs:aidan/aero_left_leg_lights",
  "right_leg_lights": "skyhighocs:aidan/aero_right_leg_lights",
  "head_base": "skyhighocs:aidan/aero_head_base.tx.json",
  "head_hair_base": "skyhighocs:aidan/aero_head_hair_base.tx.json",
  "body_base": "skyhighocs:aidan/aero_body_base.tx.json",
  "left_arm_base": "skyhighocs:aidan/aero_left_arm_base.tx.json",
  "right_arm_base": "skyhighocs:aidan/aero_right_arm_base.tx.json",
  "left_leg_base": "skyhighocs:aidan/aero_left_leg_base.tx.json",
  "right_leg_base": "skyhighocs:aidan/aero_right_leg_base.tx.json",
  "boots": "skyhighocs:aidan/aero_boots",
  "shorts": "skyhighocs:aidan/aero_shorts",
  "santa_hat": "skyhighocs:aidan/aero_santa_hat"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
};
function getColor() {
  return "0xFF8900";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "aero_shorts");
  renderer.setItemIcon("BOOTS", "aero_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:chase/apollo_head_lights",
  "body_lights": "skyhighocs:chase/apollo_body_lights",
  "left_arm_lights": "skyhighocs:chase/apollo_left_arm_lights",
  "right_arm_lights": "skyhighocs:chase/apollo_right_arm_lights",
  "left_leg_lights": "skyhighocs:chase/apollo_left_leg_lights",
  "right_leg_lights": "skyhighocs:chase/apollo_right_leg_lights",
  "head_base": "skyhighocs:chase/apollo_head_base.tx.json",
  "head_hair_base": "skyhighocs:chase/apollo_head_hair_base.tx.json",
  "body_base": "skyhighocs:chase/apollo_body_base.tx.json",
  "left_arm_base": "skyhighocs:chase/apollo_left_arm_base.tx.json",
  "right_arm_base": "skyhighocs:chase/apollo_right_arm_base.tx.json",
  "left_leg_base": "skyhighocs:chase/apollo_left_leg_base.tx.json",
  "right_leg_base": "skyhighocs:chase/apollo_right_leg_base.tx.json",
  "boots": "skyhighocs:chase/apollo_boots",
  "shorts": "skyhighocs:chase/apollo_shorts",
  "santa_hat": "skyhighocs:chase/apollo_santa_hat"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "4da600b8-582a-4fc3-ac2e-ada03d3e478c";
};
function getColor() {
  return "0x55FF00";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "apollo_shorts");
  renderer.setItemIcon("BOOTS", "apollo_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
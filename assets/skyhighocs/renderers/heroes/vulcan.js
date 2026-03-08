extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:damien/vulcan_head_lights",
  "body_lights": "skyhighocs:damien/vulcan_body_lights",
  "left_arm_lights": "skyhighocs:damien/vulcan_left_arm_lights",
  "right_arm_lights": "skyhighocs:damien/vulcan_right_arm_lights",
  "left_leg_lights": "skyhighocs:damien/vulcan_left_leg_lights",
  "right_leg_lights": "skyhighocs:damien/vulcan_right_leg_lights",
  "head_base": "skyhighocs:damien/vulcan_head_base.tx.json",
  "head_hair_base": "skyhighocs:damien/vulcan_head_hair_base.tx.json",
  "body_base": "skyhighocs:damien/vulcan_body_base.tx.json",
  "left_arm_base": "skyhighocs:damien/vulcan_left_arm_base.tx.json",
  "right_arm_base": "skyhighocs:damien/vulcan_right_arm_base.tx.json",
  "left_leg_base": "skyhighocs:damien/vulcan_left_leg_base.tx.json",
  "right_leg_base": "skyhighocs:damien/vulcan_right_leg_base.tx.json",
  "boots": "skyhighocs:damien/vulcan_boots",
  "shorts": "skyhighocs:damien/vulcan_shorts",
  "santa_hat": "skyhighocs:damien/vulcan_santa_hat"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "e51532a1-19fc-4d4f-9da0-f952c4645891";
};
function getColor() {
  return "0x8000FF";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "vulcan_shorts");
  renderer.setItemIcon("BOOTS", "vulcan_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
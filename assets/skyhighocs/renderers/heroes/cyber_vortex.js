extend("skyhighocs:base_cyber");

var cyber = implement("skyhighocs:external/cyber");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:aidan/cyber_vortex_head_lights",
  "head_hair": "skyhighocs:aidan/cyber_vortex_head_hair",
  "head_hair_lights": "skyhighocs:aidan/cyber_vortex_head_hair_lights",
  "body_lights": "skyhighocs:aidan/cyber_vortex_body_lights",
  "left_arm_lights": "skyhighocs:aidan/cyber_vortex_left_arm_lights",
  "right_arm_lights": "skyhighocs:aidan/cyber_vortex_right_arm_lights",
  "left_leg_lights": "skyhighocs:aidan/cyber_vortex_left_leg_lights",
  "right_leg_lights": "skyhighocs:aidan/cyber_vortex_right_leg_lights",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  //rockets = cyber.initCustomBoosters(renderer, 0xFF8900);
  //cyber.initBeams(renderer, 0xFF8900);
  //stuff.bindSpeedTrail(renderer, "skyhighocs:cyber_vortex_speed");
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("HELMET", "null");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  //rockets.renderBoosters(entity, renderLayer, isFirstPersonArm);
  parent.render(entity, renderLayer, isFirstPersonArm);
};
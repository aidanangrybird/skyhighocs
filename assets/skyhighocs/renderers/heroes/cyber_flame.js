extend("skyhighocs:base_cyber");

var cyber = implement("skyhighocs:external/cyber");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:ace/cyber_flame_head_lights",
  "head_hair": "skyhighocs:ace/cyber_flame_head_hair",
  "head_hair_lights": "skyhighocs:ace/cyber_flame_head_hair_lights",
  "body_lights": "skyhighocs:ace/cyber_flame_body_lights",
  "left_arm_lights": "skyhighocs:ace/cyber_flame_left_arm_lights",
  "right_arm_lights": "skyhighocs:ace/cyber_flame_right_arm_lights",
  "left_leg_lights": "skyhighocs:ace/cyber_flame_left_leg_lights",
  "right_leg_lights": "skyhighocs:ace/cyber_flame_right_leg_lights",
  "head_disguise_layer1": "skyhighocs:ace/cyber_flame_disguise_head_layer1.tx.json",
  "head_disguise_layer2": "skyhighocs:ace/cyber_flame_disguise_head_layer2.tx.json",
  "body_disguise_layer1": "skyhighocs:ace/cyber_flame_disguise_body_layer1.tx.json",
  "body_disguise_layer2": "skyhighocs:ace/cyber_flame_disguise_body_layer2.tx.json",
  "left_arm_disguise_layer1": "skyhighocs:ace/cyber_flame_disguise_left_arm_layer1.tx.json",
  "left_arm_disguise_layer2": "skyhighocs:ace/cyber_flame_disguise_left_arm_layer2.tx.json",
  "right_arm_disguise_layer1": "skyhighocs:ace/cyber_flame_disguise_right_arm_layer1.tx.json",
  "right_arm_disguise_layer2": "skyhighocs:ace/cyber_flame_disguise_right_arm_layer2.tx.json",
  "left_leg_disguise_layer1": "skyhighocs:ace/cyber_flame_disguise_left_leg_layer1.tx.json",
  "left_leg_disguise_layer2": "skyhighocs:ace/cyber_flame_disguise_left_leg_layer2.tx.json",
  "right_leg_disguise_layer1": "skyhighocs:ace/cyber_flame_disguise_right_leg_layer1.tx.json",
  "right_leg_disguise_layer2": "skyhighocs:ace/cyber_flame_disguise_right_leg_layer2.tx.json",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
};

function getColor() {
  return 0xFF0000;
}

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
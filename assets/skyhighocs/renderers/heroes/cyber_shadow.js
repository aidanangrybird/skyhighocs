extend("skyhighocs:base_cyber");

var cyber = implement("skyhighocs:external/cyber");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "head": "skyhighocs:damien/cyber_shadow_head_base.tx.json",
  "head_hair": "skyhighocs:damien/cyber_shadow_head_hair_base.tx.json",
  "body": "skyhighocs:damien/cyber_shadow_body_base.tx.json",
  "left_arm": "skyhighocs:damien/cyber_shadow_left_arm_base.tx.json",
  "right_arm": "skyhighocs:damien/cyber_shadow_right_arm_base.tx.json",
  "left_leg": "skyhighocs:damien/cyber_shadow_left_leg_base.tx.json",
  "right_leg": "skyhighocs:damien/cyber_shadow_right_leg_base.tx.json",
  "head_lights": "skyhighocs:damien/cyber_shadow_head_lights.tx.json",
  "head_hair_lights": "skyhighocs:damien/cyber_shadow_head_hair_lights.tx.json",
  "body_lights": "skyhighocs:damien/cyber_shadow_body_lights.tx.json",
  "left_arm_lights": "skyhighocs:damien/cyber_shadow_left_arm_lights.tx.json",
  "right_arm_lights": "skyhighocs:damien/cyber_shadow_right_arm_lights.tx.json",
  "left_leg_lights": "skyhighocs:damien/cyber_shadow_left_leg_lights.tx.json",
  "right_leg_lights": "skyhighocs:damien/cyber_shadow_right_leg_lights.tx.json",
  "head_disguise_layer1": "skyhighocs:damien/cyber_shadow_head_disguise_layer1.tx.json",
  "head_disguise_layer2": "skyhighocs:damien/cyber_shadow_head_disguise_layer2.tx.json",
  "body_disguise_layer1": "skyhighocs:damien/cyber_shadow_body_disguise_layer1.tx.json",
  "body_disguise_layer2": "skyhighocs:damien/cyber_shadow_body_disguise_layer2.tx.json",
  "left_arm_disguise_layer1": "skyhighocs:damien/cyber_shadow_left_arm_disguise_layer1.tx.json",
  "left_arm_disguise_layer2": "skyhighocs:damien/cyber_shadow_left_arm_disguise_layer2.tx.json",
  "right_arm_disguise_layer1": "skyhighocs:damien/cyber_shadow_right_arm_disguise_layer1.tx.json",
  "right_arm_disguise_layer2": "skyhighocs:damien/cyber_shadow_right_arm_disguise_layer2.tx.json",
  "left_leg_disguise_layer1": "skyhighocs:damien/cyber_shadow_left_leg_disguise_layer1.tx.json",
  "left_leg_disguise_layer2": "skyhighocs:damien/cyber_shadow_left_leg_disguise_layer2.tx.json",
  "right_leg_disguise_layer1": "skyhighocs:damien/cyber_shadow_right_leg_disguise_layer1.tx.json",
  "right_leg_disguise_layer2": "skyhighocs:damien/cyber_shadow_right_leg_disguise_layer2.tx.json",
  "head_camouflage": "skyhighocs:damien/cyber_shadow_head_camouflage.tx.json",
  "head_hair_camouflage": "skyhighocs:damien/cyber_shadow_head_hair_camouflage.tx.json",
  "body_camouflage": "skyhighocs:damien/cyber_shadow_body_camouflage.tx.json",
  "left_arm_camouflage": "skyhighocs:damien/cyber_shadow_left_arm_camouflage.tx.json",
  "right_arm_camouflage": "skyhighocs:damien/cyber_shadow_right_arm_camouflage.tx.json",
  "left_leg_camouflage": "skyhighocs:damien/cyber_shadow_left_leg_camouflage.tx.json",
  "right_leg_camouflage": "skyhighocs:damien/cyber_shadow_right_leg_camouflage.tx.json",
  "arm_lights": "skyhighocs:damien/cyber_shadow_arm_lights",
  "claw_lights": "skyhighocs:damien/cyber_shadow_claw_lights",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
};

function getColor() {
  return 0x8000FF;
}

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
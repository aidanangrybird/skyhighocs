extend("skyhighocs:base_cyber");

loadTextures({
  "head": "skyhighocs:aidan/cyber_vortex_head_base.tx.json",
  "head_hair": "skyhighocs:aidan/cyber_vortex_head_hair_base.tx.json",
  "body": "skyhighocs:aidan/cyber_vortex_body_base.tx.json",
  "left_arm": "skyhighocs:aidan/cyber_vortex_left_arm_base.tx.json",
  "right_arm": "skyhighocs:aidan/cyber_vortex_right_arm_base.tx.json",
  "left_leg": "skyhighocs:aidan/cyber_vortex_left_leg_base.tx.json",
  "right_leg": "skyhighocs:aidan/cyber_vortex_right_leg_base.tx.json",
  "head_lights": "skyhighocs:aidan/cyber_vortex_head_lights.tx.json",
  "head_hair_lights": "skyhighocs:aidan/cyber_vortex_head_hair_lights.tx.json",
  "body_lights": "skyhighocs:aidan/cyber_vortex_body_lights.tx.json",
  "left_arm_lights": "skyhighocs:aidan/cyber_vortex_left_arm_lights.tx.json",
  "right_arm_lights": "skyhighocs:aidan/cyber_vortex_right_arm_lights.tx.json",
  "left_leg_lights": "skyhighocs:aidan/cyber_vortex_left_leg_lights.tx.json",
  "right_leg_lights": "skyhighocs:aidan/cyber_vortex_right_leg_lights.tx.json",
  "head_disguise_layer1": "skyhighocs:aidan/cyber_vortex_head_disguise_layer1.tx.json",
  "head_disguise_layer2": "skyhighocs:aidan/cyber_vortex_head_disguise_layer2.tx.json",
  "body_disguise_layer1": "skyhighocs:aidan/cyber_vortex_body_disguise_layer1.tx.json",
  "body_disguise_layer2": "skyhighocs:aidan/cyber_vortex_body_disguise_layer2.tx.json",
  "left_arm_disguise_layer1": "skyhighocs:aidan/cyber_vortex_left_arm_disguise_layer1.tx.json",
  "left_arm_disguise_layer2": "skyhighocs:aidan/cyber_vortex_left_arm_disguise_layer2.tx.json",
  "right_arm_disguise_layer1": "skyhighocs:aidan/cyber_vortex_right_arm_disguise_layer1.tx.json",
  "right_arm_disguise_layer2": "skyhighocs:aidan/cyber_vortex_right_arm_disguise_layer2.tx.json",
  "left_leg_disguise_layer1": "skyhighocs:aidan/cyber_vortex_left_leg_disguise_layer1.tx.json",
  "left_leg_disguise_layer2": "skyhighocs:aidan/cyber_vortex_left_leg_disguise_layer2.tx.json",
  "right_leg_disguise_layer1": "skyhighocs:aidan/cyber_vortex_right_leg_disguise_layer1.tx.json",
  "right_leg_disguise_layer2": "skyhighocs:aidan/cyber_vortex_right_leg_disguise_layer2.tx.json",
  "head_camouflage": "skyhighocs:aidan/cyber_vortex_head_camouflage.tx.json",
  "head_hair_camouflage": "skyhighocs:aidan/cyber_vortex_head_hair_camouflage.tx.json",
  "body_camouflage": "skyhighocs:aidan/cyber_vortex_body_camouflage.tx.json",
  "left_arm_camouflage": "skyhighocs:aidan/cyber_vortex_left_arm_camouflage.tx.json",
  "right_arm_camouflage": "skyhighocs:aidan/cyber_vortex_right_arm_camouflage.tx.json",
  "left_leg_camouflage": "skyhighocs:aidan/cyber_vortex_left_leg_camouflage.tx.json",
  "right_leg_camouflage": "skyhighocs:aidan/cyber_vortex_right_leg_camouflage.tx.json",
  "arm_lights": "skyhighocs:aidan/cyber_vortex_arm_lights",
  "claw_lights": "skyhighocs:aidan/cyber_vortex_claw_lights",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
};

function getColor() {
  return 0xFF8900;
}

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
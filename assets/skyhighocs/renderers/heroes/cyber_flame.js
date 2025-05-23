extend("skyhighocs:base_cyber");

loadTextures({
  "head": "skyhighocs:ace/cyber_flame_head_base.tx.json",
  "head_hair": "skyhighocs:ace/cyber_flame_head_hair_base.tx.json",
  "body": "skyhighocs:ace/cyber_flame_body_base.tx.json",
  "left_arm": "skyhighocs:ace/cyber_flame_left_arm_base.tx.json",
  "right_arm": "skyhighocs:ace/cyber_flame_right_arm_base.tx.json",
  "left_leg": "skyhighocs:ace/cyber_flame_left_leg_base.tx.json",
  "right_leg": "skyhighocs:ace/cyber_flame_right_leg_base.tx.json",
  "head_lights": "skyhighocs:ace/cyber_flame_head_lights.tx.json",
  "head_hair_lights": "skyhighocs:ace/cyber_flame_head_hair_lights.tx.json",
  "body_lights": "skyhighocs:ace/cyber_flame_body_lights.tx.json",
  "left_arm_lights": "skyhighocs:ace/cyber_flame_left_arm_lights.tx.json",
  "right_arm_lights": "skyhighocs:ace/cyber_flame_right_arm_lights.tx.json",
  "left_leg_lights": "skyhighocs:ace/cyber_flame_left_leg_lights.tx.json",
  "right_leg_lights": "skyhighocs:ace/cyber_flame_right_leg_lights.tx.json",
  "head_disguise": "skyhighocs:ace/cyber_flame_head_disguise.tx.json",
  "head_hair_disguise": "skyhighocs:ace/cyber_flame_head_hair_disguise.tx.json",
  "body_disguise": "skyhighocs:ace/cyber_flame_body_disguise.tx.json",
  "left_arm_disguise": "skyhighocs:ace/cyber_flame_left_arm_disguise.tx.json",
  "right_arm_disguise": "skyhighocs:ace/cyber_flame_right_arm_disguise.tx.json",
  "left_leg_disguise": "skyhighocs:ace/cyber_flame_left_leg_disguise.tx.json",
  "right_leg_disguise": "skyhighocs:ace/cyber_flame_right_leg_disguise.tx.json",
  "head_camouflage": "skyhighocs:ace/cyber_flame_head_camouflage.tx.json",
  "head_hair_camouflage": "skyhighocs:ace/cyber_flame_head_hair_camouflage.tx.json",
  "body_camouflage": "skyhighocs:ace/cyber_flame_body_camouflage.tx.json",
  "left_arm_camouflage": "skyhighocs:ace/cyber_flame_left_arm_camouflage.tx.json",
  "right_arm_camouflage": "skyhighocs:ace/cyber_flame_right_arm_camouflage.tx.json",
  "left_leg_camouflage": "skyhighocs:ace/cyber_flame_left_leg_camouflage.tx.json",
  "right_leg_camouflage": "skyhighocs:ace/cyber_flame_right_leg_camouflage.tx.json",
  "arm_lights": "skyhighocs:ace/cyber_flame_arm_lights",
  "claw_lights": "skyhighocs:ace/cyber_flame_claw_lights",
});

function initEffects(renderer) {
  parent.initEffects(renderer);
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
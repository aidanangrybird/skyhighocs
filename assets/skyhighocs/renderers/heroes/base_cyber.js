var cybernetic = implement("skyhighocs:external/cybernetic");
var cybernetic_boosters = implement("skyhighocs:external/cybernetic_boosters");
var cybernetic_beams = implement("skyhighocs:external/cybernetic_beams");
var stuff = implement("skyhighheroes:external/stuff");

var blank_model;
var metal_heat;
var head_model;
var head_hair_model;
var body_model;
var left_arm_model;
var right_arm_model;
var left_leg_model;
var right_leg_model;

var head_camouflage_model;
var head_hair_camouflage_model;
var body_camouflage_model;
var left_arm_camouflage_model;
var right_arm_camouflage_model;
var left_leg_camouflage_model;
var right_leg_camouflage_model;

var transceive_beams;
var body_boosters;
var left_arm_boosters;
var right_arm_boosters;
var left_leg_boosters;
var right_leg_boosters;

var head_disguise_model;
var head_hair_disguise_model;
var body_disguise_model;
var left_arm_disguise_model;
var right_arm_disguise_model;
var left_leg_disguise_model;
var right_leg_disguise_model;

loadTextures({
  "null": "skyhighocs:null",
  "arm": "skyhighocs:cybernetic_arm_base",
  "claw": "skyhighocs:cybernetic_claw_base",
});

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    return "null";
  });
  renderer.showModel("HELMET", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
  renderer.fixHatLayer("HELMET");
  renderer.setItemIcon("HELMET", "cyberbrain");
  initEffects(renderer);
  initAnimations(renderer);
};

function initEffects(renderer) {
  //Deploy + base
  //Add a clamp thing to the inner rockets so I can supress them with a timer instead of just a nbt boolean
  //Use motion and look in these animations
  var head = renderer.createResource("MODEL", "skyhighocs:CyberneticHead");
  head.texture.set("head", "head_lights");
  head.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/mouth_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_flush_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/mouth_flush_timer"));
  });
  head_model = renderer.createEffect("fiskheroes:model").setModel(head);
  head_model.anchor.set("head");
  head_model.setScale(1.0);
  transceive_beams = cybernetic.initTransceiveBeams(renderer, head, getColor());
  cybernetic_beams.initHeadBeams(renderer, getColor());
  var head_hair = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_hair.texture.set("head_hair", "head_hair_lights");
  head_hair.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/mouth_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_flush_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/mouth_flush_timer"));
  });
  head_hair_model = renderer.createEffect("fiskheroes:model").setModel(head_hair);
  head_hair_model.setOffset(0.0, 0.5, 0.0);
  head_hair_model.anchor.set("head");
  head_hair_model.setScale(1.125);
  var body = renderer.createResource("MODEL", "skyhighocs:CyberneticBody");
  body.texture.set("body", "body_lights");
  body.bindAnimation("skyhighocs:cybernetic_body").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_body_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_body_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_body_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_body_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/wing_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/wing_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/external_arm_left_deployed") + entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/external_arm_right_deployed") + entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
  });
  body_model = renderer.createEffect("fiskheroes:model").setModel(body);
  body_model.anchor.set("body");
  body_model.setScale(1.0);
  cybernetic.initTentacles(renderer, body);
  body_boosters = cybernetic_boosters.initBodyBoosters(renderer, body, getColor());
  cybernetic_beams.initBodyBeams(renderer, getColor());
  var left_arm = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftArm");
  left_arm.texture.set("left_arm", "left_arm_lights");
  left_arm.bindAnimation("skyhighocs:cybernetic_left_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_bottom_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_flush_timer"));
  });
  left_arm_model = renderer.createEffect("fiskheroes:model").setModel(left_arm);
  left_arm_model.anchor.set("leftArm");
  left_arm_model.setScale(1.0);
  left_arm_boosters = cybernetic_boosters.initLeftArmBoosters(renderer, left_arm, getColor());
  cybernetic_beams.initLeftArmBeams(renderer, getColor());
  var right_arm = renderer.createResource("MODEL", "skyhighocs:CyberneticRightArm");
  right_arm.texture.set("right_arm", "right_arm_lights");
  right_arm.bindAnimation("skyhighocs:cybernetic_right_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_bottom_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_stealth_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_flush_timer"));
  });
  right_arm_model = renderer.createEffect("fiskheroes:model").setModel(right_arm);
  right_arm_model.anchor.set("rightArm");
  right_arm_model.setScale(1.0);
  right_arm_boosters = cybernetic_boosters.initRightArmBoosters(renderer, right_arm, getColor());
  cybernetic_beams.initRightArmBeams(renderer, getColor());
  var left_leg = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftLeg");
  left_leg.texture.set("left_leg", "left_leg_lights");
  left_leg.bindAnimation("skyhighocs:cybernetic_left_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_main_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_outer_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer"));
  });
  left_leg_model = renderer.createEffect("fiskheroes:model").setModel(left_leg);
  left_leg_model.anchor.set("leftLeg");
  left_leg_model.setScale(1.0);
  left_leg_boosters = cybernetic_boosters.initLeftLegBoosters(renderer, left_leg, getColor());
  var right_leg = renderer.createResource("MODEL", "skyhighocs:CyberneticRightLeg");
  right_leg.texture.set("right_leg", "right_leg_lights");
  right_leg.bindAnimation("skyhighocs:cybernetic_right_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_main_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_outer_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer"));
  });
  right_leg_model = renderer.createEffect("fiskheroes:model").setModel(right_leg);
  right_leg_model.anchor.set("rightLeg");
  right_leg_model.setScale(1.0);
  right_leg_boosters = cybernetic_boosters.initRightLegBoosters(renderer, right_leg, getColor());

  //Disguise
  var head_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_disguise.texture.set("head_disguise");
  head_disguise.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/mouth_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_flush_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/mouth_flush_timer"));
  });
  head_disguise_model = renderer.createEffect("fiskheroes:model").setModel(head_disguise);
  head_disguise_model.anchor.set("head");
  head_disguise_model.setScale(1.0);
  var head_hair_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_hair_disguise.texture.set("head_hair_disguise");
  head_hair_disguise.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/mouth_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_flush_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/mouth_flush_timer"));
  });
  head_hair_disguise_model = renderer.createEffect("fiskheroes:model").setModel(head_hair_disguise);
  head_hair_disguise_model.anchor.set("head");
  head_hair_disguise_model.setOffset(0.0, 0.5, 0.0);
  head_hair_disguise_model.setScale(1.125);
  var body_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticBodyL2");
  body_disguise.texture.set("body_disguise");
  body_disguise.bindAnimation("skyhighocs:cybernetic_body").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_body_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_body_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_body_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_body_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/wing_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/wing_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/external_arm_left_deployed") + entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/external_arm_right_deployed") + entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
  });
  body_disguise_model = renderer.createEffect("fiskheroes:model").setModel(body_disguise);
  body_disguise_model.anchor.set("body");
  body_disguise_model.setScale(1.0);
  var left_arm_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftArmL2");
  left_arm_disguise.texture.set("left_arm_disguise");
  left_arm_disguise.bindAnimation("skyhighocs:cybernetic_left_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_bottom_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_flush_timer"));
  });
  left_arm_disguise_model = renderer.createEffect("fiskheroes:model").setModel(left_arm_disguise);
  left_arm_disguise_model.anchor.set("leftArm");
  left_arm_disguise_model.setScale(1.0);
  var right_arm_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticRightArmL2");
  right_arm_disguise.texture.set("right_arm_disguise");
  right_arm_disguise.bindAnimation("skyhighocs:cybernetic_right_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_bottom_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_stealth_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_flush_timer"));
  });
  right_arm_disguise_model = renderer.createEffect("fiskheroes:model").setModel(right_arm_disguise);
  right_arm_disguise_model.anchor.set("rightArm");
  right_arm_disguise_model.setScale(1.0);
  var left_leg_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftLegL2");
  left_leg_disguise.texture.set("left_leg_disguise");
  left_leg_disguise.bindAnimation("skyhighocs:cybernetic_left_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_main_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_outer_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer"));
  });
  left_leg_disguise_model = renderer.createEffect("fiskheroes:model").setModel(left_leg_disguise);
  left_leg_disguise_model.anchor.set("leftLeg");
  left_leg_disguise_model.setScale(1.0);
  var right_leg_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticRightLegL2");
  right_leg_disguise.texture.set("right_leg_disguise");
  right_leg_disguise.bindAnimation("skyhighocs:cybernetic_right_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_main_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_outer_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer"));
  });
  right_leg_disguise_model = renderer.createEffect("fiskheroes:model").setModel(right_leg_disguise);
  right_leg_disguise_model.anchor.set("rightLeg");
  right_leg_disguise_model.setScale(1.0);
  
  var head_camouflage = renderer.createResource("MODEL", "skyhighocs:CyberneticHead");
  head_camouflage.texture.set("head_camouflage");
  head_camouflage.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/mouth_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_flush_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/mouth_flush_timer"));
  });
  head_camouflage_model = renderer.createEffect("fiskheroes:model").setModel(head_camouflage);
  head_camouflage_model.anchor.set("head");
  head_camouflage_model.setScale(1.0);
  var head_hair_camouflage = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_hair_camouflage.texture.set("head_hair_camouflage");
  head_hair_camouflage.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_eye_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_eyes_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/mouth_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_flush_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/mouth_flush_timer"));
  });
  head_hair_camouflage_model = renderer.createEffect("fiskheroes:model").setModel(head_hair_camouflage);
  head_hair_camouflage_model.setOffset(0.0, 0.5, 0.0);
  head_hair_camouflage_model.anchor.set("head");
  head_hair_camouflage_model.setScale(1.125);
  var body_camouflage = renderer.createResource("MODEL", "skyhighocs:CyberneticBody");
  body_camouflage.texture.set("body_camouflage");
  body_camouflage.bindAnimation("skyhighocs:cybernetic_body").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_body_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_body_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_body_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_body_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/wing_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/wing_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/external_arm_left_deployed") + entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/external_arm_right_deployed") + entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
  });
  body_camouflage_model = renderer.createEffect("fiskheroes:model").setModel(body_camouflage);
  body_camouflage_model.anchor.set("body");
  body_camouflage_model.setScale(1.0);
  var left_arm_camouflage = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftArm");
  left_arm_camouflage.texture.set("left_arm_camouflage");
  left_arm_camouflage.bindAnimation("skyhighocs:cybernetic_left_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_bottom_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_flush_timer"));
  });
  left_arm_camouflage_model = renderer.createEffect("fiskheroes:model").setModel(left_arm_camouflage);
  left_arm_camouflage_model.anchor.set("leftArm");
  left_arm_camouflage_model.setScale(1.0);
  var right_arm_camouflage = renderer.createResource("MODEL", "skyhighocs:CyberneticRightArm");
  right_arm_camouflage.texture.set("right_arm_camouflage");
  right_arm_camouflage.bindAnimation("skyhighocs:cybernetic_right_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_bottom_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_stealth_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_flush_timer"));
  });
  right_arm_camouflage_model = renderer.createEffect("fiskheroes:model").setModel(right_arm_camouflage);
  right_arm_camouflage_model.anchor.set("rightArm");
  right_arm_camouflage_model.setScale(1.0);
  var left_leg_camouflage = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftLeg");
  left_leg_camouflage.texture.set("left_leg_camouflage");
  left_leg_camouflage.bindAnimation("skyhighocs:cybernetic_left_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_main_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_outer_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer"));
  });
  left_leg_camouflage_model = renderer.createEffect("fiskheroes:model").setModel(left_leg_camouflage);
  left_leg_camouflage_model.anchor.set("leftLeg");
  left_leg_camouflage_model.setScale(1.0);
  var right_leg_camouflage = renderer.createResource("MODEL", "skyhighocs:CyberneticRightLeg");
  right_leg_camouflage.texture.set("right_leg_camouflage");
  right_leg_camouflage.bindAnimation("skyhighocs:cybernetic_right_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_main_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_outer_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer"));
    data.load(9, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer"));
  });
  right_leg_camouflage_model = renderer.createEffect("fiskheroes:model").setModel(right_leg_camouflage);
  right_leg_camouflage_model.anchor.set("rightLeg");
  right_leg_camouflage_model.setScale(1.0);

  metal_heat = renderer.createEffect("fiskheroes:metal_heat");
  metal_heat.includeEffects(head_model, head_hair_model, body_model, left_arm_model, right_arm_model, left_leg_model, right_leg_model);
  renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
    return 0.999999;
  }).setCondition(entity => ((entity.isWearingFullSuit() && entity.getUUID() == getBoundUUID(entity)) || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM"));

  var nv = renderer.bindProperty("fiskheroes:night_vision");
  nv.fogStrength = 0.0;
  nv.firstPersonOnly = false;
  nv.factor = 1.0;
  nv.setCondition(entity => (entity.isWearingFullSuit() && entity.getUUID() == getBoundUUID(entity) && entity.getWornHelmet().nbt().getBoolean("nightVision")));
};

function initAnimations(renderer) {
  //stuff.initHoloFlightAnim(renderer, "cybernetic.HOLOGRAM_FLIGHT", "skyhighheroes:astro_holo_flight");
  cybernetic.initCyberneticAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  if (entity.is("DISPLAY")) {
    if (entity.getWornHelmet().nbt().getBoolean("camoOnStand")) {
      head_camouflage_model.render();
      head_hair_camouflage_model.render();
      body_camouflage_model.render();
      left_arm_camouflage_model.render();
      right_arm_camouflage_model.render();
      left_leg_camouflage_model.render();
      right_leg_camouflage_model.render();
    };
    if (entity.getWornHelmet().nbt().getBoolean("disguiseOnStand") && !entity.getWornHelmet().nbt().getBoolean("camoOnStand")) {
      head_disguise_model.render();
      head_hair_disguise_model.render();
      body_disguise_model.render();
      left_arm_disguise_model.render();
      right_arm_disguise_model.render();
      left_leg_disguise_model.render();
      right_leg_disguise_model.render();
    };
    head_model.render();
    head_hair_model.render();
    body_model.render();
    left_arm_model.render();
    right_arm_model.render();
    left_leg_model.render();
    right_leg_model.render();
  };
  
  if (entity.isWearingFullSuit() && (entity.getUUID() == getBoundUUID(entity)) && (entity.getInterpolatedData("skyhighocs:dyn/thermoptic_camouflage_timer") < 1)) {
    head_model.render();
    head_hair_model.render();
    body_model.render();
    left_arm_model.render();
    right_arm_model.render();
    left_leg_model.render();
    right_leg_model.render();

    head_camouflage_model.render();
    head_hair_camouflage_model.render();
    body_camouflage_model.render();
    left_arm_camouflage_model.render();
    right_arm_camouflage_model.render();
    left_leg_camouflage_model.render();
    right_leg_camouflage_model.render();
    
    if (entity.getInterpolatedData("skyhighocs:dyn/thermoptic_disguise_timer") > 0) {
      head_disguise_model.render();
      head_hair_disguise_model.render();
      body_disguise_model.render();
      left_arm_disguise_model.render();
      right_arm_disguise_model.render();
      left_leg_disguise_model.render();
      right_leg_disguise_model.render();
    };

    transceive_beams.render(entity, renderLayer, isFirstPersonArm);
    body_boosters.render(entity, renderLayer, isFirstPersonArm);
    left_arm_boosters.render(entity, renderLayer, isFirstPersonArm);
    right_arm_boosters.render(entity, renderLayer, isFirstPersonArm);
    left_leg_boosters.render(entity, renderLayer, isFirstPersonArm);
    right_leg_boosters.render(entity, renderLayer, isFirstPersonArm);
    
    metal_heat.opacity = entity.getInterpolatedData("fiskheroes:metal_heat");
    metal_heat.render();
  };
};
function getBoundUUID(entity) {
  return entity.getWornHelmet().nbt().getString("boundUUID");
};
function getColor() {
  return "";
};
var cyber = implement("skyhighocs:external/cyber");
var cyber_boosters = implement("skyhighocs:external/cyber_boosters");
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

var body_boosters;
var left_arm_boosters;
var right_arm_boosters;
var left_leg_boosters;
var right_leg_boosters;

var head_disguise_layer1_model;
var head_disguise_layer2_model;
var body_disguise_layer1_model;
var body_disguise_layer2_model;
var left_arm_disguise_layer1_model;
var left_arm_disguise_layer2_model;
var right_arm_disguise_layer1_model;
var right_arm_disguise_layer2_model;
var left_leg_disguise_layer1_model;
var left_leg_disguise_layer2_model;
var right_leg_disguise_layer1_model;
var right_leg_disguise_layer2_model;

loadTextures({
  "null": "skyhighocs:null",
  "head": "skyhighocs:cyber_head_base",
  "body": "skyhighocs:cyber_body_base",
  "left_arm": "skyhighocs:cyber_left_arm_base",
  "right_arm": "skyhighocs:cyber_right_arm_base",
  "left_leg": "skyhighocs:cyber_left_leg_base",
  "right_leg": "skyhighocs:cyber_right_leg_base",
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
  var head = renderer.createResource("MODEL", "skyhighocs:CyberHead");
  head.texture.set("head", "head_lights");
  head.bindAnimation("skyhighocs:cyber_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/ports_timer"));
  });
  head_model = renderer.createEffect("fiskheroes:model").setModel(head);
  head_model.anchor.set("head");
  head_model.setScale(1.0);
  var head_hair = renderer.createResource("MODEL", "skyhighocs:CyberHeadL2");
  head_hair.texture.set("head_hair", "head_hair_lights");
  head_hair.bindAnimation("skyhighocs:cyber_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/ports_timer"));
  });
  head_hair_model = renderer.createEffect("fiskheroes:model").setModel(head_hair);
  head_hair_model.setOffset(0.0, 0.25, 0.0);
  head_hair_model.anchor.set("head");
  head_hair_model.setScale(1.075);
  var body = renderer.createResource("MODEL", "skyhighocs:CyberBody");
  body.texture.set("body", "body_lights");
  body.bindAnimation("skyhighocs:cyber_body").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/wings_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/furnace_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
  });
  body_model = renderer.createEffect("fiskheroes:model").setModel(body);
  body_model.anchor.set("body");
  body_model.setScale(1.0);
  body_boosters = cyber_boosters.initBodyBoosters(renderer, body, getColor());
  var left_arm = renderer.createResource("MODEL", "skyhighocs:CyberLeftArm");
  left_arm.texture.set("left_arm", "left_arm_lights");
  left_arm.bindAnimation("skyhighocs:cyber_left_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_booster_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer"));
  });
  left_arm_model = renderer.createEffect("fiskheroes:model").setModel(left_arm);
  left_arm_model.anchor.set("leftArm");
  left_arm_model.setScale(1.0);
  left_arm_boosters = cyber_boosters.initLeftArmBoosters(renderer, left_arm, getColor());
  var right_arm = renderer.createResource("MODEL", "skyhighocs:CyberRightArm");
  right_arm.texture.set("right_arm", "right_arm_lights");
  right_arm.bindAnimation("skyhighocs:cyber_right_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_booster_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_stealth_timer"));
  });
  right_arm_model = renderer.createEffect("fiskheroes:model").setModel(right_arm);
  right_arm_model.anchor.set("rightArm");
  right_arm_model.setScale(1.0);
  right_arm_boosters = cyber_boosters.initRightArmBoosters(renderer, right_arm, getColor());
  var left_leg = renderer.createResource("MODEL", "skyhighocs:CyberLeftLeg");
  left_leg.texture.set("left_leg", "left_leg_lights");
  left_leg.bindAnimation("skyhighocs:cyber_left_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_main_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_booster_timer"));
  });
  left_leg_model = renderer.createEffect("fiskheroes:model").setModel(left_leg);
  left_leg_model.anchor.set("leftLeg");
  left_leg_model.setScale(1.0);
  left_leg_boosters = cyber_boosters.initLeftLegBoosters(renderer, left_leg, getColor());
  var right_leg = renderer.createResource("MODEL", "skyhighocs:CyberRightLeg");
  right_leg.texture.set("right_leg", "right_leg_lights");
  right_leg.bindAnimation("skyhighocs:cyber_right_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_main_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_booster_timer"));
  });
  right_leg_model = renderer.createEffect("fiskheroes:model").setModel(right_leg);
  right_leg_model.anchor.set("rightLeg");
  right_leg_model.setScale(1.0);
  right_leg_boosters = cyber_boosters.initRightLegBoosters(renderer, right_leg, getColor());

  //Disguise
  var head_disguise_layer1 = renderer.createResource("MODEL", "skyhighocs:CyberHeadL2");
  head_disguise_layer1.texture.set("head_disguise_layer1");
  head_disguise_layer1.bindAnimation("skyhighocs:cyber_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/ports_timer"));
  });
  head_disguise_layer1_model = renderer.createEffect("fiskheroes:model").setModel(head_disguise_layer1);
  head_disguise_layer1_model.anchor.set("head");
  head_disguise_layer1_model.setScale(1.0);
  var head_disguise_layer2 = renderer.createResource("MODEL", "skyhighocs:CyberHeadL2");
  head_disguise_layer2.texture.set("head_disguise_layer2");
  head_disguise_layer2.bindAnimation("skyhighocs:cyber_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_eyes_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/mouth_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/ports_timer"));
  });
  head_disguise_layer2_model = renderer.createEffect("fiskheroes:model").setModel(head_disguise_layer2);
  head_disguise_layer2_model.anchor.set("head");
  head_disguise_layer2_model.setScale(1.1);
  var body_disguise_layer1 = renderer.createResource("MODEL", "skyhighocs:CyberBodyL2");
  body_disguise_layer1.texture.set("body_disguise_layer1");
  body_disguise_layer1.bindAnimation("skyhighocs:cyber_body").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/wings_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/furnace_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
  });
  body_disguise_layer1_model = renderer.createEffect("fiskheroes:model").setModel(body_disguise_layer1);
  body_disguise_layer1_model.anchor.set("body");
  body_disguise_layer1_model.setScale(1.0);
  var body_disguise_layer2 = renderer.createResource("MODEL", "skyhighocs:CyberBodyL2");
  body_disguise_layer2.texture.set("body_disguise_layer2");
  body_disguise_layer2.bindAnimation("skyhighocs:cyber_body").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/wings_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/furnace_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
  });
  body_disguise_layer2_model = renderer.createEffect("fiskheroes:model").setModel(body_disguise_layer2);
  body_disguise_layer2_model.anchor.set("body");
  body_disguise_layer2_model.setScale(1.1);
  var left_arm_disguise_layer1 = renderer.createResource("MODEL", "skyhighocs:CyberLeftArmL2");
  left_arm_disguise_layer1.texture.set("left_arm_disguise_layer1");
  left_arm_disguise_layer1.bindAnimation("skyhighocs:cyber_left_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_booster_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer"));
  });
  left_arm_disguise_layer1_model = renderer.createEffect("fiskheroes:model").setModel(left_arm_disguise_layer1);
  left_arm_disguise_layer1_model.anchor.set("leftArm");
  left_arm_disguise_layer1_model.setScale(1.0);
  var left_arm_disguise_layer2 = renderer.createResource("MODEL", "skyhighocs:CyberLeftArmL2");
  left_arm_disguise_layer2.texture.set("left_arm_disguise_layer2");
  left_arm_disguise_layer2.bindAnimation("skyhighocs:cyber_left_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_booster_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer"));
  });
  left_arm_disguise_layer2_model = renderer.createEffect("fiskheroes:model").setModel(left_arm_disguise_layer2);
  left_arm_disguise_layer2_model.anchor.set("leftArm");
  left_arm_disguise_layer2_model.setScale(1.1);
  var right_arm_disguise_layer1 = renderer.createResource("MODEL", "skyhighocs:CyberRightArmL2");
  right_arm_disguise_layer1.texture.set("right_arm_disguise_layer1");
  right_arm_disguise_layer1.bindAnimation("skyhighocs:cyber_right_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_booster_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_stealth_timer"));
  });
  right_arm_disguise_layer1_model = renderer.createEffect("fiskheroes:model").setModel(right_arm_disguise_layer1);
  right_arm_disguise_layer1_model.anchor.set("rightArm");
  right_arm_disguise_layer1_model.setScale(1.0);
  var right_arm_disguise_layer2 = renderer.createResource("MODEL", "skyhighocs:CyberRightArmL2");
  right_arm_disguise_layer2.texture.set("right_arm_disguise_layer2");
  right_arm_disguise_layer2.bindAnimation("skyhighocs:cyber_right_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_booster_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_stealth_timer"));
  });
  right_arm_disguise_layer2_model = renderer.createEffect("fiskheroes:model").setModel(right_arm_disguise_layer2);
  right_arm_disguise_layer2_model.anchor.set("rightArm");
  right_arm_disguise_layer2_model.setScale(1.1);
  var left_leg_disguise_layer1 = renderer.createResource("MODEL", "skyhighocs:CyberLeftLegL2");
  left_leg_disguise_layer1.texture.set("left_leg_disguise_layer1");
  left_leg_disguise_layer1.bindAnimation("skyhighocs:cyber_left_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_main_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_booster_timer"));
  });
  left_leg_disguise_layer1_model = renderer.createEffect("fiskheroes:model").setModel(left_leg_disguise_layer1);
  left_leg_disguise_layer1_model.anchor.set("leftLeg");
  left_leg_disguise_layer1_model.setScale(1.0);
  var left_leg_disguise_layer2 = renderer.createResource("MODEL", "skyhighocs:CyberLeftLegL2");
  left_leg_disguise_layer2.texture.set("left_leg_disguise_layer2");
  left_leg_disguise_layer2.bindAnimation("skyhighocs:cyber_left_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_main_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_booster_timer"));
  });
  left_leg_disguise_layer2_model = renderer.createEffect("fiskheroes:model").setModel(left_leg_disguise_layer2);
  left_leg_disguise_layer2_model.anchor.set("leftLeg");
  left_leg_disguise_layer2_model.setScale(1.1);
  var right_leg_disguise_layer1 = renderer.createResource("MODEL", "skyhighocs:CyberRightLegL2");
  right_leg_disguise_layer1.texture.set("right_leg_disguise_layer1");
  right_leg_disguise_layer1.bindAnimation("skyhighocs:cyber_right_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_main_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_booster_timer"));
  });
  right_leg_disguise_layer1_model = renderer.createEffect("fiskheroes:model").setModel(right_leg_disguise_layer1);
  right_leg_disguise_layer1_model.anchor.set("rightLeg");
  right_leg_disguise_layer1_model.setScale(1.0);
  var right_leg_disguise_layer2 = renderer.createResource("MODEL", "skyhighocs:CyberRightLegL2");
  right_leg_disguise_layer2.texture.set("right_leg_disguise_layer2");
  right_leg_disguise_layer2.bindAnimation("skyhighocs:cyber_right_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_main_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_booster_timer"));
  });
  right_leg_disguise_layer2_model = renderer.createEffect("fiskheroes:model").setModel(right_leg_disguise_layer2);
  right_leg_disguise_layer2_model.anchor.set("rightLeg");
  right_leg_disguise_layer2_model.setScale(1.1);

  metal_heat = renderer.createEffect("fiskheroes:metal_heat");
  metal_heat.includeEffects(head_model, head_hair_model, body_model, left_arm_model, right_arm_model, left_leg_model, right_leg_model);
  renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
    return 0.999999;
  }).setCondition(entity => (entity.isWearingFullSuit() || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM"));
/* 
  clothing_head = renderer.createEffect("fiskheroes:overlay");
  clothing_head.texture.set("head");
  clothing_body = renderer.createEffect("fiskheroes:overlay");
  clothing_body.texture.set("body");
  clothing_left_arm = renderer.createEffect("fiskheroes:overlay");
  clothing_left_arm.texture.set("left_arm");
  clothing_right_arm = renderer.createEffect("fiskheroes:overlay");
  clothing_right_arm.texture.set("right_arm");
  clothing_left_leg = renderer.createEffect("fiskheroes:overlay");
  clothing_left_leg.texture.set("left_leg");
  clothing_right_leg = renderer.createEffect("fiskheroes:overlay");
  clothing_right_leg.texture.set("right_leg"); */

  //astro.initNV(renderer, getID());
  metal_heat = renderer.createEffect("fiskheroes:metal_heat");
  metal_heat.includeEffects(head_model, head_hair_model, body_model, left_arm_model, right_arm_model, left_leg_model, right_leg_model);
  renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
    return 0.999999;
  }).setCondition(entity => (entity.isWearingFullSuit() || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM"));
  
  var nv_self = renderer.bindProperty("fiskheroes:night_vision");
  nv_self.fogStrength = 0.0;
  nv_self.firstPersonOnly = true;
  nv_self.factor = 1.0;
};

function initAnimations(renderer) {
  stuff.initHoloFlightAnim(renderer, "cyber.HOLOGRAM_FLIGHT", "skyhighheroes:astro_holo_flight");
  cyber.initCyberAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  if (entity.isWearingFullSuit()) {
    if (entity.getInterpolatedData("skyhighocs:dyn/disguised_timer") == 0) {
      head_model.setOffset(0.0, 0.0, 0.0);
      head_model.setScale(1.0);
      head_model.render();
      head_hair_model.setOffset(0.0, 0.25, 0.0);
      head_hair_model.setScale(1.075);
      head_hair_model.render();
      head_model.setOffset(0.0, 0.0, 0.0);
      body_model.setScale(1.0);
      body_model.render();
      left_arm_model.setOffset(0.0, 0.0, 0.0);
      left_arm_model.setScale(1.0);
      left_arm_model.render();
      right_arm_model.setOffset(0.0, 0.0, 0.0);
      right_arm_model.setScale(1.0);
      right_arm_model.render();
      left_leg_model.setOffset(0.0, 0.0, 0.0);
      left_leg_model.setScale(1.0);
      left_leg_model.render();
      right_leg_model.setOffset(0.0, 0.0, 0.0);
      right_leg_model.setScale(1.0);
      right_leg_model.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/disguised_timer") > 0) {
      head_model.setScale(0.99);
      head_model.setOffset(0.0, -0.05, 0.0);
      head_model.render();
      body_model.setOffset(0.0, 0.05, 0.0);
      body_model.setScale(0.99);
      body_model.render();
      left_arm_model.setOffset(0.0, 0.05, 0.0);
      left_arm_model.setScale(0.99);
      left_arm_model.render();
      right_arm_model.setOffset(0.0, 0.05, 0.0);
      right_arm_model.setScale(0.99);
      right_arm_model.render();
      left_leg_model.setOffset(0.0, 0.05, 0.0);
      left_leg_model.setScale(0.99);
      left_leg_model.render();
      right_leg_model.setOffset(0.0, 0.05, 0.0);
      right_leg_model.setScale(0.99);
      right_leg_model.render();
      
      
      head_disguise_layer1_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      head_disguise_layer2_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      body_disguise_layer1_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      body_disguise_layer2_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      left_arm_disguise_layer1_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      left_arm_disguise_layer2_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      right_arm_disguise_layer1_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      right_arm_disguise_layer2_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      left_leg_disguise_layer1_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      left_leg_disguise_layer2_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      right_leg_disguise_layer1_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      right_leg_disguise_layer2_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/disguised_timer");
      
      head_disguise_layer1_model.render();
      head_disguise_layer2_model.render();
      body_disguise_layer1_model.render();
      body_disguise_layer2_model.render();
      left_arm_disguise_layer1_model.render();
      left_arm_disguise_layer2_model.render();
      right_arm_disguise_layer1_model.render();
      right_arm_disguise_layer2_model.render();
      left_leg_disguise_layer1_model.render();
      left_leg_disguise_layer2_model.render();
      right_leg_disguise_layer1_model.render();
      right_leg_disguise_layer2_model.render();

    };
  };

  body_boosters.render(entity, renderLayer, isFirstPersonArm);
  left_arm_boosters.render(entity, renderLayer, isFirstPersonArm);
  right_arm_boosters.render(entity, renderLayer, isFirstPersonArm);
  left_leg_boosters.render(entity, renderLayer, isFirstPersonArm);
  right_leg_boosters.render(entity, renderLayer, isFirstPersonArm);
  
  metal_heat.opacity = entity.getInterpolatedData("fiskheroes:metal_heat");
  metal_heat.render();
};
function getID() {
  return "";
};
function getColor() {
  return "";
};
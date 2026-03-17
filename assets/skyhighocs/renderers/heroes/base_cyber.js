var cybernetics = implement("skyhighocs:external/cybernetics");
var cybernetic_boosters = implement("skyhighocs:external/cybernetic_boosters");
var cybernetic_beams = implement("skyhighocs:external/cybernetic_beams");
var stuff = implement("skyhighocs:external/stuff");

var blank_model;
var metal_heat;
var text_renderer;

//Stuff models
var head_model;
var body_model;
var left_arm_model;
var right_arm_model;
var left_leg_model;
var right_leg_model;

//Base skin models
var head_base_model;
var head_hair_base_model;
var body_base_model;
var left_arm_base_model;
var right_arm_base_model;
var left_leg_base_model;
var right_leg_base_model;

//Disguise models
var head_disguise_model;
var head_hair_disguise_model;
var body_disguise_model;
var left_arm_disguise_model;
var right_arm_disguise_model;
var left_leg_disguise_model;
var right_leg_disguise_model;

//Beams and boosters
var satellite_beams;
var body_boosters;
var left_arm_boosters;
var right_arm_boosters;
var left_leg_boosters;
var right_leg_boosters;

loadTextures({
  "null": "skyhighocs:null",
  "arm": "skyhighocs:cybernetic_arm_base",
  "claw": "skyhighocs:cybernetic_claw_base",
  "head": "skyhighocs:cybernetic_head_base",
  "body": "skyhighocs:cybernetic_body_base",
  "left_arm": "skyhighocs:cybernetic_left_arm_base",
  "right_arm": "skyhighocs:cybernetic_right_arm_base",
  "left_leg": "skyhighocs:cybernetic_left_leg_base",
  "right_leg": "skyhighocs:cybernetic_right_leg_base",
  //"santa_hat": "skyhighocs:santa_hat",
  //"santa_hat_cyber": "skyhighocs:cybernetic_santa_hat",
});

var santaHat;
var santaHatCyber;
var date = new Date();
var isChristmasSeason = (date.getDate() < 26 && date.getDate() > 0 && date.getMonth() == 11);

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    return "null";
  });
  renderer.showModel("HELMET", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
  renderer.fixHatLayer("HELMET");
  renderer.setItemIcon("HELMET", "%s_cybernetic_brain");
  initEffects(renderer);
  initAnimations(renderer);
};

function initEffects(renderer) {
  /* if (isChristmasSeason) {
    var santa_hat_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_model.texture.set("santa_hat");
    santaHat = renderer.createEffect("fiskheroes:model").setModel(santa_hat_model);
    santaHat.anchor.set("head");
    santaHat.setScale(1.13);
    santaHat.setOffset(0.0, -5.75, 1.25);
    santaHat.setRotation(-45.0, 0.0, 0.0);
    var santa_hat_cyber_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_cyber_model.texture.set("santa_hat_cyber", "santa_hat_cyber_lights");
    santaHatCyber = renderer.createEffect("fiskheroes:model").setModel(santa_hat_cyber_model);
    santaHatCyber.anchor.set("head");
    santaHatCyber.setScale(1.13);
    santaHatCyber.setOffset(0.0, -7.25, -0.25);
    santaHatCyber.setRotation(-10.0, 0.0, 0.0);
  }; */
  text_renderer = stuff.text(renderer);
  //Deploy + base
  //Add a clamp thing to the inner rockets so I can supress them with a timer instead of just a nbt boolean
  //Use motion and look in these animations
  //Mechanical parts
  var head = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL1");
  head.texture.set("head", "head_lights");
  head.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => cybernetics.headAnimations(entity, data));
  head_model = renderer.createEffect("fiskheroes:model").setModel(head);
  head_model.anchor.set("head");
  head_model.setScale(1.0);
  satellite_beams = cybernetics.initSatelliteBeams(renderer, head, getColor());
  cybernetic_beams.initHeadBeams(renderer, getColor());
  var body = renderer.createResource("MODEL", "skyhighocs:CyberneticBodyL1");
  body.texture.set("body", "body_lights");
  body.bindAnimation("skyhighocs:cybernetic_body").setData((entity, data) => cybernetics.bodyAnimations(entity, data));
  body_model = renderer.createEffect("fiskheroes:model").setModel(body);
  body_model.anchor.set("body");
  body_model.setScale(1.0);
  cybernetics.initTentacles(renderer, body);
  body_boosters = cybernetic_boosters.initBodyBoosters(renderer, body, getColor());
  cybernetic_beams.initBodyBeams(renderer, getColor());
  var left_arm = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftArmL1");
  left_arm.texture.set("left_arm", "left_arm_lights");
  left_arm.bindAnimation("skyhighocs:cybernetic_left_arm").setData((entity, data) => cybernetics.leftArmAnimations(entity, data));
  left_arm_model = renderer.createEffect("fiskheroes:model").setModel(left_arm);
  left_arm_model.anchor.set("leftArm");
  left_arm_model.setScale(1.0);
  left_arm_boosters = cybernetic_boosters.initLeftArmBoosters(renderer, left_arm, getColor());
  cybernetic_beams.initLeftArmBeams(renderer, getColor());
  var right_arm = renderer.createResource("MODEL", "skyhighocs:CyberneticRightArmL1");
  right_arm.texture.set("right_arm", "right_arm_lights");
  right_arm.bindAnimation("skyhighocs:cybernetic_right_arm").setData((entity, data) => cybernetics.rightArmAnimations(entity, data));
  right_arm_model = renderer.createEffect("fiskheroes:model").setModel(right_arm);
  right_arm_model.anchor.set("rightArm");
  right_arm_model.setScale(1.0);
  right_arm_boosters = cybernetic_boosters.initRightArmBoosters(renderer, right_arm, getColor());
  cybernetic_beams.initRightArmBeams(renderer, getColor());
  var left_leg = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftLegL1");
  left_leg.texture.set("left_leg", "left_leg_lights");
  left_leg.bindAnimation("skyhighocs:cybernetic_left_leg").setData((entity, data) => cybernetics.leftLegAnimations(entity, data));
  left_leg_model = renderer.createEffect("fiskheroes:model").setModel(left_leg);
  left_leg_model.anchor.set("leftLeg");
  left_leg_model.setScale(1.0);
  left_leg_boosters = cybernetic_boosters.initLeftLegBoosters(renderer, left_leg, getColor());
  var right_leg = renderer.createResource("MODEL", "skyhighocs:CyberneticRightLegL1");
  right_leg.texture.set("right_leg", "right_leg_lights");
  right_leg.bindAnimation("skyhighocs:cybernetic_right_leg").setData((entity, data) => cybernetics.rightLegAnimations(entity, data));
  right_leg_model = renderer.createEffect("fiskheroes:model").setModel(right_leg);
  right_leg_model.anchor.set("rightLeg");
  right_leg_model.setScale(1.0);
  right_leg_boosters = cybernetic_boosters.initRightLegBoosters(renderer, right_leg, getColor());

  //Base skin
  var head_base = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_base.texture.set("head_base", "head_base_lights");
  head_base.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => cybernetics.headAnimations(entity, data));
  head_base_model = renderer.createEffect("fiskheroes:model").setModel(head_base);
  head_base_model.anchor.set("head");
  head_base_model.setScale(1.0);
  var head_hair_base = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_hair_base.texture.set("head_hair_base", "head_hair_base_lights");
  head_hair_base.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => cybernetics.headAnimations(entity, data));
  head_hair_base_model = renderer.createEffect("fiskheroes:model").setModel(head_hair_base);
  head_hair_base_model.anchor.set("head");
  head_hair_base_model.setOffset(0.0, 0.5, 0.0);
  head_hair_base_model.setScale(1.125);
  var body_base = renderer.createResource("MODEL", "skyhighocs:CyberneticBodyL2");
  body_base.texture.set("body_base", "body_base_lights");
  body_base.bindAnimation("skyhighocs:cybernetic_body").setData((entity, data) => cybernetics.bodyAnimations(entity, data));
  body_base_model = renderer.createEffect("fiskheroes:model").setModel(body_base);
  body_base_model.anchor.set("body");
  body_base_model.setScale(1.0);
  var left_arm_base = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftArmL2");
  left_arm_base.texture.set("left_arm_base", "left_arm_base_lights");
  left_arm_base.bindAnimation("skyhighocs:cybernetic_left_arm").setData((entity, data) => cybernetics.leftArmAnimations(entity, data));
  left_arm_base_model = renderer.createEffect("fiskheroes:model").setModel(left_arm_base);
  left_arm_base_model.anchor.set("leftArm");
  left_arm_base_model.setScale(1.0);
  var right_arm_base = renderer.createResource("MODEL", "skyhighocs:CyberneticRightArmL2");
  right_arm_base.texture.set("right_arm_base", "right_arm_base_lights");
  right_arm_base.bindAnimation("skyhighocs:cybernetic_right_arm").setData((entity, data) => cybernetics.rightArmAnimations(entity, data));
  right_arm_base_model = renderer.createEffect("fiskheroes:model").setModel(right_arm_base);
  right_arm_base_model.anchor.set("rightArm");
  right_arm_base_model.setScale(1.0);
  var left_leg_base = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftLegL2");
  left_leg_base.texture.set("left_leg_base", "left_leg_base_lights");
  left_leg_base.bindAnimation("skyhighocs:cybernetic_left_leg").setData((entity, data) => cybernetics.leftLegAnimations(entity, data));
  left_leg_base_model = renderer.createEffect("fiskheroes:model").setModel(left_leg_base);
  left_leg_base_model.anchor.set("leftLeg");
  left_leg_base_model.setScale(1.0);
  var right_leg_base = renderer.createResource("MODEL", "skyhighocs:CyberneticRightLegL2");
  right_leg_base.texture.set("right_leg_base", "right_leg_base_lights");
  right_leg_base.bindAnimation("skyhighocs:cybernetic_right_leg").setData((entity, data) => cybernetics.rightLegAnimations(entity, data));
  right_leg_base_model = renderer.createEffect("fiskheroes:model").setModel(right_leg_base);
  right_leg_base_model.anchor.set("rightLeg");
  right_leg_base_model.setScale(1.0);

  //Disguise
  var head_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_disguise.texture.set("head_disguise");
  head_disguise.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => cybernetics.headAnimations(entity, data));
  head_disguise_model = renderer.createEffect("fiskheroes:model").setModel(head_disguise);
  head_disguise_model.anchor.set("head");
  head_disguise_model.setScale(1.0);
  var head_hair_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_hair_disguise.texture.set("head_hair_disguise");
  head_hair_disguise.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => cybernetics.headAnimations(entity, data));
  head_hair_disguise_model = renderer.createEffect("fiskheroes:model").setModel(head_hair_disguise);
  head_hair_disguise_model.anchor.set("head");
  head_hair_disguise_model.setOffset(0.0, 0.5, 0.0);
  head_hair_disguise_model.setScale(1.125);
  var body_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticBodyL2");
  body_disguise.texture.set("body_disguise");
  body_disguise.bindAnimation("skyhighocs:cybernetic_body").setData((entity, data) => cybernetics.bodyAnimations(entity, data));
  body_disguise_model = renderer.createEffect("fiskheroes:model").setModel(body_disguise);
  body_disguise_model.anchor.set("body");
  body_disguise_model.setScale(1.0);
  var left_arm_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftArmL2");
  left_arm_disguise.texture.set("left_arm_disguise");
  left_arm_disguise.bindAnimation("skyhighocs:cybernetic_left_arm").setData((entity, data) => cybernetics.leftArmAnimations(entity, data));
  left_arm_disguise_model = renderer.createEffect("fiskheroes:model").setModel(left_arm_disguise);
  left_arm_disguise_model.anchor.set("leftArm");
  left_arm_disguise_model.setScale(1.0);
  var right_arm_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticRightArmL2");
  right_arm_disguise.texture.set("right_arm_disguise");
  right_arm_disguise.bindAnimation("skyhighocs:cybernetic_right_arm").setData((entity, data) => cybernetics.rightArmAnimations(entity, data));
  right_arm_disguise_model = renderer.createEffect("fiskheroes:model").setModel(right_arm_disguise);
  right_arm_disguise_model.anchor.set("rightArm");
  right_arm_disguise_model.setScale(1.0);
  var left_leg_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftLegL2");
  left_leg_disguise.texture.set("left_leg_disguise");
  left_leg_disguise.bindAnimation("skyhighocs:cybernetic_left_leg").setData((entity, data) => cybernetics.leftLegAnimations(entity, data));
  left_leg_disguise_model = renderer.createEffect("fiskheroes:model").setModel(left_leg_disguise);
  left_leg_disguise_model.anchor.set("leftLeg");
  left_leg_disguise_model.setScale(1.0);
  var right_leg_disguise = renderer.createResource("MODEL", "skyhighocs:CyberneticRightLegL2");
  right_leg_disguise.texture.set("right_leg_disguise");
  right_leg_disguise.bindAnimation("skyhighocs:cybernetic_right_leg").setData((entity, data) => cybernetics.rightLegAnimations(entity, data));
  right_leg_disguise_model = renderer.createEffect("fiskheroes:model").setModel(right_leg_disguise);
  right_leg_disguise_model.anchor.set("rightLeg");
  right_leg_disguise_model.setScale(1.0);

  metal_heat = renderer.createEffect("fiskheroes:metal_heat");
  metal_heat.includeEffects(head_model, body_model, left_arm_model, right_arm_model, left_leg_model, right_leg_model, head_base_model, head_hair_base_model, body_base_model, left_arm_base_model, right_arm_base_model, left_leg_base_model, right_leg_base_model, head_disguise_model, head_hair_disguise_model, body_disguise_model, left_arm_disguise_model, right_arm_disguise_model, left_leg_disguise_model, right_leg_disguise_model);
  renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
    return 0.999999;
  }).setCondition(entity => (entity.isWearingFullSuit() || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM"));

  var nv = renderer.bindProperty("fiskheroes:night_vision");
  nv.fogStrength = 0.0;
  nv.firstPersonOnly = false;
  nv.factor = 1.0;
  nv.setCondition(entity => (entity.isWearingFullSuit() && entity.getData("skyhighocs:dyn/night_vision")));
};

function initAnimations(renderer) {
  cybernetics.initCyberneticAnimations(renderer);
  stuff.addAnimationEvent(renderer, "FLIGHT_DIVE", "skyhighocs:cybernetic_dive");
  stuff.addAnimationEvent(renderer, "FLIGHT_DIVE_ROLL", "skyhighocs:cybernetic_dive_roll");
};

function render(entity, renderLayer, isFirstPersonArm) {
  var nbt = cybernetics.mainNBT(entity);
  if (entity.is("DISPLAY")) {
    if (nbt.getBoolean("disguiseOnStand")) {
      head_disguise_model.render();
      head_hair_disguise_model.render();
      body_disguise_model.render();
      left_arm_disguise_model.render();
      right_arm_disguise_model.render();
      left_leg_disguise_model.render();
      right_leg_disguise_model.render();
    };
    if (!nbt.getBoolean("disguiseOnStand")) {
      head_base_model.render();
      head_hair_base_model.render();
      body_base_model.render();
      left_arm_base_model.render();
      right_arm_base_model.render();
      left_leg_base_model.render();
      right_leg_base_model.render();
    };
    head_model.render();
    body_model.render();
    left_arm_model.render();
    right_arm_model.render();
    left_leg_model.render();
    right_leg_model.render();
  };
  if (entity.isWearingFullSuit()) {
    if (entity.getInterpolatedData("skyhighocs:dyn/thermoptic_disguise_timer") > 0) {
      head_disguise_model.render();
      head_hair_disguise_model.render();
      body_disguise_model.render();
      left_arm_disguise_model.render();
      right_arm_disguise_model.render();
      left_leg_disguise_model.render();
      right_leg_disguise_model.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/thermoptic_disguise_timer") < 1) {
      head_base_model.render();
      head_hair_base_model.render();
      body_base_model.render();
      left_arm_base_model.render();
      right_arm_base_model.render();
      left_leg_base_model.render();
      right_leg_base_model.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/thermoptic_camouflage_timer") == 0) {
      head_model.render();
      body_model.render();
      left_arm_model.render();
      right_arm_model.render();
      left_leg_model.render();
      right_leg_model.render();
    };
    satellite_beams.render(entity, isFirstPersonArm);
    body_boosters.render(entity, renderLayer, isFirstPersonArm);
    left_arm_boosters.render(entity, renderLayer, isFirstPersonArm);
    right_arm_boosters.render(entity, renderLayer, isFirstPersonArm);
    left_leg_boosters.render(entity, renderLayer, isFirstPersonArm);
    right_leg_boosters.render(entity, renderLayer, isFirstPersonArm);
    
    metal_heat.opacity = entity.getInterpolatedData("fiskheroes:metal_heat");
    metal_heat.render();
  };
  if (entity.isWearingFullSuit() && isFirstPersonArm) {
    /* var entities = entity.world().getEntitiesInRangeOf(entity.pos(), 60)
    entities.forEach(otherEntity => {
      if (!entity.equals(otherEntity) && otherEntity.isLivingEntity() && otherEntity.isAlive() && otherEntity.getHealth() > 0 && entity.canSee(otherEntity) && isLookingAtTarget(entity.eyePos(), entity.getLookVector(), otherEntity.eyePos(), 70)) {
        text_renderer.renderEntity(entity, isFirstPersonArm, otherEntity, "center", "center", 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
      };
    }); */

    var leftSide = "OFF";
    var topSide = "OFF";
    var rightSide = "OFF";
    //Left
    if (!entity.getData("skyhighocs:dyn/battle_mode")) {
      if (entity.getData("skyhighocs:dyn/hud_side_left") == 1) {
        leftSide = "Shields";
        var shieldsToRender = ["Shields:"];
        var leftShield = "Left: " + (entity.getData("skyhighocs:dyn/shield_left_armed") ? "ARMED" : "DISARMED") + " (" + ((entity.getInterpolatedData("skyhighocs:dyn/shield_left_deploy_timer") > 0 || entity.getInterpolatedData("skyhighocs:dyn/shield_left_timer") > 0) ? "DEPLOYED" : "STOWED") + ")";
        var rightShield = "Right: " + (entity.getData("skyhighocs:dyn/shield_right_armed") ? "ARMED" : "DISARMED") + " (" + ((entity.getInterpolatedData("skyhighocs:dyn/shield_right_deploy_timer") > 0 || entity.getInterpolatedData("skyhighocs:dyn/shield_right_timer") > 0) ? "DEPLOYED" : "STOWED") + ")";
        shieldsToRender.push(leftShield);
        shieldsToRender.push(rightShield);
        text_renderer.renderLines(isFirstPersonArm, "left", "center", shieldsToRender, -210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
      };
      if (entity.getData("skyhighocs:dyn/hud_side_left") == 2) {
        leftSide = "Blades";
        var bladesToRender = ["Blades:"];
        var leftBlade = "Left: " + (entity.getData("skyhighocs:dyn/blade_left_armed") ? "ARMED" : "DISARMED") + " (" + ((entity.getInterpolatedData("skyhighocs:dyn/blade_left_deploy_timer") > 0 || entity.getInterpolatedData("skyhighocs:dyn/blade_left_timer") > 0) ? "DEPLOYED" : "STOWED") + ")";
        var rightBlade = "Right: " + (entity.getData("skyhighocs:dyn/blade_left_armed") ? "ARMED" : "DISARMED") + " (" + ((entity.getInterpolatedData("skyhighocs:dyn/blade_right_deploy_timer") > 0 || entity.getInterpolatedData("skyhighocs:dyn/blade_right_timer") > 0) ? "DEPLOYED" : "STOWED") + ")";
        var leftBladeMode = "Left mode: " + (entity.getData("skyhighocs:dyn/blade_left_stealth_enabled") ? "STEALTH" : "NORMAL");
        var rightBladeMode = "Right mode: " + (entity.getData("skyhighocs:dyn/blade_right_stealth_enabled") ? "STEALTH" : "NORMAL");
        bladesToRender.push(leftBlade);
        bladesToRender.push(rightBlade);
        bladesToRender.push(leftBladeMode);
        bladesToRender.push(rightBladeMode);
        text_renderer.renderLines(isFirstPersonArm, "left", "center", bladesToRender, -210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
      };
      if (entity.getData("skyhighocs:dyn/hud_side_left") == 3) {
        leftSide = "Rockets";
        var armsSet = (entity.getData("skyhighocs:dyn/rockets_arms_timer") > 0);
        var bodySet = (entity.getData("skyhighocs:dyn/rockets_body_timer") > 0);
        var legsSet = (entity.getData("skyhighocs:dyn/rockets_legs_timer") > 0);
        var rocketsToRender = ["Rockets:"];
        var onFallRocket = "Activate on fall: " + (entity.getData("skyhighocs:dyn/rockets_on_fall") ? "ENABLED" : "DISABLED");
        var armRocket = "Arms: " + (entity.getData("skyhighocs:dyn/rockets_arms_armed") ? "ARMED" : "DISARMED");
        var bodyRocket = "Body: " + (entity.getData("skyhighocs:dyn/rockets_body_armed") ? "ARMED" : "DISARMED");
        var legRocket = "Legs: " + (entity.getData("skyhighocs:dyn/rockets_legs_armed") ? "ARMED" : "DISARMED");
        var wingRocket = "Wings: " + (entity.getData("skyhighocs:dyn/rockets_wings_armed") ? "ARMED" : "DISARMED");

        var bodyRockets = "Body: " + ((bodySet || entity.getInterpolatedData("skyhighocs:dyn/rocket_body_left_deploy_timer") > 0) ? "L" : "-") + ((bodySet || entity.getInterpolatedData("skyhighocs:dyn/rocket_body_right_deploy_timer") > 0) ? "R" : "-");
        var leftArmRockets = "Left Arm: " + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_outer_deploy_timer") > 0) ? "O" : "-") + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_front_deploy_timer") > 0) ? "F" : "-") + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_back_deploy_timer") > 0) ? "B" : "-");
        var rightArmRockets = "Right Arm: " + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_outer_deploy_timer") > 0) ? "O" : "-") + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_front_deploy_timer") > 0) ? "F" : "-") + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_back_deploy_timer") > 0) ? "B" : "-");
        var leftLegRockets = "Left Leg: " + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_main_deploy_timer") > 0) ? "M" : "-") + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_outer_deploy_timer") > 0) ? "O" : "-") + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_front_deploy_timer") > 0) ? "F" : "-") + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_back_deploy_timer") > 0) ? "B" : "-") + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_deploy_timer") > 0) ? "I" : "-");
        var rightLegRockets = "Right Leg: " + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_main_deploy_timer") > 0) ? "M" : "-") + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_outer_deploy_timer") > 0) ? "O" : "-") + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_front_deploy_timer") > 0) ? "F" : "-") + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_back_deploy_timer") > 0) ? "B" : "-") + ((legsSet || entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_deploy_timer") > 0) ? "I" : "-");

        rocketsToRender.push(onFallRocket);
        rocketsToRender.push(armRocket);
        rocketsToRender.push(bodyRocket);
        rocketsToRender.push(legRocket);
        rocketsToRender.push(wingRocket);
        rocketsToRender.push(bodyRockets);
        rocketsToRender.push(leftArmRockets);
        rocketsToRender.push(rightArmRockets);
        rocketsToRender.push(leftLegRockets);
        rocketsToRender.push(rightLegRockets);

        text_renderer.renderLines(isFirstPersonArm, "left", "center", rocketsToRender, -210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
      };
      if (entity.getData("skyhighocs:dyn/hud_side_left") == 4) {
        leftSide = "Cannons";
        var headSet = (entity.getData("skyhighocs:dyn/cannons_head_timer") > 0);
        var bodySet = (entity.getData("skyhighocs:dyn/cannons_body_timer") > 0);
        var armsSet = (entity.getData("skyhighocs:dyn/cannons_arms_timer") > 0);
        var cannonsToRender = ["Cannons:"];
        var headCannon = "Head: " + (entity.getData("skyhighocs:dyn/cannons_head_armed") ? "ARMED" : "DISARMED");
        var bodyCannon = "Body: " + (entity.getData("skyhighocs:dyn/cannons_body_armed") ? "ARMED" : "DISARMED");
        var armCannon = "Arms: " + (entity.getData("skyhighocs:dyn/cannons_arms_armed") ? "ARMED" : "DISARMED");

        var headCannons = "Head: " + ((headSet || entity.getInterpolatedData("skyhighocs:dyn/cannon_head_left_deploy_timer") > 0) ? "L" : "-") + ((headSet || entity.getInterpolatedData("skyhighocs:dyn/cannon_head_right_deploy_timer") > 0) ? "R" : "-");
        var bodyCannons = "Body: " + ((bodySet || entity.getInterpolatedData("skyhighocs:dyn/cannon_body_left_deploy_timer") > 0) ? "L" : "-") + ((bodySet || entity.getInterpolatedData("skyhighocs:dyn/cannon_body_right_deploy_timer") > 0) ? "R" : "-");
        var leftArmCannons = "Left Arm: " + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_bottom_deploy_timer") > 0) ? "M" : "-") + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_front_deploy_timer") > 0) ? "F" : "-") + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_back_deploy_timer") > 0) ? "B" : "-");
        var rightArmCannons = "Right Arm: " + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_bottom_deploy_timer") > 0) ? "M" : "-") + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_front_deploy_timer") > 0) ? "F" : "-") + ((armsSet || entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_back_deploy_timer") > 0) ? "B" : "-");

        cannonsToRender.push(headCannon);
        cannonsToRender.push(bodyCannon);
        cannonsToRender.push(armCannon);
        cannonsToRender.push(headCannons);
        cannonsToRender.push(bodyCannons);
        cannonsToRender.push(leftArmCannons);
        cannonsToRender.push(rightArmCannons);
        text_renderer.renderLines(isFirstPersonArm, "left", "center", cannonsToRender, -210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
      };
      if (entity.getData("skyhighocs:dyn/hud_side_left") == 5) {
        leftSide = "Comms";
        var commsToRender = ["Comms:"];
        var satellite = "Satellite Dish: " + ((entity.getInterpolatedData("skyhighocs:dyn/satellite_timer") > 0) ? "DEPLOYED" : "STOWED") + ((entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer") > 0) ? " (RAIN MODE)" : "");
        var antenna = "Antenna: " + ((entity.getInterpolatedData("skyhighocs:dyn/antenna_timer") > 0) ? "DEPLOYED" : "STOWED");
        var connectedSatellite = "Satellite: " + entity.getData("skyhighocs:dyn/satellite_x") + ", " + entity.getData("skyhighocs:dyn/satellite_y") + ", " + entity.getData("skyhighocs:dyn/satellite_z");
        var frequency = "Frequency: " + entity.getData("skyhighocs:dyn/frequency");
        commsToRender.push(satellite);
        commsToRender.push(antenna);
        commsToRender.push(connectedSatellite);
        commsToRender.push(frequency);
        var cybers = cybernetics.availableCybers(entity);
        if (cybers.length > 0) {
          cybers.forEach(cyber => {
            commsToRender.push(cyber);
          });
        };
        text_renderer.renderLines(isFirstPersonArm, "left", "center", commsToRender, -210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
      };
      if (entity.getData("skyhighocs:dyn/hud_side_left") == 6) {
        leftSide = "Wings";
        var wingsToRender = ["Wings:"];
        var wings = "Wings: " + (entity.getData("skyhighocs:dyn/wings_armed") ? "ARMED" : "DISARMED");
        var leftWing = "Left wing: " + ((entity.getInterpolatedData("skyhighocs:dyn/wing_left_deploy_timer") > 0) || (entity.getInterpolatedData("skyhighocs:dyn/wings_timer") > 0) ? "DEPLOYED" : "STOWED");
        var rightWing = "Right wing: " + ((entity.getInterpolatedData("skyhighocs:dyn/wing_right_deploy_timer") > 0) || (entity.getInterpolatedData("skyhighocs:dyn/wings_timer") > 0) ? "DEPLOYED" : "STOWED");
        wingsToRender.push(wings);
        wingsToRender.push(leftWing);
        wingsToRender.push(rightWing);
        text_renderer.renderLines(isFirstPersonArm, "left", "center", wingsToRender, -210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
      };
      if (entity.getData("skyhighocs:dyn/hud_side_left") == 7) {
        leftSide = "Intakes";
        var rocketsToRender = ["Intakes:"];
        var leftHead = "Left Head: " + ((entity.getData("skyhighocs:dyn/intake_head_left_starting_up") && entity.getInterpolatedData("skyhighocs:dyn/intake_head_left_start_up_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/intake_head_left_start_up_timer") < 1) ? "STARTING UP" : ((entity.getData("skyhighocs:dyn/intake_head_left_open")) ? "OPEN" : "CLOSED"));
        var rightHead = "Right Head: " + ((entity.getData("skyhighocs:dyn/intake_head_right_starting_up") && entity.getInterpolatedData("skyhighocs:dyn/intake_head_right_start_up_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/intake_head_right_start_up_timer") < 1) ? "STARTING UP" : ((entity.getData("skyhighocs:dyn/intake_head_right_open")) ? "OPEN" : "CLOSED"));
        var leftBody = "Left Body: " + ((entity.getData("skyhighocs:dyn/intake_body_left_starting_up") && entity.getInterpolatedData("skyhighocs:dyn/intake_body_left_start_up_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/intake_body_left_start_up_timer") < 1) ? "STARTING UP" : ((entity.getData("skyhighocs:dyn/intake_body_left_open")) ? "OPEN" : "CLOSED"));
        var rightBody = "Right Body: " + ((entity.getData("skyhighocs:dyn/intake_body_right_starting_up") && entity.getInterpolatedData("skyhighocs:dyn/intake_body_right_start_up_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/intake_body_right_start_up_timer") < 1) ? "STARTING UP" : ((entity.getData("skyhighocs:dyn/intake_body_right_open")) ? "OPEN" : "CLOSED"));
        var leftArm = "Left Arm: " + ((entity.getData("skyhighocs:dyn/intake_left_arm_starting_up") && entity.getInterpolatedData("skyhighocs:dyn/intake_left_arm_start_up_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/intake_left_arm_start_up_timer") < 1) ? "STARTING UP" : ((entity.getData("skyhighocs:dyn/intake_left_arm_open")) ? "OPEN" : "CLOSED"));
        var rightArm = "Right Arm: " + ((entity.getData("skyhighocs:dyn/intake_right_arm_starting_up") && entity.getInterpolatedData("skyhighocs:dyn/intake_right_arm_start_up_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/intake_right_arm_start_up_timer") < 1) ? "STARTING UP" : ((entity.getData("skyhighocs:dyn/intake_right_arm_open")) ? "OPEN" : "CLOSED"));
        var leftLeg = "Left Leg: " + ((entity.getData("skyhighocs:dyn/intake_left_leg_starting_up") && entity.getInterpolatedData("skyhighocs:dyn/intake_left_leg_start_up_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/intake_left_leg_start_up_timer") < 1) ? "STARTING UP" : ((entity.getData("skyhighocs:dyn/intake_left_leg_open")) ? "OPEN" : "CLOSED"));
        var rightLeg = "Right Leg: " + ((entity.getData("skyhighocs:dyn/intake_right_leg_starting_up") && entity.getInterpolatedData("skyhighocs:dyn/intake_right_leg_start_up_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/intake_right_leg_start_up_timer") < 1) ? "STARTING UP" : ((entity.getData("skyhighocs:dyn/intake_right_leg_open")) ? "OPEN" : "CLOSED"));

        rocketsToRender.push(leftHead);
        rocketsToRender.push(rightHead);
        rocketsToRender.push(leftBody);
        rocketsToRender.push(rightBody);
        rocketsToRender.push(leftArm);
        rocketsToRender.push(rightArm);
        rocketsToRender.push(leftLeg);
        rocketsToRender.push(rightLeg);

        text_renderer.renderLines(isFirstPersonArm, "left", "center", rocketsToRender, -210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
      };
    };
    if (entity.getData("skyhighocs:dyn/battle_mode")) {
      topSide = "Ext Arms";
      dataToRender = [];
      var heldEntityId = entity.getData("fiskheroes:grab_id");
      var heldEntity = entity.world().getEntityById(heldEntityId);
      if (heldEntityId > 0) {
        var heldEntityName = "Name: " + stuff.entitySuitName(heldEntity);
        var heldEntityHealth = "Health: " + heldEntity.getHealth() + "/" + heldEntity.getMaxHealth();

        dataToRender.push(heldEntityName);
        dataToRender.push(heldEntityHealth);

        if (!heldEntity.getWornHelmet().isEmpty()) {
          var armorPiece = heldEntity.getWornHelmet();
          var heldEntityArmorPiece = "Helmet: " + armorPiece.displayName() + " (" + (armorPiece.maxDamage() - armorPiece.damage()) + "/" + armorPiece.maxDamage() + ")";
          dataToRender.push(heldEntityArmorPiece);
        };
        if (!heldEntity.getWornChestplate().isEmpty()) {
          var armorPiece = heldEntity.getWornChestplate();
          var heldEntityArmorPiece = "Chestplate: " + armorPiece.displayName() + " (" + (armorPiece.maxDamage() - armorPiece.damage()) + "/" + armorPiece.maxDamage() + ")";
          dataToRender.push(heldEntityArmorPiece);
        };
        if (!heldEntity.getWornLeggings().isEmpty()) {
          var armorPiece = heldEntity.getWornLeggings();
          var heldEntityArmorPiece = "Leggings: " + armorPiece.displayName() + " (" + (armorPiece.maxDamage() - armorPiece.damage()) + "/" + armorPiece.maxDamage() + ")";
          dataToRender.push(heldEntityArmorPiece);
        };
        if (!heldEntity.getWornBoots().isEmpty()) {
          var armorPiece = heldEntity.getWornBoots();
          var heldEntityArmorPiece = "Boots: " + armorPiece.displayName() + " (" + (armorPiece.maxDamage() - armorPiece.damage()) + "/" + armorPiece.maxDamage() + ")";
          dataToRender.push(heldEntityArmorPiece);
        };
        if (!heldEntity.getHeldItem().isEmpty()) {
          var item = heldEntity.getHeldItem();
          var heldEntityHeldItem = "Holding: " + item.displayName() + " (" + (item.maxDamage() - item.damage()) + "/" + item.maxDamage() + ")";
          dataToRender.push(heldEntityHeldItem);
        };
      };
      if (heldEntityId < 0) {
        var noEntity = "None";
        dataToRender.push(noEntity);
      };

      text_renderer.renderLines(isFirstPersonArm, "left", "center", dataToRender, -210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
    };
    //Top
    if (entity.getData("skyhighocs:dyn/hud_side_top") == 1) {
      topSide = "Thermoptics";
      var thermoToRender = [];
      var disguise = "" + (entity.getInterpolatedData("skyhighocs:dyn/thermoptic_disguise_timer") == 1 ? "DISGUISED" : "UNDISGUISED");
      var clothing = "" + (entity.getData("skyhighocs:dyn/thermoptic_disguise_clothing") ? "CLOTHED" : "UNCLOTHED");
      var camouflage = "" + (entity.getInterpolatedData("skyhighocs:dyn/thermoptic_camouflage_timer") == 1 ? "CAMOUFLAGED" : "UNCAMOUFLAGED");
      thermoToRender.push(disguise);
      thermoToRender.push(camouflage);
      thermoToRender.push(clothing);
      text_renderer.renderLines(isFirstPersonArm, "center", "center", thermoToRender, 0.0, -100.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
    };
    if (entity.getData("skyhighocs:dyn/hud_side_top") == 2) {
      topSide = "Coords";
      var coordsToRender = [];
      var coords = "" + Math.round(entity.posX()) + " " + Math.round(entity.posY()) + " " + Math.round(entity.posZ());
      var direction = stuff.angleToDirection(entity.getInterpolatedData("skyhighocs:dyn/bearing"));
      coordsToRender.push(coords);
      coordsToRender.push(direction);
      text_renderer.renderLines(isFirstPersonArm, "center", "center", coordsToRender, 0.0, -100.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
    };
    //Right
    if (entity.getData("skyhighocs:dyn/hud_side_right") == 1) {
      rightSide = "Status";
      var statusToRender = [];
      var model = entity.getData("skyhighocs:dyn/model_id");
      var name = "(" + entity.getData("skyhighocs:dyn/alias") + ")";
      var health = "Health: " + entity.getHealth() + "/" + entity.getMaxHealth();
      var chatMode = "Chat Mode: " + entity.getData("skyhighocs:dyn/chat_mode");
      statusToRender.push(model);
      statusToRender.push(name);
      statusToRender.push(health);
      statusToRender.push(chatMode);
      if (entity.getData("skyhighocs:dyn/chat_mode") == "group") {
        var selectedGroup = "Group: " + entity.getData("skyhighocs:dyn/group_selected");
        statusToRender.push(selectedGroup);
      };
      if (entity.getData("skyhighocs:dyn/chat_mode") == "normal") {
        var selectedContact = "Contact: " + entity.getData("skyhighocs:dyn/normal_selected");
        statusToRender.push(selectedContact);
      };
      text_renderer.renderLines(isFirstPersonArm, "right", "center", statusToRender, 210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
    };
    if (entity.getData("skyhighocs:dyn/hud_side_right") == 2) {
      rightSide = "Coords";
      var locationToRender = [];
      var coords = "X: " + Math.round(entity.posX()) + " Y: " + Math.round(entity.posY()) + " Z: " + Math.round(entity.posZ());
      var dimension = "Dimension: " + entity.world().getDimension();
      var biome = "Biome: " + entity.world().getLocation(entity.pos()).biome();
      locationToRender.push(coords);
      locationToRender.push(dimension);
      locationToRender.push(biome);
      text_renderer.renderLines(isFirstPersonArm, "right", "center", locationToRender, 210.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
    };
    //Switcher
    if (entity.getData("fiskheroes:gravity_manip")) {
      var hudsToRender = [];
      if (entity.getData("skyhighocs:dyn/hud_selected_side") == 0) {
        hudsToRender.push("> Left: " + leftSide + " <");
      } else {
        hudsToRender.push("Left: " + leftSide);
      };
      if (entity.getData("skyhighocs:dyn/hud_selected_side") == 1) {
        hudsToRender.push("> Top: " + topSide + " <");
      } else {
        hudsToRender.push("Top: " + topSide);
      };
      if (entity.getData("skyhighocs:dyn/hud_selected_side") == 2) {
        hudsToRender.push("> Right: " + rightSide + " <");
      } else {
        hudsToRender.push("Right: " + rightSide);
      };
      text_renderer.renderLines(isFirstPersonArm, "center", "center", hudsToRender, 0.0, 0.0, -180.0, 1.0*entity.getData("skyhighocs:dyn/hud_scale"));
    };
    leftSide = "OFF";
    topSide = "OFF";
    rightSide = "OFF";
  };
};
function getBoundUUID(entity) {
  return cybernetics.mainNBT(entity).getString("boundUUID");
};
function getColor() {
  return "";
};
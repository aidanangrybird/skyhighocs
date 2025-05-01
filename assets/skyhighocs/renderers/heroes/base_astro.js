var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

var date = new Date();
var isChristmasSeason = (date.getDate() < 26 && date.getDate() > 0 && date.getMonth() == 11);
var santaHat;
var santaHatNormal;
var blank_model;
var metal_heat;
var head_model;
var head_hair_model;
var head_eye_left_model;
var head_eye_right_model;
var head_eye_left_glow_model;
var head_eye_right_glow_model;
var body_model;
var left_arm_model;
var right_arm_model;
var left_leg_model;
var right_leg_model;

loadTextures({
  "null": "skyhighocs:null",
  "santa_hat_normal": "skyhighocs:santa_hat",
  "blank": "skyhighocs:astro_blank"
});

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    if (!entity.isWearingFullSuit()) {
      if (renderLayer == "BOOTS") {
        return "boots";
      };
      if (renderLayer == "LEGGINGS") {
        return "shorts";
      };
    };
    if (entity.isWearingFullSuit() && (entity.as("DISPLAY").getDisplayType() != "null" || entity.getUUID() == getID())) {
      return "null";
    };
    if (entity.getUUID() != getID()) {
      if (renderLayer == "BOOTS") {
        return "boots";
      };
      if (renderLayer == "LEGGINGS") {
        return "shorts";
      };
    } else {
      return "null";
    };
  });
  renderer.showModel("LEGGINGS", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
  renderer.showModel("BOOTS", "rightLeg", "leftLeg");
  renderer.fixHatLayer("LEGGINGS");
  initEffects(renderer);
  initAnimations(renderer);
};

function initEffects(renderer) {
  var blank = renderer.createResource("MODEL", "skyhighocs:BlankThing");
  blank.texture.set("blank");
  blank_model = renderer.createEffect("fiskheroes:model").setModel(blank);
  blank_model.anchor.set("head");
  blank_model.setScale(100.0);
  if (isChristmasSeason) {
    var santa_hat_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_model.texture.set("santa_hat_normal");
    santaHat = renderer.createEffect("fiskheroes:model").setModel(santa_hat_model);
    santaHat.anchor.set("head");
    santaHat.setScale(1.05);
    santaHat.setOffset(0.0, -5.25, 1.25);
    santaHat.setRotation(-45.0, 0.0, 0.0);
    var santa_hat_normal_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_normal_model.texture.set("santa_hat");
    santaHatNormal = renderer.createEffect("fiskheroes:model").setModel(santa_hat_normal_model);
    santaHatNormal.anchor.set("head");
    santaHatNormal.setScale(1.05);
    santaHatNormal.setOffset(0.0, -5.25, 1.25);
    santaHatNormal.setRotation(-45.0, 0.0, 0.0);
  };
  if (isChristmasSeason) {
    var santa_hat_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_model.texture.set("santa_hat_normal");
    santaHat = renderer.createEffect("fiskheroes:model").setModel(santa_hat_model);
    santaHat.anchor.set("head");
    santaHat.setScale(1.05);
    santaHat.setOffset(0.0, -5.25, 1.25);
    santaHat.setRotation(-45.0, 0.0, 0.0);
    var santa_hat_normal_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_normal_model.texture.set("santa_hat");
    santaHatNormal = renderer.createEffect("fiskheroes:model").setModel(santa_hat_normal_model);
    santaHatNormal.anchor.set("head");
    santaHatNormal.setScale(1.05);
    santaHatNormal.setOffset(0.0, -5.25, 1.25);
    santaHatNormal.setRotation(-45.0, 0.0, 0.0);
  };
  var head = renderer.createResource("MODEL", "skyhighocs:AstroBoyHead");
  head.texture.set("full", "full_lights");
  head.bindAnimation("skyhighocs:astro_head").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
    data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/arm_cannon_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/dual_arm_cannon_timer"));
    data.load(4, entity.getInterpolatedData("fiskheroes:beam_charge"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/head_top_front_open_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/head_top_back_open_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_front_open_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_back_open_timer"));
    data.load(9, entity.loop(20));
  });
  head_model = renderer.createEffect("fiskheroes:model").setModel(head);
  head_model.anchor.set("head");
  head_model.setScale(0.999999999);
  var head_hair = renderer.createResource("MODEL", "skyhighocs:AstroBoyHeadLayer2");
  head_hair.texture.set("full", "full_lights");
  head_hair.bindAnimation("skyhighocs:astro_head_layer2").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/head_top_front_open_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/head_top_back_open_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_front_open_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_back_open_timer"));
  });
  head_hair_model = renderer.createEffect("fiskheroes:model").setModel(head_hair);
  head_hair_model.anchor.set("head");
  head_hair_model.setOffset(0.0, 0.5, 0.0);
  head_hair_model.setScale(1.125);
  var head_eye_left = renderer.createResource("MODEL", "skyhighocs:AstroBoyHead");
  head_eye_left.texture.set("eye_left");
  head_eye_left.bindAnimation("skyhighocs:astro_head").setData((entity, data) => {
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/head_top_front_open_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/head_top_back_open_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_front_open_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_back_open_timer"));
  });
  head_eye_left_model = renderer.createEffect("fiskheroes:model").setModel(head_eye_left);
  head_eye_left_model.anchor.set("head");
  head_eye_left_model.setScale(0.999999999);
  var head_eye_right = renderer.createResource("MODEL", "skyhighocs:AstroBoyHead");
  head_eye_right.texture.set("eye_right");
  head_eye_right.bindAnimation("skyhighocs:astro_head").setData((entity, data) => {
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/head_top_front_open_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/head_top_back_open_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_front_open_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_back_open_timer"));
  });
  head_eye_right_model = renderer.createEffect("fiskheroes:model").setModel(head_eye_right);
  head_eye_right_model.anchor.set("head");
  head_eye_right_model.setScale(0.999999999);
  var head_eye_left_glow = renderer.createResource("MODEL", "skyhighocs:AstroBoyHead");
  head_eye_left_glow.texture.set(null, "eye_left");
  head_eye_left_glow.bindAnimation("skyhighocs:astro_head").setData((entity, data) => {
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/head_top_front_open_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/head_top_back_open_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_front_open_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_back_open_timer"));
  });
  head_eye_left_glow_model = renderer.createEffect("fiskheroes:model").setModel(head_eye_left_glow);
  head_eye_left_glow_model.anchor.set("head");
  head_eye_left_glow_model.setScale(0.999999999);
  var head_eye_right_glow = renderer.createResource("MODEL", "skyhighocs:AstroBoyHead");
  head_eye_right_glow.texture.set(null, "eye_right");
  head_eye_right_glow.bindAnimation("skyhighocs:astro_head").setData((entity, data) => {
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/head_top_front_open_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/head_top_back_open_timer"));
    data.load(7, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_front_open_timer"));
    data.load(8, entity.getInterpolatedData("skyhighocs:dyn/head_bottom_back_open_timer"));
  });
  head_eye_right_glow_model = renderer.createEffect("fiskheroes:model").setModel(head_eye_right_glow);
  head_eye_right_glow_model.anchor.set("head");
  head_eye_right_glow_model.setScale(0.999999999);
  var body = renderer.createResource("MODEL", "skyhighocs:AstroBoyBody");
  body.texture.set("full", "full_lights");
  body.bindAnimation("skyhighocs:astro_body").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge") + entity.getInterpolatedData("skyhighocs:dyn/body_machine_gun_open_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/body_upper_front_open_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/body_upper_back_open_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/body_lower_front_open_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/body_lower_back_open_timer"));
  });
  body_model = renderer.createEffect("fiskheroes:model").setModel(body);
  body_model.anchor.set("body");
  body_model.setScale(0.999999999);
  var left_arm = renderer.createResource("MODEL", "skyhighocs:AstroBoyLeftArm");
  left_arm.texture.set("full", "full_lights");
  left_arm.bindAnimation("skyhighocs:astro_left_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/dual_arm_cannon_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/left_arm_outer_open_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/left_arm_cannon_outer_open_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/left_arm_cannon_inner_open_timer"));
  });
  left_arm_model = renderer.createEffect("fiskheroes:model").setModel(left_arm);
  left_arm_model.anchor.set("leftArm");
  left_arm_model.setOffset(-1.0, -2.0, 0.0);
  left_arm_model.setScale(0.999999999);
  var right_arm = renderer.createResource("MODEL", "skyhighocs:AstroBoyRightArm");
  right_arm.texture.set("full", "full_lights");
  right_arm.bindAnimation("skyhighocs:astro_right_arm").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/arm_cannon_timer") + entity.getInterpolatedData("skyhighocs:dyn/dual_arm_cannon_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/right_arm_outer_open_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/right_arm_cannon_outer_open_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/right_arm_cannon_inner_open_timer"));
  });
  right_arm_model = renderer.createEffect("fiskheroes:model").setModel(right_arm);
  right_arm_model.anchor.set("rightArm");
  right_arm_model.setOffset(1.0, -2.0, 0.0);
  right_arm_model.setScale(0.999999999);
  var left_leg = renderer.createResource("MODEL", "skyhighocs:AstroBoyLeftLeg");
  left_leg.texture.set("full", "full_lights");
  left_leg.bindAnimation("skyhighocs:astro_left_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") + ((entity.as("DISPLAY").getDisplayType() == "HOLOGRAM") ? 1.0 : 0.0));
    data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/left_leg_boot_front_open_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/left_leg_boot_back_open_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/left_leg_front_open_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/left_leg_back_open_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/left_leg_boot_open_timer"));
  });
  left_leg_model = renderer.createEffect("fiskheroes:model").setModel(left_leg);
  left_leg_model.anchor.set("leftLeg");
  left_leg_model.setScale(0.999999999);
  var right_leg = renderer.createResource("MODEL", "skyhighocs:AstroBoyRightLeg");
  right_leg.texture.set("full", "full_lights");
  right_leg.bindAnimation("skyhighocs:astro_right_leg").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") + ((entity.as("DISPLAY").getDisplayType() == "HOLOGRAM") ? 1.0 : 0.0));
    data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/right_leg_boot_front_open_timer"));
    data.load(3, entity.getInterpolatedData("skyhighocs:dyn/right_leg_boot_back_open_timer"));
    data.load(4, entity.getInterpolatedData("skyhighocs:dyn/right_leg_front_open_timer"));
    data.load(5, entity.getInterpolatedData("skyhighocs:dyn/right_leg_back_open_timer"));
    data.load(6, entity.getInterpolatedData("skyhighocs:dyn/right_leg_boot_open_timer"));
  });
  right_leg_model = renderer.createEffect("fiskheroes:model").setModel(right_leg);
  right_leg_model.anchor.set("rightLeg");
  right_leg_model.setScale(0.999999999);

  astro.initNV(renderer);
  metal_heat = renderer.createEffect("fiskheroes:metal_heat");
  metal_heat.includeEffects(head_model, head_hair_model, head_eye_left_model, head_eye_left_glow_model, head_eye_right_model, head_eye_right_glow_model, body_model, left_arm_model, right_arm_model, left_leg_model, right_leg_model);
  renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
    return 0.999999;
  }).setCondition(entity => (entity.isWearingFullSuit() || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM"));

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
  clothing_right_leg.texture.set("right_leg");

  //astro.initNV(renderer, getID());
  metal_heat = renderer.createEffect("fiskheroes:metal_heat");
  metal_heat.includeEffects(head_model, head_hair_model, body_model, left_arm_model, right_arm_model, left_leg_model, right_leg_model, head_eye_right_model, head_eye_right_glow_model, head_eye_left_model, head_eye_left_glow_model);
  renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
    return 0.999999;
  }).setCondition(entity => (entity.isWearingFullSuit() || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM"));
  
  var nv = renderer.bindProperty("fiskheroes:night_vision");
  nv.fogStrength = 0.0;
  nv.factor = 1.0;
  nv.firstPersonOnly = false;
  nv.setCondition(entity => (entity.isWearingFullSuit()));
};

function initAnimations(renderer) {
  stuff.initHoloFlightAnim(renderer, "astro.HOLOGRAM_FLIGHT", "skyhighocs:astro_holo_flight");
  astro.initAstroAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  if (entity.isWearingFullSuit()) {
    if (isChristmasSeason) {
      if (entity.getData("skyhighocs:dyn/astro_clothes") == 3) {
        santaHat.render();
      } else {
        santaHatNormal.render();
      };
    };
    head_eye_left_model.opacity = 1.0;
    head_eye_left_glow_model.opacity = 1.0;
    head_eye_right_model.opacity = 1.0;
    head_eye_right_glow_model.opacity = 1.0;
    if (entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer") > 0) {
      head_eye_left_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer");
      head_eye_left_model.render();
      head_eye_left_glow_model.opacity = 1-entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer");
      head_eye_left_glow_model.render();
      head_eye_right_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer");
      head_eye_right_model.render();
      head_eye_right_glow_model.opacity = 1-entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer");
      head_eye_right_glow_model.render();
    } else {
      if (entity.getWornLeggings().nbt().getBoolean("leftEyeGlow")) {
        head_eye_left_glow_model.render();
      } else {
        head_eye_left_model.render();
      };
      if (entity.getWornLeggings().nbt().getBoolean("rightEyeGlow")) {
        head_eye_right_glow_model.render();
      } else {
        head_eye_right_model.render();
      };
    };
    head_model.render();
    head_hair_model.render();
    body_model.render();
    left_arm_model.render();
    right_arm_model.render();
    left_leg_model.render();
    right_leg_model.render();

    clothing_head.render();
    clothing_body.render();
    clothing_left_arm.render();
    clothing_right_arm.render();
    clothing_left_leg.render();
    clothing_right_leg.render();
    if (isFirstPersonArm) {
      blank_model.setOffset(0.0, 0.0, 0.0);
      blank_model.setScale(1000.0);
      blank_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer") + (astro.isModuleDisabled(entity, "eyes") ? 1 : 0);
      blank_model.anchor.ignoreAnchor(true);
      blank_model.render();
    };
  };
  metal_heat.opacity = entity.getInterpolatedData("fiskheroes:metal_heat");
  metal_heat.render();
};
function getID() {
  return "";
};
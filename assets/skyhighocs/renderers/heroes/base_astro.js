var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

var date = new Date();
var isChristmasSeason = (date.getDate() < 26 && date.getDate() > 0 && date.getMonth() == 11);
var santaHat;
var santaHatNormal;
var blank_model;
var metal_heat;

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

var left_leg_booster;
var right_leg_booster;

var locationBeam;
var entityLocationBeam;
var text_renderer;

var panelList = astro.panels;

loadTextures({
  "null": "skyhighocs:null",
  "santa_hat_normal": "skyhighocs:santa_hat",
  "blank": "skyhighocs:astro_blank",
  "head": "skyhighocs:astro_head_base",
  "body": "skyhighocs:astro_body_base",
  "left_arm": "skyhighocs:astro_left_arm_base",
  "right_arm": "skyhighocs:astro_right_arm_base",
  "left_leg": "skyhighocs:astro_left_leg_base",
  "right_leg": "skyhighocs:astro_right_leg_base",
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
    } else {
      return "null"
    };
  });
  renderer.showModel("LEGGINGS", "head", "headwear", "body", "rightArm", "leftArm");
  renderer.showModel("BOOTS", "rightLeg", "leftLeg");
  renderer.fixHatLayer("LEGGINGS");
  initEffects(renderer);
  initAnimations(renderer);
};

function initEffects(renderer) {
  text_renderer = stuff.text(renderer);
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

  //Mechanical
  var head = renderer.createResource("MODEL", "skyhighocs:AstroBoyHeadL1");
  head.texture.set("head", "head_lights");
  head.bindAnimation("skyhighocs:astro_head").setData((entity, data) => astro.headAnimations(entity, data));
  head_model = renderer.createEffect("fiskheroes:model").setModel(head);
  head_model.anchor.set("head");
  head_model.setScale(1.0);
  var body = renderer.createResource("MODEL", "skyhighocs:AstroBoyBodyL1");
  body.texture.set("body", "body_lights");
  body.bindAnimation("skyhighocs:astro_body").setData((entity, data) => astro.bodyAnimations(entity, data));
  body_model = renderer.createEffect("fiskheroes:model").setModel(body);
  body_model.anchor.set("body");
  body_model.setScale(1.0);
  astro.initBodyBeams(renderer, getColor());
  var left_arm = renderer.createResource("MODEL", "skyhighocs:AstroBoyLeftArmL1");
  left_arm.texture.set("left_arm", "left_arm_lights");
  left_arm.bindAnimation("skyhighocs:astro_left_arm").setData((entity, data) => astro.leftArmAnimations(entity, data));
  left_arm_model = renderer.createEffect("fiskheroes:model").setModel(left_arm);
  left_arm_model.anchor.set("leftArm");
  left_arm_model.setScale(1.0);
  astro.initLeftArmBeams(renderer, getColor());
  var right_arm = renderer.createResource("MODEL", "skyhighocs:AstroBoyRightArmL1");
  right_arm.texture.set("right_arm", "right_arm_lights");
  right_arm.bindAnimation("skyhighocs:astro_right_arm").setData((entity, data) => astro.rightArmAnimations(entity, data));
  right_arm_model = renderer.createEffect("fiskheroes:model").setModel(right_arm);
  right_arm_model.anchor.set("rightArm");
  right_arm_model.setScale(1.0);
  astro.initRightArmBeams(renderer, getColor());
  var left_leg = renderer.createResource("MODEL", "skyhighocs:AstroBoyLeftLegL1");
  left_leg.texture.set("left_leg", "left_leg_lights");
  left_leg.bindAnimation("skyhighocs:astro_left_leg").setData((entity, data) => astro.leftLegAnimations(entity, data));
  left_leg_model = renderer.createEffect("fiskheroes:model").setModel(left_leg);
  left_leg_model.anchor.set("leftLeg");
  left_leg_model.setScale(1.0);
  left_leg_booster = astro.initLeftLegBooster(renderer, left_leg, getColor());
  var right_leg = renderer.createResource("MODEL", "skyhighocs:AstroBoyRightLegL1");
  right_leg.texture.set("right_leg", "right_leg_lights");
  right_leg.bindAnimation("skyhighocs:astro_right_leg").setData((entity, data) => astro.rightLegAnimations(entity, data));
  right_leg_model = renderer.createEffect("fiskheroes:model").setModel(right_leg);
  right_leg_model.anchor.set("rightLeg");
  right_leg_model.setScale(1.0);
  right_leg_booster = astro.initRightLegBooster(renderer, right_leg, getColor());

  //Base skin
  var head_base = renderer.createResource("MODEL", "skyhighocs:AstroBoyHeadL2");
  head_base.texture.set("head_base");
  head_base.bindAnimation("skyhighocs:astro_head").setData((entity, data) => astro.headAnimations(entity, data));
  head_base_model = renderer.createEffect("fiskheroes:model").setModel(head_base);
  head_base_model.anchor.set("head");
  head_base_model.setScale(1.0);
  var head_hair_base = renderer.createResource("MODEL", "skyhighocs:AstroBoyHeadL2");
  head_hair_base.texture.set("head_hair_base");
  head_hair_base.bindAnimation("skyhighocs:astro_head").setData((entity, data) => astro.headAnimations(entity, data));
  head_hair_base_model = renderer.createEffect("fiskheroes:model").setModel(head_hair_base);
  head_hair_base_model.anchor.set("head");
  head_hair_base_model.setOffset(0.0, 0.5, 0.0);
  head_hair_base_model.setScale(1.125);
  var body_base = renderer.createResource("MODEL", "skyhighocs:AstroBoyBodyL2");
  body_base.texture.set("body_base");
  body_base.bindAnimation("skyhighocs:astro_body").setData((entity, data) => astro.bodyAnimations(entity, data));
  body_base_model = renderer.createEffect("fiskheroes:model").setModel(body_base);
  body_base_model.anchor.set("body");
  body_base_model.setScale(1.0);
  var left_arm_base = renderer.createResource("MODEL", "skyhighocs:AstroBoyLeftArmL2");
  left_arm_base.texture.set("left_arm_base");
  left_arm_base.bindAnimation("skyhighocs:astro_left_arm").setData((entity, data) => astro.leftArmAnimations(entity, data));
  left_arm_base_model = renderer.createEffect("fiskheroes:model").setModel(left_arm_base);
  left_arm_base_model.anchor.set("leftArm");
  left_arm_base_model.setScale(1.0);
  var right_arm_base = renderer.createResource("MODEL", "skyhighocs:AstroBoyRightArmL2");
  right_arm_base.texture.set("right_arm_base");
  right_arm_base.bindAnimation("skyhighocs:astro_right_arm").setData((entity, data) => astro.rightArmAnimations(entity, data));
  right_arm_base_model = renderer.createEffect("fiskheroes:model").setModel(right_arm_base);
  right_arm_base_model.anchor.set("rightArm");
  right_arm_base_model.setScale(1.0);
  var left_leg_base = renderer.createResource("MODEL", "skyhighocs:AstroBoyLeftLegL2");
  left_leg_base.texture.set("left_leg_base");
  left_leg_base.bindAnimation("skyhighocs:astro_left_leg").setData((entity, data) => astro.leftLegAnimations(entity, data));
  left_leg_base_model = renderer.createEffect("fiskheroes:model").setModel(left_leg_base);
  left_leg_base_model.anchor.set("leftLeg");
  left_leg_base_model.setScale(1.0);
  var right_leg_base = renderer.createResource("MODEL", "skyhighocs:AstroBoyRightLegL2");
  right_leg_base.texture.set("right_leg_base");
  right_leg_base.bindAnimation("skyhighocs:astro_right_leg").setData((entity, data) => astro.rightLegAnimations(entity, data));
  right_leg_base_model = renderer.createEffect("fiskheroes:model").setModel(right_leg_base);
  right_leg_base_model.anchor.set("rightLeg");
  right_leg_base_model.setScale(1.0);

  //astro.initNV(renderer, getID());
  metal_heat = renderer.createEffect("fiskheroes:metal_heat");
  metal_heat.includeEffects(head_base_model, head_hair_base_model, body_base_model, left_arm_base_model, right_arm_base_model, left_leg_base_model, right_leg_base_model);
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
  stuff.addAnimationEvent(renderer, "FLIGHT_DIVE", "skyhighocs:astro_dive");
  stuff.addAnimationEvent(renderer, "FLIGHT_DIVE_ROLL", "skyhighocs:astro_dive_roll");
};

function render(entity, renderLayer, isFirstPersonArm) {
  var nbt = entity.getWornLeggings().nbt();
  if (entity.isWearingFullSuit()) {
    if (isChristmasSeason) {
      if (entity.getData("skyhighocs:dyn/astro_clothes") == 3) {
        santaHat.render();
      } else {
        santaHatNormal.render();
      };
    };

    head_model.render();
    body_model.render();
    left_arm_model.render();
    right_arm_model.render();
    left_leg_model.render();
    right_leg_model.render();

    head_base_model.render();
    head_hair_base_model.render();
    body_base_model.render();
    left_arm_base_model.render();
    right_arm_base_model.render();
    left_leg_base_model.render();
    right_leg_base_model.render();

    left_leg_booster.render(entity, renderLayer, isFirstPersonArm);
    right_leg_booster.render(entity, renderLayer, isFirstPersonArm);

    if (isFirstPersonArm) {
      blank_model.setOffset(0.0, 0.0, 0.0);
      blank_model.setScale(1000.0);
      blank_model.opacity = entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer") + (astro.isModuleDisabled(entity, "eyes") ? 1 : 0);
      blank_model.anchor.ignoreAnchor(true);
      blank_model.render();
    };
    if (entity.isWearingFullSuit() && isFirstPersonArm) {
      var openPanelCount = 0;
      panelList.forEach(variable => {
        if (entity.getInterpolatedData(variable) > 0) {
          openPanelCount = openPanelCount + 1;
        };
      });
      if (openPanelCount > 0) {
        panelsToRender = []
        var warning = "WARNING!";
        panelsToRender.push(warning);
        if (openPanelCount == 1) {
          var openPanels = openPanelCount + " panel open!";
          panelsToRender.push(openPanels);
        } else {
          var openPanels = openPanelCount + " panels open!";
          panelsToRender.push(openPanels);
        };
        text_renderer.renderLines(isFirstPersonArm, "left", "center", panelsToRender, -210.0, 0.0, -180.0, 1.0*nbt.getFloat("hudScale"));
      };
    };
  };
  metal_heat.opacity = entity.getInterpolatedData("fiskheroes:metal_heat");
  metal_heat.render();
};
function getID() {
  return "";
};
function getColor() {
  return "0x000000";
};
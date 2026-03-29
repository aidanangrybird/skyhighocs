loadTextures({
  "null": "skyhighocs:null",
  "santa_hat": "skyhighocs:santa_hat",
});

var stuff = implement("skyhighocs:external/stuff");
var stelar = implement("skyhighocs:external/stelar");

var barrierForcefield;
var callingForcefield;
var callingLine;
var callingBeam;
var santaHat;
var santaHatEM;
var visualizerModel;
var visualizerWaveChangeModel;
var callingHead;
var date = new Date();
var isChristmasSeason = (date.getDate() < 26 && date.getDate() > 0 && date.getMonth() == 11);

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.is("DISPLAY")) {
        if ((entity.getUUID() == getID(entity)) && (entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
          return "base";
        };
        if (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT") {
          return "transer_default";
        } else {
          return (hasEMBeing(entity) && (entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW")) ? "base" : "transer";
        };
      };
      if (entity.getUUID() != getID(entity)) {
        return "transer_default";
      };
      if (!hasEMBeing(entity)) {
        if (entity.getInterpolatedData("skyhighocs:dyn/calling_timer") > 0.45 && entity.getInterpolatedData("skyhighocs:dyn/calling_timer") < 0.6) {
          return "base";
        };
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 0.5 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") > 0) {
        return "transer_wave_change";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") >= 0.5) {
        return "base_wave_change";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) {
        return "base"
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 0) {
        return "transer"
      } else {
        return "null";
      };
    };
  });
  renderer.setLights((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.is("DISPLAY")) {
        if ((entity.getUUID() == getID(entity)) && (entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
          return "lights";
        };
        if (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT") {
          return "null";
        } else {
          return (hasEMBeing(entity) && (entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW")) ? "lights" : "null";
        };
      };
      if (!hasEMBeing(entity)) {
        if (entity.getInterpolatedData("skyhighocs:dyn/calling_timer") > 0.45 && entity.getInterpolatedData("skyhighocs:dyn/calling_timer") < 0.6) {
          return "lights";
        };
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 0.5 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") > 0) {
        return "null";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") >= 0.5) {
        return "lights_wave_change";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) {
        return "lights";
      } else {
        return "null";
      };
    };
  });
  var satellite = getSatellite();
  renderer.setItemIcon("CHESTPLATE", satellite + "_transer");
  renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "leftLeg", "rightLeg");
  renderer.fixHatLayer("CHESTPLATE");
  initEffects(renderer);
  initAnimations(renderer);
};

function initEffects(renderer) {
  var color = getColor();
  if (isChristmasSeason) {
    var santa_hat_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_model.texture.set("santa_hat");
    santaHat = renderer.createEffect("fiskheroes:model").setModel(santa_hat_model);
    santaHat.anchor.set("head");
    santaHat.setScale(1.05);
    santaHat.setOffset(0.0, -5.75, 1.25);
    santaHat.setRotation(-45.0, 0.0, 0.0);
    var santa_hat_em_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_em_model.texture.set("santa_hat_em");
    santaHatEM = renderer.createEffect("fiskheroes:model").setModel(santa_hat_em_model);
    santaHatEM.anchor.set("head");
    santaHatEM.setScale(1.05);
    santaHatEM.setOffset(0.0, -7.25, -0.25);
    santaHatEM.setRotation(-10.0, 0.0, 0.0);
  };
  var visualizer = renderer.createResource("MODEL", "skyhighocs:Visualizer");
  visualizer.texture.set("visualizer", "visualizer_lights");
  visualizerModel = renderer.createEffect("fiskheroes:model").setModel(visualizer);
  visualizerModel.anchor.set("head");
  visualizerModel.setScale(1.0);
  var visualizerWaveChange = renderer.createResource("MODEL", "skyhighocs:Visualizer");
  visualizerWaveChange.texture.set("visualizer_wave_change", "visualizer_lights_wave_change");
  visualizerWaveChangeModel = renderer.createEffect("fiskheroes:model").setModel(visualizerWaveChange);
  visualizerWaveChangeModel.anchor.set("head");
  visualizerWaveChangeModel.setScale(1.0);
  ears = renderer.createEffect("fiskheroes:ears");
  ears.anchor.set("head");
  ears.angle = 0;
  ears.inset = -0.039;
  callingHead = stelar.initHandThing(renderer, "head", 1, 4, 3);
  beam = renderer.createResource("BEAM_RENDERER", "skyhighocs:wave_calling");
  var callingShape = renderer.createResource("SHAPE", null);
  callingLine = callingShape.bindLine({ "start": [0.0, -300.0, 0.0], "end": [0.0, -300.0, 0.0], "size": [20.0, 20.0] });
  callingBeam = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(callingShape).setOffset(0.0, 0.0, 0.0);
  callingBeam.color.set(color);
  callingBeam.mirror = false;
  callingBeam.setScale(16.0);
  callingBeam.anchor.set("body");
  callingForcefield = renderer.bindProperty("fiskheroes:forcefield");
  callingForcefield.setShape(36, 36).setOffset(0.0, 26.0, 0.0).setScale(0.1);
  callingForcefield.color.set(color);
  callingForcefield.setCondition(entity => {
    return !entity.is("DISPLAY") && !hasEMBeing(entity) && entity.getData("skyhighocs:dyn/calling") && (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 0);
  });
  barrierForcefield = renderer.bindProperty("fiskheroes:forcefield");
  barrierForcefield.setShape(36, 36).setOffset(0.0, 10.0, 0.0).setScale(2.0);
  barrierForcefield.color.set(color);
  barrierForcefield.setCondition(entity => {
    barrierForcefield.opacity = ((entity.getData("skyhighocs:dyn/battle_card") == 1) ? 1.0 : 0.0) * entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.1;
    return !entity.is("DISPLAY") && hasEMBeing(entity) && (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) && (barrierForcefield.opacity > 0.0);
  });
  stelar.initNV(renderer);
  stelar.initWaveChangeNV(renderer);
  stuff.setOpacityWithData(renderer, 0.0, 1.0, "fiskheroes:teleport_timer");
  stelar.initMegaBuster(renderer, getColor());
  wave_change_lights = renderer.createEffect("fiskheroes:overlay");
  wave_change_lights.texture.set(null, "wave_changing_lights");
};

function initAnimations(renderer) {
  stuff.addAnimationWithData(renderer, "transer.CALLING", "skyhighocs:stelar_calling", "skyhighocs:dyn/calling_timer").setCondition(entity => {return entity.getData("skyhighocs:dyn/calling")});
  stelar.initHoloFlightAnim(renderer, "wave.HOLOGRAM_FLIGHT", "skyhighocs:em_wave_change_holo_flight", getEMBeing());
  stelar.initEMWaveChangeAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  if (!hasEMBeing(entity)) {
    if (entity.is("DISPLAY")) {
      visualizerModel.render();
    } else {
      var callingTimer = entity.getInterpolatedData("skyhighocs:dyn/calling_timer");
      callingLine.size.x = callingLine.size.y = stuff.animate2(callingTimer, 0.7, 0.3, 0.1, 0.0)*40+20;
      callingLine.end.y = stuff.animate2(callingTimer, 0.85, 0.15, 0.1, 0.0)*302-300;
      callingLine.start.y = stuff.animate2(callingTimer, 0.55, 0.45, 0.05, 0.0)*302-300;
      callingForcefield.opacity = stuff.animate2(callingTimer, 0.4, 0.25, 0.05, 0.05);
      var ffScale = stuff.animate2(callingTimer, 0.75, 0.25, 0.05, 0.0)*1 + stuff.animate2(callingTimer, 0.7, 0.3, 0.1, 0.0)*3;
      callingForcefield.setScale(ffScale);
      callingBeam.anchor.ignoreAnchor(isFirstPersonArm);
      if (callingTimer > 0 && entity.getData("skyhighocs:dyn/calling") && callingTimer < 0.5) {
        callingBeam.render();
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/calling_timer") > 0.45 && entity.getInterpolatedData("skyhighocs:dyn/calling_timer") < 0.6) {
        callingHead.render();
      } else {
        visualizerModel.render();
      };
    };
    if (isChristmasSeason) {
      if (entity.getInterpolatedData("skyhighocs:dyn/calling_timer") > 0.45 && entity.getInterpolatedData("skyhighocs:dyn/calling_timer") < 0.6) {
        santaHatEM.render();
      } else {
        santaHat.setScale(1.05);
        santaHat.setOffset(0.0, -5.75, 1.25);
        santaHat.setRotation(-45.0, 0.0, 0.0);
        if (entity.getData("skyhighocs:dyn/visualizer_toggle")) {
          santaHat.setScale(1.02);
          santaHat.setOffset(0.0, -7.25, -0.25);
          santaHat.setRotation(-10.0, 0.0, 0.0);
        };
        if (!entity.getData("skyhighocs:dyn/hood_toggle") && entity.getData("skyhighocs:dyn/stelar_clothes") == 3) {
          santaHat.setOffset(0.0, -6.5, 0);
          santaHat.setRotation(0.0, 0.0, 0.0);
          santaHat.setScale(1.08);
        };
        santaHat.render();
      };
    };
  } else {
    if (!entity.is("DISPLAY")) {
      barrierForcefield.opacity = (entity.getData("skyhighocs:dyn/battle_card") == 1) * entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.1;
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 0) {
        visualizerModel.render();
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 0.5) {
        visualizerWaveChangeModel.render();
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1) {
        wave_change_lights.render();
      };
    };
    if (isChristmasSeason) {
      if (!entity.is("DISPLAY") && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 0) {
        santaHat.setScale(1.05);
        santaHat.setOffset(0.0, -5.75, 1.25);
        santaHat.setRotation(-45.0, 0.0, 0.0);
        if (entity.getData("skyhighocs:dyn/visualizer_toggle")) {
          santaHat.setScale(1.02);
          santaHat.setOffset(0.0, -7.25, -0.25);
          santaHat.setRotation(-10.0, 0.0, 0.0);
        };
        if (!entity.getData("skyhighocs:dyn/hood_toggle") && entity.getData("skyhighocs:dyn/stelar_clothes") == 3) {
          santaHat.setOffset(0.0, -6.5, 0);
          santaHat.setRotation(0.0, 0.0, 0.0);
          santaHat.setScale(1.08);
        };
        santaHat.render();
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 || (entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
        santaHatEM.render();
      };
    };
  };
  ears.render();
};

function getColor() {
  return 0x000000;
};
function getID(entity) {
  return entity.getData("skyhighocs:dyn/compatible_uuid");
};
function getSatellite() {
  return "";
};
function getEMBeing() {
  return "";
};
function hasEMBeing(entity) {
  return ((entity.is("DISPLAY")) ? (stelar.mainNBT(entity).getString("emBeing") == getEMBeing()) : (entity.getData("skyhighocs:dyn/em_being") == getEMBeing()));
};
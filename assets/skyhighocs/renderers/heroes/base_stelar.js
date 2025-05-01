loadTextures({
  "null": "skyhighocs:null",
  "santa_hat": "skyhighocs:santa_hat",
});

var stuff = implement("skyhighocs:external/stuff");

var santaHat;
var santaHatEM;
var date = new Date();
var isChristmasSeason = (date.getDate() < 26 && date.getDate() > 0 && date.getMonth() == 11);

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.getInterpolatedData("skyhighocs:dyn/calling_timer") > 0.45 && entity.getInterpolatedData("skyhighocs:dyn/calling_timer") < 0.6) {
        return "base";
      };
      if ((entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT")) {
        return "transer_default";
      } else {
        return "transer";
      };
    };
  });
  renderer.setLights((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.getInterpolatedData("skyhighocs:dyn/calling_timer") > 0.45 && entity.getInterpolatedData("skyhighocs:dyn/calling_timer") < 0.6) {
        return "lights";
      };
      if ((entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT")) {
        return "transer_default_lights";
      } else {
        return "visualizer_lights";
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

var forcefield;
var callingLine;
var callingBeam;

function initEffects(renderer) {
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
  ears = renderer.createEffect("fiskheroes:ears");
  ears.anchor.set("head");
  ears.angle = 0;
  ears.inset = -0.039;
  beam = renderer.createResource("BEAM_RENDERER", "skyhighocs:wave_calling");
  var callingShape = renderer.createResource("SHAPE", null);
  callingLine = callingShape.bindLine({ "start": [0.0, -300.0, 0.0], "end": [0.0, -300.0, 0.0], "size": [20.0, 20.0] });
  callingBeam = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(callingShape).setOffset(0.0, 0.0, 0.0);
  callingBeam.mirror = false;
  callingBeam.setScale(16.0);
  callingBeam.anchor.set("body");
  forcefield = renderer.bindProperty("fiskheroes:forcefield");
  forcefield.setShape(36, 36).setOffset(0.0, 26.0, 0.0).setScale(0.1);
  forcefield.setCondition(entity => {
    return entity.getData("skyhighocs:dyn/calling");
  });
};

function initAnimations(renderer) {
  stuff.addAnimationWithData(renderer, "transer.CALLING", "skyhighocs:stelar_calling", "skyhighocs:dyn/calling_timer").setCondition(entity => {return entity.getData("skyhighocs:dyn/calling")});
};

function render(entity, renderLayer, isFirstPersonArm) {
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
  var color = getColor(entity);
  var callingTimer = entity.getInterpolatedData("skyhighocs:dyn/calling_timer");
  ears.render();
  forcefield.color.set(color);
  callingBeam.color.set(color);
  callingLine.size.x = callingLine.size.y = stuff.animate2(callingTimer, 0.7, 0.3, 0.1, 0.0)*40+20;
  callingLine.end.y = stuff.animate2(callingTimer, 0.85, 0.15, 0.1, 0.0)*302-300;
  callingLine.start.y = stuff.animate2(callingTimer, 0.55, 0.45, 0.05, 0.0)*302-300;
  forcefield.opacity = stuff.animate2(callingTimer, 0.4, 0.25, 0.05, 0.05);
  var ffScale = stuff.animate2(callingTimer, 0.75, 0.25, 0.05, 0.0)*1 + stuff.animate2(callingTimer, 0.7, 0.3, 0.1, 0.0)*3;
  forcefield.setScale(ffScale);
  callingBeam.anchor.ignoreAnchor(isFirstPersonArm);
  if (callingTimer > 0 && entity.getData("skyhighocs:dyn/calling") && callingTimer < 0.5) {
    callingBeam.render();
  };
};

function getColor() {
  return 0x000000;
};
function getID() {
  return "";
};
function getSatellite() {
  return "";
};
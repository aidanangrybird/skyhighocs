var stelar = implement("skyhighheroes:external/stelar");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "null": "skyhighocs:null",
  "santa_hat": "skyhighheroes:santa_hat",
});

var santaHat;
var santaHatEM;
var date = new Date();
var isChristmasSeason = (date.getDate() < 26 && date.getDate() > 0 && date.getMonth() == 11);

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        return "base";
      };
      if (entity.getUUID() != getID() || (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT")) {
        return "transer_default";
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 0.5 && entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") > 0) {
        return "transer_wave_change";
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1 && entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") >= 0.5) {
        return "base_wave_change";
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1) {
        return "base"
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 0) {
        return "transer"
      } else {
        return "null";
      };
    };
  });
  renderer.setLights((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        return "lights";
      };
      if (entity.getUUID() != getID() || (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT")) {
        return "transer_default_lights";
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 0.5 && entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") > 0) {
        return "visualizer_lights_wave_change";
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1 && entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") >= 0.5) {
        return "lights_wave_change";
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1) {
        return "lights";
      }
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 0) {
        return "visualizer_lights";
      } else {
        return "null";
      };
    };
  });
  renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "leftLeg", "rightLeg");
  renderer.fixHatLayer("CHESTPLATE");
  initEffects(renderer);
  initAnimations(renderer);
};

function initEffects(renderer) {
  if (isChristmasSeason) {
    var santa_hat_model = renderer.createResource("MODEL", "skyhighheroes:SantaHat");
    santa_hat_model.texture.set("santa_hat");
    santaHat = renderer.createEffect("fiskheroes:model").setModel(santa_hat_model);
    santaHat.anchor.set("head");
    santaHat.setScale(1.05);
    santaHat.setOffset(0.0, -5.75, 1.25);
    santaHat.setRotation(-45.0, 0.0, 0.0);
    var santa_hat_em_model = renderer.createResource("MODEL", "skyhighheroes:SantaHat");
    santa_hat_em_model.texture.set("santa_hat_em");
    santaHatEM = renderer.createEffect("fiskheroes:model").setModel(santa_hat_em_model);
    santaHatEM.anchor.set("head");
    santaHatEM.setScale(1.05);
    santaHatEM.setOffset(0.0, -7.25, -0.25);
    santaHatEM.setRotation(-10.0, 0.0, 0.0);
  };
  stelar.initNV(renderer);
  stuff.setOpacityWithData(renderer, 0.0, 1.0, "fiskheroes:teleport_timer");
  stelar.initForceField(renderer, getColor());
  stelar.initMegaBuster(renderer, getColor(), getColor());
  stelar.initLiveries(renderer);
  wave_change_lights = renderer.createEffect("fiskheroes:overlay");
  wave_change_lights.texture.set(null, "wave_changing_lights");
  ears = renderer.createEffect("fiskheroes:ears");
  ears.anchor.set("head");
  ears.angle = 0;
  ears.inset = -0.039;
};

function initAnimations(renderer) {
  stuff.initHoloFlightAnim(renderer, "wave.HOLOGRAM_FLIGHT", "skyhighheroes:stelar_holo_flight");
  stuff.emCeilingAnimation(renderer);
  stelar.initStelarAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  if (isChristmasSeason) {
    if (entity.isAlive() && entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 0) {
      santaHat.setScale(1.05);
      santaHat.setOffset(0.0, -5.75, 1.25);
      santaHat.setRotation(-45.0, 0.0, 0.0);
      if (entity.getData("skyhighheroes:dyn/visualizer_toggle")) {
        santaHat.setScale(1.02);
        santaHat.setOffset(0.0, -7.25, -0.25);
        santaHat.setRotation(-10.0, 0.0, 0.0);
      };
      if (!entity.getData("skyhighheroes:dyn/hood_toggle") && entity.getData("skyhighheroes:dyn/stelar_clothes") == 3) {
        santaHat.setOffset(0.0, -6.5, 0);
        santaHat.setRotation(0.0, 0.0, 0.0);
        santaHat.setScale(1.08);
      };
      santaHat.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 || (entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
      santaHatEM.render();
    };
  };
  ears.render();
  if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") > 0 && entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1) {
    wave_change_lights.render();
  };
};

function getID() {
  return "";
};
function getColor() {
  return 0x00FF00;
};
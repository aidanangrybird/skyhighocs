loadTextures({
  "null": "skyhighocs:null",
});

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.getUUID() != getID() || (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW")) {
        return "transer_default";
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/calling_timer") > 0.45 && entity.getInterpolatedData("skyhighheroes:dyn/calling_timer") < 0.6) {
        return "base";
      } else {
        return "transer";
      };
    };
  });
  renderer.setLights((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.getInterpolatedData("skyhighheroes:dyn/calling_timer") > 0.45 && entity.getInterpolatedData("skyhighheroes:dyn/calling_timer") < 0.6) {
        return "lights";
      };
      if (entity.getUUID() != getID() || (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW")) {
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
var callingBeam;/* 
var waveChangeLights;
var waveChange;
var normal; */

function initEffects(renderer) {/* 
  normal = renderer.createEffect("fiskheroes:overlay");
  normal.texture.set("transer", "visualizer_lights");
  waveChange = renderer.createEffect("fiskheroes:overlay");
  waveChange.texture.set("base", "lights");
  waveChangeLights = renderer.createEffect("fiskheroes:overlay");
  waveChangeLights.texture.set(null, "wave_changing_lights"); */
  ears = renderer.createEffect("fiskheroes:ears");
  ears.anchor.set("head");
  ears.angle = 0;
  ears.inset = -0.039;
  beam = renderer.createResource("BEAM_RENDERER", "skyhighheroes:wave_calling");
  var callingShape = renderer.createResource("SHAPE", null);
  callingLine = callingShape.bindLine({ "start": [0.0, -300.0, 0.0], "end": [0.0, -300.0, 0.0], "size": [20.0, 20.0] });
  callingBeam = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(callingShape).setOffset(0.0, 0.0, 0.0);
  callingBeam.mirror = false;
  callingBeam.setScale(16.0);
  callingBeam.anchor.set("body");
  forcefield = renderer.bindProperty("fiskheroes:forcefield");
  forcefield.setShape(36, 36).setOffset(0.0, 26.0, 0.0).setScale(0.1);
  forcefield.setCondition(entity => {
    return entity.getData("skyhighheroes:dyn/calling");
  });
};

function initAnimations(renderer) {
  addAnimationWithData(renderer, "transer.CALLING", "skyhighheroes:stelar_calling", "skyhighheroes:dyn/calling_timer").setCondition(entity => {return entity.getData("skyhighheroes:dyn/calling")});
};

function render(entity, renderLayer, isFirstPersonArm) {
  var color = getColor(entity);
  var callingTimer = entity.getInterpolatedData("skyhighheroes:dyn/calling_timer");/* 
  normal.opacity = -1*timerAnimate2(callingTimer, 0.35, 0.25, 0.05, 0.1)+1;
  if (entity.getUUID() == getID()) {
    normal.render();
  };
  waveChange.opacity = timerAnimate2(callingTimer, 0.2, 0.4, 0.05, 0.1);
  waveChange.render();
  waveChangeLights.opacity = timerAnimate2(callingTimer, 0.15, 0.25, 0.05, 0.05);
  waveChangeLights.render(); */
  ears.render();
  forcefield.color.set(color);
  callingBeam.color.set(color);
  callingLine.size.x = callingLine.size.y = timerAnimate2(callingTimer, 0.7, 0.3, 0.1, 0.0)*40+20;
  callingLine.end.y = timerAnimate2(callingTimer, 0.85, 0.15, 0.1, 0.0)*302-300;
  callingLine.start.y = timerAnimate2(callingTimer, 0.55, 0.45, 0.05, 0.0)*302-300;
  forcefield.opacity = timerAnimate2(callingTimer, 0.4, 0.25, 0.05, 0.05);
  var ffScale = timerAnimate2(callingTimer, 0.75, 0.25, 0.05, 0.0)*1 + timerAnimate2(callingTimer, 0.7, 0.3, 0.1, 0.0)*3;
  forcefield.setScale(ffScale);
  if (callingTimer > 0 && entity.getData("skyhighheroes:dyn/calling") && callingTimer < 0.5) {
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
/**
 * clamp as in FSK
 * @param timer - input timer
 * @param min - minimum value
 * @param max - maximum
 **/
function timerClamp(timer, min, max) {
  return Math.min(Math.max(timer, min), max);
};
/**
 * animate as in FSK
 * @param timer - input timer
 * @param duration - duration of frame
 * @param start - start of frame
 **/
function timerAnimate(timer, duration, start) {
  return (timer > start && timer <= start + duration) ? ((timer - start) / duration) : 0.0;
};
/**
 * animate2 as in FSK
 * @param timer - input timer
 * @param duration - duration of frame
 * @param start - start of frame
 * @param fadeIn - how long to fade in
 * @param fadeOut - how long to fade out
 **/
function timerAnimate2(timer, duration, start, fadeIn, fadeOut) {
  fadeIn = timerClamp(fadeIn, 0.0, duration);
  fadeOut = timerClamp(fadeOut, 0.0, duration - fadeIn);
  if (timer >= start && timer <= start + duration) {
    pos = timer - start;
    if (pos < fadeIn) {
      return timerAnimate(pos, fadeIn, 0.0);
    };
    if (pos >= duration - fadeOut) {
      return 1.0 - timerAnimate(pos, fadeOut, duration - fadeOut);
    };
    return 1.0;
  };
  return 0.0;
};

function addAnimation(renderer, key, anim) {
  if (typeof anim === "string") {
    anim = renderer.createResource("ANIMATION", anim);
  };

  renderer.addCustomAnimation(key, anim);
  return anim;
};
function addAnimationWithData(renderer, key, anim, dataVar) {
  return addAnimation(renderer, key, anim).setData((entity, data) => data.load(entity.getInterpolatedData(dataVar)));
};
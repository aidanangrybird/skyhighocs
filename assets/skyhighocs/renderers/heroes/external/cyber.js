//Beam setup
function bindBeam(renderer, propertyName, beam, anchor, color, entries) {
  var prop = renderer.bindProperty(propertyName).setAnchor(anchor);
  var constln = renderer.createResource("BEAM_CONSTELLATION", null);

  for (var i = 0; i < entries.length; ++i) {
    constln.bindBeam(entries[i]);
  };

  if (typeof beam === "string") {
    beam = renderer.createResource("BEAM_RENDERER", beam);
  };

  prop.setConstellation(constln);
  prop.setRenderer(beam);
  prop.color.set(color);
  return prop;
};

//Animation stuff
function parseAnimationEntry(renderer, value) {
  if (typeof value === "string") {
    return {
      "anim": renderer.createResource("ANIMATION", value),
      "weight": 1
    };
  };
  return {
    "anim": renderer.createResource("ANIMATION", value.key),
    "weight": value.hasOwnProperty("weight") ? value.weight : 1
  };
};
function addAnimationEvent(renderer, key, value) {
  var event = renderer.createResource("ANIMATION_EVENT", null);

  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; ++i) {
      var e = parseAnimationEntry(renderer, value[i]);
      event.bindAnimation(e.anim, e.weight);
    };
  } else {
    var e = parseAnimationEntry(renderer, value);
    event.bindAnimation(e.anim, e.weight);
  };

  renderer.addAnimationEvent(key, event);
  return event;
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
function addFlightAnimation(renderer, name, value, dataLoader) {
  var anim = renderer.createResource("ANIMATION", value);
  renderer.addCustomAnimation(name, anim);

  if (typeof dataLoader === "undefined") {
    anim.setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
      data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
    });
  } else {
    anim.setData((entity, data) => dataLoader(entity, data));
  };

  anim.priority = -10;
  renderer.reprioritizeDefaultAnimation("PUNCH", -9);
  renderer.reprioritizeDefaultAnimation("HOLD_CHRONOS_RIFLE", -9);
  renderer.reprioritizeDefaultAnimation("HOLD_PIZZA", -9);
  renderer.reprioritizeDefaultAnimation("BLOCK_CAPS_SHIELD", -9);
  renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
};
function addFlightAnimationWithLanding(renderer, name, value) {
  addFlightAnimation(renderer, name, value, (entity, data) => {
    data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("skyhighheroes:dyn/superhero_boosting_landing_timer") - entity.getInterpolatedData("skyhighheroes:dyn/superhero_landing_timer")));
    data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
  });
};

function addHoverAnimation(renderer, name, value, dataLoader) {
  var anim = renderer.createResource("ANIMATION", value);
  renderer.addCustomAnimation(name, anim);

  if (typeof dataLoader === "undefined") {
    anim.setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("fiskheroes:levitate_timer"));
      data.load(1, entity.loop(20 * Math.PI) + 0.4);
    });
  } else {
    anim.setData((entity, data) => dataLoader(entity, data));
  };

  anim.priority = -9.5;
  return anim;
};

//Astro Animations
function initCyberAnimations(renderer) {
  //Aiming
  addAnimationWithData(renderer, "cyber.AIMING", "skyhighheroes:astro_aim", "fiskheroes:aiming_timer")
    .setCondition(entity => !entity.getHeldItem().doesNeedTwoHands() && !entity.getHeldItem().isRifle())
    .priority = 5;
  //Dual Cannons
  addAnimationWithData(renderer, "cyber.DUAL_CANNONS", "skyhighheroes:astro_dual_aim", "fiskheroes:energy_projection_timer")
    .setCondition(entity => !entity.getHeldItem().doesNeedTwoHands() && !entity.getHeldItem().isRifle())
    .priority = 5;
  //Flight
  addFlightAnimationWithLanding(renderer, "cyber.FLIGHT", "skyhighheroes:flight/astro_flight.anim.json");
  //Landing
  addAnimationWithData(renderer, "cyber.LAND", "skyhighheroes:astro_landing", "skyhighheroes:dyn/superhero_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "cyber.LAND_BOOST", "skyhighheroes:astro_boosting_landing", "skyhighheroes:dyn/superhero_boosting_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "cyber.ROLL", "skyhighheroes:flight/astro_barrel_roll", "fiskheroes:barrel_roll_timer")
  addHoverAnimation(renderer, "cyber.HOVER", "skyhighheroes:astro_hover");
  addAnimationWithData(renderer, "cyber.POWER", "skyhighocs:cyber_powering_down", "skyhighocs:dyn/powering_down_timer")
    .setCondition(entity => (!entity.is("DISPLAY") && entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer") > 0))
    .priority = -10;
  addAnimation(renderer, "cyber.POWERED_DOWN", "skyhighheroes:astro_powered_down")
    .setData((entity, data) => data.load(1.0))
    .setCondition(entity => (!entity.is("DISPLAY") && entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer") == 1))
    .priority = -10;
};

function initNV(renderer, uuid) {
  nv = renderer.bindProperty("fiskheroes:night_vision");
  nv.fogStrength = 0.0;
  nv.factor = 1.0;
  nv.setCondition(entity => entity.getUUID() == uuid);
};

//Init
//Beams
function initBeams(renderer, color) {
  renderer.bindProperty("fiskheroes:energy_bolt").color.set(color);
  bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", color, [
    { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [1.5, 1.5] }
  ]);
  bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "body", color, [
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "rightArm", color, [
    { "firstPerson": [-4.5, 3.75, -5.0], "offset": [-0.5, 4.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighheroes:dyn/astro_clothes") != 3);
  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "leftArm", color, [
    { "firstPerson": [4.5, 3.75, -5.0], "offset": [0.5, 4.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighheroes:dyn/astro_clothes") != 3);

  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "rightArm", color, [
    { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighheroes:dyn/astro_clothes") == 3);
  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "leftArm", color, [
    { "firstPerson": [4.5, 3.75, -8.0], "offset": [0.5, 9.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighheroes:dyn/astro_clothes") == 3);
};
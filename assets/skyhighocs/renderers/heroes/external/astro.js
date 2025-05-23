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
  prop.color.set((typeof color === "object" && color.length == 3) ? color[0] : color);
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
    data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("skyhighocs:dyn/superhero_boosting_landing_timer") - entity.getInterpolatedData("skyhighocs:dyn/superhero_landing_timer")));
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
function initAstroAnimations(renderer) {
  //Aiming
  addAnimationWithData(renderer, "astro.AIMING", "skyhighocs:astro_aim", "fiskheroes:aiming_timer")
    .setCondition(entity => !entity.getHeldItem().doesNeedTwoHands() && !entity.getHeldItem().isRifle())
    .priority = 5;
  //Dual Cannons
  addAnimationWithData(renderer, "astro.DUAL_CANNONS", "skyhighocs:astro_dual_aim", "fiskheroes:energy_projection_timer")
    .setCondition(entity => !entity.getHeldItem().doesNeedTwoHands() && !entity.getHeldItem().isRifle())
    .priority = 5;
  //Flight
  addFlightAnimationWithLanding(renderer, "astro.FLIGHT", "skyhighocs:flight/astro_flight.anim.json");
  addAnimation(renderer, "astro.FLIGHT_FP", "skyhighocs:flight/astro_fp")
    .setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:flight_boost_timer")*(1-entity.getInterpolatedData("fiskheroes:energy_projection_timer"))*(1-entity.getInterpolatedData("fiskheroes:aiming_timer"))))
    .priority = -9.5;
  //Landing
  addAnimationWithData(renderer, "astro.LAND", "skyhighocs:astro_landing", "skyhighocs:dyn/superhero_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "astro.LAND_BOOST", "skyhighocs:astro_boosting_landing", "skyhighocs:dyn/superhero_boosting_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "astro.ROLL", "skyhighocs:flight/astro_barrel_roll", "fiskheroes:barrel_roll_timer")
  addHoverAnimation(renderer, "astro.HOVER", "skyhighocs:astro_hover");
  addAnimationWithData(renderer, "astro.POWER", "skyhighocs:astro_power_state", "skyhighocs:dyn/powering_down_timer")
    .setCondition(entity => (!entity.is("DISPLAY") && entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer") > 0))
    .priority = -10;
  addAnimation(renderer, "astro.POWERED_DOWN", "skyhighocs:astro_powered_down")
    .setData((entity, data) => data.load(1.0))
    .setCondition(entity => (!entity.is("DISPLAY") && entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer") == 1))
    .priority = -10;
};

/**
 * Turns NBT String List into an array for easier use in code
 * @param {JSNBTList} nbtList - NBTList
 * @returns Array of values from the NBTList
 **/
function getStringArray(nbtList) {
  var count = nbtList.tagCount();
  var result = [];
  for (i=0;i<count;i++) {
    result.push(nbtList.getString(i));
  };
  return result;
};
/**
 * Checks if a module is disabled
 * @param {JSEntity} entity - Player getting checked
 * @param {string} moduleName - Module being checked if disabled
 * @returns If module is disabled
 **/
function isModuleDisabled(entity, moduleName) {
  var disabledModules = entity.getWornLeggings().nbt().getStringList("disabledModules");
  var modulesDisabled = getStringArray(disabledModules);
  var result = false;
  modulesDisabled.forEach(entry => {
    if (entry == moduleName) {
      result = true;
    };
  });
  return result;
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
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighocs:dyn/astro_clothes") != 3);
  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "leftArm", color, [
    { "firstPerson": [4.5, 3.75, -5.0], "offset": [0.5, 4.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighocs:dyn/astro_clothes") != 3);

  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "rightArm", color, [
    { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighocs:dyn/astro_clothes") == 3);
  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "leftArm", color, [
    { "firstPerson": [4.5, 3.75, -8.0], "offset": [0.5, 9.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighocs:dyn/astro_clothes") == 3);
};
function initDualBeams(renderer, colorLeft, colorRight) {
  renderer.bindProperty("fiskheroes:energy_bolt").color.set(colorRight);
  bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", colorRight, [
    { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [1.5, 1.5] }
  ]);
  bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "body", colorRight, [
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "rightArm", colorRight, [
    { "firstPerson": [-4.5, 3.75, -5.0], "offset": [-0.5, 4.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighocs:dyn/astro_clothes") != 3);
  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "leftArm", colorLeft, [
    { "firstPerson": [4.5, 3.75, -5.0], "offset": [0.5, 4.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighocs:dyn/astro_clothes") != 3);

  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "rightArm", colorRight, [
    { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighocs:dyn/astro_clothes") == 3);
  bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:charged_beam", "leftArm", colorLeft, [
    { "firstPerson": [4.5, 3.75, -8.0], "offset": [0.5, 9.0, 0.0], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")).setCondition(entity => entity.getData("skyhighocs:dyn/astro_clothes") == 3);
};
//Cannon
function initCannon(renderer) {
  var light_thing = renderer.createEffect("fiskheroes:overlay");
  light_thing.texture.set("cannon", "cannon_lights");
  var obj = {
    light_thing: light_thing,
    render: (entity, renderLayer) => {
      if (entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/astro_clothes") == 3) {
        light_thing.opacity = entity.getInterpolatedData("fiskheroes:aiming_timer");
        light_thing.render();
      };
    }
  };
  return obj;
};

function initBoosters(renderer, colors) {

  var color;

  if (typeof colors !== "object") {
    color = colors;
  } else {
    color = 0x000000;
  };

  var icon = renderer.createResource("ICON", "skyhighocs:null");
  
  var boosterLegLeft = renderer.createEffect("fiskheroes:booster");
  boosterLegLeft.setIcon(icon).setOffset(0.0, 12.0, 0.0).setSize(4.0, 2.0);
  boosterLegLeft.anchor.set("leftLeg");
  boosterLegLeft.mirror = false;
  
  var boosterLegRight = renderer.createEffect("fiskheroes:booster");
  boosterLegRight.setIcon(icon).setOffset(0.0, 12.0, 0.0).setSize(4.0, 2.0);
  boosterLegRight.anchor.set("rightLeg");
  boosterLegRight.mirror = false;

  beam = renderer.createResource("BEAM_RENDERER", "skyhighocs:astro_booster");

  //Outer
  var shapeLegOuter = renderer.createResource("SHAPE", null);
  var lineLegOuter = shapeLegOuter.bindLine({ "start": [0.0, 0.0, 0.0], "end": [0.0, 0.0, 0.0], "size": [3.5, 3.5] });
  var bloomLegLeftOuter = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegOuter).setOffset(0.0, 12.0, 0.0);
  var bloomLegRightOuter = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegOuter).setOffset(0.0, 12.0, 0.0);
  bloomLegLeftOuter.anchor.set("leftLeg");
  bloomLegLeftOuter.color.set((typeof colors === "object" && colors.length == 3) ? colors[2] : color);
  bloomLegLeftOuter.mirror = false;
  bloomLegLeftOuter.setScale(16.0);
  bloomLegRightOuter.anchor.set("rightLeg");
  bloomLegRightOuter.color.set((typeof colors === "object" && colors.length == 3) ? colors[2] : color);
  bloomLegRightOuter.mirror = false;
  bloomLegRightOuter.setScale(16.0);

  //Middle
  var shapeLegMiddle = renderer.createResource("SHAPE", null);
  var lineLegMiddle = shapeLegMiddle.bindLine({ "start": [0.0, 0.0, 0.0], "end": [0.0, 0.0, 0.0], "size": [1.75, 1.75] });
  var bloomLegLeftMiddle = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegMiddle).setOffset(0.0, 12.0, 0.0);
  var bloomLegRightMiddle = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegMiddle).setOffset(0.0, 12.0, 0.0);
  bloomLegLeftMiddle.anchor.set("leftLeg");
  bloomLegLeftMiddle.color.set((typeof colors === "object" && colors.length == 3) ? colors[1] : color);
  bloomLegLeftMiddle.mirror = false;
  bloomLegLeftMiddle.setScale(16.0);
  bloomLegRightMiddle.anchor.set("rightLeg");
  bloomLegRightMiddle.color.set((typeof colors === "object" && colors.length == 3) ? colors[1] : color);
  bloomLegRightMiddle.mirror = false;
  bloomLegRightMiddle.setScale(16.0);

  //Inner
  var shapeLegInner = renderer.createResource("SHAPE", null);
  var lineLegInner = shapeLegInner.bindLine({ "start": [0.0, 0.0, 0.0], "end": [0.0, 0.0, 0.0], "size": [0.875, 0.875] });
  var bloomLegLeftInner = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegInner).setOffset(0.0, 12.0, 0.0);
  var bloomLegRightInner = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegInner).setOffset(0.0, 12.0, 0.0);
  bloomLegLeftInner.anchor.set("leftLeg");
  bloomLegLeftInner.color.set((typeof colors === "object" && colors.length == 3) ? colors[0] : color);
  bloomLegLeftInner.mirror = false;
  bloomLegLeftInner.setScale(16.0);
  bloomLegRightInner.anchor.set("rightLeg");
  bloomLegRightInner.color.set((typeof colors === "object" && colors.length == 3) ? colors[0] : color);
  bloomLegRightInner.mirror = false;
  bloomLegRightInner.setScale(16.0);

  var obj = {
    boosterLegLeft: boosterLegLeft,
    boosterLegRight: boosterLegRight,
    bloomLegLeftOuter: bloomLegLeftOuter,
    bloomLegLeftMiddle: bloomLegLeftMiddle,
    bloomLegLeftInner: bloomLegLeftInner,
    bloomLegRightOuter: bloomLegRightOuter,
    bloomLegRightMiddle: bloomLegRightMiddle,
    bloomLegRightInner: bloomLegRightInner,
    renderBoosters: (entity, renderLayer, isFirstPersonArm) => {
      if (entity.getData("skyhighocs:dyn/astro_clothes") != 3) {
        boosterLegLeft.setOffset(0.0, 10.0, 0.0);
        boosterLegRight.setOffset(0.0, 10.0, 0.0);
        bloomLegLeftOuter.setOffset(0.0, 11.0, 0.0);
        bloomLegLeftMiddle.setOffset(0.0, 10.5, 0.0);
        bloomLegLeftInner.setOffset(0.0, 10.0, 0.0);
        bloomLegRightOuter.setOffset(0.0, 11.0, 0.0);
        bloomLegRightMiddle.setOffset(0.0, 10.5, 0.0);
        bloomLegRightInner.setOffset(0.0, 10.0, 0.0);
      };
      if (entity.getData("skyhighocs:dyn/astro_clothes") == 3) {
        boosterLegLeft.setOffset(0.0, 12.0, 0.0);
        boosterLegRight.setOffset(0.0, 12.0, 0.0);
        bloomLegLeftOuter.setOffset(0.0, 12.0, 0.0);
        bloomLegLeftMiddle.setOffset(0.0, 12.0, 0.0);
        bloomLegLeftInner.setOffset(0.0, 12.0, 0.0);
        bloomLegRightOuter.setOffset(0.0, 12.0, 0.0);
        bloomLegRightMiddle.setOffset(0.0, 12.0, 0.0);
        bloomLegRightInner.setOffset(0.0, 12.0, 0.0);
      };
      //Boots
      //Equations
      var data_0 = entity.getData("skyhighocs:dyn/astro_clothes") != 3 ? ((Math.sin(((5*Math.min(Math.max(entity.getInterpolatedData("fiskheroes:flight_timer"), 0.8), 1.0) - 4) * 2.0 - 1.0) * Math.PI / 2.0) + 1.0) / 2.0) : entity.getInterpolatedData("fiskheroes:flight_timer");
      var data_1 = entity.getInterpolatedData("fiskheroes:flight_boost_timer");
      var boost = data_1;
      var flight = data_0 + (entity.as("DISPLAY").getDisplayType() == "HOLOGRAM");
      var b = Math.min(Math.max(boost * 3 - 1.25, 0), 1);
      b = entity.isSprinting() ? 0.5 - Math.cos(2 * b * Math.PI) / 2 : 0;
      var f = Math.PI * 2;
      f = Math.sin((entity.loop(f) * f) % f * 3) / 5;

      //Left
      //Booster
      boosterLegLeft.progress = boost;
      boosterLegLeft.speedScale = 0.5 * boost;
      boosterLegLeft.flutter = 1 + boost;
      boosterLegLeft.setSize(4.0 + b * 4, 2.0 - b * 3.9);
      //Beams
      lineLegOuter.end.y = (2 * boost) + ((1 + f * boosterLegLeft.flutter / 4) * 1.5 * 1.5 / 8);
      lineLegMiddle.end.y = (2 * boost) + ((1 + f * boosterLegLeft.flutter / 4) * 1.25 * 1.25 / 8);
      lineLegInner.end.y = (2 * boost) + ((1 + f * boosterLegLeft.flutter / 4) * 1 * 1 / 8);
      //Outer
      bloomLegLeftOuter.progress = bloomLegLeftOuter.opacity = flight;
      //Middle
      bloomLegLeftMiddle.progress = bloomLegLeftMiddle.opacity = flight;
      //Inner
      bloomLegLeftInner.progress = bloomLegLeftInner.opacity = flight;
      //Right
      //Booster
      boosterLegRight.progress = boost;
      boosterLegRight.speedScale = 0.5 * boost;
      boosterLegRight.flutter = 1 + boost;
      boosterLegRight.setSize(4.0 + b * 4, 2.0 - b * 3.9);
      //Beam
      lineLegOuter.end.y = (2 * boost) + ((1 + f * boosterLegRight.flutter / 4) * 1.5 * 1.5 / 8);
      lineLegMiddle.end.y = (2 * boost) + ((1 + f * boosterLegRight.flutter / 4) * 1.25 * 1.25 / 8);
      lineLegInner.end.y = (2 * boost) + ((1 + f * boosterLegRight.flutter / 4) * 1 * 1 / 8);
      //Outer
      bloomLegRightOuter.progress = bloomLegRightOuter.opacity = flight;
      //Middle
      bloomLegRightMiddle.progress = bloomLegRightMiddle.opacity = flight;
      //Inner
      bloomLegRightInner.progress = bloomLegRightInner.opacity = flight;

      lineLegInner.size.x = 0.025 + boost*0.85;
      lineLegInner.size.y = 0.025 + boost*0.85;
      
      lineLegMiddle.size.x = 0.05 + boost*1.7;
      lineLegMiddle.size.y = 0.05 + boost*1.7;

      lineLegOuter.size.x = 0.1 + boost*3.4;
      lineLegOuter.size.y = 0.1 + boost*3.4;

      if (!isFirstPersonArm) {
        //Left
        boosterLegLeft.render();
        bloomLegLeftOuter.render();
        bloomLegLeftMiddle.render();
        bloomLegLeftInner.render();
        //Right
        boosterLegRight.render();
        bloomLegRightOuter.render();
        bloomLegRightMiddle.render();
        bloomLegRightInner.render();
      };
    }
  };
  return obj;
};

function initDualBoosters(renderer, colorsLeft, colorsRight) {

  var colorLeft
  var colorRight;

  if (typeof colorsLeft !== "object") {
    colorLeft = colorsLeft;
  } else {
    colorLeft = 0x000000;
  };

  if (typeof colorsRight !== "object") {
    colorRight = colorsRight;
  } else {
    colorRight = 0x000000;
  };

  var icon = renderer.createResource("ICON", "skyhighocs:null");
  
  var boosterLegLeft = renderer.createEffect("fiskheroes:booster");
  boosterLegLeft.setIcon(icon).setOffset(0.0, 12.0, 0.0).setSize(4.0, 2.0);
  boosterLegLeft.anchor.set("leftLeg");
  boosterLegLeft.mirror = false;
  
  var boosterLegRight = renderer.createEffect("fiskheroes:booster");
  boosterLegRight.setIcon(icon).setOffset(0.0, 12.0, 0.0).setSize(4.0, 2.0);
  boosterLegRight.anchor.set("rightLeg");
  boosterLegRight.mirror = false;

  beam = renderer.createResource("BEAM_RENDERER", "skyhighocs:astro_booster");

  //Outer
  var shapeLegOuter = renderer.createResource("SHAPE", null);
  var lineLegOuter = shapeLegOuter.bindLine({ "start": [0.0, 0.0, 0.0], "end": [0.0, 0.0, 0.0], "size": [3.5, 3.5] });
  var bloomLegLeftOuter = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegOuter).setOffset(0.0, 12.0, 0.0);
  var bloomLegRightOuter = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegOuter).setOffset(0.0, 12.0, 0.0);
  bloomLegLeftOuter.anchor.set("leftLeg");
  bloomLegLeftOuter.color.set((typeof colorsLeft === "object" && colorsLeft.length == 3) ? colorsLeft[2] : colorLeft);
  bloomLegLeftOuter.mirror = false;
  bloomLegLeftOuter.setScale(16.0);
  bloomLegRightOuter.anchor.set("rightLeg");
  bloomLegRightOuter.color.set((typeof colorsRight === "object" && colorsRight.length == 3) ? colorsRight[2] : colorRight);
  bloomLegRightOuter.mirror = false;
  bloomLegRightOuter.setScale(16.0);

  //Middle
  var shapeLegMiddle = renderer.createResource("SHAPE", null);
  var lineLegMiddle = shapeLegMiddle.bindLine({ "start": [0.0, 0.0, 0.0], "end": [0.0, 0.0, 0.0], "size": [1.75, 1.75] });
  var bloomLegLeftMiddle = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegMiddle).setOffset(0.0, 12.0, 0.0);
  var bloomLegRightMiddle = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegMiddle).setOffset(0.0, 12.0, 0.0);
  bloomLegLeftMiddle.anchor.set("leftLeg");
  bloomLegLeftMiddle.color.set((typeof colorsLeft === "object" && colorsLeft.length == 3) ? colorsLeft[2] : colorLeft);
  bloomLegLeftMiddle.mirror = false;
  bloomLegLeftMiddle.setScale(16.0);
  bloomLegRightMiddle.anchor.set("rightLeg");
  bloomLegRightMiddle.color.set((typeof colorsRight === "object" && colorsRight.length == 3) ? colorsRight[2] : colorRight);
  bloomLegRightMiddle.mirror = false;
  bloomLegRightMiddle.setScale(16.0);

  //Inner
  var shapeLegInner = renderer.createResource("SHAPE", null);
  var lineLegInner = shapeLegInner.bindLine({ "start": [0.0, 0.0, 0.0], "end": [0.0, 0.0, 0.0], "size": [0.875, 0.875] });
  var bloomLegLeftInner = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegInner).setOffset(0.0, 12.0, 0.0);
  var bloomLegRightInner = renderer.createEffect("fiskheroes:lines").setRenderer(beam).setShape(shapeLegInner).setOffset(0.0, 12.0, 0.0);
  bloomLegLeftInner.anchor.set("leftLeg");
  bloomLegLeftInner.color.set((typeof colorsLeft === "object" && colorsLeft.length == 3) ? colorsLeft[2] : colorLeft);
  bloomLegLeftInner.mirror = false;
  bloomLegLeftInner.setScale(16.0);
  bloomLegRightInner.anchor.set("rightLeg");
  bloomLegRightInner.color.set((typeof colorsRight === "object" && colorsRight.length == 3) ? colorsRight[2] : colorRight);
  bloomLegRightInner.mirror = false;
  bloomLegRightInner.setScale(16.0);

  var obj = {
    boosterLegLeft: boosterLegLeft,
    boosterLegRight: boosterLegRight,
    bloomLegLeftOuter: bloomLegLeftOuter,
    bloomLegLeftMiddle: bloomLegLeftMiddle,
    bloomLegLeftInner: bloomLegLeftInner,
    bloomLegRightOuter: bloomLegRightOuter,
    bloomLegRightMiddle: bloomLegRightMiddle,
    bloomLegRightInner: bloomLegRightInner,
    renderBoosters: (entity, renderLayer, isFirstPersonArm) => {
      if (entity.getData("skyhighocs:dyn/astro_clothes") != 3) {
        boosterLegLeft.setOffset(0.0, 10.0, 0.0);
        boosterLegRight.setOffset(0.0, 10.0, 0.0);
        bloomLegLeftOuter.setOffset(0.0, 11.0, 0.0);
        bloomLegLeftMiddle.setOffset(0.0, 10.5, 0.0);
        bloomLegLeftInner.setOffset(0.0, 10.0, 0.0);
        bloomLegRightOuter.setOffset(0.0, 11.0, 0.0);
        bloomLegRightMiddle.setOffset(0.0, 10.5, 0.0);
        bloomLegRightInner.setOffset(0.0, 10.0, 0.0);
      };
      if (entity.getData("skyhighocs:dyn/astro_clothes") == 3) {
        boosterLegLeft.setOffset(0.0, 12.0, 0.0);
        boosterLegRight.setOffset(0.0, 12.0, 0.0);
        bloomLegLeftOuter.setOffset(0.0, 12.0, 0.0);
        bloomLegLeftMiddle.setOffset(0.0, 12.0, 0.0);
        bloomLegLeftInner.setOffset(0.0, 12.0, 0.0);
        bloomLegRightOuter.setOffset(0.0, 12.0, 0.0);
        bloomLegRightMiddle.setOffset(0.0, 12.0, 0.0);
        bloomLegRightInner.setOffset(0.0, 12.0, 0.0);
      };
      //Boots
      //Equations
      var data_0 = entity.getData("skyhighocs:dyn/astro_clothes") != 3 ? ((Math.sin(((5*Math.min(Math.max(entity.getInterpolatedData("fiskheroes:flight_timer"), 0.8), 1.0) - 4) * 2.0 - 1.0) * Math.PI / 2.0) + 1.0) / 2.0) : entity.getInterpolatedData("fiskheroes:flight_timer");
      var data_1 = entity.getInterpolatedData("fiskheroes:flight_boost_timer");
      var boost = data_1;
      var flight = data_0 + (entity.as("DISPLAY").getDisplayType() == "HOLOGRAM");
      var b = Math.min(Math.max(boost * 3 - 1.25, 0), 1);
      b = entity.isSprinting() ? 0.5 - Math.cos(2 * b * Math.PI) / 2 : 0;
      var f = Math.PI * 2;
      f = Math.sin((entity.loop(f) * f) % f * 3) / 5;

      //Left
      //Booster
      boosterLegLeft.progress = boost;
      boosterLegLeft.speedScale = 0.5 * boost;
      boosterLegLeft.flutter = 1 + boost;
      boosterLegLeft.setSize(4.0 + b * 4, 2.0 - b * 3.9);
      //Beams
      lineLegOuter.end.y = (2 * boost) + ((1 + f * boosterLegLeft.flutter / 4) * 1.5 * 1.5 / 8);
      lineLegMiddle.end.y = (2 * boost) + ((1 + f * boosterLegLeft.flutter / 4) * 1.25 * 1.25 / 8);
      lineLegInner.end.y = (2 * boost) + ((1 + f * boosterLegLeft.flutter / 4) * 1 * 1 / 8);
      //Outer
      bloomLegLeftOuter.progress = bloomLegLeftOuter.opacity = flight;
      //Middle
      bloomLegLeftMiddle.progress = bloomLegLeftMiddle.opacity = flight;
      //Inner
      bloomLegLeftInner.progress = bloomLegLeftInner.opacity = flight;
      //Right
      //Booster
      boosterLegRight.progress = boost;
      boosterLegRight.speedScale = 0.5 * boost;
      boosterLegRight.flutter = 1 + boost;
      boosterLegRight.setSize(4.0 + b * 4, 2.0 - b * 3.9);
      //Beam
      lineLegOuter.end.y = (2 * boost) + ((1 + f * boosterLegRight.flutter / 4) * 1.5 * 1.5 / 8);
      lineLegMiddle.end.y = (2 * boost) + ((1 + f * boosterLegRight.flutter / 4) * 1.25 * 1.25 / 8);
      lineLegInner.end.y = (2 * boost) + ((1 + f * boosterLegRight.flutter / 4) * 1 * 1 / 8);
      //Outer
      bloomLegRightOuter.progress = bloomLegRightOuter.opacity = flight;
      //Middle
      bloomLegRightMiddle.progress = bloomLegRightMiddle.opacity = flight;
      //Inner
      bloomLegRightInner.progress = bloomLegRightInner.opacity = flight;

      lineLegInner.size.x = 0.025 + boost*0.85;
      lineLegInner.size.y = 0.025 + boost*0.85;
      
      lineLegMiddle.size.x = 0.05 + boost*1.7;
      lineLegMiddle.size.y = 0.05 + boost*1.7;

      lineLegOuter.size.x = 0.1 + boost*3.4;
      lineLegOuter.size.y = 0.1 + boost*3.4;

      if (!isFirstPersonArm) {
        //Left
        boosterLegLeft.render();
        bloomLegLeftOuter.render();
        bloomLegLeftMiddle.render();
        bloomLegLeftInner.render();
        //Right
        boosterLegRight.render();
        bloomLegRightOuter.render();
        bloomLegRightMiddle.render();
        bloomLegRightInner.render();
      };
    }
  };
  return obj;
};
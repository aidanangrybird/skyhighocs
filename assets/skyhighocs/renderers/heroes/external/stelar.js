//Beam stuff
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

function addPredationAnimation(renderer, key, value) {
  if (typeof value === "string") {
    anim = renderer.createResource("ANIMATION", value);
  };
  renderer.addCustomAnimation(key, anim);
  anim.setData((entity, data) => data.load(entity.getInterpolatedData("skyhighocs:dyn/predation_timer")));
  anim.setCondition(entity => entity.getData("skyhighocs:dyn/battle_card") > 0)
  anim.priority = -9.75;
};

function addBasePredationAnimation(renderer, key, value) {
  if (typeof value === "string") {
    anim = renderer.createResource("ANIMATION", value);
  };
  renderer.addCustomAnimation(key, anim);
  anim.setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/predation_timer"));
  });
  anim.setCondition(entity => entity.getData("skyhighocs:dyn/battle_card") == 0)
  anim.priority = -9.75;
};

function addSwordAnimations(renderer, key, value) {
  if (typeof value === "string") {
    anim = renderer.createResource("ANIMATION", value);
  };
  renderer.addCustomAnimation(key, anim);
  anim.setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/sword_timer"));
    data.load(1, entity.getInterpolatedData("fiskheroes:shield_blocking_timer"));
  });
  anim.setCondition(entity => entity.getData("skyhighocs:dyn/battle_card") == 2);
  anim.priority = -9.75;
};

function addFlightHoldingAnimation(renderer, name, value, dataLoader) {
  var anim = renderer.createResource("ANIMATION", value);
  renderer.addCustomAnimation(name, anim);

  if (typeof dataLoader === "undefined") {
    anim.setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("skyhighocs:dyn/superhero_boosting_landing_timer") - entity.getInterpolatedData("skyhighocs:dyn/superhero_landing_timer")));
      data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
    });
  } else {
    anim.setData((entity, data) => dataLoader(entity, data));
  };
  anim.setCondition(entity => !entity.getHeldItem().isEmpty());

  anim.priority = -10;
  renderer.reprioritizeDefaultAnimation("PUNCH", -9);
  renderer.reprioritizeDefaultAnimation("HOLD_CHRONOS_RIFLE", -9);
  renderer.reprioritizeDefaultAnimation("HOLD_PIZZA", -9);
  renderer.reprioritizeDefaultAnimation("BLOCK_CAPS_SHIELD", -9);
  renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
};

function addFlightBaseAnimation(renderer, name, value, dataLoader) {
  var anim = renderer.createResource("ANIMATION", value);
  renderer.addCustomAnimation(name, anim);

  
  anim.setCondition(entity => entity.getHeldItem().isEmpty())
  if (typeof dataLoader === "undefined") {
    anim.setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("skyhighocs:dyn/superhero_boosting_landing_timer") - entity.getInterpolatedData("skyhighocs:dyn/superhero_landing_timer")));
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

function initForceField(renderer, color) {
  addAnimationWithData(renderer, "skyhigh.BLOCKING", "skyhighocs:force_field_holding", "fiskheroes:shield_blocking_timer")
    .setCondition(entity => entity.getData("skyhighocs:dyn/battle_card") == 1)
    .priority = -5;
  var forcefield = renderer.bindProperty("fiskheroes:forcefield");
  forcefield.color.set(color);
  forcefield.setShape(36, 36).setOffset(0.0, 10.0, 0.0).setScale(2.0);
  forcefield.setCondition(entity => {
    forcefield.opacity = (entity.getData("skyhighocs:dyn/battle_card") == 1) * entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.1;
    return true;
  });
};

//Stelar Animations
function initStelarAnimations(renderer) {
  //Aiming
  addAnimationWithData(renderer, "stelar.AIMING", "skyhighocs:stelar_aim", "fiskheroes:aiming_timer")
    .setCondition(entity => !entity.getHeldItem().doesNeedTwoHands() && !entity.getHeldItem().isRifle())
    .priority = 10;
  addAnimationEvent(renderer, "CEILING_CRAWL", "skyhighocs:em_wall_ceiling_stand");
  addPredationAnimation(renderer, "stelar.PREDATION", "skyhighocs:stelar_predation");
  addSwordAnimations(renderer, "stelar.SWORD", "skyhighocs:stelar_sword");
  //Flight
  addFlightBaseAnimation(renderer, "stelar.BASE_FLIGHT", "skyhighocs:flight/stelar_base_flight.anim.json");
  addFlightHoldingAnimation(renderer, "stelar.HOLDING_FLIGHT", "skyhighocs:flight/stelar_holding_flight.anim.json");
  addAnimationWithData(renderer, "stelar.LAND", "skyhighocs:stelar_landing", "skyhighocs:dyn/superhero_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "stelar.LAND_BOOST", "skyhighocs:stelar_boosting_landing", "skyhighocs:dyn/superhero_boosting_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "stelar.ROLL", "skyhighocs:flight/stelar_barrel_roll", "fiskheroes:barrel_roll_timer")
    .priority = 10;
  addHoverAnimation(renderer, "stelar.HOVER", "skyhighocs:stelar_hover");
};
//Mega Buster
function initMegaBuster(renderer, color, color_other) {
  renderer.bindProperty("fiskheroes:energy_bolt").color.set(color);
  bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", color_other, [
    { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [1.5, 1.5] }
  ]);
};

function initNV(renderer) {
  nv_wave_change = renderer.bindProperty("fiskheroes:night_vision");
  nv_wave_change.fogStrength = 0.0;
  nv_wave_change.factor = 1.0;
  nv_wave_change.firstPersonOnly = true;
  nv_wave_change.setCondition(entity => entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") > 0.75);
  nv_visualizer = renderer.bindProperty("fiskheroes:night_vision");
  nv_visualizer.fogStrength = 0.0;
  nv_visualizer.factor = 1.0;
  nv_visualizer.firstPersonOnly = true;
  nv_visualizer.setCondition(entity => entity.getData("skyhighocs:dyn/visualizer_toggle"));
};

//Equipment
function initLiveries(renderer) {
  var livery_shield = renderer.bindProperty("fiskheroes:livery");
  livery_shield.texture.set("shield", "shield_lights");
  livery_shield.weaponType = "SHIELD";
  var livery_katana = renderer.bindProperty("fiskheroes:livery");
  livery_katana.texture.set("katana", "katana_lights");
  livery_katana.weaponType = "KATANA";
  var livery_scythe = renderer.bindProperty("fiskheroes:livery");
  livery_scythe.texture.set("scythe", "scythe_lights");
  livery_scythe.weaponType = "RUPTURES_SCYTHE";
  var livery_rifle = renderer.bindProperty("fiskheroes:livery");
  livery_rifle.texture.set("rifle", "rifle_lights");
  livery_rifle.weaponType = "CHRONOS_RIFLE";
};

function blockBelowStand(entity, block) {
  return (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM") && entity.world().getBlock(entity.pos().add(0, -1, 0)) == block;
};

/**
 * Creates battle card rendering
 * @param {JSHeroRenderer} renderer - Required
 * @param {string} battleCard - Name of battle card
 * @param {number} textureType - Texture format (0=null,1=Match,2=Sides are the same,3=Top and bottom are different)
 * @param {number} lightType - Light format (0=null,1=Match,2=Sides are the same,3=Front only,4=Front no lights)
 **/
function initHandThing(renderer, battleCard, textureType, lightType, offset) {
  if (typeof offset === "undefined") {
    offset = 0;
  };
  var rightTexture;
  var rightLights;
  var leftTexture;
  var leftLights;
  var topTexture;
  var topLights;
  var bottomTexture;
  var bottomLights;
  var frontTexture;
  var frontLights;

  switch (textureType) {
    //Just to null the base texture for wave change
    case 0:
      rightTexture = null;
      leftTexture = null;
      topTexture = null;
      bottomTexture = null;
      frontTexture = null;
      break;
    //Default where the side matches the texture name
    case 1:
      rightTexture = battleCard + "_right";
      leftTexture = battleCard + "_left";
      topTexture = battleCard + "_top";
      bottomTexture = battleCard + "_bottom";
      frontTexture = battleCard + "_front";
      break;
    //Most basic where all sides are the same
    case 2:
      rightTexture = battleCard + "_sides";
      leftTexture = battleCard + "_sides";
      topTexture = battleCard + "_sides";
      bottomTexture = battleCard + "_sides";
      frontTexture = battleCard + "_front";
      break;
    //Left and right are the same but top and bottom are different
    case 3:
      rightTexture = battleCard + "_sides";
      leftTexture = battleCard + "_sides";
      topTexture = battleCard + "_top";
      bottomTexture = battleCard + "_bottom";
      frontTexture = battleCard + "_front";
      break;
    default:
      rightTexture = null;
      leftTexture = null;
      topTexture = null;
      bottomTexture = null;
      frontTexture = null;
      break;
  };
  
  switch (lightType) {
    //No lights
    case 0:
      rightLights = null;
      leftLights = null;
      topLights = null;
      bottomLights = null;
      frontLights = null;
      break;
    //Default where there is no lights
    case 1:
      rightLights = battleCard + "_right_lights";
      leftLights = battleCard + "_left_lights";
      topLights = battleCard + "_top_lights";
      bottomLights = battleCard + "_bottom_lights";
      frontLights = battleCard + "_front_lights";
      break;
    //Most basic where all sides are the same
    case 2:
      rightLights = battleCard + "_sides_lights";
      leftLights = battleCard + "_sides_lights";
      topLights = battleCard + "_sides_lights";
      bottomLights = battleCard + "_sides_lights";
      frontLights = battleCard + "_front_lights";
      break;
    //Front only has lights
    case 3:
      rightLights = null;
      leftLights = null;
      topLights = null;
      bottomLights = null;
      frontLights = battleCard + "_front_lights";
      break;
    case 4:
      rightLights = battleCard + "_right_lights";
      leftLights = battleCard + "_left_lights";
      topLights = battleCard + "_top_lights";
      bottomLights = battleCard + "_bottom_lights";
      frontLights = null;
      break;
    default:
      rightLights = null;
      leftLights = null;
      topLights = null;
      bottomLights = null;
      frontLights = null;
      break;
  };

  //Right
  var battleCardRight = renderer.createEffect("fiskheroes:shield");
  battleCardRight.texture.set(rightTexture, rightLights);
  battleCardRight.anchor.set("rightArm");
  battleCardRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5 + offset, 3.0);
  battleCardRight.large = true;
  //Left
  var battleCardLeft = renderer.createEffect("fiskheroes:shield");
  battleCardLeft.texture.set(leftTexture, leftLights);
  battleCardLeft.anchor.set("rightArm");
  battleCardLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5 + offset, -3.0);
  battleCardLeft.large = true;
  //Top
  var battleCardTop = renderer.createEffect("fiskheroes:shield");
  battleCardTop.texture.set(topTexture, topLights);
  battleCardTop.anchor.set("rightArm");
  battleCardTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5 + offset, 0.0);
  battleCardTop.large = true;
  //Bottom
  var battleCardBottom = renderer.createEffect("fiskheroes:shield");
  battleCardBottom.texture.set(bottomTexture, bottomLights);
  battleCardBottom.anchor.set("rightArm");
  battleCardBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5 + offset, 0.0);
  battleCardBottom.large = true;
  //Front
  var battleCardFront = renderer.createEffect("fiskheroes:shield");
  battleCardFront.texture.set(frontTexture, frontLights);
  battleCardFront.anchor.set("rightArm");
  battleCardFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5 + offset, 0.0);
  battleCardFront.large = true;
  return {
    render: () => {
      battleCardRight.render();
      battleCardLeft.render();
      battleCardTop.render();
      battleCardBottom.render();
      battleCardFront.render();
    }
  }
}

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
  var disabledModules = entity.getWornChestplate().nbt().getStringList("disabledModules");
  var modulesDisabled = getStringArray(disabledModules);
  var result = false;
  modulesDisabled.forEach(entry => {
    if (entry == moduleName) {
      result = true;
    };
  });
  return result;
};
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

//Cyber Animations
function initCyberneticAnimations(renderer) {
  addAnimation(renderer, "cybernetic.LEFT_ARM_BLADE", "skyhighocs:cybernetic_left_arm_blade").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_deploy_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer"));
  });
  addAnimation(renderer, "cybernetic.RIGHT_ARM_BLADE", "skyhighocs:cybernetic_right_arm_blade").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_deploy_timer"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_stealth_timer"));
  });
  addAnimation(renderer, "cybernetic.LEFT_LEG_ROCKETS", "skyhighocs:cybernetic_left_leg_rockets").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_deploy_timer"));
  });
  addAnimation(renderer, "cybernetic.RIGHT_LEG_ROCKETS", "skyhighocs:cybernetic_right_leg_rockets").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_deploy_timer"));
  });
  addAnimation(renderer, "cybernetic.WINGS", "skyhighocs:cybernetic_wings").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/wings_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_deploy_timer"));
  });
  addAnimation(renderer, "cybernetic.LEFT_ARM_AIM", "skyhighocs:cybernetic_left_arm_aim").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_timer"));
  });
  addAnimation(renderer, "cybernetic.RIGHT_ARM_AIM", "skyhighocs:cybernetic_right_arm_aim").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_timer"));
  });
  addAnimation(renderer, "cybernetic.LEFT_ARM_SHIELD", "skyhighocs:cybernetic_left_arm_shield").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_timer") * entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * (1 - entity.getInterpolatedData("fiskheroes:beam_charge")));
  });
  addAnimation(renderer, "cybernetic.RIGHT_ARM_SHIELD", "skyhighocs:cybernetic_right_arm_shield").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_timer") * entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * (1 - entity.getInterpolatedData("fiskheroes:beam_charge")));
  });
  addAnimation(renderer, "cybernetic.DRIVE", "skyhighocs:cybernetic_drive").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/ports_timer"));
  });
  addAnimation(renderer, "cybernetic.BASE", "skyhighocs:cybernetic_base").setData((entity, data) => {
    data.load(1.0);
  })
  .setCondition(entity => (entity.getInterpolatedData("skyhighocs:dyn/thermoptic_disguise_timer") < 1))
  .priority = -11;/* 
  addAnimation(renderer, "cybernetic.LEFT_ARM_PUNCH", "skyhighocs:cybernetic_left_arm_punch").setData((entity, data) => {
    data.load(entity.getPunchTimerInterpolated());
  })
  .setCondition(entity => (entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer") == 1))
  .priority = -8;
  addAnimation(renderer, "cybernetic.RIGHT_ARM_PUNCH", "skyhighocs:cybernetic_right_arm_punch").setData((entity, data) => {
    data.load(entity.getPunchTimerInterpolated());
  })
  .setCondition(entity => (entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer") == 1))
  .priority = -8; */
  addAnimation(renderer, "cybernetic.DUAL_PUNCH", "skyhighocs:cybernetic_dual_punch").setData((entity, data) => {
    data.load(1.0);
  })
  .setCondition(entity => ((entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer") == 1) && (entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer") == 1)))
  .priority = -8;
  //Flight
  addFlightAnimationWithLanding(renderer, "cybernetic.FLIGHT", "skyhighocs:cybernetic_flight.anim.json");
  //Landing
  addAnimationWithData(renderer, "cybernetic.LAND", "skyhighocs:cybernetic_landing", "skyhighheroes:dyn/superhero_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "cybernetic.LAND_BOOST", "skyhighocs:cybernetic_boosting_landing", "skyhighheroes:dyn/superhero_boosting_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "cybernetic.ROLL", "skyhighocs:cybernetic_barrel_roll", "fiskheroes:barrel_roll_timer")
  addHoverAnimation(renderer, "cybernetic.HOVER", "skyhighocs:cybernetic_hover");
  addAnimationWithData(renderer, "cybernetic.POWER", "skyhighocs:cybernetic_powering_down", "skyhighocs:dyn/powering_down_timer")
    .setCondition(entity => (!entity.is("DISPLAY") && entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer") > 0))
    .priority = -10;
  addAnimation(renderer, "cybernetic.POWERED_DOWN", "skyhighocs:cybernetic_powering_down")
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

function initTentacles(renderer, model) {
  var tentacleBase = model.getCubeOffset("body_ext_arm_left");
  var arm = renderer.createResource("MODEL", "skyhighocs:CyberneticArm");
  arm.texture.set("arm", "arm_lights");
  var claw = renderer.createResource("MODEL", "skyhighocs:CyberneticClaw");
  claw.texture.set("claw", "claw_lights");
  claw.bindAnimation("fiskheroes:ock_claw").setData((entity, data) => {
      var t = entity.as("TENTACLE");
      data.load(0, 1 - Math.min(t.getCaster().getInterpolatedData("fiskheroes:tentacle_extend_timer") * 2, 1));
      data.load(1, t.getIndex());
      data.load(2, t.getGrabTimer());
      data.load(3, t.getStrikeTimer());
  });

  var tentacles = renderer.bindProperty("fiskheroes:tentacles").setTentacles([
      { "offset": [2.0, -7.5, -4.65], "direction": [2.0, 15.0, -25.0] },
      { "offset": [-2.0, -7.5, -4.65], "direction": [-2.0, 15.0, -25.0] }
  ]);
  tentacles.anchor.set("body", tentacleBase);
  tentacles.setSegmentModel(arm);
  tentacles.setHeadModel(claw);
  tentacles.segmentLength = 1.8;
  tentacles.segments = 16;
};
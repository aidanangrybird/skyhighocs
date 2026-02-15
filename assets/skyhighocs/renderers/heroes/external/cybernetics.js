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

//Cyber Animations
function initCyberneticAnimations(renderer) {
  addAnimation(renderer, "cybernetic.LEFT_ARM_BLADE", "skyhighocs:cybernetic_left_arm_blade").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer") + getHoloBooleans(entity, "holoBlades", "bladesLeft"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer") + getHoloBooleans(entity, "holoBlades", "bladesLeftStealth"));
  });
  addAnimation(renderer, "cybernetic.RIGHT_ARM_BLADE", "skyhighocs:cybernetic_right_arm_blade").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer") + getHoloBooleans(entity, "holoBlades", "bladesRight"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_stealth_timer") + getHoloBooleans(entity, "holoBlades", "bladesRightStealth"));
  });
  addAnimation(renderer, "cybernetic.LEFT_LEG_ROCKETS", "skyhighocs:cybernetic_left_leg_rockets").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer") + getHoloBooleans(entity, "holoFlight", "innerRockets"));
  });
  addAnimation(renderer, "cybernetic.RIGHT_LEG_ROCKETS", "skyhighocs:cybernetic_right_leg_rockets").setData((entity, data) => {
    data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
    data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
    data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer") + getHoloBooleans(entity, "holoFlight", "innerRockets"));
  });
  addAnimation(renderer, "cybernetic.WING_LEFT", "skyhighocs:cybernetic_wing_left").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/wing_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer") + getHoloBooleans(entity, "holoFlight", "rocketsWings") + getHoloBoolean(entity, "holoGlide"));
  });
  addAnimation(renderer, "cybernetic.WING_RIGHT", "skyhighocs:cybernetic_wing_right").setData((entity, data) => {
    data.load( entity.getInterpolatedData("skyhighocs:dyn/wing_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer") + getHoloBooleans(entity, "holoFlight", "rocketsWings") + getHoloBoolean(entity, "holoGlide"));
  });
  addAnimation(renderer, "cybernetic.LEFT_ARM_AIM", "skyhighocs:cybernetic_left_arm_aim").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer") + getHoloBooleans(entity, "holoCannons", "cannonsArms"));
  });
  addAnimation(renderer, "cybernetic.RIGHT_ARM_AIM", "skyhighocs:cybernetic_right_arm_aim").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer") + getHoloBooleans(entity, "holoCannons", "cannonsArms"));
  });
  addAnimation(renderer, "cybernetic.LEFT_ARM_SHIELD", "skyhighocs:cybernetic_left_arm_shield").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_timer") * entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * (1 - entity.getInterpolatedData("fiskheroes:beam_charge")));
  });
  addAnimation(renderer, "cybernetic.RIGHT_ARM_SHIELD", "skyhighocs:cybernetic_right_arm_shield").setData((entity, data) => {
    data.load(entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_timer") * entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * (1 - entity.getInterpolatedData("fiskheroes:beam_charge")));
  });
  addAnimation(renderer, "cybernetic.BASE", "skyhighocs:cybernetic_base").setData((entity, data) => {
    data.load(1.0);
  })
  .setCondition(entity => !entity.is("DISPLAY") && !entity.getWornHelmet().nbt().getBoolean("naturalArms") && (entity.getInterpolatedData("skyhighocs:dyn/thermoptic_disguise_timer") < 1))
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
  addFlightAnimationWithLanding(renderer, "cybernetic.FLIGHT", "skyhighocs:flight/cybernetic_flight.anim.json");
  //Landing
  addAnimationWithData(renderer, "cybernetic.LAND", "skyhighocs:cybernetic_landing", "skyhighocs:dyn/superhero_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "cybernetic.LAND_BOOST", "skyhighocs:cybernetic_boosting_landing", "skyhighocs:dyn/superhero_boosting_landing_timer")
    .priority = -8;
  addAnimationWithData(renderer, "cybernetic.ROLL", "skyhighocs:flight/cybernetic_barrel_roll", "fiskheroes:barrel_roll_timer")
  addHoverAnimation(renderer, "cybernetic.HOVER", "skyhighocs:cybernetic_hover");
  addAnimationWithData(renderer, "cybernetic.POWER", "skyhighocs:cybernetic_powering_down", "skyhighocs:dyn/powering_down_timer")
    .setCondition(entity => (!entity.is("DISPLAY") && entity.getInterpolatedData("skyhighocs:dyn/powering_down_timer") > 0))
    .priority = -10;

  addAnimation(renderer, "cybernetic.HOLOGRAM_FLIGHT", "skyhighocs:cybernetic_holo_flight").setData((entity, data) => {
    data.load(0, 0.0 + getHoloBoolean(entity, "holoFlight") ? (getHoloBoolean(entity, "rocketsAux") + getHoloBoolean(entity, "rocketsBody") + getHoloBoolean(entity, "rocketsLegs")) : 0.0);
    data.load(1, 0.0 + getHoloBoolean(entity, "holoBoostFlight"));
  }).priority = -9;

  addAnimation(renderer, "cybernetic.HOLOGRAM_GLIDE", "skyhighocs:cybernetic_holo_glide").setData((entity, data) => {
    data.load(0.0 + getHoloBoolean(entity, "holoGlide"));
  }).priority = -9;
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
  tentacles.setCondition(entity => entity.getInterpolatedData("skyhighocs:dyn/thermoptic_camouflage_timer") == 0)
};

function initSatelliteBeams(renderer, model, color) {
  var receiveBase = model.getCubeOffset("head_satellite_dish_base");
  var transmitBase = model.getCubeOffset("head_satellite_dish_antenna");

  var transmitBeamRenderer = renderer.createResource("BEAM_RENDERER", "skyhighocs:cybernetic_transmit");
  var transmitShape = renderer.createResource("SHAPE", null);
  var transmitLine = transmitShape.bindLine({ "start": [0.0, 0.1875, 0.0], "end": [0.0, 0.1875, 0.0], "size": [0.5, 0.5] });
  var transmitBeam = renderer.createEffect("fiskheroes:lines").setRenderer(transmitBeamRenderer).setShape(transmitShape).setOffset(0.0, 0.0, 0.0);
  transmitBeam.mirror = false;
  transmitBeam.setScale(16.0);
  transmitBeam.anchor.set("head", transmitBase);
  transmitBeam.color.set(color);

  var receiveBeamRenderer = renderer.createResource("BEAM_RENDERER", "skyhighocs:cybernetic_receive");
  var receiveShape = renderer.createResource("SHAPE", null);
  var receiveLine = receiveShape.bindLine({ "start": [0.0, 300.375, 0.0], "end": [0.0, 300.375, 0.0], "size": [15.0, 15.0] });
  var receiveBeam = renderer.createEffect("fiskheroes:lines").setRenderer(receiveBeamRenderer).setShape(receiveShape).setOffset(0.0, 0.0, 0.0);
  receiveBeam.mirror = false;
  receiveBeam.setScale(16.0);
  receiveBeam.anchor.set("head", receiveBase);
  receiveBeam.color.set(color);
  
  return {
    render: function (entity, isFirstPersonArm) {
      var vector = PackLoader.asVec3(entity.getWornHelmet().nbt().getShort("xSat")+0.5, entity.getWornHelmet().nbt().getShort("ySat")+0.5, entity.getWornHelmet().nbt().getShort("zSat")+0.5);
      var transmitTimer = entity.getInterpolatedData("skyhighocs:dyn/transmit_beam_timer");
      var receiveTimer = entity.getInterpolatedData("skyhighocs:dyn/receive_beam_timer");
      var factor = entity.eyePos().add(0, 1, 0).distanceTo(vector);
      receiveLine.start.y = factor+0.375;
      receiveLine.end.y = factor+0.375;
      transmitLine.end.y = transmitLine.start.y+factor*transmitTimer;
      receiveLine.end.y = receiveLine.start.y-factor*receiveTimer;
      if (!isFirstPersonArm) {
        if (entity.world().isUnobstructed(entity.eyePos().add(0, 1, 0), vector) && entity.getData("skyhighocs:dyn/satellite")) {
          if (transmitTimer > 0) {
            transmitBeam.render();
          };
          if (receiveTimer > 0) {
            receiveBeam.render();
          };
        };
      };
    }
  };
};

function initAntennaBeams(renderer, model, color) {
  var receiveBase = model.getCubeOffset("head_antenna_upper");
  var transmitBase = model.getCubeOffset("head_antenna_upper");

  var transmitBeamRenderer = renderer.createResource("BEAM_RENDERER", "skyhighocs:cybernetic_transmit");
  var transmitShape = renderer.createResource("SHAPE", null);
  var transmitLine = transmitShape.bindLine({ "start": [0.0, 0.0, 0.0], "end": [0.0, 0.0, 0.0], "size": [0.5, 0.5] });
  var transmitBeam = renderer.createEffect("fiskheroes:lines").setRenderer(transmitBeamRenderer).setShape(transmitShape).setOffset(0.0, -6.0, 0.0);
  transmitBeam.mirror = false;
  transmitBeam.setScale(16.0);
  transmitBeam.anchor.set("head", transmitBase);
  transmitBeam.color.set(color);

  var receiveBeamRenderer = renderer.createResource("BEAM_RENDERER", "skyhighocs:cybernetic_receive");
  var receiveShape = renderer.createResource("SHAPE", null);
  var receiveLine = receiveShape.bindLine({ "start": [0.0, 0.0, 0.0], "end": [0.0, 0.0, 0.0], "size": [0.75, 0.75] });
  var receiveBeam = renderer.createEffect("fiskheroes:lines").setRenderer(receiveBeamRenderer).setShape(receiveShape).setOffset(0.0, -6.0, 0.0);
  receiveBeam.mirror = false;
  receiveBeam.setScale(16.0);
  receiveBeam.anchor.set("head", receiveBase);
  receiveBeam.color.set(color);
  
  return {
    render: function (entity, isFirstPersonArm) {
      if (!isFirstPersonArm) {
        var entities = entity.world().getEntitiesInRangeOf(entity.pos(), 6);
        entities.forEach(otherEntity => {
          var otherVector = otherEntity.eyePos().add(crossProduct(PackLoader.asVec3(0, 1, 0), otherEntity.getLookVector()));
          var factor = entity.eyePos().add(0, 1, 0).distanceTo(otherVector);
          receiveLine.start.y = factor;
          receiveLine.end.y = factor;
          transmitLine.end.y = transmitLine.start.y+factor;
          receiveLine.end.y = receiveLine.start.y-factor;
          var otherPitch = elevation(entity, otherVector.x(), otherVector.y(), otherVector.z());
          var otherYaw = directionAngle(entity, otherVector.x(), otherVector.z());
          transmitBeam.setRotation(-1*otherPitch, 0, entity.rotationInterpolated().x()-otherYaw);
          receiveBeam.setRotation(-1*otherPitch, 0, entity.rotationInterpolated().x()-otherYaw);
          if (factor > 0 && entity.getData("skyhighocs:dyn/antenna_timer") == 1) {
            transmitBeam.render();
            receiveBeam.render();
          };
          /* if (hasCyberneticBody(otherEntity) && checkFrequency(entity, otherEntity)) {
            if (entity.world().isUnobstructed(entity.eyePos().add(0, 1, 0), otherEntity.eyePos().add(0, 1, 0)) && entity.getData("skyhighocs:dyn/antenna") && otherEntity.getData("skyhighocs:dyn/antenna")) {
            };
          }; */
        });
      };
    }
  };
};

/**
 * Checks a NBT boolean to be used on holographic display stand
 * @param {JSEntity} entity - required
 * @param {string} value - NBT boolean to check
 * @returns NBT boolean if the entity is a holographic display stand
 **/
function getHoloBoolean(entity, value) {
  return entity.is("DISPLAY") && entity.getWornHelmet().nbt().getBoolean(value) && (entity.as("DISPLAY").getDisplayType() == "HOLOGRAM");
};

/**
 * Checks two NBT booleans to be used on holographic display stand
 * @param {JSEntity} entity - required
 * @param {string} condition - NBT boolean to use for condition
 * @param {string} value - NBT boolean to use for condition
 * @returns NBT boolean if the entity is a holographic display stand
 **/
function getHoloBooleans(entity, condition, value) {
  return entity.is("DISPLAY") && entity.getWornHelmet().nbt().getBoolean(condition) && entity.getWornHelmet().nbt().getBoolean(value) && (entity.as("DISPLAY").getDisplayType() == "HOLOGRAM");
};

function elevation(entity, posX, posY, posZ) {
  var distance = entity.pos().xz().distanceTo(posX, posZ);
  var vector = PackLoader.asVec2(0, entity.pos().y());
  var angle = 90-vector.angleTo(distance, posY);
  return angle;
};

/**
 * Gets direction from one vector to another
 * @param {JSVector3} base - Base vector
 * @param {JSVector3} other - Vector to measure to
 * @returns Direction
 **/
function directionAngle(entity, posX, posZ) {
  var angle = (entity.eyePos().add(0,1,0).xz().angleTo(posX, posZ) + 90);
  return angle;
};

function crossProduct(vector, otherVector) {
  var i = (vector.y()*otherVector.z()-vector.z()*otherVector.y());
  var j = (vector.z()*otherVector.x()-vector.x()*otherVector.z());
  var k = (vector.x()*otherVector.y()-vector.y()*otherVector.x());
  var finalVector = PackLoader.asVec3(i,j,k);
  return finalVector;
};

function headAnimations(entity, data) {
  data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_head_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_head_timer") + getHoloBooleans(entity, "holoCannons", "cannonsHead"));
  data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_head_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_head_timer") + getHoloBooleans(entity, "holoCannons", "cannonsHead"));
  data.load(2, entity.getInterpolatedData("skyhighocs:dyn/mouth_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/mouth_timer") + getHoloBoolean(entity, "holoMouth"));
  data.load(3, entity.getInterpolatedData("skyhighocs:dyn/satellite_timer") + getHoloBoolean(entity, "holoSat"));
  data.load(4, entity.getInterpolatedData("skyhighocs:dyn/satellite_rain_mode_timer"));
  data.load(5, entity.getInterpolatedData("skyhighocs:dyn/antenna_timer") + getHoloBoolean(entity, "holoAnt"));
  data.load(6, entity.getInterpolatedData("skyhighocs:dyn/cannon_head_flush_timer"));
  data.load(7, entity.getInterpolatedData("skyhighocs:dyn/mouth_flush_timer"));
  data.load(8, stuff.getBearing(entity));
  data.load(9, entity.rotationInterpolated().y());
  data.load(10, stuff.directionAngle(entity, entity.getWornHelmet().nbt().getShort("xSat")+0.5, entity.getWornHelmet().nbt().getShort("zSat")+0.5));
  data.load(11, stuff.elevation(entity, entity.getWornHelmet().nbt().getShort("xSat")+0.5, entity.getWornHelmet().nbt().getShort("ySat")+0.5, entity.getWornHelmet().nbt().getShort("zSat")+0.5));
  data.load(12, entity.getInterpolatedData("skyhighocs:dyn/eye_left_lid_timer"));
  data.load(13, entity.getInterpolatedData("skyhighocs:dyn/eye_right_lid_timer"));
  data.load(14, entity.getInterpolatedData("skyhighocs:dyn/eye_left_X_timer"));
  data.load(15, entity.getInterpolatedData("skyhighocs:dyn/eye_right_X_timer"));
  data.load(16, entity.getInterpolatedData("skyhighocs:dyn/eye_left_Y_timer"));
  data.load(17, entity.getInterpolatedData("skyhighocs:dyn/eye_right_Y_timer"));
};

function bodyAnimations(entity, data) {
  data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_body_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer") + getHoloBooleans(entity, "holoFlight", "rocketsBody"));
  data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_body_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_body_timer") + getHoloBooleans(entity, "holoFlight", "rocketsBody"));
  data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_body_timer") + getHoloBooleans(entity, "holoCannons", "cannonsBody"));
  data.load(3, entity.getInterpolatedData("skyhighocs:dyn/cannon_body_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_body_timer") + getHoloBooleans(entity, "holoCannons", "cannonsBody"));
  data.load(4, entity.getInterpolatedData("skyhighocs:dyn/wing_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer") + getHoloBooleans(entity, "holoFlight", "rocketsWings") + getHoloBoolean(entity, "holoGlide"));
  data.load(5, entity.getInterpolatedData("skyhighocs:dyn/wing_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/wings_timer") + getHoloBooleans(entity, "holoFlight", "rocketsWings") + getHoloBoolean(entity, "holoGlide"));
  data.load(6, entity.getInterpolatedData("skyhighocs:dyn/external_arm_left_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
  data.load(7, entity.getInterpolatedData("skyhighocs:dyn/external_arm_right_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/external_arms_timer"));
};

function leftArmAnimations(entity, data) {
  data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_bottom_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer") + getHoloBooleans(entity, "holoCannons", "cannonsArms"));
  data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer") + getHoloBooleans(entity, "holoCannons", "cannonsArms"));
  data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer") + getHoloBooleans(entity, "holoCannons", "cannonsArms"));
  data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_arm_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(6, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_timer") + getHoloBooleans(entity, "holoBlades", "bladesLeft"));
  data.load(7, entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/shield_left_arm_timer") + getHoloBooleans(entity, "holoShields", "shieldsLeft"));
  data.load(8, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer") + getHoloBooleans(entity, "holoBlades", "bladesLeftStealth"));
  data.load(9, entity.getInterpolatedData("skyhighocs:dyn/cannon_left_arm_flush_timer"));
};

function rightArmAnimations(entity, data) {
  data.load(0, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_bottom_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer") + getHoloBooleans(entity, "holoCannons", "cannonsArms"));
  data.load(1, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer") + getHoloBooleans(entity, "holoCannons", "cannonsArms"));
  data.load(2, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/cannons_arms_timer") + getHoloBooleans(entity, "holoCannons", "cannonsArms"));
  data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_arm_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(6, entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/blade_right_arm_timer") + getHoloBooleans(entity, "holoBlades", "bladesRight"));
  data.load(7, entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/shield_right_arm_timer") + getHoloBooleans(entity, "holoShields", "shieldsRight"));
  data.load(8, entity.getInterpolatedData("skyhighocs:dyn/blade_left_arm_stealth_timer") + getHoloBooleans(entity, "holoBlades", "bladesRightStealth"));
  data.load(9, entity.getInterpolatedData("skyhighocs:dyn/cannon_right_arm_flush_timer"));
};

function leftLegAnimations(entity, data) {
  data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_main_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_outer_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(6, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(7, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(8, entity.getInterpolatedData("skyhighocs:dyn/rocket_left_leg_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(9, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer") + getHoloBooleans(entity, "holoFlight", "innerRockets"));
};

function rightLegAnimations(entity, data) {
  data.load(0, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_main_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(1, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_outer_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(2, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(3, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_front_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(4, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_back_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_legs_timer") + getHoloBooleans(entity, "holoFlight", "rocketsLegs"));
  data.load(5, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_outer_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(6, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_inner_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(7, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_front_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(8, entity.getInterpolatedData("skyhighocs:dyn/rocket_right_leg_back_booster_deploy_timer") + entity.getInterpolatedData("skyhighocs:dyn/rockets_aux_timer") + getHoloBooleans(entity, "holoFlight", "rocketsAux"));
  data.load(9, entity.getInterpolatedData("skyhighocs:dyn/rocket_inner_legs_timer") + getHoloBooleans(entity, "holoFlight", "innerRockets"));
};

function hudPlayer(renderer) {
  //Body
  var body_hud = renderer.createResource("MODEL", "skyhighocs:CyberneticBodyL2");
  body_hud.texture.set("body_disguise", "body_disguise");
  body_hud.bindAnimation("skyhighocs:cybernetic_body").setData((entity, data) => bodyAnimations(entity, data));
  var body_hud_model = renderer.createEffect("fiskheroes:model").setModel(body_hud);
  body_hud_model.anchor.set("head");
  body_hud_model.anchor.ignoreAnchor(true);
  body_hud_model.setScale(1.0);
  var body_point = body_hud.getCubeOffset("body");
  //Head
  var head_hud = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_hud.texture.set("head_disguise", "head_disguise");
  head_hud.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => headAnimations(entity, data));
  var head_hud_model = renderer.createEffect("fiskheroes:model").setModel(head_hud);
  head_hud_model.anchor.set("head", body_point);
  head_hud_model.anchor.ignoreAnchor(true);
  head_hud_model.setScale(1.0);
  //Hair
  var head_hair_hud = renderer.createResource("MODEL", "skyhighocs:CyberneticHeadL2");
  head_hair_hud.texture.set("head_hair_disguise", "head_hair_disguise");
  head_hair_hud.bindAnimation("skyhighocs:cybernetic_head").setData((entity, data) => headAnimations(entity, data));
  var head_hair_hud_model = renderer.createEffect("fiskheroes:model").setModel(head_hair_hud);
  head_hair_hud_model.setOffset(0.0, 0.5, 0.0);
  head_hair_hud_model.anchor.set("head", body_point);
  head_hair_hud_model.anchor.ignoreAnchor(true);
  head_hair_hud_model.setScale(1.125);
  //Left arm
  var left_arm_hud = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftArmL2");
  left_arm_hud.texture.set("left_arm_disguise", "left_arm_disguise");
  left_arm_hud.bindAnimation("skyhighocs:cybernetic_left_arm").setData((entity, data) => leftArmAnimations(entity, data));
  var left_arm_hud_model = renderer.createEffect("fiskheroes:model").setModel(left_arm_hud);
  left_arm_hud_model.anchor.set("head", body_point);
  left_arm_hud_model.anchor.ignoreAnchor(true);
  //Right arm
  var right_arm_hud = renderer.createResource("MODEL", "skyhighocs:CyberneticRightArmL2");
  right_arm_hud.texture.set("right_arm_disguise", "right_arm_disguise");
  right_arm_hud.bindAnimation("skyhighocs:cybernetic_right_arm").setData((entity, data) => rightArmAnimations(entity, data));
  var right_arm_hud_model = renderer.createEffect("fiskheroes:model").setModel(right_arm_hud);
  right_arm_hud_model.anchor.set("head", body_point);
  right_arm_hud_model.anchor.ignoreAnchor(true);
  right_arm_hud_model.setScale(1.0);
  //Left leg
  var left_leg_hud = renderer.createResource("MODEL", "skyhighocs:CyberneticLeftLegL2");
  left_leg_hud.texture.set("left_leg_disguise", "left_leg_disguise");
  left_leg_hud.bindAnimation("skyhighocs:cybernetic_left_leg").setData((entity, data) => leftLegAnimations(entity, data));
  var left_leg_hud_model = renderer.createEffect("fiskheroes:model").setModel(left_leg_hud);
  left_leg_hud_model.anchor.set("head", body_point);
  left_leg_hud_model.anchor.ignoreAnchor(true);
  left_leg_hud_model.setScale(1.0);
  //Right leg
  var right_leg_hud = renderer.createResource("MODEL", "skyhighocs:CyberneticRightLegL2");
  right_leg_hud.texture.set("right_leg_disguise", "right_leg_disguise");
  right_leg_hud.bindAnimation("skyhighocs:cybernetic_right_leg").setData((entity, data) => rightLegAnimations(entity, data));
  var right_leg_hud_model = renderer.createEffect("fiskheroes:model").setModel(right_leg_hud);
  right_leg_hud_model.anchor.set("head", body_point);
  right_leg_hud_model.anchor.ignoreAnchor(true);
  right_leg_hud_model.setScale(1.0);
  return {
    render: (entity, isFirstPersonArm, posX, posY, posZ) => {
      if (isFirstPersonArm) {
        head_hud_model.setOffset(posX, posY, posZ);
        head_hud_model.render();
        head_hair_hud_model.setOffset(posX, posY, posZ);
        head_hair_hud_model.render();
        body_hud_model.setOffset(posX, posY, posZ);
        body_hud_model.render();
        left_arm_hud_model.setOffset(posX-5, posY+2, posZ);
        left_arm_hud_model.render();
        right_arm_hud_model.setOffset(posX+5, posY+2, posZ);
        right_arm_hud_model.render();
        left_leg_hud_model.setOffset(posX-2, posY+12, posZ);
        left_leg_hud_model.render();
        right_leg_hud_model.setOffset(posX+2, posY+12, posZ);
        right_leg_hud_model.render();
      };
    },
  };
};

/**
 * Gets the position of available cybers
 * @param {JSEntity} entity - Entity receiving data
 * @returns Position
 **/
function availableCybers(entity) {
  var range = 16;
  var foundPlayers = [];
  var foundPlayerNames = [];
  var data = [];
  var newRange = (range*1);
  var txAntennaDeployed = (entity.getData("skyhighocs:dyn/antenna_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
  var txSatelliteDeployed = (entity.getData("skyhighocs:dyn/satellite_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
  if (txAntennaDeployed) {
    newRange = (range*4);
  };
  var entities = entity.world().getEntitiesInRangeOf(entity.pos(), newRange);
  entities.forEach(otherEntity => {
    if (otherEntity.is("PLAYER") && (otherEntity.getUUID() != entity.getUUID())) {
      if (hasCyberneticBody(otherEntity) && checkFrequency(entity, otherEntity)) {
        if (foundPlayerNames.indexOf(otherEntity.getName()) == -1) {
          foundPlayerNames.push(otherEntity.getName());
          foundPlayers.push(otherEntity);
        };
      };
    };
  });
  if (txSatelliteDeployed) {
    var idList = getSatIDList(entity);
    idList.forEach(id => {
      if (id > -1) {
        if (isStillCyber(entity, id)) {
          var otherEntity = entity.world().getEntityById(id)
          if (foundPlayerNames.indexOf(otherEntity.getName()) == -1) {
            if (checkSatellite(entity, otherEntity)) {
              foundPlayerNames.push(otherEntity.getName());
              foundPlayers.push(otherEntity);
            };
          };
        };
      };
    });
  };
  if (foundPlayers.length > 0) {
    //entity = tx
    //player = rx
    foundPlayers.forEach(otherEntity => {
      var rxDomain = otherEntity.getWornHelmet().suitType().split(":")[0];
      var rxAntennaDeployed = (otherEntity.getData(rxDomain + ":dyn/antenna_timer") == 1) && (otherEntity.getData(rxDomain + ":dyn/satellite_rain_mode_timer") == 0);
      var rxSatelliteDeployed = (otherEntity.getData(rxDomain + ":dyn/satellite_timer") == 1) && (otherEntity.getData(rxDomain + ":dyn/satellite_rain_mode_timer") == 0);
      if (entity.canSee(otherEntity) && entity.pos().distanceTo(otherEntity.pos()) <= range) {
        data.push(position(otherEntity));
      } else if (txAntennaDeployed && rxAntennaDeployed && checkFrequency(entity, otherEntity) && entity.canSee(otherEntity) && (entity.pos().distanceTo(otherEntity.pos()) <= range*4)) {
        data.push(position(otherEntity));
      } else if (txSatelliteDeployed && rxSatelliteDeployed && checkSatellite(entity, otherEntity)) {
        data.push(position(otherEntity));
      };
    });
  };
  return data;
};

/**
 * Gets the position of a cyber
 * @param {JSEntity} entity - Entity getting checked
 * @returns Position
 **/
function position(entity) {
  var otherName = getModelID(entity);
  var positionMessage = otherName + ": " + entity.posX().toFixed(0) + ", " + entity.posY().toFixed(0) + ", " + entity.posZ().toFixed(0);
  return positionMessage
};

/**
 * Gets the Cyber ID
 * @param {JSEntity} entity - Entity getting checked
 * @returns The Cyber ID
 **/
function getModelID(entity) {
  return entity.getWornHelmet().nbt().getString("cyberModelID");
};
/**
 * Gets the Cyber name
 * @param {JSEntity} entity - Entity getting checked
 * @returns The Cyber alias
 **/
function getAliasName(entity) {
  return entity.getWornHelmet().nbt().getString("cyberAliasName");
};

/**
 * Gets satellite UUID list from entity 
 * @param {JSEntity} entity - Required
 **/
function getSatUUIDList(entity) {
  var list = entity.getWornHelmet().nbt().getTagList("playerInfoSat");
  var count = list.tagCount();
  var result = [];
  for (i=0;i<count;i++) {
    result.push(list.getCompoundTag(i).getString("uuid"));
  };
  return result;
};

/**
 * Gets satellite ID list from entity 
 * @param {JSEntity} entity - Required
 **/
function getSatIDList(entity) {
  var list = entity.getWornHelmet().nbt().getTagList("playerInfoSat");
  var count = list.tagCount();
  var result = [];
  for (i=0;i<count;i++) {
    result.push(list.getCompoundTag(i).getString("id"));
  };
  return result;
};

/**
 * Compares satellites between two entities
 * @param {JSEntity} entity - Required
 * @param {JSEntity} otherEntity - Required
 **/
function checkSatellite(entity, otherEntity) {
  var nbt = entity.getWornHelmet().nbt();
  var nbtOther = otherEntity.getWornHelmet().nbt()
  if ((nbt.getShort("xSat") == nbtOther.getShort("xSat")) && (nbt.getShort("ySat") == nbtOther.getShort("ySat")) && (nbt.getShort("zSat") == nbtOther.getShort("zSat"))) {
    return true;
  } else {
    return false;
  };
};

/**
 * Compares frequencies between two entities
 * @param {JSEntity} entity - Required
 * @param {JSEntity} otherEntity - Required
 **/
function checkFrequency(entity, otherEntity) {
  var nbt = entity.getWornHelmet().nbt();
  var nbtOther = otherEntity.getWornHelmet().nbt()
  if (nbt.getShort("freq") == nbtOther.getShort("freq")) {
    return true;
  } else {
    return false;
  };
};

/**
 * Attempts to get model of a cybernetic player by id
 * @param {JSEntity} entity - Required
 * @param {integer} id - ID
 **/
function isStillCyber(entity, id) {
  var result = false;
  var otherEntity = entity.world().getEntityById(id);
  if (otherEntity.exists() && otherEntity.isLivingEntity()) {
    if (otherEntity.is("PLAYER")) {
      var otherPlayer = otherEntity.as("PLAYER");
      if (otherPlayer.isWearingFullSuit() && entity.getWornHelmet().nbt().hasKey("computerID")) {
        if (hasCyberneticBody(otherPlayer)) {
          result = true;
        };
      };
    };
  };
  return result;
};

/**
 * Checks if an entity is cybernetic
 * @param {JSEntity} entity - Entity getting checked
 * @returns If the entity is cybernetic
 **/
function hasCyberneticBody(entity) {
  return entity.getWornHelmet().nbt().hasKey("cyberModelID") && entity.getWornHelmet().nbt().getString("cyberAliasName");
};
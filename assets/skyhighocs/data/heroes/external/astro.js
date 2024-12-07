/**
 * Initializes robot
 * @param {JSHero} hero - Required
 * @param {string} uuid - uuid of player
 * @param {string} name - Name of robot
 */
function initRobot(hero, uuid, name) {
  hero.setName(name)
  hero.setTier(8);
  hero.setLeggings("Shorts");
  hero.setBoots("Boots");
  hero.setVersion("OC");

  hero.addPowers("skyhighheroes:astro_blaster", "skyhighheroes:astro_engine", "skyhighheroes:astro_flight", "skyhighheroes:astro_body", "skyhighheroes:astro_brain", "skyhighheroes:astro_machine_guns");
  hero.addAttribute("SPRINT_SPEED", 0.5, 1);
  hero.addAttribute("STEP_HEIGHT", 0.5, 0);
  hero.addAttribute("JUMP_HEIGHT", 3.0, 0);
  hero.addAttribute("PUNCH_DAMAGE", 10.0, 0);
  hero.addAttribute("KNOCKBACK", 2.5, 0);
  hero.addAttribute("BASE_SPEED_LEVELS", 30.0, 0);
  hero.addAttribute("IMPACT_DAMAGE", 25.0, 0);
  hero.addAttribute("FALL_RESISTANCE", 1.0, 1);

  //Add keybinds for system test, boot rockets and arm rockets
  //Arm rockets keybind will inhibit the arm cannons
  hero.addKeyBindFunc("CYCLE_CLOTHES", cycleClothes, "Change Clothes", 1);
  hero.addKeyBind("ENERGY_PROJECTION", "Charged Arm Cannons", 2);
  hero.addKeyBind("DUAL_ARM_CANNONS", "Charged Arm Cannons", 2);
  hero.addKeyBind("SUPER_SPEED", "Super Speed", 3);
  hero.addKeyBind("AIM", "Aim Arm Cannon", 4);
  hero.addKeyBind("ARM_CANNON", "Aim Arm Cannon", 4);
  hero.addKeyBind("CHARGED_BEAM", "Butt Machine Guns", 5);

  hero.setDefaultScale(1.0);
  hero.setHasProperty((entity, property) => {
    return property == "BREATHE_SPACE" && entity.getUUID() == uuid;
  });
  hero.setModifierEnabled((entity, modifier) => {
    switch (modifier.name()) {
      case "fiskheroes:metal_skin":
        return entity.getUUID() == uuid && entity.getData("fiskheroes:metal_heat") < 1.0;
      case "fiskheroes:energy_projection":
        return entity.getUUID() == uuid && entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:aiming_timer") == 0 && entity.getData("fiskheroes:beam_charge") == 0;
      case "fiskheroes:energy_bolt":
        return entity.getUUID() == uuid && entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:beam_charge") == 0 && entity.getData("fiskheroes:energy_projection_timer") == 0;
      case "fiskheroes:super_speed":
        return entity.getUUID() == uuid && entity.getData("fiskheroes:flight_timer") == 0;
      case "fiskheroes:leaping":
        return entity.getUUID() == uuid && entity.getData("fiskheroes:aiming_timer") == 0 && entity.getData("fiskheroes:beam_charge") == 0 && entity.getData("fiskheroes:energy_projection_timer") == 0;
      case "fiskheroes:arrow_catching":
        return entity.getUUID() == uuid && entity.getData("fiskheroes:aiming_timer") == 0 && entity.getData("fiskheroes:beam_charge") == 0 && entity.getData("fiskheroes:energy_projection_timer") == 0;
      default:
        return entity.getUUID() == uuid;
    };
  });
  hero.supplyFunction("canAim", (entity) => {
    return entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:beam_charge") == 0 && entity.getData("fiskheroes:energy_projection_timer") == 0;
  });
  hero.setTierOverride((entity) => {
    return (entity.getUUID() == uuid) ? 8 : 0;
  });
  hero.setKeyBindEnabled((entity, keyBind) => {
    switch (keyBind) {
      case "ARM_CANNON":
        return entity.getUUID() == uuid && entity.getHeldItem().isEmpty() && entity.getData("skyhighheroes:dyn/astro_clothes") != 3;
      case "AIM":
        return entity.getUUID() == uuid && entity.getHeldItem().isEmpty() && (entity.getData("skyhighheroes:dyn/astro_clothes") == 3) ? true : (entity.getData("skyhighheroes:dyn/arm_cannon_timer") == 1);
      case "ENERGY_PROJECTION":
        return entity.getUUID() == uuid && entity.getHeldItem().isEmpty() && (entity.getData("skyhighheroes:dyn/astro_clothes") == 3) ? true : (entity.getData("skyhighheroes:dyn/dual_arm_cannon_timer") == 1);
      case "DUAL_ARM_CANNONS":
        return entity.getUUID() == uuid && entity.getHeldItem().isEmpty() && entity.getData("skyhighheroes:dyn/astro_clothes") != 3;
      default:
        return entity.getUUID() == uuid;
    };
  });
  hero.setTickHandler((entity, manager) => {
    manager.setData(entity, "fiskheroes:disguise", name);
    var x = entity.posX();
    var y = entity.posY();
    var z = entity.posZ();
    if (entity.world().getDimension() == 0 && entity.posY() >= 4000 && (entity.rotPitch() <= -87.5) && entity.getData("fiskheroes:flight_boost_timer") == 1) {
      manager.setData(entity, "fiskheroes:teleport_dest", manager.newCoords(x, y, z, 2595));
      manager.setData(entity, "fiskheroes:teleport_delay", 6);
    };
    if (entity.world().getDimension() == 2595 && entity.posY() >= 1000 && (entity.rotPitch() <= -87.5) && entity.getData("fiskheroes:flight_boost_timer") == 1) {
      manager.setData(entity, "fiskheroes:teleport_dest", new DimensionalCoords(x, y, z, 0));
      manager.setData(entity, "fiskheroes:teleport_delay", 6);
    };
    var t = entity.getData("skyhighheroes:dyn/superhero_boosting_landing_ticks");
    if (t == 0 && !entity.isSprinting() && !entity.isOnGround() && entity.motionY() < -1.25 && entity.getData("fiskheroes:flight_boost_timer") > 0 && entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() && entity.world().blockAt(entity.pos()).name() == "minecraft:air") {
      manager.setDataWithNotify(entity, "skyhighheroes:dyn/superhero_boosting_landing_ticks", t = 12);
    } else if (t > 0) {
      manager.setData(entity, "skyhighheroes:dyn/superhero_boosting_landing_ticks", --t);
    };
    manager.incrementData(entity, "skyhighheroes:dyn/superhero_boosting_landing_timer", 2, 8, t > 0);
    var pain = (entity.rotPitch() > 12.5 && entity.motionY() < -0.075 && entity.motionY() > -1.25 && (entity.motionZ() > 0.125 || entity.motionZ() < -0.125 || entity.motionX() > 0.125 || entity.motionX() < -0.125)) && !entity.isSprinting() && !entity.isOnGround() && entity.getData("fiskheroes:flight_timer") > 0 && (entity.world().blockAt(entity.pos().add(0, -1, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -3, 0)).isSolid()) && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.world().blockAt(entity.pos()).name() == "minecraft:air";
    manager.incrementData(entity, "skyhighheroes:dyn/superhero_landing_timer", 10, 10, pain);
  });
};

function cycleClothes(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/astro_clothes", player.getData("skyhighheroes:dyn/astro_clothes") + 1);
  if (player.getData("skyhighheroes:dyn/astro_clothes") > 3) {
    manager.setData(player, "skyhighheroes:dyn/astro_clothes", 0);
  };
  return true;
};
/*
function cannonType(player, manager) {
  manager.setData(player, "skyhighheroes:dyn/cannon_type", player.getData("skyhighheroes:dyn/cannon_type") + 1);
  if (player.getData("skyhighheroes:dyn/cannon_type") > 1) {
    manager.setData(player, "skyhighheroes:dyn/cannon_type", 0);
  };
  return true;
};*/
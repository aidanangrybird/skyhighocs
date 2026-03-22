aliasRegex = /[\s]/gm;

/**
 * Formats name to alias format
 * @param {string} input - Name to format
 * @returns Formatted alias
 **/
function formatAlias(input) {
  input = input.toLowerCase();
  output = input.replace(aliasRegex, function(thing) {
    return "_";
  });
  return output;
};

function initWaveSuit(hero, name, uuid) {
  var suit_name = name;
  var suit_alias = formatAlias(name) + "_wave_suit";
  hero.setName(suit_name);
  hero.setAliases(suit_alias);
  hero.setTier(1);
  hero.setChestplate("Wave Suit");
  hero.addPowers("skyhighocs:wave_suit")
  hero.setVersion("OC");

  hero.addKeyBind("TELEPORT", "Transmit", 3);
  hero.addKeyBind("INVISIBILITY", "Wave World", 4);
  hero.addKeyBind("INTANGIBILITY", "Become in Phase", 5);

  hero.setDefaultScale(1.0);
  hero.addDamageProfile("MAIN", {
    "types": {
      "ELEMENT_NONE": 1.0
    }
  });
  hero.setDamageProfile((entity) => {
    return "MAIN";
  });
  hero.setModifierEnabled((entity, modifier) => {
    switch (modifier.name()) {
      case "fiskheroes:intangibility":
        switch (modifier.id()) {
        case "not_absolute":
          return entity.getPunchTimer() > 0;
        case "absolute":
          return entity.getPunchTimer() == 0;
        default:
          return false;
      };
      case "fiskheroes:teleportation":
        return true;
      case "fiskheroes:invisibility":
        return true;
      case "fiskheroes:controlled_flight":
        return true;
      case "fiskheroes:damage_immunity":
        return entity.getData("fiskheroes:invisible");
      case "fiskheroes:fire_immunity":
        return entity.getData("fiskheroes:invisible");
      case "fiskheroes:shape_shifting":
        return entity.getUUID() == uuid;
      default:
        return false;
    };
  });
  hero.setKeyBindEnabled((entity, keyBind) => {
    switch (keyBind) {
      case "INVISIBILITY":
        return true;
      case "TELEPORT":
        return true;
      case "INTANGIBILITY":
        return true;
      default:
        return false;
    };
  });
  hero.setTickHandler((entity, manager) => {
    manager.setData(entity, "fiskheroes:penetrate_martian_invis", true);
    manager.setData(entity, "fiskheroes:disguise", suit_name);
    var x = entity.posX();
    var y = entity.posY();
    var z = entity.posZ();
    if (entity.world().getDimension() == 0 && entity.posY() >= 4000 && (entity.rotPitch() <= -87.5) && entity.getData("fiskheroes:flight_boost_timer") == 1) {
      manager.setData(entity, "fiskheroes:teleport_dest", manager.newCoords(x, y, z, 2595));
      manager.setData(entity, "fiskheroes:teleport_delay", 6);
    };
    if (entity.world().getDimension() == 2595 && entity.posY() >= 1000 && (entity.rotPitch() <= -87.5) && entity.getData("fiskheroes:flight_boost_timer") == 1) {
      manager.setData(entity, "fiskheroes:teleport_dest", manager.newCoords(x, y, z, 0));
      manager.setData(entity, "fiskheroes:teleport_delay", 6);
    };
    var t = entity.getData("skyhighocs:dyn/superhero_boosting_landing_ticks");
    if (t == 0 && !entity.isSprinting() && !entity.isOnGround() && entity.motionY() < -1.25 && entity.getData("fiskheroes:flight_boost_timer") > 0 && entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() && entity.world().blockAt(entity.pos()).name() == "minecraft:air") {
      manager.setDataWithNotify(entity, "skyhighocs:dyn/superhero_boosting_landing_ticks", t = 12);
    } else if (t > 0) {
      manager.setData(entity, "skyhighocs:dyn/superhero_boosting_landing_ticks", --t);
    };
    manager.incrementData(entity, "skyhighocs:dyn/superhero_boosting_landing_timer", 2, 8, t > 0);
    var pain = (entity.rotPitch() > 12.5 && entity.motionY() < -0.075 && entity.motionY() > -1.25 && (entity.motionZ() > 0.125 || entity.motionZ() < -0.125 || entity.motionX() > 0.125 || entity.motionX() < -0.125)) && !entity.isSprinting() && !entity.isOnGround() && entity.getData("fiskheroes:flight_timer") > 0 && (entity.world().blockAt(entity.pos().add(0, -1, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -3, 0)).isSolid()) && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.world().blockAt(entity.pos()).name() == "minecraft:air";
    manager.incrementData(entity, "skyhighocs:dyn/superhero_landing_timer", 10, 10, pain);
  });
};
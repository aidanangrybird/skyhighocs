var bodyTemp = implement("skyhighheroes:external/body_temperature");
var stelar = implement("skyhighheroes:external/stelar");
var uuid = "c4bc5db6-3cf6-44fe-8427-304a7b211bc4";
var transer = implement("skyhighheroes:external/transer_system");
var messaging = implement("skyhighheroes:external/messaging");
var groupMessaging = implement("skyhighheroes:external/group_messaging");
var transerBrotherBand = implement("skyhighheroes:external/transer_brotherband");
var groups = implement("skyhighheroes:external/groups");
var contacts = implement("skyhighheroes:external/contacts");
var scanner = implement("skyhighheroes:external/scanner");
var waypoints = implement("skyhighheroes:external/waypoint");
var crimsonAsteroid = implement("skyhighocs:external/crimson_asteroid");
var crimson = implement("skyhighocs:external/crimson");
var transerOS = transer.initSystem([
  messaging,
  groupMessaging,
  transerBrotherBand,
  groups,
  contacts,
  scanner,
  waypoints,
  crimsonAsteroid,
  crimson
], "crimsonAsteroid", "dragon");
function init(hero) {
  hero.setAliases("crimson_asteroid");
  hero.setName("\u00A74Crimson Asteroid");
  hero.setTier(10);
  hero.setChestplate("Transer");
  hero.setVersion("OC");

  transerOS.keyBinds(hero);
  transerOS.initEMWaveChange(hero);
  transerOS.addPowers(hero);

  bodyTemp.initProfiles(hero);

  hero.addKeyBindFunc("CYCLE_CLOTHES", (player, manager) => stelar.cycleClothes(player, manager), "Change Clothes", 1);
  hero.addKeyBindFunc("VISUALIZER_TOGGLE", (player, manager) => stelar.visualizerToggle(player, manager), "Toggle Visualizer", 2);
  hero.addKeyBindFunc("HOOD_TOGGLE", (player, manager) => stelar.hoodToggle(player, manager), "Toggle Hood", 2);
  
  hero.setDefaultScale(1.0);
  hero.setHasProperty((entity, property) => transerOS.getProperty(entity, property));
  hero.setHasPermission((entity, permission) => transerOS.getPermission(entity, permission));
  hero.setAttributeProfile(entity => {
    if (entity.getData("skyhighheroes:dyn/wave_changing_timer") < 1) {
      return bodyTemp.getAttributeProfile(entity); 
    } else {
      return transerOS.getAttributeProfile(entity);
    };
  });
  hero.setModifierEnabled((entity, modifier) => {
    if (modifier.name() == "fiskheroes:shape_shifting") {
      return true;
    };
    return transerOS.isModifierEnabled(entity, modifier);
  });
  hero.setTierOverride(entity => transerOS.getTierOverride(entity));
  hero.setKeyBindEnabled((entity, keyBind) => {
    if (keyBind == "VISUALIZER_TOGGLE") {
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getUUID() == uuid && ((entity.getData("skyhighheroes:dyn/stelar_clothes") == 3) ? !entity.isSneaking() : true);
    };
    if (keyBind == "CYCLE_CLOTHES") {
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getUUID() == uuid;
    };
    if (keyBind == "HOOD_TOGGLE") {
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getUUID() == uuid && entity.isSneaking() && entity.getData("skyhighheroes:dyn/stelar_clothes") == 3;
    };
    if (keyBind == "CYCLE_CHATS") {
      return !entity.isSneaking() && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0;
    };
    if (keyBind == "CYCLE_CHAT_MODES") {
      return entity.isSneaking() && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0;
    };
    if (keyBind == "SHAPE_SHIFT") {
      return entity.getData("skyhighheroes:dyn/battle_card") == 0 && ((entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0) ? true : entity.getData("skyhighocs:dyn/crimson_timer") == 1);
    };
    return transerOS.isKeyBindEnabled(entity, keyBind);
  });
  hero.setDamageProfile(entity => transerOS.getDamageProfile(entity));
  hero.setTickHandler((entity, manager) => {
    transerOS.systemHandler(entity, manager);
    transerOS.emWaveHandler(entity, manager);
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
    var t = entity.getData("skyhighheroes:dyn/superhero_boosting_landing_ticks");
    if (t == 0 && !entity.isSprinting() && !entity.isOnGround() && entity.motionY() < -1.25 && entity.getData("fiskheroes:flight_boost_timer") > 0 && entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() && entity.world().blockAt(entity.pos()).name() == "minecraft:air") {
      manager.setDataWithNotify(entity, "skyhighheroes:dyn/superhero_boosting_landing_ticks", t = 12);
    } else if (t > 0) {
      manager.setData(entity, "skyhighheroes:dyn/superhero_boosting_landing_ticks", --t);
    };
    manager.incrementData(entity, "skyhighheroes:dyn/superhero_boosting_landing_timer", 2, 8, t > 0);
    var pain = (entity.rotPitch() > 12.5 && entity.motionY() < -0.075 && entity.motionY() > -1.25 && (entity.motionZ() > 0.125 || entity.motionZ() < -0.125 || entity.motionX() > 0.125 || entity.motionX() < -0.125)) && !entity.isSprinting() && !entity.isOnGround() && entity.getData("fiskheroes:flight_timer") > 0 && (entity.world().blockAt(entity.pos().add(0, -1, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -3, 0)).isSolid()) && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.world().blockAt(entity.pos()).name() == "minecraft:air";
    manager.incrementData(entity, "skyhighheroes:dyn/superhero_landing_timer", 10, 10, pain);
    bodyTemp.change(entity, manager, stelar.tempProfiles(), "skyhighheroes:dyn/body_temperature", 400.0, "skyhighheroes:dyn/stelar_clothes");
  });
};
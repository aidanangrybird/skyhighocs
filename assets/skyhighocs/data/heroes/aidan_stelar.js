var bodyTemp = implement("skyhighocs:external/body_temperature");
var stelar = implement("skyhighocs:external/stelar");
var uuid = "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
var transer = implement("skyhighocs:external/transer_system");
var messaging = implement("skyhighocs:external/messaging");
var groupMessaging = implement("skyhighocs:external/group_messaging");
var transerBrotherBand = implement("skyhighocs:external/transer_brotherband");
var groups = implement("skyhighocs:external/groups");
var contacts = implement("skyhighocs:external/contacts");
var scanner = implement("skyhighocs:external/scanner");
var waypoints = implement("skyhighocs:external/waypoint");
var stormChasing = implement("skyhighocs:external/storm_chasing");
var environment = implement("skyhighocs:external/environment");
var transerOS = transer.initSystem([
  messaging,
  groupMessaging,
  transerBrotherBand,
  groups,
  contacts,
  scanner,
  waypoints,
  stormChasing,
  environment], "aidanStelar", "pegasus");
function init(hero) {
  hero.setAliases("aidan_stelar");
  hero.setName("Aidan Stelar");
  hero.setTier(1);
  hero.setChestplate("Transer");
  hero.setTierOverride(entity => 0);
  hero.setVersion("OC");

  transerOS.keyBinds(hero);
  transerOS.addPowers(hero);
  transerOS.profileWave(hero);

  bodyTemp.initProfiles(hero);

  hero.addKeyBindFunc("CYCLE_CLOTHES", (player, manager) => stelar.cycleClothes(player, manager), "Change Clothes", 1);
  hero.addKeyBindFunc("VISUALIZER_TOGGLE", (player, manager) => stelar.visualizerToggle(player, manager), "Toggle Visualizer", 2);
  hero.addKeyBindFunc("HOOD_TOGGLE", (player, manager) => stelar.hoodToggle(player, manager), "Toggle Hood", 2);
  
  hero.setDefaultScale(1.0);
  hero.setAttributeProfile(entity => {
    if (entity.getData("skyhighocs:dyn/calling_timer") == 0) {
      return bodyTemp.getAttributeProfile(entity); 
    } else {
      return transerOS.getWaveProfile(entity);
    };
  });
  hero.setModifierEnabled((entity, modifier) => {
    if (modifier.name() == "fiskheroes:shape_shifting") {
      return true;
    };
    return transerOS.isModifierEnabled(entity, modifier);
  });
  hero.setKeyBindEnabled((entity, keyBind) => {
    if (keyBind == "VISUALIZER_TOGGLE") {
      return entity.getUUID() == uuid && ((entity.getData("skyhighocs:dyn/stelar_clothes") == 3) ? !entity.isSneaking() : true);
    };
    if (keyBind == "CYCLE_CLOTHES") {
      return entity.getUUID() == uuid;
    };
    if (keyBind == "HOOD_TOGGLE") {
      return entity.getUUID() == uuid && entity.isSneaking() && entity.getData("skyhighocs:dyn/stelar_clothes") == 3;
    };
    if (keyBind == "CYCLE_CHATS") {
      return !entity.isSneaking();
    };
    if (keyBind == "CYCLE_CHAT_MODES") {
      return entity.isSneaking();
    };
    if (keyBind == "SHAPE_SHIFT") {
      return true;
    };
    return transerOS.isKeyBindEnabled(entity, keyBind);
  });
  hero.setTickHandler((entity, manager) => {
    transerOS.systemHandler(entity, manager);
    transerOS.waveHandler(entity, hero);
    bodyTemp.change(entity, manager, stelar.tempProfiles(), "skyhighocs:dyn/body_temperature", 400.0, "skyhighocs:dyn/stelar_clothes");
  });
};
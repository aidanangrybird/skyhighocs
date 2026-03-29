var bodyTemp = implement("skyhighocs:external/body_temperature");
var stelar = implement("skyhighocs:external/stelar");
var uuid = "6982b802-8dec-460a-b1fa-6f1596944e8f";
var transer = implement("skyhighocs:external/transer_system");
var settings = implement("skyhighocs:external/transer_settings");
var messaging = implement("skyhighocs:external/messaging");
var groupMessaging = implement("skyhighocs:external/group_messaging");
var transerBrotherBand = implement("skyhighocs:external/transer_brotherband");
var groups = implement("skyhighocs:external/groups");
var contacts = implement("skyhighocs:external/contacts");
var scanner = implement("skyhighocs:external/scanner");
var waypoints = implement("skyhighocs:external/waypoint");
var jungleExploring = implement("skyhighocs:external/jungle_exploring");
var azureAsteroid = implement("skyhighocs:external/azure_asteroid");
var aegir = implement("skyhighocs:external/aegir");
var transerOS = transer.initSystem([
  settings,
  messaging,
  groupMessaging,
  transerBrotherBand,
  groups,
  contacts,
  scanner,
  waypoints,
  jungleExploring,
  azureAsteroid,
  aegir
], "cadeStelar", "dragon");
function init(hero) {
  hero.setAliases("cade_stelar");
  hero.setName("Cade Stelar");
  hero.setTier(1);
  hero.setChestplate("Transer");
  hero.setVersion("OC");

  transerOS.keyBinds(hero);
  transerOS.addPowers(hero);
  transerOS.profileWave(hero);
  transerOS.initEMWaveChange(hero);

  bodyTemp.initProfiles(hero);

  hero.addKeyBindFunc("CYCLE_CLOTHES", (player, manager) => stelar.cycleClothes(player, manager), "Change Clothes", 1);
  hero.addKeyBindFunc("VISUALIZER_TOGGLE", (player, manager) => stelar.visualizerToggle(player, manager), "Toggle Visualizer", 2);
  hero.addKeyBindFunc("HOOD_TOGGLE", (player, manager) => stelar.hoodToggle(player, manager), "Toggle Hood", 2);
  
  hero.setDefaultScale(1.0);
  hero.setHasProperty((entity, property) => transerOS.getProperty(entity, property));
  hero.setAttributeProfile(entity => {
    if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
      return transerOS.getAttributeProfile(entity);
    } else {
      if (entity.getData("skyhighocs:dyn/calling_timer") == 0) {
        return bodyTemp.getAttributeProfile(entity); 
      } else {
        return transerOS.getWaveProfile(entity);
      };
    };
  });
  hero.setModifierEnabled((entity, modifier) => {
    return transerOS.isModifierEnabled(entity, modifier);
  });
  hero.setKeyBindEnabled((entity, keyBind) => {
    if (keyBind == "VISUALIZER_TOGGLE") {
      return entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getUUID() == transer.getCompatibleUUID(entity) && ((entity.getData("skyhighocs:dyn/stelar_clothes") == 3) ? !entity.isSneaking() : true);
    };
    if (keyBind == "CYCLE_CLOTHES") {
      return entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getUUID() == transer.getCompatibleUUID(entity);
    };
    if (keyBind == "HOOD_TOGGLE") {
      return entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getUUID() == transer.getCompatibleUUID(entity) && entity.isSneaking() && entity.getData("skyhighocs:dyn/stelar_clothes") == 3;
    };
    if (keyBind == "CYCLE_CHATS") {
      return !entity.isSneaking() && entity.getData("skyhighocs:dyn/wave_changing_timer") == 0;
    };
    if (keyBind == "CYCLE_CHAT_MODES") {
      return entity.isSneaking() && entity.getData("skyhighocs:dyn/wave_changing_timer") == 0;
    };
    if (keyBind == "SHAPE_SHIFT") {
      return entity.getData("skyhighocs:dyn/battle_card") == 0 && ((entity.getData("skyhighocs:dyn/wave_changing_timer") == 0) ? true : entity.getData("skyhighocs:dyn/jet_streak_timer") == 1);
    };
    return transerOS.isKeyBindEnabled(entity, keyBind);
  });
  hero.setTickHandler((entity, manager) => {
    transerOS.systemHandler(entity, manager);
    transerOS.waveHandler(entity, hero);
    transerOS.emWaveHandler(entity, manager);
    bodyTemp.change(entity, manager, stelar.tempProfiles(), "skyhighocs:dyn/body_temperature", 400.0, "skyhighocs:dyn/stelar_clothes");
  });
};
var bodyTemp = implement("skyhighheroes:external/body_temperature");
var stelar = implement("skyhighheroes:external/stelar");
var uuid = "4da600b8-582a-4fc3-ac2e-ada03d3e478c";
var transerSystem = implement("skyhighheroes:external/transer_system");
var transerMessaging = implement("skyhighheroes:external/transer_messaging");
var transerGroupMessaging = implement("skyhighheroes:external/transer_group_messaging");
var transerBrotherBand = implement("skyhighheroes:external/transer_brotherband");
var transerContacts = implement("skyhighheroes:external/transer_contacts");
var transerScanner = implement("skyhighheroes:external/transer_scanner");
var transerWaypoints = implement("skyhighheroes:external/transer_waypoint");
var coldSnow = implement("skyhighocs:external/cold_snow");
var transerOS = transerSystem.initTranser([transerMessaging,
  transerGroupMessaging,
  transerBrotherBand,
  transerContacts,
  transerScanner,
  transerWaypoints,
  coldSnow], "chaseStelar", "leo");
function init(hero) {
  hero.setAliases("chase_stelar");
  hero.setName("Chase Stelar");
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
    if (entity.getData("skyhighheroes:dyn/calling_timer") == 0) {
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
      return entity.getData("skyhighheroes:dyn/battle_card") == 0 && ((entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0) ? true : entity.getData("skyhighocs:dyn/jet_streak_timer") == 1);
    };
    return transerOS.isKeyBindEnabled(entity, keyBind);
  });
  hero.setTickHandler((entity, manager) => {
    transerOS.transerHandler(entity, manager);
    transerOS.waveHandler(entity, hero);
    bodyTemp.change(entity, manager, stelar.tempProfiles(), "skyhighheroes:dyn/body_temperature", 400.0, "skyhighheroes:dyn/stelar_clothes");
  });
};
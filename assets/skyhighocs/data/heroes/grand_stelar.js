var bodyTemp = implement("skyhighocs:external/body_temperature");
var stelar = implement("skyhighheroes:external/stelar");
var uuid = "d699ffcd-8177-4325-91ac-3e815e87bb95";
var transerSystem = implement("skyhighheroes:external/transer_system");
var transerMessaging = implement("skyhighheroes:external/transer_messaging");
var transerBrotherBand = implement("skyhighheroes:external/transer_brotherband");
var transerContacts = implement("skyhighheroes:external/transer_contacts");
var transerScanner = implement("skyhighheroes:external/transer_scanner");
var blazingSingularity = implement("skyhighocs:external/blazing_singularity");
var singularity = implement("skyhighocs:external/singularity");
var transerOS = transerSystem.initTranser([transerMessaging, transerBrotherBand, transerContacts, transerScanner, blazingSingularity, singularity]);
function init(hero) {
  hero.setAliases("grand_stelar");
  hero.setName("\u00A74Blazing Singularity");
  hero.setTier(10);
  hero.setChestplate("Transer");
  hero.setVersion("Mega Man Star Force (OC)");
  hero.hide();
  
  transerOS.keyBinds(hero);
  
  stelar.initEquipment(hero, "Blazing Singularity", "\u00A74")

  transerOS.addPowers(hero);

  hero.addKeyBindFunc("CYCLE_CLOTHES", (player, manager) => stelar.cycleClothes(player, manager), "Change Clothes", 1);
  hero.addKeyBindFunc("SHIMMER_TOGGLE", (player, manager) => stelar.shimmerToggle(player, manager), "Shimmer Toggle", 1);
  hero.addKeyBindFunc("VISUALIZER_TOGGLE", (player, manager) => stelar.visualizerToggle(player, manager), "Toggle Visualizer", 2);
  hero.addKeyBindFunc("HOOD_TOGGLE", (player, manager) => stelar.hoodToggle(player, manager), "Toggle Hood", 2);
  
  hero.setDefaultScale(1.0);
  hero.setHasProperty(hasProperty);
  hero.setHasPermission((entity, permission) => stelar.hasPermission(entity, permission));
  stelar.initProfiles(hero);
  transerOS.canAim(hero);
  hero.setModifierEnabled((entity, modifier) => {
    if (modifier.name() == "fiskheroes:shape_shifting") {
      return true;
    };
    return transerOS.isModifierEnabled(entity, modifier);
  });
  hero.setTierOverride(entity => stelar.getTierOverride(entity));
  hero.setKeyBindEnabled((entity, keyBind) => {
    if (keyBind == "VISUALIZER_TOGGLE") {
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getUUID() == uuid && ((entity.getData("skyhighheroes:dyn/stelar_clothes") == 3) ? !entity.isSneaking() : true);
    };
    if (keyBind == "CYCLE_CLOTHES") {
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && !entity.isSneaking() && entity.getUUID() == uuid;
    };
    if (keyBind == "SHIMMER_TOGGLE") {
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.isSneaking() && entity.getUUID() == uuid;
    };
    if (keyBind == "HOOD_TOGGLE") {
      return entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getUUID() == uuid && entity.isSneaking() && entity.getData("skyhighheroes:dyn/stelar_clothes") == 3;
    };
    if (keyBind == "CYCLE_CHATS") {
      return !entity.isSneaking() && entity.getData("skyhighheroes:dyn/battle_card") == 0 && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0;
    };
    if (keyBind == "CYCLE_CHAT_MODES") {
      return entity.isSneaking() && entity.getData("skyhighheroes:dyn/battle_card") == 0 && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0;
    };
    if (keyBind == "SHAPE_SHIFT") {
      return entity.getData("skyhighheroes:dyn/battle_card") == 0 && ((entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0) ? true : entity.getData("skyhighocs:dyn/singularity_timer") == 1);
    };
    return transerOS.isKeyBindEnabled(entity, keyBind);
  });
  hero.setDamageProfile(entity => stelar.getDamageProfile(entity));
  hero.addSoundEvent("WEAPON_EQUIP", "skyhighheroes:wave_equip");
  hero.addSoundEvent("WEAPON_UNEQUIP", "skyhighheroes:wave_equip");
  //hero.addSoundEvent("STEP", "skyhighheroes:wave_footstep");
  hero.addSoundEvent("PUNCH", "skyhighheroes:wave_punch");
  hero.setTickHandler((entity, manager) => {
    transerOS.tickHandler(entity, manager);
    if (entity.getData("skyhighheroes:dyn/wave_changing_timer") < 1) {
      manager.setData(entity, "fiskheroes:disguise", null);
    };
    if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
      manager.setData(entity, "fiskheroes:disguise", "Blazing Singularity");
    };
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

function hasProperty(entity, property) {
  return (property == "BREATHE_SPACE") && (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1);
};
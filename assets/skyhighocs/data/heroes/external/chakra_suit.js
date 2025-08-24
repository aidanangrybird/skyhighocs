function initChakras(hero, name, uuid) {
  var suit_name = name + " the Invicible";
  hero.setName(suit_name);
  hero.setChestplate("Suit");

  hero.addPowers("skyhighocs:chakra_suit");

  hero.setTier(8);

  hero.addAttribute("SPRINT_SPEED", 0.2, 1);
  hero.addAttribute("STEP_HEIGHT", 0.5, 0);
  hero.addAttribute("JUMP_HEIGHT", 3.0, 0);
  hero.addAttribute("PUNCH_DAMAGE", 10.0, 0);
  hero.addAttribute("KNOCKBACK", 2.5, 0);
  hero.addAttribute("IMPACT_DAMAGE", 25.0, 0);
  hero.addAttribute("FALL_RESISTANCE", 1.0, 1);

  hero.addKeyBind("TELEKINESIS", "Telekinesis", 1);
  hero.addKeyBind("SONIC_WAVES", "Scream", 2);
  hero.addKeyBind("ENERGY_PROJECTION", "Beam", 3);
  hero.addKeyBind("AIM", "Blast", 4);
  hero.addKeyBind("SHIELD", "Forcefield", 5);
  hero.addKeyBindFunc("CHAKRA_SUIT", (player, manager) => {
    manager.setData(player, "skyhighocs:dyn/chakra_suit", !player.getData("skyhighocs:dyn/chakra_suit"));
    return true;
  }, "Show Chakra Suit", 5);
  hero.setTierOverride(entity => {
    return (entity.getData("skyhighocs:dyn/chakra_suit")) ? 8 : 1;
  });
  hero.setHasProperty((entity, property) => {
    return (property == "BREATHE_SPACE" || property == "MASK_TOGGLE") && entity.getUUID() == uuid;
  });
  hero.setModifierEnabled((entity, modifier) => {
    return entity.getUUID() == uuid;
  });
  hero.setKeyBindEnabled((entity, keyBind) => {
    if (keyBind == "CHAKRA_SUIT") {
      return entity.isSneaking();
    };
    if (keyBind == "SHIELD") {
      return !entity.isSneaking();
    };
    return entity.getUUID() == uuid;
  });
  hero.setTickHandler((entity, manager) => {
    if (entity.getData("skyhighocs:dyn/chakra_suit")) {
      manager.setData(entity, "fiskheroes:disguise", suit_name);
    } else {
      manager.setData(entity, "fiskheroes:disguise", null);
    };
    if (entity.getData("fiskheroes:time_since_damaged") <= 20) {
      manager.setData(entity, "skyhighocs:dyn/chakra_suit", true);
      manager.setData(entity, "fiskheroes:mask_open", false);
    };
    if (entity.getData("fiskheroes:flight_boost_timer") > 0) {
      manager.setData(entity, "skyhighocs:dyn/chakra_suit", true);
    };
  });
  hero.supplyFunction("canAim", (entity) => {
    return entity.getHeldItem().isEmpty();
  });
};
/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "azureAsteroid",
    type: 9,
    waveChange: "Azure Asteroid",
    color: "\u00A71",
    human: "Cade Stelar",
    powers: [
      "skyhighocs:em_wave_being",
      "skyhighocs:battle_cards_cade"
    ],
    keyBinds: function (hero) {
      hero.addKeyBind("TELEPORT", "Transmit", 1);
      hero.addKeyBind("BATTLE_CARD_0", "Azure Buster!", 2);
      hero.addKeyBind("BATTLE_CARD_1", "Battle Card! Asteroid Belt!", 2);
      hero.addKeyBind("BATTLE_CARD_2", "Battle Card! Gas Plume!", 2);
      hero.addKeyBind("BATTLE_CARD_3", "Battle Card! Asteroid Crash!", 2);
      hero.addKeyBind("BATTLE_CARD_4", "Battle Card! Asteroid Strike!", 2);
      hero.addKeyBind("BATTLE_CARD_5", "Battle Card! Azure River!", 2);
      hero.addKeyBind("INVISIBILITY", "Wave World", 3);
      hero.addKeyBind("EARTHQUAKE", "Asteroid Crash", 4);
      hero.addKeyBind("ENERGY_PROJECTION", "Azure River", 4);
      hero.addKeyBind("INTANGIBILITY", "Become in Phase", 5);
    },
    tierOverride: function (entity) {
      if ((entity.getData("skyhighocs:dyn/wave_changing_timer") > 0) && (entity.getData("skyhighocs:dyn/wave_changing_timer") < 1)) {
        return 1;
      };
      return (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) ? 10 : 0;
    },
    properties: function (entity, property) {
      return ((property == "BREATHE_SPACE") || (property == "MASK_TOGGLE")) && ((entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) || (entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") || (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND"));
    },
    initDamageProfiles: function (hero) {
      hero.addDamageProfile("SWORD", {
        "types": {
          "ELEMENT_SWORD": 1.0
        }
      });
      hero.addDamageProfile("MAIN", {
        "types": {
          "ELEMENT_NONE": 1.0
        }
      });
    },
    damageProfiles: function (entity) {
      var result = null;
      if (entity.getData("skyhighocs:dyn/gas_plume_blade_timer") == 1 && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
        result = "SWORD";
      };
      return (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) ? "MAIN" : result;
    },
    initProfiles: function (hero) {
      hero.addAttribute("SPRINT_SPEED", 0.2, 1);
      hero.addAttribute("STEP_HEIGHT", 0.5, 0);
      hero.addAttribute("JUMP_HEIGHT", 3.0, 0);
      hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
      hero.addAttribute("KNOCKBACK", 2.5, 0);
      hero.addAttribute("IMPACT_DAMAGE", 50.0, 0);
      hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
      hero.addAttributeProfile("SWORD", (profile) => {
        profile.inheritDefaults();
        profile.addAttribute("SPRINT_SPEED", 0.5, 1);
        profile.addAttribute("KNOCKBACK", 5.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", 14.5, 0);
      });
      hero.addAttributeProfile("SHIELD", (profile) => {
        profile.inheritDefaults();
        profile.addAttribute("BASE_SPEED", -0.75, 1);
        profile.addAttribute("SPRINT_SPEED", 0.0, 0);
        profile.addAttribute("WEAPON_DAMAGE", -1.0, 1);
        profile.addAttribute("JUMP_HEIGHT", -1.0, 1);
        profile.addAttribute("STEP_HEIGHT", -1.0, 1);
        profile.addAttribute("KNOCKBACK", 0.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
      });
    },
    attributeProfiles: function (entity) {
      if (entity.getData("fiskheroes:shield_blocking")) {
        return "SHIELD";
      };
      if (entity.getData("skyhighocs:dyn/gas_plume_blade_timer") == 1) {
        return "SWORD";
      };
      if (entity.getData("skyhighocs:dyn/gas_plume_blade_timer") < 1 && !entity.getData("fiskheroes:shield_blocking")) {
        return null;
      };
    },
    isKeyBindEnabled: function (entity, keyBind) {
      var result = false;
      if (keyBind == "CYCLE_CHATS_EM") {
        result = !entity.isSneaking() && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/aegir_timer") == 1;
      };
      if (keyBind == "CYCLE_CHAT_MODES_EM") {
        result = entity.isSneaking() && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/aegir_timer") == 1;
      };
      if (keyBind == "INTANGIBILITY") {
        result = entity.getData("fiskheroes:flight_timer") > 0;
      };
      if (keyBind == "TELEPORT" || keyBind == "INVISIBILITY") {
        result = true;
      };
      if (keyBind == "BATTLE_CARD_0") {
        result = entity.getData("fiskheroes:gravity_manip") && entity.getData("skyhighocs:dyn/selected_battle_card") == 0;
      };
      if (keyBind == "BATTLE_CARD_1") {
        result = entity.getData("fiskheroes:gravity_manip") && entity.getData("skyhighocs:dyn/selected_battle_card") == 1;
      };
      if (keyBind == "BATTLE_CARD_2") {
        result = entity.getData("fiskheroes:gravity_manip") && entity.getData("skyhighocs:dyn/selected_battle_card") == 2;
      };
      if (keyBind == "BATTLE_CARD_3") {
        result = entity.getData("fiskheroes:gravity_manip") && entity.getData("skyhighocs:dyn/selected_battle_card") == 3;
      };
      if (keyBind == "BATTLE_CARD_4") {
        result = entity.getData("fiskheroes:gravity_manip") && entity.getData("skyhighocs:dyn/selected_battle_card") == 4;
      };
      if (keyBind == "BATTLE_CARD_5") {
        result = entity.getData("fiskheroes:gravity_manip") && entity.getData("skyhighocs:dyn/selected_battle_card") == 5;
      };
      if (keyBind == "EARTHQUAKE") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 3;
      };
      if (keyBind == "ENERGY_PROJECTION") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 5;
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      var result = false;
      if (modifier.name() == "fiskheroes:potion_immunity") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:controlled_flight") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:teleportation") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:wall_crawling") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:intangibility") {
        if (modifier.id() == "not_absolute") {
          result = entity.getPunchTimer() > 0;
        };
        if (modifier.id() == "absolute") {
          result = entity.getPunchTimer() == 0;
        };
      };
      if (modifier.name() == "fiskheroes:regeneration") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:healing_factor") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:water_breathing") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:invisibility") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:fire_immunity") {
        result = entity.getData("fiskheroes:invisible");
      };
      if (modifier.name() == "fiskheroes:damage_immunity") {/* 
        var invis = ["explosion", "magic", "shuriken", "sharp", "bullet", "blunt", "saitama"];
        var normal = ["fire","cactus", "cold", "energy", "electricity", "sound", "thorns", "radiation",
          "water", "hulk", "holy", "hellfire", "adamantium", "mineral", "shockwave", "atlantean_steel",
          "eternium", "cosmic", "kryptonite", "light", "cs", "force", "jv", "primordial", "gale", "bifrost",
          "ice", "positive", "cursed", "cancel"
        ];
        if (normal.indexOf(modifier.id()) > -1) {
          result = true;
        };
        if (invis.indexOf(modifier.id()) > -1) {
          result = entity.getData("fiskheroes:invisible");
        }; */
        result = entity.getData("fiskheroes:invisible");
      };
      if (modifier.name() == "fiskheroes:shield") {
        if (modifier.id() == "asteroid_belt") {
          result = entity.getData("skyhighocs:dyn/battle_card") == 1 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
        };
        if (modifier.id() == "gas_plume") {
          result = entity.getData("skyhighocs:dyn/battle_card") == 2 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
        };
      };
      if (modifier.name() == "fiskheroes:blade") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 2 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:earthquake") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 3 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:fireball") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 4 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:energy_projection") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 5 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      return result;
    },
    tickHandler: function (entity, manager) {
      if ((entity.getData("fiskheroes:flight_timer") < 1.0) && (entity.getData("fiskheroes:flight_timer") > 0.0) && !entity.getData("fiskheroes:flying")) {
        var entities = entity.world().getEntitiesInRangeOf(entity.pos(), 20);
        entities.forEach(other => {
          if (other.getDataOrDefault("sind:dyn/flares", false)) {
            manager.setDataWithNotify(entity, "fiskheroes:flying", true);
          };
        });
      };
      var item_holding = (!entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/wave_changing_timer") > 0);
      manager.incrementData(entity, "skyhighocs:dyn/item_holding_timer", 10, item_holding);
      var gas_plume = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getData("skyhighocs:dyn/battle_card") == 2 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/gas_plume", gas_plume);
      var gas_plume_blade = entity.getData("skyhighocs:dyn/gas_plume_timer") == 1 && entity.getData("skyhighocs:dyn/item_holding_timer") == 0;
      manager.setData(entity, "skyhighocs:dyn/gas_plume_blade", gas_plume_blade);
      var asteroid_crash = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getData("skyhighocs:dyn/battle_card") == 3 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/asteroid_crash", asteroid_crash);
      var asteroid_strike = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getData("skyhighocs:dyn/battle_card") == 4 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/asteroid_strike", asteroid_strike);
      var azure_river = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getData("skyhighocs:dyn/battle_card") == 5 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/azure_river", azure_river);
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/predation_timer") > 0.0 && entity.getData("skyhighocs:dyn/predation_timer") < 0.1) {
        manager.setData(entity, "skyhighocs:dyn/battle_card", 0);
        manager.setData(entity, "skyhighocs:dyn/aegir", false);
      };
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/predation_timer") > 0.6 && entity.getData("skyhighocs:dyn/predation_timer") < 0.7) {
        manager.setData(entity, "skyhighocs:dyn/battle_card", entity.getData("skyhighocs:dyn/selected_battle_card"));
        if (entity.getData("skyhighocs:dyn/battle_card") == 0) {
          manager.setData(entity, "skyhighocs:dyn/aegir", false);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 1) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.65) {
            system.shoutMessage(entity, "\u00A7r<\u00A71Azure Asteroid\u00A7r> Battle Card Predation! \u00A71Asteroid Belt\u00A7r!", 16);
            system.systemMessage(entity, "<n>Inserted <nh>Asteroid Belt<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/aegir", false);
          manager.setData(entity, "fiskheroes:shield", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 2) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.65) {
            system.shoutMessage(entity, "\u00A7r<\u00A71Azure Asteroid\u00A7r> Battle Card Predation! \u00A71Gas Plume\u00A7r!", 16);
            system.systemMessage(entity, "<n>Inserted <nh>Gas Plume<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/aegir", true);
          manager.setData(entity, "fiskheroes:shield", true);
          manager.setData(entity, "fiskheroes:blade", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 3) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.65) {
            system.shoutMessage(entity, "\u00A7r<\u00A71Azure Asteroid\u00A7r> Battle Card Predation! \u00A71Asteroid Crash\u00A7r!", 16);
            system.systemMessage(entity, "<n>Inserted <nh>Asteroid Crash<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/aegir", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 4) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.65) {  
            system.shoutMessage(entity, "\u00A7r<\u00A71Azure Asteroid\u00A7r> Battle Card Predation! \u00A71Asteroid Strike\u00A7r!", 16);
            system.systemMessage(entity, "<n>Inserted <nh>Asteroid Strike<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/aegir", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 5) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.65) {
            system.shoutMessage(entity, "\u00A7r<\u00A71Azure Asteroid\u00A7r> Battle Card Predation! \u00A71Azure River\u00A7r!", 16);
            system.systemMessage(entity, "<n>Inserted <nh>Azure River<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/aegir", true);
        };
      };
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && ((entity.getData("fiskheroes:flight_boost_timer") > 0 && entity.isSprinting()) || !entity.getHeldItem().isEmpty())) {
        manager.setData(entity, "skyhighocs:dyn/aegir", false);
      };
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && (entity.getData("fiskheroes:flight_boost_timer") < 1 && !entity.isSprinting()) && entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/predation_timer") == 0) {
        if (entity.getData("skyhighocs:dyn/battle_card") == 1) {
          manager.setData(entity, "fiskheroes:shield", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 2) {
          manager.setData(entity, "skyhighocs:dyn/aegir", true);
          manager.setData(entity, "fiskheroes:shield", true);
          manager.setData(entity, "fiskheroes:blade", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 3) {
          manager.setData(entity, "skyhighocs:dyn/aegir", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 4) {
          manager.setData(entity, "skyhighocs:dyn/aegir", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 5) {
          manager.setData(entity, "skyhighocs:dyn/aegir", true);
        };
      };
    },
  };
};
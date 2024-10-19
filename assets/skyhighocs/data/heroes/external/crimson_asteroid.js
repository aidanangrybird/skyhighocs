/**
 * You put all of the required functions in here
 * @param transer - Required
 **/
function init(transer) {
  function toolSwitchEnchant(player, manager) {
    //Silk Touch
    if (player.getData("skyhighheroes:dyn/tool_enchant") == 0) {
      manager.setInteger(player.getHeldItem().nbt().getTagList("ench").getCompoundTag(1), "id", 33);
      manager.setInteger(player.getHeldItem().nbt().getTagList("ench").getCompoundTag(1), "lvl", 1);
    };
    //Fortune
    if (player.getData("skyhighheroes:dyn/tool_enchant") == 1) {
      manager.setInteger(player.getHeldItem().nbt().getTagList("ench").getCompoundTag(1), "id", 35);
      manager.setInteger(player.getHeldItem().nbt().getTagList("ench").getCompoundTag(1), "lvl", 4);
    };
    return true;
  };
  function cycleUpCard(player, manager) {
    manager.setData(player, "skyhighheroes:dyn/selected_battle_card", player.getData("skyhighheroes:dyn/selected_battle_card") + 1);
    if (player.getData("skyhighheroes:dyn/selected_battle_card") > 6) {
      manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 0);
    };
    return true;
  };
  function cycleDownCard(player, manager) {
    manager.setData(player, "skyhighheroes:dyn/selected_battle_card", player.getData("skyhighheroes:dyn/selected_battle_card") - 1);
    if (player.getData("skyhighheroes:dyn/selected_battle_card") < 0) {
      manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 6);
    };
    return true;
  };
  //All of the required functions and stuff go here
  return {
    emPowers: function () {
      return [
        "skyhighheroes:em_wave_being",
        "skyhighocs:battle_cards_lucas"
      ];
    },
    keyBinds: function (hero) {
      hero.addKeyBind("TELEPORT", "Transmit", 1);
      hero.addKeyBindFunc("CYCLE_UP_CARD", (player, manager) => cycleUpCard(player, manager), "Next Battle Card", 1);
      hero.addKeyBindFunc("BATTLE_CARD_0", (player, manager) => {
        manager.setData(player, "skyhighheroes:dyn/battle_card", player.getData("skyhighheroes:dyn/selected_battle_card"));
        return true;
      }, "Return To Crimson Buster", 2);
      hero.addKeyBindFunc("BATTLE_CARD_1", (player, manager) => {
        manager.setData(player, "skyhighheroes:dyn/battle_card", player.getData("skyhighheroes:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Crimson Asteroid\u00A7r> Battle Card Predation! \u00A74Barrier\u00A7r!");
        };
        return true;
      }, "Battle Card! Barrier!", 2);
      hero.addKeyBindFunc("BATTLE_CARD_2", (player, manager) => {
        manager.setData(player, "skyhighheroes:dyn/battle_card", player.getData("skyhighheroes:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Crimson Asteroid\u00A7r> Battle Card Predation! \u00A74Sword\u00A7r!");
        };
        return true;
      }, "Battle Card! Sword!", 2);
      hero.addKeyBindFunc("BATTLE_CARD_3", (player, manager) => {
        manager.setData(player, "skyhighheroes:dyn/battle_card", player.getData("skyhighheroes:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Crimson Asteroid\u00A7r> Battle Card Predation! \u00A74Shurikens\u00A7r!");
        };
        return true;
      }, "Battle Card! Shurikens!", 2);
      hero.addKeyBindFunc("BATTLE_CARD_4", (player, manager) => {
        manager.setData(player, "skyhighheroes:dyn/battle_card", player.getData("skyhighheroes:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Crimson Asteroid\u00A7r> Battle Card Predation! \u00A74Asteroid Crash\u00A7r!");
        };
        return true;
      }, "Battle Card! Asteroid Crash!", 2);
      hero.addKeyBindFunc("BATTLE_CARD_5", (player, manager) => {
        manager.setData(player, "skyhighheroes:dyn/battle_card", player.getData("skyhighheroes:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Crimson Asteroid\u00A7r> Battle Card Predation! \u00A74Asteroid Pull\u00A7r!");
        };
        return true;
      }, "Battle Card! Asteroid Pull!", 2);
      hero.addKeyBindFunc("BATTLE_CARD_6", (player, manager) => {
        manager.setData(player, "skyhighheroes:dyn/battle_card", player.getData("skyhighheroes:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Crimson Asteroid\u00A7r> Battle Card Predation! \u00A74Asteroid Blast\u00A7r!");
        };
        return true;
      }, "Battle Card! Asteroid Blast!", 2);
      hero.addKeyBind("INVISIBILITY", "Become Wave", 3);
      hero.addKeyBindFunc("CYCLE_DOWN_CARD", (player, manager) => cycleDownCard(player, manager), "Previous Battle Card", 3);
      hero.addKeyBind("EARTHQUAKE", "Asteroid Crash", 4);
      hero.addKeyBind("TELEKINESIS", "Asteroid Pull", 4);
      hero.addKeyBind("ENERGY_PROJECTION", "Asteroid Blast", 4);
      hero.addKeyBindFunc("FORTUNE_SWITCH", (player, manager) => toolSwitchEnchant(player, manager), "Active Enchant: Silk Touch", 4);
      hero.addKeyBindFunc("SILK_SWITCH", (player, manager) => toolSwitchEnchant(player, manager), "Active Enchant: Fortune", 4);
      hero.addKeyBind("RIFLE_AIM", "Aim Rifle", 4);
      hero.addKeyBind("SHIELD_THROW", "Throw Shield", 4);
      hero.addKeyBind("CHARGE_ENERGY", "Charge Energy", 4);
      hero.addKeyBind("INTANGIBILITY", "Become in Phase", 5);
    },
    tierOverride: function (entity) {
      if ((entity.getData("skyhighheroes:dyn/wave_changing_timer") > 0) && (entity.getData("skyhighheroes:dyn/wave_changing_timer") < 1)) {
        return 1;
      };
      return (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) ? 10 : 0;
    },
    properties: function (entity, property) {
      return (property == "BREATHE_SPACE" || property == "MASK_TOGGLE") && ((entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) || (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND"));
    },
    permissions: function (entity, permission) {
      return (permission == "USE_CHRONOS_RIFLE" || permission == "USE_SHIELD") && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
    },
    initSounds: function (hero) {
      hero.addSoundEvent("WEAPON_EQUIP", "skyhighheroes:wave_equip");
      hero.addSoundEvent("WEAPON_UNEQUIP", "skyhighheroes:wave_equip");
      hero.addSoundEvent("STEP", "skyhighheroes:wave_footstep");
      hero.addSoundEvent("PUNCH", "skyhighheroes:wave_punch");
    },
    initEquipment: function (hero) {
      hero.addPrimaryEquipment("fiskheroes:katana{Dual:1,display:{Name:\u00A74Crimson Asteroid's Katanas},ench:[{id:16,lvl:6},{id:19,lvl:3},{id:20,lvl:3},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => (item.nbt().getBoolean("Dual") && item.getEnchantmentLevel(16) == 6 && item.getEnchantmentLevel(19) == 3 && item.getEnchantmentLevel(20) == 3 && item.getEnchantmentLevel(21) == 3 && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Crimson Asteroid's Katanas"));
      hero.addPrimaryEquipment("fiskheroes:ruptures_scythe{display:{Name:\u00A74Crimson Asteroid's Scythe},ench:[{id:16,lvl:6},{id:19,lvl:3},{id:20,lvl:3},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => (item.getEnchantmentLevel(16) == 6 && item.getEnchantmentLevel(19) == 3 && item.getEnchantmentLevel(20) == 3 && item.getEnchantmentLevel(21) == 3 && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Crimson Asteroid's Scythe"));
      hero.addPrimaryEquipment("fiskheroes:chronos_rifle{display:{Name:\u00A74Crimson Asteroid's Rifle},ench:[{id:34,lvl:5}]}", true, item => (item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Crimson Asteroid's Rifle"));
      hero.addPrimaryEquipment("fiskheroes:captain_americas_shield{Electromagnetic:1,display:{Name:\u00A74Crimson Asteroid's Shield},ench:[{id:16,lvl:6},{id:19,lvl:3},{id:20,lvl:3},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => (item.nbt().getBoolean("Electromagnetic") && item.getEnchantmentLevel(16) == 6 && item.getEnchantmentLevel(19) == 3 && item.getEnchantmentLevel(20) == 3 && item.getEnchantmentLevel(21) == 3 && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Crimson Asteroid's Shield"));
      hero.addPrimaryEquipment("fiskheroes:tutridium_pickaxe{display:{Name:\u00A74Crimson Asteroid's Pickaxe},ench:[{id:32,lvl:7},{id:35,lvl:4},{id:34,lvl:5}]}", true, item => (item.getEnchantmentLevel(32) == 7 && (item.getEnchantmentLevel(33) == 1 || item.getEnchantmentLevel(35) == 4) && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Crimson Asteroid's Pickaxe"));
      hero.addPrimaryEquipment("fiskheroes:tutridium_shovel{display:{Name:\u00A74Crimson Asteroid's Shovel},ench:[{id:32,lvl:7},{id:33,lvl:1},{id:34,lvl:5}]}", true, item => (item.getEnchantmentLevel(32) == 7 && (item.getEnchantmentLevel(33) == 1 || item.getEnchantmentLevel(35) == 4) && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Crimson Asteroid's Shovel"));
    },
    initDamageProfiles: function (hero) {
      hero.addDamageProfile("SWORD", {
        "types": {
          "WAVE_SHARP": 1.0
        }
      });
      hero.addDamageProfile("MAIN", {
        "types": {
          "WAVE_BLUNT": 1.0
        }
      });
    },
    damageProfiles: function (entity) {
      var result = null;
      if (entity.getData("skyhighheroes:dyn/sword_blade_timer") == 1 && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
        result = "SWORD";
      };
      if (entity.getHeldItem().name() == "fiskheroes:katana" && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
        result = "SWORD";
      };
      if (entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
        result = "SWORD";
      };
      if (entity.getHeldItem().name() == "fiskheroes:chronos_rifle" && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
        result = "MAIN";
      };
      if (entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) {
        result = "MAIN";
      };
      return (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1) ? "MAIN" : result;
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
      if (entity.getData("skyhighheroes:dyn/sword_blade_timer") == 1) {
        return "SWORD";
      };
      if (entity.getData("skyhighheroes:dyn/sword_blade_timer") < 1 && !entity.getData("fiskheroes:shield_blocking")) {
        return null;
      };
    },
    isKeyBindEnabled: function (entity, keyBind) {
      var result = false;
      var uuid = "c4bc5db6-3cf6-44fe-8427-304a7b211bc4";
      if (keyBind == "CYCLE_CHATS_EM") {
        result = !entity.isSneaking() && entity.getData("skyhighheroes:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/crimson_timer") == 1;
      };
      if (keyBind == "CYCLE_CHAT_MODES_EM") {
        result = entity.isSneaking() && entity.getData("skyhighheroes:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/crimson_timer") == 1;
      };
      if (keyBind == "INTANGIBILITY") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:flight_timer") > 0;
      };
      if (keyBind == "SHIELD_THROW") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:captain_americas_shield";
      };
      if (keyBind == "CHARGE_ENERGY") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:ruptures_scythe";
      };
      if (keyBind == "TELEPORT" || keyBind == "INVISIBILITY") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.getData("skyhighheroes:dyn/predation");
      };
      if (keyBind == "SILK_SWITCH") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/tool_enchant") == 0 && (entity.getHeldItem().name() == "fiskheroes:tutridium_shovel" || "fiskheroes:tutridium_pickaxe") && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(35) == 4 && entity.getHeldItem().getEnchantmentLevel(34) == 5;
      };
      if (keyBind == "FORTUNE_SWITCH") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/tool_enchant") == 1 && (entity.getHeldItem().name() == "fiskheroes:tutridium_shovel" || "fiskheroes:tutridium_pickaxe") && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(33) == 1 && entity.getHeldItem().getEnchantmentLevel(34) == 5;
      };
      if (keyBind == "RIFLE_AIM") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:chronos_rifle";
      };
      if (keyBind == "CYCLE_UP_CARD" || keyBind == "CYCLE_DOWN_CARD") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation");
      };
      if (keyBind == "BATTLE_CARD_0") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/selected_battle_card") == 0;
      };
      if (keyBind == "BATTLE_CARD_1") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighheroes:dyn/selected_battle_card") == 1;
      };
      if (keyBind == "BATTLE_CARD_2") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighheroes:dyn/selected_battle_card") == 2;
      };
      if (keyBind == "BATTLE_CARD_3") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighheroes:dyn/selected_battle_card") == 3;
      };
      if (keyBind == "BATTLE_CARD_4") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighheroes:dyn/selected_battle_card") == 4;
      };
      if (keyBind == "BATTLE_CARD_5") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighheroes:dyn/selected_battle_card") == 5;
      };
      if (keyBind == "BATTLE_CARD_6") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighheroes:dyn/selected_battle_card") == 6;
      };
      if (keyBind == "AIM") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighocs:dyn/crimson_timer") < 1 && !(entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" || entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" || entity.getHeldItem().name() == "fiskheroes:tutridium_shovel") && entity.getData("skyhighheroes:dyn/battle_card") == 0;
      };
      if (keyBind == "EARTHQUAKE") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !(entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" || entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" || entity.getHeldItem().name() == "fiskheroes:tutridium_shovel") && entity.getData("skyhighheroes:dyn/battle_card") == 4;
      };
      if (keyBind == "TELEKINESIS") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !(entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" || entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" || entity.getHeldItem().name() == "fiskheroes:tutridium_shovel") && entity.getData("skyhighheroes:dyn/battle_card") == 5;
      };
      if (keyBind == "ENERGY_PROJECTION") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !(entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" || entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" || entity.getHeldItem().name() == "fiskheroes:tutridium_shovel") && entity.getData("skyhighheroes:dyn/battle_card") == 6;
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      var uuid = "c4bc5db6-3cf6-44fe-8427-304a7b211bc4";
      var result = false;
      if (modifier.name() == "fiskheroes:damage_immunity") {
        var invis = ["explosion", "magic", "shuriken", "sharp", "bullet", "blunt", "saitama"];
        var normal = ["fire","cactus", "cold", "energy", "electricity", "sound", "thorns", "radiation",
          "water", "hulk", "holy", "hellfire", "adamantium", "mineral", "shockwave", "atlantean_steel",
          "eternium", "cosmic", "kryptonite", "light", "cs", "force", "jv", "primordial", "gale", "bifrost",
          "ice", "positive", "cursed", "cancel"
        ];
        if (normal.indexOf(modifier.id()) > -1) {
          result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        };
        if (invis.indexOf(modifier.id()) > -1) {
          result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:invisible");
        };
      };
      if (modifier.name() == "fiskheroes:shield_throwing") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1
      };
      if (modifier.name() == "fiskheroes:energy_manipulation") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1
      };
      if (modifier.name() == "fiskheroes:controlled_flight") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1
      };
      if (modifier.name() == "fiskheroes:invisibility") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1
      };
      if (modifier.name() == "fiskheroes:teleportation") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1
      };
      if (modifier.name() == "fiskheroes:intangibility") {
        if (modifier.id() == "not_absolute") {
          result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getPunchTimer() > 0;
        };
        if (modifier.id() == "absolute") {
          result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getPunchTimer() == 0;
        };
      };
      if (modifier.name() == "fiskheroes:shield") {
        if (modifier.id() == "barrier") {
          result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 1 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
        };
        if (modifier.id() == "sword") {
          result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 2 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
        };
      };
      if (modifier.name() == "fiskheroes:blade") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 2 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:equipment") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 3 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:earthquake") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 4 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:telekinesis") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 5 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:energy_projection") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighheroes:dyn/battle_card") == 6 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      return result;
    },
    tickHandler: function (entity, manager) {
      if (entity.getWornChestplate().getEnchantmentLevel(35) == -1) {
        manager.setData(entity, "skyhighheroes:dyn/shimmer_toggle", 1);
      };
      if (entity.getWornChestplate().getEnchantmentLevel(35) == 0) {
        manager.setData(entity, "skyhighheroes:dyn/shimmer_toggle", 0);
      };
      if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:tutridium_shovel" && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(33) == 1 && entity.getHeldItem().getEnchantmentLevel(34) == 5) {
        manager.setData(entity, "skyhighheroes:dyn/tool_enchant", 1);
      };
      if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:tutridium_shovel" && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(35) == 4 && entity.getHeldItem().getEnchantmentLevel(34) == 5) {
        manager.setData(entity, "skyhighheroes:dyn/tool_enchant", 0);
      };
      if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(33) == 1 && entity.getHeldItem().getEnchantmentLevel(34) == 5) {
        manager.setData(entity, "skyhighheroes:dyn/tool_enchant", 1);
      };
      if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(35) == 4 && entity.getHeldItem().getEnchantmentLevel(34) == 5) {
        manager.setData(entity, "skyhighheroes:dyn/tool_enchant", 0);
      };
      manager.incrementData(entity, "skyhighheroes:dyn/telekinesis_timer", 10, 10, entity.getData("fiskheroes:telekinesis"));
      var item_holding = (!entity.getHeldItem().isEmpty() && entity.getData("skyhighheroes:dyn/wave_changing_timer") > 0);
      manager.incrementData(entity, "skyhighheroes:dyn/item_holding_timer", 10, item_holding);
      var equipment = entity.getWornChestplate().nbt().getTagList("Equipment");
      if (equipment.getCompoundTag(0).getCompoundTag("Item").getShort("Damage") > 0) {
        manager.setShort(equipment.getCompoundTag(0).getCompoundTag("Item"), "Damage", 0)
      };
      if (equipment.getCompoundTag(1).getCompoundTag("Item").getShort("Damage") > 0) {
        manager.setShort(equipment.getCompoundTag(1).getCompoundTag("Item"), "Damage", 0)
      };
      if (equipment.getCompoundTag(2).getCompoundTag("Item").getShort("Damage") > 0) {
        manager.setShort(equipment.getCompoundTag(2).getCompoundTag("Item"), "Damage", 0)
      };
      if (equipment.getCompoundTag(3).getCompoundTag("Item").getShort("Damage") > 0) {
        manager.setShort(equipment.getCompoundTag(3).getCompoundTag("Item"), "Damage", 0)
      };
      if (equipment.getCompoundTag(4).getCompoundTag("Item").getShort("Damage") > 0) {
        manager.setShort(equipment.getCompoundTag(4).getCompoundTag("Item"), "Damage", 0)
      };
      if (equipment.getCompoundTag(5).getCompoundTag("Item").getShort("Damage") > 0) {
        manager.setShort(equipment.getCompoundTag(5).getCompoundTag("Item"), "Damage", 0)
      };
      var sword = (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") < 0.35 && entity.getData("skyhighheroes:dyn/battle_card") == 2 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighheroes:dyn/sword", sword);
      var sword_blade = entity.getData("skyhighheroes:dyn/sword_timer") == 1 && entity.getData("skyhighheroes:dyn/item_holding_timer") == 0;
      manager.setData(entity, "skyhighheroes:dyn/sword_blade", sword_blade);
      var asteroid_crash = (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") < 0.35 && entity.getData("skyhighheroes:dyn/battle_card") == 4 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/asteroid_crash", asteroid_crash);
      var asteroid_pull = (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") < 0.35 && entity.getData("skyhighheroes:dyn/battle_card") == 5 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/asteroid_pull", asteroid_pull);
      var asteroid_blast = (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") < 0.35 && entity.getData("skyhighheroes:dyn/battle_card") == 6 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/asteroid_blast", asteroid_blast);
      if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty() && !entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") > 0.45 && entity.getData("skyhighheroes:dyn/predation_timer") < 0.55) {
        if (entity.getData("skyhighheroes:dyn/battle_card") == 1) {
          entity.playSound("skyhighheroes:wave.equip", 1, 1);
          if (entity.getData("skyhighheroes:dyn/predation_timer") > 0.5) {
            transer.systemMessage(entity, "<n>Inserted <nh>Barrier<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/crimson", false);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:shield", true);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 2) {
          entity.playSound("skyhighheroes:wave.equip", 1, 1);
          if (entity.getData("skyhighheroes:dyn/predation_timer") > 0.5) {
            transer.systemMessage(entity, "<n>Inserted <nh>Sword<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:shield", true);
          manager.setData(entity, "fiskheroes:blade", true);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 3) {
          entity.playSound("skyhighheroes:wave.equip", 1, 1);
          if (entity.getData("skyhighheroes:dyn/predation_timer") > 0.5) {
            transer.systemMessage(entity, "<n>Inserted <nh>Asteroid Crash<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:utility_belt_type", 1);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 4) {
          entity.playSound("skyhighheroes:wave.equip", 1, 1);
          if (entity.getData("skyhighheroes:dyn/predation_timer") > 0.5) {
            transer.systemMessage(entity, "<n>Inserted <nh>Asteroid Pull<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 5) {
          entity.playSound("skyhighheroes:wave.equip", 1, 1);
          if (entity.getData("skyhighheroes:dyn/predation_timer") > 0.5) {
            transer.systemMessage(entity, "<n>Inserted <nh>Asteroid Blast<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 6) {
          entity.playSound("skyhighheroes:wave.equip", 1, 1);
          if (entity.getData("skyhighheroes:dyn/predation_timer") > 0.5) {
            transer.systemMessage(entity, "<n>Inserted <nh>Shurikens<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        };
      };
      if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && ((entity.getData("fiskheroes:flight_boost_timer") > 0 && entity.isSprinting()) || !entity.getHeldItem().isEmpty())) {
        manager.setData(entity, "skyhighocs:dyn/crimson", false);
      };
      if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && (entity.getData("fiskheroes:flight_boost_timer") < 1 && !entity.isSprinting()) && entity.getHeldItem().isEmpty() && entity.getData("skyhighheroes:dyn/predation_timer") == 0) {
        if (entity.getData("skyhighheroes:dyn/battle_card") == 1) {
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:shield", true);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 2) {
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:shield", true);
          manager.setData(entity, "fiskheroes:blade", true);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 3) {
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:utility_belt_type", 1);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 4) {
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 5) {
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        };
        if (entity.getData("skyhighheroes:dyn/battle_card") == 6) {
          manager.setData(entity, "skyhighocs:dyn/crimson", true);
          manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        };
      };
    },
    name: function () {
      return "crimsonAsteroid";
    },
    waveChangeInfo: function () {
      return {
        name: "Crimson Asteroid",
        color: "\u00A74"
      };
    }
  };
};
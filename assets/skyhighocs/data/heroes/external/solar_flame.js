/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  function toolSwitchEnchant(player, manager) {
    //Silk Touch
    if (player.getData("skyhighocs:dyn/tool_enchant") == 0) {
      manager.setInteger(player.getHeldItem().nbt().getTagList("ench").getCompoundTag(1), "id", 33);
      manager.setInteger(player.getHeldItem().nbt().getTagList("ench").getCompoundTag(1), "lvl", 1);
    };
    //Fortune
    if (player.getData("skyhighocs:dyn/tool_enchant") == 1) {
      manager.setInteger(player.getHeldItem().nbt().getTagList("ench").getCompoundTag(1), "id", 35);
      manager.setInteger(player.getHeldItem().nbt().getTagList("ench").getCompoundTag(1), "lvl", 4);
    };
    return true;
  };
  function cycleUpCard(player, manager) {
    manager.setData(player, "skyhighocs:dyn/selected_battle_card", player.getData("skyhighocs:dyn/selected_battle_card") + 1);
    if (player.getData("skyhighocs:dyn/selected_battle_card") > 5) {
      manager.setData(player, "skyhighocs:dyn/selected_battle_card", 0);
    };
    return true;
  };
  function cycleDownCard(player, manager) {
    manager.setData(player, "skyhighocs:dyn/selected_battle_card", player.getData("skyhighocs:dyn/selected_battle_card") - 1);
    if (player.getData("skyhighocs:dyn/selected_battle_card") < 0) {
      manager.setData(player, "skyhighocs:dyn/selected_battle_card", 5);
    };
    return true;
  };
  //All of the required functions and stuff go here
  return {
    name: "solarFlame",
    type: 9,
    waveChange: "Solar Flame",
    color: "\u00A74",
    human: "Ace Stelar",
    powers: [
      "skyhighocs:em_wave_being",
      "skyhighocs:battle_cards_ace"
    ],
    keyBinds: function (hero) {
      hero.addKeyBind("TELEPORT", "Transmit", 1);
      hero.addKeyBindFunc("CYCLE_UP_CARD", (player, manager) => cycleUpCard(player, manager), "Next Battle Card", 1);
      hero.addKeyBindFunc("BATTLE_CARD_0", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/battle_card", player.getData("skyhighocs:dyn/selected_battle_card"));
        return true;
      }, "Return To Solar Buster", 2);
      hero.addKeyBindFunc("BATTLE_CARD_1", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/battle_card", player.getData("skyhighocs:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Solar Flame\u00A7r> Battle Card Predation! \u00A74Barrier\u00A7r!");
        };
        return true;
      }, "Battle Card! Barrier!", 2);
      hero.addKeyBindFunc("BATTLE_CARD_2", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/battle_card", player.getData("skyhighocs:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Solar Flame\u00A7r> Battle Card Predation! \u00A74Sword\u00A7r!");
        };
        return true;
      }, "Battle Card! Sword!", 2);
      hero.addKeyBindFunc("BATTLE_CARD_3", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/battle_card", player.getData("skyhighocs:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Solar Flame\u00A7r> Battle Card Predation! \u00A74Solar Flare\u00A7r!");
        };
        return true;
      }, "Battle Card! Solar Flare!", 2);
      hero.addKeyBindFunc("BATTLE_CARD_4", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/battle_card", player.getData("skyhighocs:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Solar Flame\u00A7r> Battle Card Predation! \u00A74Solar Wind\u00A7r!");
        };
        return true;
      }, "Battle Card! Solar Wind!", 2);
      hero.addKeyBindFunc("BATTLE_CARD_5", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/battle_card", player.getData("skyhighocs:dyn/selected_battle_card"));
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A74Solar Flame\u00A7r> Battle Card Predation! \u00A74Solar Blast\u00A7r!");
        };
        return true;
      }, "Battle Card! Solar Blast!", 2);
      hero.addKeyBind("INVISIBILITY", "Wave World", 3);
      hero.addKeyBindFunc("CYCLE_DOWN_CARD", (player, manager) => cycleDownCard(player, manager), "Previous Battle Card", 3);
      hero.addKeyBind("ENERGY_PROJECTION", "Solar Wind", 4);
      hero.addKeyBind("CHARGED_BEAM", "Solar Blast", 4);
      hero.addKeyBindFunc("FORTUNE_SWITCH", (player, manager) => toolSwitchEnchant(player, manager), "Active Enchant: Silk Touch", 4);
      hero.addKeyBindFunc("SILK_SWITCH", (player, manager) => toolSwitchEnchant(player, manager), "Active Enchant: Fortune", 4);
      hero.addKeyBind("RIFLE_AIM", "Aim Rifle", 4);
      hero.addKeyBind("SHIELD_THROW", "Throw Shield", 4);
      hero.addKeyBind("CHARGE_ENERGY", "Charge Energy", 4);
      hero.addKeyBind("INTANGIBILITY", "Become in Phase", 5);
    },
    tierOverride: function (entity) {
      if ((entity.getData("skyhighocs:dyn/wave_changing_timer") > 0) && (entity.getData("skyhighocs:dyn/wave_changing_timer") < 1)) {
        return 1;
      };
      return (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) ? 10 : 0;
    },
    properties: function (entity, property) {
      return (property == "BREATHE_SPACE" || property == "MASK_TOGGLE") && ((entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) || entity.is("DISPLAY"));
    },
    permissions: function (entity, permission) {
      return (permission == "USE_CHRONOS_RIFLE" || permission == "USE_SHIELD") && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
    },
    initSounds: function (hero) {
      hero.addSoundEvent("WEAPON_EQUIP", "skyhighocs:wave_equip");
      hero.addSoundEvent("WEAPON_UNEQUIP", "skyhighocs:wave_equip");
      hero.addSoundEvent("STEP", "skyhighocs:wave_footstep");
      hero.addSoundEvent("PUNCH", "skyhighocs:wave_punch");
    },
    initEquipment: function (hero) {
      hero.addPrimaryEquipment("fiskheroes:katana{Dual:1,display:{Name:\u00A74Solar Flame's Katanas},ench:[{id:16,lvl:6},{id:19,lvl:3},{id:20,lvl:3},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => (item.nbt().getBoolean("Dual") && item.getEnchantmentLevel(16) == 6 && item.getEnchantmentLevel(19) == 3 && item.getEnchantmentLevel(20) == 3 && item.getEnchantmentLevel(21) == 3 && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Solar Flame's Katanas"));
      hero.addPrimaryEquipment("fiskheroes:ruptures_scythe{display:{Name:\u00A74Solar Flame's Scythe},ench:[{id:16,lvl:6},{id:19,lvl:3},{id:20,lvl:3},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => (item.getEnchantmentLevel(16) == 6 && item.getEnchantmentLevel(19) == 3 && item.getEnchantmentLevel(20) == 3 && item.getEnchantmentLevel(21) == 3 && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Solar Flame's Scythe"));
      hero.addPrimaryEquipment("fiskheroes:chronos_rifle{display:{Name:\u00A74Solar Flame's Rifle},ench:[{id:34,lvl:5}]}", true, item => (item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Solar Flame's Rifle"));
      hero.addPrimaryEquipment("fiskheroes:captain_americas_shield{Electromagnetic:1,display:{Name:\u00A74Solar Flame's Shield},ench:[{id:16,lvl:6},{id:19,lvl:3},{id:20,lvl:3},{id:21,lvl:3},{id:34,lvl:5}]}", true, item => (item.nbt().getBoolean("Electromagnetic") && item.getEnchantmentLevel(16) == 6 && item.getEnchantmentLevel(19) == 3 && item.getEnchantmentLevel(20) == 3 && item.getEnchantmentLevel(21) == 3 && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Solar Flame's Shield"));
      hero.addPrimaryEquipment("fiskheroes:tutridium_pickaxe{display:{Name:\u00A74Solar Flame's Pickaxe},ench:[{id:32,lvl:7},{id:35,lvl:4},{id:34,lvl:5}]}", true, item => (item.getEnchantmentLevel(32) == 7 && (item.getEnchantmentLevel(33) == 1 || item.getEnchantmentLevel(35) == 4) && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Solar Flame's Pickaxe"));
      hero.addPrimaryEquipment("fiskheroes:tutridium_shovel{display:{Name:\u00A74Solar Flame's Shovel},ench:[{id:32,lvl:7},{id:33,lvl:1},{id:34,lvl:5}]}", true, item => (item.getEnchantmentLevel(32) == 7 && (item.getEnchantmentLevel(33) == 1 || item.getEnchantmentLevel(35) == 4) && item.getEnchantmentLevel(34) == 5 && item.displayName() == "\u00A74Solar Flame's Shovel"));
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
      if (entity.getData("skyhighocs:dyn/sword_blade_timer") == 1 && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
        result = "SWORD";
      };
      if (entity.getHeldItem().name() == "fiskheroes:katana" && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
        result = "SWORD";
      };
      if (entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
        result = "SWORD";
      };
      if (entity.getHeldItem().name() == "fiskheroes:chronos_rifle" && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
        result = "MAIN";
      };
      if (entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
        result = "MAIN";
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
      if (entity.getData("skyhighocs:dyn/sword_blade_timer") == 1) {
        return "SWORD";
      };
      if (entity.getData("skyhighocs:dyn/sword_blade_timer") < 1 && !entity.getData("fiskheroes:shield_blocking")) {
        return null;
      };
    },
    isKeyBindEnabled: function (entity, keyBind) {
      var result = false;
      var uuid = "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0";
      if (keyBind == "CYCLE_CHATS_EM") {
        result = !entity.isSneaking() && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/solar_timer") == 1;
      };
      if (keyBind == "CYCLE_CHAT_MODES_EM") {
        result = entity.isSneaking() && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/solar_timer") == 1;
      };
      if (keyBind == "INTANGIBILITY") {
        result = entity.getData("fiskheroes:flight_timer") > 0;
      };
      if (keyBind == "SHIELD_THROW") {
        result = entity.getHeldItem().name() == "fiskheroes:captain_americas_shield";
      };
      if (keyBind == "CHARGE_ENERGY") {
        result = entity.getHeldItem().name() == "fiskheroes:ruptures_scythe";
      };
      if (keyBind == "TELEPORT" || keyBind == "INVISIBILITY") {
        result = !entity.getData("skyhighocs:dyn/predation");
      };
      if (keyBind == "SILK_SWITCH") {
        result = entity.getData("skyhighocs:dyn/tool_enchant") == 0 && (entity.getHeldItem().name() == "fiskheroes:tutridium_shovel" || "fiskheroes:tutridium_pickaxe") && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(35) == 4 && entity.getHeldItem().getEnchantmentLevel(34) == 5;
      };
      if (keyBind == "FORTUNE_SWITCH") {
        result = entity.getData("skyhighocs:dyn/tool_enchant") == 1 && (entity.getHeldItem().name() == "fiskheroes:tutridium_shovel" || "fiskheroes:tutridium_pickaxe") && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(33) == 1 && entity.getHeldItem().getEnchantmentLevel(34) == 5;
      };
      if (keyBind == "RIFLE_AIM") {
        result = entity.getHeldItem().name() == "fiskheroes:chronos_rifle";
      };
      if (keyBind == "CYCLE_UP_CARD" || keyBind == "CYCLE_DOWN_CARD") {
        result = entity.getData("skyhighocs:dyn/predation");
      };
      if (keyBind == "BATTLE_CARD_0") {
        result = entity.getData("skyhighocs:dyn/predation") && entity.getData("skyhighocs:dyn/selected_battle_card") == 0;
      };
      if (keyBind == "BATTLE_CARD_1") {
        result = entity.getData("skyhighocs:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighocs:dyn/selected_battle_card") == 1;
      };
      if (keyBind == "BATTLE_CARD_2") {
        result = entity.getData("skyhighocs:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighocs:dyn/selected_battle_card") == 2;
      };
      if (keyBind == "BATTLE_CARD_3") {
        result = entity.getData("skyhighocs:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighocs:dyn/selected_battle_card") == 3;
      };
      if (keyBind == "BATTLE_CARD_4") {
        result = entity.getData("skyhighocs:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighocs:dyn/selected_battle_card") == 4;
      };
      if (keyBind == "BATTLE_CARD_5") {
        result = entity.getData("skyhighocs:dyn/predation") && !entity.isSneaking() && entity.getData("skyhighocs:dyn/selected_battle_card") == 5;
      };
      if (keyBind == "ENERGY_PROJECTION") {
        result = !(entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" || entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" || entity.getHeldItem().name() == "fiskheroes:tutridium_shovel") && entity.getData("skyhighocs:dyn/battle_card") == 4;
      };
      if (keyBind == "CHARGED_BEAM") {
        result = !(entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" || entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" || entity.getHeldItem().name() == "fiskheroes:tutridium_shovel") && entity.getData("skyhighocs:dyn/battle_card") == 5;
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      var uuid = "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0";
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
        result = true;
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
      if (modifier.name() == "fiskheroes:shield_throwing") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:energy_manipulation") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:shield") {
        if (modifier.id() == "barrier") {
          result = entity.getData("skyhighocs:dyn/battle_card") == 1 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
        };
        if (modifier.id() == "sword") {
          result = entity.getData("skyhighocs:dyn/battle_card") == 2 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
        };
      };
      if (modifier.name() == "fiskheroes:blade") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 2 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:lightning_cast") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 3 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:energy_projection") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 4 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      if (modifier.name() == "fiskheroes:charged_beam") {
        result = entity.getData("skyhighocs:dyn/battle_card") == 5 && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getHeldItem().isEmpty();
      };
      return result;
    },
    tickHandler: function (entity, manager) {
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:tutridium_shovel" && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(33) == 1 && entity.getHeldItem().getEnchantmentLevel(34) == 5) {
        manager.setData(entity, "skyhighocs:dyn/tool_enchant", 1);
      };
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:tutridium_shovel" && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(35) == 4 && entity.getHeldItem().getEnchantmentLevel(34) == 5) {
        manager.setData(entity, "skyhighocs:dyn/tool_enchant", 0);
      };
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(33) == 1 && entity.getHeldItem().getEnchantmentLevel(34) == 5) {
        manager.setData(entity, "skyhighocs:dyn/tool_enchant", 1);
      };
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" && entity.getHeldItem().getEnchantmentLevel(32) == 7 && entity.getHeldItem().getEnchantmentLevel(35) == 4 && entity.getHeldItem().getEnchantmentLevel(34) == 5) {
        manager.setData(entity, "skyhighocs:dyn/tool_enchant", 0);
      };
      var item_holding = (!entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/wave_changing_timer") > 0);
      manager.incrementData(entity, "skyhighocs:dyn/item_holding_timer", 10, item_holding);
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
      var sword = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.getData("skyhighocs:dyn/predation") && entity.getData("skyhighocs:dyn/predation_timer") < 0.2 && entity.getData("skyhighocs:dyn/battle_card") == 2 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/sword", sword);
      var sword_blade = entity.getData("skyhighocs:dyn/sword_timer") == 1 && entity.getData("skyhighocs:dyn/item_holding_timer") == 0;
      manager.setData(entity, "skyhighocs:dyn/sword_blade", sword_blade);
      var solar_flare = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.getData("skyhighocs:dyn/predation") && entity.getData("skyhighocs:dyn/predation_timer") < 0.2 && entity.getData("skyhighocs:dyn/battle_card") == 3 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/solar_flare", solar_flare);
      var solar_wind = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.getData("skyhighocs:dyn/predation") && entity.getData("skyhighocs:dyn/predation_timer") < 0.2 && entity.getData("skyhighocs:dyn/battle_card") == 4 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/solar_wind", solar_wind);
      var solar_blast = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.getData("skyhighocs:dyn/predation") && entity.getData("skyhighocs:dyn/predation_timer") < 0.2 && entity.getData("skyhighocs:dyn/battle_card") == 5 && (entity.getData("fiskheroes:flight_boost_timer") == 0 || (entity.getData("fiskheroes:flight_boost_timer") < 0.5 && !entity.isSprinting())));
      manager.setData(entity, "skyhighocs:dyn/solar_blast", solar_blast);
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty() && !entity.getData("skyhighocs:dyn/predation") && entity.getData("skyhighocs:dyn/predation_timer") > 0.3 && entity.getData("skyhighocs:dyn/predation_timer") < 0.4) {
        if (entity.getData("skyhighocs:dyn/battle_card") == 1) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.35) {
            system.systemMessage(entity, "<n>Inserted <nh>Barrier<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/solar", false);
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:shield", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 2) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.35) {
            system.systemMessage(entity, "<n>Inserted <nh>Sword<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/solar", true);
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:shield", true);
          manager.setData(entity, "fiskheroes:blade", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 3) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.35) {
            system.systemMessage(entity, "<n>Inserted <nh>Solar Flare<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/solar", true);
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 4) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.35) {
            system.systemMessage(entity, "<n>Inserted <nh>Solar Wind<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/solar", true);
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 5) {
          entity.playSound("skyhighocs:wave.equip", 1, 1);
          if (entity.getData("skyhighocs:dyn/predation_timer") > 0.35) {
            system.systemMessage(entity, "<n>Inserted <nh>Solar Blast<n> battle card!");
          };
          manager.setData(entity, "skyhighocs:dyn/solar", true);
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
        };
      };
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && ((entity.getData("fiskheroes:flight_boost_timer") > 0 && entity.isSprinting()) || !entity.getHeldItem().isEmpty())) {
        manager.setData(entity, "skyhighocs:dyn/solar", false);
      };
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && (entity.getData("fiskheroes:flight_boost_timer") < 1 && !entity.isSprinting()) && entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/predation_timer") == 0) {
        if (entity.getData("skyhighocs:dyn/battle_card") == 1) {
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:shield", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 2) {
          manager.setData(entity, "skyhighocs:dyn/solar", true);
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
          manager.setData(entity, "fiskheroes:shield", true);
          manager.setData(entity, "fiskheroes:blade", true);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 3) {
          manager.setData(entity, "skyhighocs:dyn/solar", true);
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 4) {
          manager.setData(entity, "skyhighocs:dyn/solar", true);
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
        };
        if (entity.getData("skyhighocs:dyn/battle_card") == 5) {
          manager.setData(entity, "skyhighocs:dyn/solar", true);
          manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
        };
      };
    },
  };
};
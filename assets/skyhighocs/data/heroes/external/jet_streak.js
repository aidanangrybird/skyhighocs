/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  function resetBattleCard(entity, manager) {
    manager.setDataWithNotify(entity, "skyhighocs:dyn/battle_card", 0);
    return true;
  };
  function cycleUpCard(entity, manager) {
    manager.setDataWithNotify(entity, "skyhighocs:dyn/selected_battle_card", entity.getData("skyhighocs:dyn/selected_battle_card") + 1);
    if (entity.getData("skyhighocs:dyn/selected_battle_card") > 5) {
      manager.setDataWithNotify(entity, "skyhighocs:dyn/selected_battle_card", 0);
    };
  };
  function cycleDownCard(entity, manager) {
    manager.setDataWithNotify(entity, "skyhighocs:dyn/selected_battle_card", entity.getData("skyhighocs:dyn/selected_battle_card") - 1);
    if (entity.getData("skyhighocs:dyn/selected_battle_card") < 0) {
      manager.setDataWithNotify(entity, "skyhighocs:dyn/selected_battle_card", 5);
    };
  };
  return {
    name: "jetStreak",
    type: 8,
    emBeing: "Jet-Streak",
    powers: [
      "skyhighocs:jet_streak",
      "skyhighocs:em_wave_change",
      "skyhighocs:battle_card_predation",
      "skyhighocs:vortex_buster"
    ],
    keyBinds: function (hero) {
      hero.addKeyBindFunc("BATTLE_CARD_RESET", (player, manager) => resetBattleCard(player, manager), "Return To Vortex Buster", 2);
      hero.addKeyBind("GRAVITY_MANIPULATION", "Battle Card Predation", 2);
      hero.addKeyBind("AIM", "Aim Vortex Buster", 4);
      hero.addKeyBindFunc("DESYNCHRONIZE_WAVES", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/battle_card", 0);
        manager.setData(player, "skyhighocs:dyn/selected_battle_card", 0);
        manager.setData(player, "skyhighocs:dyn/body_temperature", 0.0);
        manager.setData(player, "skyhighocs:dyn/predation_timer", 0);
        manager.setData(player, "skyhighocs:dyn/predation", false);
        manager.setData(player, "skyhighocs:dyn/jet_streak_timer", 0);
        manager.setData(player, "skyhighocs:dyn/jet_streak", false);
        if (player.getData("skyhighocs:dyn/visualizer_toggle")) {
          manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
        };
        if (!player.getData("skyhighocs:dyn/visualizer_toggle")) {
          manager.setData(player, "fiskheroes:penetrate_martian_invis", false);
        };
        return true;
      }, "EM Wave Change!", 5);
      hero.addKeyBindFunc("SYNCHRONIZE_WAVES", (player, manager) => {
        if (player.getUUID() == "a3d071d4-c912-41e1-a6b2-c0de99ea4a84") {
          system.shoutMessage(player, "<Aidan Stelar> EM Wave Change! \u00A76Aidan Stelar\u00A7r, On-Air!", 16);
          manager.setData(player, "skyhighocs:dyn/battle_card", 0);
          manager.setData(player, "skyhighocs:dyn/selected_battle_card", 0);
          manager.setData(player, "skyhighocs:dyn/body_temperature", 0.0);
          manager.setData(player, "skyhighocs:dyn/predation_timer", 0);
          manager.setData(player, "skyhighocs:dyn/predation", false);
          manager.setData(player, "skyhighocs:dyn/jet_streak_timer", 0);
          manager.setData(player, "skyhighocs:dyn/jet_streak", false);
          manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
        } else {
          system.shoutMessage(player, "<\u00A76Jet-Streak\u00A7r> Who are you?", 16);
        };
        return true;
      }, "EM Wave Change!", 5);
      hero.addKeyBind("WAVE_CHANGE", "EM Wave Change!", 5);
      hero.addKeyBind("JET_STREAK_TOGGLE", "Toggle Vortex Buster", 5);
      hero.addKeyBindFunc("COLD_TEMPERATURE", (player, manager) => {
        if (player.getUUID() == "a3d071d4-c912-41e1-a6b2-c0de99ea4a84") {
          system.shoutMessage(player, "\u00A7r<\u00A76Jet-Streak\u00A7r> You are too cold for us to EM Wave Change.", 16);
        } else {
          system.shoutMessage(player, "<\u00A76Jet-Streak\u00A7r> Who are you?", 16);
        };
        return true;
      }, "\u00A7mEM Wave Change!\u00A7r You are too cold", 5);
      hero.addKeyBindFunc("HOT_TEMPERATURE", (player, manager) => {
        if (player.getUUID() == "a3d071d4-c912-41e1-a6b2-c0de99ea4a84") {
          system.shoutMessage(player, "\u00A7r<\u00A76Jet-Streak\u00A7r> You are too hot for us to EM Wave Change.", 16);
        } else {
          system.shoutMessage(player, "<\u00A76Jet-Streak\u00A7r> Who are you?", 16);
        };
        return true;
      }, "\u00A7mEM Wave Change!\u00A7r You are too hot", 5);
    },
    canAim: function (entity) {
      return (entity.getHeldItem().isEmpty() || entity.getHeldItem().name() == "fiskheroes:chronos_rifle") && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/jet_streak_timer") == 0 && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
    },
    isKeyBindEnabled: function (entity, keyBind) {
      var result = false;
      if (keyBind == "GRAVITY_MANIPULATION") {
        result = (entity.getData("skyhighocs:dyn/battle_card") > 0 || entity.getData("skyhighocs:dyn/jet_streak_timer") < 1) && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "BATTLE_CARD_RESET") {
        result = entity.isSneaking() && (entity.getData("skyhighocs:dyn/predation") && entity.getData("skyhighocs:dyn/selected_battle_card") > 0) && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "SYNCHRONIZE_WAVES") {
        result = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") < 0.25 && entity.getData("skyhighocs:dyn/body_temperature") > -0.25);
      };
      if (keyBind == "DESYNCHRONIZE_WAVES") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.isSneaking());
      };
      if (keyBind == "WAVE_CHANGE") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && ((entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.isSneaking()) || (entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") < 0.25 && entity.getData("skyhighocs:dyn/body_temperature") > -0.25));
      };
      if (keyBind == "AIM") {
        result = entity.getData("skyhighocs:dyn/jet_streak_timer") < 1 && !(entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" || entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" || entity.getHeldItem().name() == "fiskheroes:tutridium_shovel") && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "COLD_TEMPERATURE") {
        result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") <= -0.25;
      };
      if (keyBind == "HOT_TEMPERATURE") {
        result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") >= 0.25;
      };
      if (keyBind == "JET_STREAK_TOGGLE") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && entity.isSneaking() && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      var uuid = "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
      var result = false;
      if (modifier.name() == "fiskheroes:transformation") {
        if (modifier.id() == "predation" || modifier.id() == "jet_streak") {
          result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
        };
        if (modifier.id() == "wave_change") {
          result = entity.getUUID() == uuid;
        };
      };
      if (modifier.name() == "fiskheroes:energy_bolt") {
        result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/battle_card") == 0;
      };
      if (modifier.name() == "fiskheroes:gravity_manipulation") {
        result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty()
      };
      return result;
    },
    tickHandler: function (entity, manager) {
      if (entity.getData("skyhighocs:dyn/predation_timer") >= 1) {
        manager.setDataWithNotify(entity, "skyhighocs:dyn/predation", false);
        manager.setDataWithNotify(entity, "skyhighocs:dyn/predation_timer", 0.0);
      };
      if (entity.getData("fiskheroes:gravity_manip")) {
        if (entity.getData("skyhighocs:dyn/reset_gravity_manip")) {
          manager.setDataWithNotify(entity, "fiskheroes:gravity_amount", 0);
          manager.setDataWithNotify(entity, "skyhighocs:dyn/reset_gravity_manip", false);
        };
        var gravity_amount = entity.getData("fiskheroes:gravity_amount");
        if (gravity_amount > 0) {
          cycleUpCard(entity, manager);
          manager.setDataWithNotify(entity, "skyhighocs:dyn/reset_gravity_manip", true);
        };
        if (gravity_amount < 0) {
          cycleDownCard(entity, manager);
          manager.setDataWithNotify(entity, "skyhighocs:dyn/reset_gravity_manip", true);
        };
      };
      if (!entity.getData("fiskheroes:gravity_manip") && (entity.getData("skyhighocs:dyn/battle_card") != entity.getData("skyhighocs:dyn/selected_battle_card"))) {
        manager.setDataWithNotify(entity, "skyhighocs:dyn/predation", true);
      };
    },
  };
};
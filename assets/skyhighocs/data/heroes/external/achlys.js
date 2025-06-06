/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  function resetBattleCard(player, manager) {
    manager.setData(player, "skyhighocs:dyn/selected_battle_card", 0);
    manager.setData(player, "skyhighocs:dyn/battle_card", 0);
    return true;
  };
  return {
    name: "achlys",
    type: 8,
    emBeing: "Achlys",
    powers: [
      "skyhighocs:achlys",
      "skyhighocs:em_wave_change",
      "skyhighocs:battle_card_predation",
      "skyhighocs:shadow_buster"
    ],
    keyBinds: function (hero) {
      hero.addKeyBindFunc("BATTLE_CARD_RESET_PREDATION", (player, manager) => resetBattleCard(player, manager), "Return To Shadow Buster", 2);
      hero.addKeyBind("PREDATION", "Battle Card Predation", 2);
      hero.addKeyBind("AIM", "Aim Shadow Buster", 4);
      hero.addKeyBindFunc("DESYNCHRONIZE_WAVES", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/battle_card", 0);
        manager.setData(player, "skyhighocs:dyn/selected_battle_card", 0);
        manager.setData(player, "skyhighocs:dyn/body_temperature", 0.0);
        manager.setData(player, "skyhighocs:dyn/predation_timer", 0);
        manager.setData(player, "skyhighocs:dyn/predation", false);
        manager.setData(player, "skyhighocs:dyn/achlys_timer", 0);
        manager.setData(player, "skyhighocs:dyn/achlys", false);
        if (player.getData("skyhighocs:dyn/visualizer_toggle")) {
          manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
        };
        if (!player.getData("skyhighocs:dyn/visualizer_toggle")) {
          manager.setData(player, "fiskheroes:penetrate_martian_invis", false);
        };
        return true;
      }, "EM Wave Change!", 5);
      hero.addKeyBindFunc("SYNCHRONIZE_WAVES", (player, manager) => {
        if (player.getUUID() == "e51532a1-19fc-4d4f-9da0-f952c4645891") {
          if (PackLoader.getSide() == "CLIENT") {
            PackLoader.printChat("<Damien Stelar> EM Wave Change! \u00A75Damien Stelar\u00A7r, On-Air!");
          };
          manager.setData(player, "skyhighocs:dyn/battle_card", 0);
          manager.setData(player, "skyhighocs:dyn/selected_battle_card", 0);
          manager.setData(player, "skyhighocs:dyn/body_temperature", 0.0);
          manager.setData(player, "skyhighocs:dyn/predation_timer", 0);
          manager.setData(player, "skyhighocs:dyn/predation", false);
          manager.setData(player, "skyhighocs:dyn/achlys_timer", 0);
          manager.setData(player, "skyhighocs:dyn/achlys", false);
          manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
        } else {
          if (PackLoader.getSide() == "CLIENT") {
            PackLoader.printChat("<\u00A75Achlys\u00A7r> Who are you?");
          };
        };
        return true;
      }, "EM Wave Change!", 5);
      hero.addKeyBind("WAVE_CHANGE", "EM Wave Change!", 5);
      hero.addKeyBind("ACHLYS_TOGGLE", "Toggle Shadow Buster", 5);
      hero.addKeyBind("AIM", "Aim Shadow Buster", 4);
      hero.addKeyBindFunc("COLD_TEMPERATURE", (player, manager) => {
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A75Achlys\u00A7r> You are too cold for us to EM Wave Change.");
        };
        return true;
      }, "\u00A7mEM Wave Change!\u00A7r You are too cold", 5);
      hero.addKeyBindFunc("HOT_TEMPERATURE", (player, manager) => {
        if (PackLoader.getSide() == "CLIENT") {
          PackLoader.printChat("\u00A7r<\u00A75Achlys\u00A7r> You are too hot for us to EM Wave Change.");
        };
        return true;
      }, "\u00A7mEM Wave Change!\u00A7r You are too hot", 5);
      hero.addKeyBindFunc("BATTLE_CARD_RESET", (player, manager) => resetBattleCard(player, manager), "Return To Shadow Buster", 5);
    },
    canAim: function (entity) {
      return (entity.getHeldItem().isEmpty() || entity.getHeldItem().name() == "fiskheroes:chronos_rifle") && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/achlys_timer") == 0 && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
    },
    isKeyBindEnabled: function (entity, keyBind) {
      var result = false;
      var uuid = "e51532a1-19fc-4d4f-9da0-f952c4645891";
      if (keyBind == "PREDATION") {
        result = (entity.getData("skyhighocs:dyn/battle_card") > 0 || entity.getData("skyhighocs:dyn/achlys_timer") < 1) && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "BATTLE_CARD_RESET_PREDATION") {
        result = entity.isSneaking() && (entity.getData("skyhighocs:dyn/predation") && entity.getData("skyhighocs:dyn/selected_battle_card") > 0) && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "BATTLE_CARD_RESET") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && entity.isSneaking() && entity.getData("skyhighocs:dyn/battle_card") > 0 && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "SYNCHRONIZE_WAVES") {
        result = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") < 0.25 && entity.getData("skyhighocs:dyn/body_temperature") > -0.25);
      };
      if (keyBind == "DESYNCHRONIZE_WAVES") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.isSneaking());
      };
      if (keyBind == "WAVE_CHANGE") {
        result = entity.getUUID() == uuid && entity.getData("fiskheroes:flight_timer") == 0 && ((entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.isSneaking()) || (entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") < 0.25 && entity.getData("skyhighocs:dyn/body_temperature") > -0.25));
      };
      if (keyBind == "AIM") {
        result = entity.getData("skyhighocs:dyn/achlys_timer") < 1 && !(entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" || entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" || entity.getHeldItem().name() == "fiskheroes:tutridium_shovel") && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "COLD_TEMPERATURE") {
        result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") <= -0.25;
      };
      if (keyBind == "HOT_TEMPERATURE") {
        result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") >= 0.25;
      };
      if (keyBind == "ACHLYS_TOGGLE") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && entity.isSneaking() && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getData("skyhighocs:dyn/predation_timer") < 1;
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      var uuid = "e51532a1-19fc-4d4f-9da0-f952c4645891";
      var result = false;
      if (modifier.name() == "fiskheroes:transformation") {
        if (modifier.id() == "predation" || modifier.id() == "achlys") {
          result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
        };
        if (modifier.id() == "wave_change") {
          result = entity.getUUID() == uuid;
        };
      };
      if (modifier.name() == "fiskheroes:energy_bolt") {
        result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/battle_card") == 0;
      };
      return result;
    },
    tickHandler: function (entity, manager) {
      if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && ((entity.getData("skyhighocs:dyn/predation") && entity.getData("skyhighocs:dyn/predation_timer") > 0 && entity.getData("skyhighocs:dyn/predation_timer") < 1))) {
        manager.setData(entity, "skyhighocs:dyn/battle_card", 0);
        manager.setData(entity, "skyhighocs:dyn/selected_battle_card", 0);
        manager.setData(entity, "skyhighocs:dyn/sword", false);
        manager.setData(entity, "skyhighocs:dyn/achlys", false);
      };
    },
  };
};
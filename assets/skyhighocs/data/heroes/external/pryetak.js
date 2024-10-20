/**
 * You put all of the required functions in here
 * @param transer - Required
 **/
function init(transer) {
  //All of the required functions and stuff go here
  function resetBattleCard(player, manager) {
    manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 0);
    manager.setData(player, "skyhighheroes:dyn/battle_card", 0);
    return true;
  };
  return {
    emPowers: function () {
      return [
        "skyhighheroes:em_wave_change",
        "skyhighheroes:battle_card_predation",
        "skyhighocs:nebula_buster"
      ];
    },
    powers: function () {
      return [
        "skyhighocs:pryetak"
      ];
    },
    keyBinds: function (hero) {
      hero.addKeyBindFunc("BATTLE_CARD_RESET_PREDATION", (player, manager) => resetBattleCard(player, manager), "Return To Nebula Buster", 2);
      hero.addKeyBind("PREDATION", "Battle Card Predation", 2);
      hero.addKeyBind("AIM", "Aim Nebula Buster", 4);
      hero.addKeyBindFunc("DESYNCHRONIZE_WAVES", (player, manager) => {
        manager.setData(player, "skyhighheroes:dyn/battle_card", 0);
        manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 0);
        manager.setData(player, "skyhighheroes:dyn/body_temperature", 0.0);
        manager.setData(player, "skyhighheroes:dyn/predation_timer", 0);
        manager.setData(player, "skyhighheroes:dyn/predation", false);
        manager.setData(player, "skyhighocs:dyn/pryetak_timer", 0);
        manager.setData(player, "skyhighocs:dyn/pryetak", false);
        if (player.getData("skyhighheroes:dyn/visualizer_toggle") == 1) {
          manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
        };
        if (player.getData("skyhighheroes:dyn/visualizer_toggle") == 0) {
          manager.setData(player, "fiskheroes:penetrate_martian_invis", false);
        };
        return true;
      }, "EM Wave Change!", 5);
      hero.addKeyBindFunc("SYNCHRONIZE_WAVES", (player, manager) => {
        if (player.getUUID() == "4da600b8-582a-4fc3-ac2e-ada03d3e478c") {
          if (PackLoader.getSide() == "CLIENT") {
            PackLoader.printChat("<Chase Stelar> EM Wave Change! \u00A72Chase Stelar\u00A7r, On-Air!");
          };
          manager.setData(player, "skyhighheroes:dyn/battle_card", 0);
          manager.setData(player, "skyhighheroes:dyn/selected_battle_card", 0);
          manager.setData(player, "skyhighheroes:dyn/body_temperature", 0.0);
          manager.setData(player, "skyhighheroes:dyn/predation_timer", 0);
          manager.setData(player, "skyhighheroes:dyn/predation", false);
          manager.setData(player, "skyhighocs:dyn/pryetak_timer", 0);
          manager.setData(player, "skyhighocs:dyn/pryetak", false);
          manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
        } else {
          if (PackLoader.getSide() == "CLIENT") {
            PackLoader.printChat("<\u00A72Pryetak\u00A7r> Who are you?");
          };
        };
        return true;
      }, "EM Wave Change!", 5);
      hero.addKeyBind("WAVE_CHANGE", "EM Wave Change!", 5);
      hero.addKeyBind("PRYETAK_TOGGLE", "Toggle Nebula Buster", 5);
      hero.addKeyBind("AIM", "Aim Nebula Buster", 4);
      hero.addKeyBindFunc("COLD_TEMPERATURE", (player, manager) => {
        if (player.getUUID() == "4da600b8-582a-4fc3-ac2e-ada03d3e478c") {
          if (PackLoader.getSide() == "CLIENT") {
            PackLoader.printChat("\u00A7r<\u00A72Pryetak\u00A7r> You are too cold for us to EM Wave Change.");
          };
        } else {
          if (PackLoader.getSide() == "CLIENT") {
            PackLoader.printChat("<\u00A72Pryetak\u00A7r> Who are you?");
          };
        };
        return true;
      }, "\u00A7mEM Wave Change!\u00A7r You are too cold", 5);
      hero.addKeyBindFunc("HOT_TEMPERATURE", (player, manager) => {
        if (player.getUUID() == "4da600b8-582a-4fc3-ac2e-ada03d3e478c") {
          if (PackLoader.getSide() == "CLIENT") {
            PackLoader.printChat("\u00A7r<\u00A72Pryetak\u00A7r> You are too hot for us to EM Wave Change.");
          };
        } else {
          if (PackLoader.getSide() == "CLIENT") {
            PackLoader.printChat("<\u00A72Pryetak\u00A7r> Who are you?");
          };
        };
        return true;
      }, "\u00A7mEM Wave Change!\u00A7r You are too hot", 5);
      hero.addKeyBindFunc("BATTLE_CARD_RESET", (player, manager) => resetBattleCard(player, manager), "Return To Nebula Buster", 5);
    },
    canAim: function (entity) {
      return (entity.getHeldItem().isEmpty() || entity.getHeldItem().name() == "fiskheroes:chronos_rifle") && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getData("skyhighheroes:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/pryetak_timer") == 0 && entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
    },
    isKeyBindEnabled: function (entity, keyBind) {
      var result = false;
      if (keyBind == "PREDATION") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && (entity.getData("skyhighheroes:dyn/battle_card") > 0 || entity.getData("skyhighocs:dyn/pryetak_timer") < 1);
      };
      if (keyBind == "BATTLE_CARD_RESET_PREDATION") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.isSneaking() && (entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/selected_battle_card") > 0);
      };
      if (keyBind == "BATTLE_CARD_RESET") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:flight_timer") == 0 && entity.isSneaking() && entity.getData("skyhighheroes:dyn/battle_card") > 0;
      };
      if (keyBind == "SYNCHRONIZE_WAVES") {
        result = (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getData("skyhighheroes:dyn/body_temperature") < 0.25 && entity.getData("skyhighheroes:dyn/body_temperature") > -0.25);
      };
      if (keyBind == "DESYNCHRONIZE_WAVES") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.isSneaking());
      };
      if (keyBind == "WAVE_CHANGE") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && ((entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && !entity.isSneaking()) || (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getData("skyhighheroes:dyn/body_temperature") < 0.25 && entity.getData("skyhighheroes:dyn/body_temperature") > -0.25));
      };
      if (keyBind == "AIM") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("skyhighocs:dyn/pryetak_timer") < 1 && !(entity.getHeldItem().name() == "fiskheroes:captain_americas_shield" || entity.getHeldItem().name() == "fiskheroes:ruptures_scythe" || entity.getHeldItem().name() == "fiskheroes:tutridium_pickaxe" || entity.getHeldItem().name() == "fiskheroes:tutridium_shovel") && entity.getData("skyhighheroes:dyn/battle_card") == 0;
      };
      if (keyBind == "COLD_TEMPERATURE") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getData("skyhighheroes:dyn/body_temperature") <= -0.25;
      };
      if (keyBind == "HOT_TEMPERATURE") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 0 && entity.getData("skyhighheroes:dyn/body_temperature") >= 0.25;
      };
      if (keyBind == "PRYETAK_TOGGLE") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getData("fiskheroes:flight_timer") == 0 && entity.isSneaking() && entity.getData("skyhighheroes:dyn/battle_card") == 0 && entity.getHeldItem().isEmpty();
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      var uuid = "4da600b8-582a-4fc3-ac2e-ada03d3e478c";
      var result = false;
      if (modifier.name() == "fiskheroes:transformation") {
        if (modifier.id() == "predation" || modifier.id() == "pryetak") {
          result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1;
        };
        if (modifier.id() == "wave_change") {
          result = entity.getUUID() == uuid;
        };
      };
      if (modifier.name() == "fiskheroes:energy_bolt") {
        result = entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getHeldItem().isEmpty();
      };
      return result;
    },
    tickHandler: function (entity, manager) {
      if (entity.getData("skyhighheroes:dyn/wave_changing_timer") == 1 && ((entity.getData("skyhighheroes:dyn/predation") && entity.getData("skyhighheroes:dyn/predation_timer") > 0 && entity.getData("skyhighheroes:dyn/predation_timer") < 1))) {
        manager.setData(entity, "skyhighheroes:dyn/battle_card", 0);
        manager.setData(entity, "skyhighheroes:dyn/selected_battle_card", 0);
        manager.setData(entity, "skyhighheroes:dyn/sword", false);
        manager.setData(entity, "skyhighocs:dyn/pryetak", false);
      };
    },
    name: function () {
      return "pryetak";
    },
    waveHandler: function (entity, manager) {
      if (entity.getUUID() == "4da600b8-582a-4fc3-ac2e-ada03d3e478c" && entity.world().isUnobstructed(entity.eyePos(), entity.eyePos().add(0,1000,0)) && !entity.world().isRaining() && !entity.world().isThundering() && entity.world().getLocation(entity.pos()).biome().startsWith("Cold Taiga Hills")) {
        var value = Math.random();
        if (value < 0.01) {
          if (!entity.getData("skyhighheroes:dyn/calling")) {
            manager.setData(entity, "skyhighheroes:dyn/calling", true);
          };
        };
        if (entity.getData("skyhighheroes:dyn/calling_timer") == 1) {
          manager.setString(entity.getWornChestplate().nbt(), "HeroType", "skyhighocs:pryetak_nebula");
        };
      };
    },
    emBeingInfo: function () {
      return {
        human: "Chase Stelar"
      };
    }
  };
};
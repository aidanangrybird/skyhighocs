/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  function resetBattleCard(entity, manager) {
    manager.setDataWithNotify(entity, "skyhighocs:dyn/selected_battle_card", 0);
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
  function battleCardMessage(entity) {
    if (entity.getData("skyhighocs:dyn/selected_battle_card") == 0) {
      system.systemMessage(entity, "<n>No battle card selected!");
    };
    if (entity.getData("skyhighocs:dyn/selected_battle_card") == 1) {
      system.systemMessage(entity, "<n>Selected <nh>Gaseous Cloud<n> battle card!");
    };
    if (entity.getData("skyhighocs:dyn/selected_battle_card") == 2) {
      system.systemMessage(entity, "<n>Selected <nh>Gas Jet<n> battle card!");
    };
    if (entity.getData("skyhighocs:dyn/selected_battle_card") == 3) {
      system.systemMessage(entity, "<n>Selected <nh>Nebula Blast<n> battle card!");
    };
    if (entity.getData("skyhighocs:dyn/selected_battle_card") == 4) {
      system.systemMessage(entity, "<n>Selected <nh>Ice Bomb<n> battle card!");
    };
    if (entity.getData("skyhighocs:dyn/selected_battle_card") == 5) {
      system.systemMessage(entity, "<n>Selected <nh>Nebula Burst<n> battle card!");
    };
  };
  return {
    name: "pryetak",
    type: 8,
    emBeing: "Pryetak",
    compatibleHumanUUID: "4da600b8-582a-4fc3-ac2e-ada03d3e478c",
    powers: [
      "skyhighocs:pryetak",
      "skyhighocs:em_wave_change",
      "skyhighocs:battle_card_predation",
      "skyhighocs:nebula_buster"
    ],
    keyBinds: function (hero) {
      hero.addKeyBind("GRAVITY_MANIPULATION", "Battle Card Predation", 2);
      hero.addKeyBind("AIM", "Aim Nebula Buster", 4);
      hero.addKeyBindFunc("BATTLE_CARD_RESET", (player, manager) => resetBattleCard(player, manager), "Return To Nebula Buster", 5);
      hero.addKeyBindFunc("PULSE_OUT", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/battle_card", 0);
        manager.setData(player, "skyhighocs:dyn/selected_battle_card", 0);
        manager.setData(player, "skyhighocs:dyn/body_temperature", 0.0);
        manager.setData(player, "skyhighocs:dyn/predation_timer", 0);
        manager.setData(player, "skyhighocs:dyn/predation", false);
        manager.setData(player, "skyhighocs:dyn/pryetak_timer", 0);
        manager.setData(player, "skyhighocs:dyn/pryetak", false);
        if (player.getData("skyhighocs:dyn/visualizer_toggle")) {
          manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
        };
        if (!player.getData("skyhighocs:dyn/visualizer_toggle")) {
          manager.setData(player, "fiskheroes:penetrate_martian_invis", false);
        };
        return true;
      }, "Pulse Out", 5);
      hero.addKeyBindFunc("SYNCHRONIZE_WAVES", (player, manager) => {
        if (player.getUUID() == system.getCompatibleUUID(player)) {
          system.shoutMessage(player, "<Chase Stelar> EM Wave Change! \u00A72Chase Stelar\u00A7r, On-Air!", 16);
          manager.setData(player, "skyhighocs:dyn/battle_card", 0);
          manager.setData(player, "skyhighocs:dyn/selected_battle_card", 0);
          manager.setData(player, "skyhighocs:dyn/body_temperature", 0.0);
          manager.setData(player, "skyhighocs:dyn/predation_timer", 0);
          manager.setData(player, "skyhighocs:dyn/predation", false);
          manager.setData(player, "skyhighocs:dyn/pryetak_timer", 0);
          manager.setData(player, "skyhighocs:dyn/pryetak", false);
          manager.setData(player, "fiskheroes:penetrate_martian_invis", true);
        } else {
          system.shoutMessage(player, "<\u00A72Pryetak\u00A7r> Who are you?", 16);
        };
        return true;
      }, "Pulse In", 5);
      hero.addKeyBind("WAVE_CHANGE", "EM Wave Change!", 5);
      hero.addKeyBind("PRYETAK_TOGGLE", "Toggle Nebula Buster", 5);
      hero.addKeyBindFunc("COLD_TEMPERATURE", (player, manager) => {
        if (player.getUUID() == system.getCompatibleUUID(player)) {
          system.shoutMessage(player, "\u00A7r<\u00A72Pryetak\u00A7r> You are too cold for us to pulse in.", 16);
        } else {
          system.shoutMessage(player, "<\u00A72Pryetak\u00A7r> Who are you?", 16);
        };
        return true;
      }, "\u00A7mPulse In\u00A7r You are too cold", 5);
      hero.addKeyBindFunc("HOT_TEMPERATURE", (player, manager) => {
        if (player.getUUID() == system.getCompatibleUUID(player)) {
          system.shoutMessage(player, "\u00A7r<\u00A72Pryetak\u00A7r> You are too hot for us to pulse in.", 16);
        } else {
          system.shoutMessage(player, "<\u00A72Pryetak\u00A7r> Who are you?", 16);
        };
        return true;
      }, "\u00A7mPulse In\u00A7r You are too hot", 5);
    },
    canAim: function (entity) {
      return (entity.getHeldItem().isEmpty() || entity.getHeldItem().name() == "fiskheroes:chronos_rifle") && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
    },
    isKeyBindEnabled: function (entity, keyBind) {
      var result = false;
      if (keyBind == "GRAVITY_MANIPULATION") {
        result = (entity.getData("skyhighocs:dyn/battle_card") > 0 || entity.getData("skyhighocs:dyn/pryetak_timer") < 1) && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "BATTLE_CARD_RESET") {
        result = entity.isSneaking() && (entity.getData("skyhighocs:dyn/selected_battle_card") > 0 && entity.getData("skyhighocs:dyn/battle_card") > 0) && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "SYNCHRONIZE_WAVES") {
        result = (entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") < 0.25 && entity.getData("skyhighocs:dyn/body_temperature") > -0.25);
      };
      if (keyBind == "PULSE_OUT") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.isSneaking());
      };
      if (keyBind == "WAVE_CHANGE") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && ((entity.getData("skyhighocs:dyn/wave_changing_timer") == 1 && !entity.isSneaking()) || (entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") < 0.25 && entity.getData("skyhighocs:dyn/body_temperature") > -0.25));
      };
      if (keyBind == "AIM") {
        result = ((entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getData("skyhighocs:dyn/pryetak_timer") < 1) || entity.getHeldItem().name() == "fiskheroes:chronos_rifle") && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      if (keyBind == "COLD_TEMPERATURE") {
        result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") <= -0.25;
      };
      if (keyBind == "HOT_TEMPERATURE") {
        result = entity.getData("skyhighocs:dyn/wave_changing_timer") == 0 && entity.getData("skyhighocs:dyn/body_temperature") >= 0.25;
      };
      if (keyBind == "PRYETAK_TOGGLE") {
        result = entity.getData("fiskheroes:flight_timer") == 0 && entity.isSneaking() && entity.getData("skyhighocs:dyn/battle_card") == 0 && entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1;
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      var uuid = system.getCompatibleUUID(entity);
      var result = false;
      if (modifier.name() == "fiskheroes:transformation") {
        if (modifier.id() == "predation" || modifier.id() == "pryetak") {
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
          battleCardMessage(entity);
          manager.setDataWithNotify(entity, "skyhighocs:dyn/reset_gravity_manip", true);
        };
        if (gravity_amount < 0) {
          cycleDownCard(entity, manager);
          battleCardMessage(entity);
          manager.setDataWithNotify(entity, "skyhighocs:dyn/reset_gravity_manip", true);
        };
      };
      if (!entity.getData("fiskheroes:gravity_manip") && (entity.getData("skyhighocs:dyn/battle_card") != entity.getData("skyhighocs:dyn/selected_battle_card"))) {
        manager.setDataWithNotify(entity, "skyhighocs:dyn/predation", true);
      };
    },
  };
};
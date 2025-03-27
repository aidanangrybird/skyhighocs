/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "voiceSynthesizer",
    type: 13,
    command: "vs",
    powers: ["skyhighocs:voice_synthesizer"],
    helpMessage: "<n>!vs <nh>-<n> Voice Synthesizer",
    disabledMessage: "<e>Module <eh>voiceSynthesizer<e> is disabled!",
    keyBinds: function (hero) {
      hero.addKeyBind("MOUTH", (player, manager) => {
        system.systemMessage(player, "<e>Mouth must be armed!");
        return false;
      }, "Scream (Not armed)", 3);
      hero.addKeyBind("SCREAM", "Scream", 3);
      hero.addKeyBind("ENERGY_PROJECTION", "Scream", 3);
    },
    isKeyBindEnabled: function (entity, keyBind) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        var nbt = entity.getWornHelmet().nbt();
        var mouth = nbt.getBoolean("mouth");
        if (keyBind == "MOUTH" && entity.getData("fiskheroes:tentacles") == null) {
          result = !mouth;
        };
        if (keyBind == "ENERGY_PROJECTION" && (entity.getData("skyhighocs:dyn/mouth_timer") == 1) && entity.getData("fiskheroes:tentacles") == null) {
          result = mouth;
        };
        if (keyBind == "SCREAM" && entity.getData("fiskheroes:tentacles") == null) {
          result = mouth;
        };
      };
      return result;
    },
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 3) {
        var nbt = entity.getWornHelmet().nbt();
        switch (arguments[1]) {
          case "arm":
            manager.setBoolean(nbt, "mouth", true);
            system.systemMessage(entity, "<n>Armed mouth!");
            break;
          case "disarm":
            manager.setBoolean(nbt, "mouth", false);
            system.systemMessage(entity, "<n>Disarmed mouth!");
            break;
          case "deploy":
            manager.setData(entity, "skyhighocs:dyn/mouth_deployed", true);
            system.systemMessage(entity, "<n>Deployed mouth!");
            break;
          case "retract":
            manager.setData(entity, "skyhighocs:dyn/mouth_deployed", false);
            system.systemMessage(entity, "<n>Retracted mouth!");
            break;
          case "status":
            system.systemMessage(entity, "<n>Voice Synthesizer status:");
            system.systemMessage(entity, "<n>Mouth: <nh>" + (nbt.getBoolean("mouth") ? "ARMED" : "DISARMED") + " <n>-<nh> " + ((entity.getData("skyhighocs:dyn/mouth_deploy_timer") > 0) || (entity.getData("skyhighocs:dyn/mouth_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            break;
          case "help":
            system.systemMessage(entity, "<n>Voice Synthesizer commands:");
            system.systemMessage(entity, "<n>!vs arm <nh>-<n> Arms mouth");
            system.systemMessage(entity, "<n>!vs disarm <nh>-<n> Disarms mouth");
            system.systemMessage(entity, "<n>!vs deploy <nh>-<n> Shows mouth");
            system.systemMessage(entity, "<n>!vs retract <nh>-<n> Hides mouth");
            system.systemMessage(entity, "<n>!vs status <nh>-<n> Shows status of voice synthesizer");
            system.systemMessage(entity, "<n>!vs help <nh>-<n> Shows voiceSynthesizer commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>voiceSynthesizer<e> command! Try <eh>!vs help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>voiceSynthesizer<e> command! Try <eh>!vs help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        if (modifier.name() == "fiskheroes:energy_projection") {
          result = true;
        };
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      manager.setBoolean(nbt, "mouth", false);
      manager.setData(entity, "skyhighocs:dyn/mouth", false);
    },
    fightOrFlight: function (entity, manager) {
      manager.setBoolean(entity.getWornHelmet().nbt(), "mouth", true);
      system.systemMessage(entity, "<n>Automatically armed <nh>mouth<n>!");
    }
  };
};
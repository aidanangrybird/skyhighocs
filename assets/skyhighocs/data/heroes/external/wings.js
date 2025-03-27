/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "wings",
    type: 12,
    command: "wings",
    powers: ["skyhighocs:wings"],
    helpMessage: "<n>!wings <nh>-<n> Wings",
    disabledMessage: "<e>Module <eh>wings<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        var nbt = entity.getWornHelmet().nbt();
        switch(arguments[1]) {
          case "arm":
            manager.setBoolean(nbt, "wings", true);
            system.systemMessage(entity, "<s>Armed <sh>wings<s>!");
            break;
          case "disarm":
            manager.setBoolean(nbt, "wings", false);
            system.systemMessage(entity, "<s>Disarmed <sh>wings<s>!");
            break;
          case "deploy":
            manager.setData(entity, "skyhighocs:dyn/wings_deployed", true);
            system.systemMessage(entity, "<s>Deployed <sh>wings<s>!");
            break;
          case "retract":
            if (!nbt.getBoolean("wings") && entity.getData("fiskheroes:gliding")) {
              manager.setData(entity, "skyhighocs:dyn/wings_deployed", false);
              system.systemMessage(entity, "<s>Retracted <sh>wings<s>!");
            } else {
              system.systemMessage(entity, "<e>Unable to retract armed <eh>wings<e>!");
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Wings commands:");
            system.systemMessage(entity, "<n>!wings arm <nh>-<n> Arms wings");
            system.systemMessage(entity, "<n>!wings disarm <nh>-<n> Disarms wings");
            system.systemMessage(entity, "<n>!wings deploy <nh>-<n> Deploys wings");
            system.systemMessage(entity, "<n>!wings retract <nh>-<n> Retracts wings");
            system.systemMessage(entity, "<n>!wings status <nh>-<n> Shows status of wings");
            system.systemMessage(entity, "<n>!wings help <nh>-<n> Shows wings commands");
            break;
          case "status":
            system.systemMessage(entity, "<n>Wings status: <nh>" + (nbt.getBoolean("wings") ? "ARMED" : "DISARMED") + " <n>-<nh> " + ((entity.getData("skyhighocs:dyn/wings_deploy_timer") > 0) || (entity.getData("skyhighocs:dyn/wings_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>wings<e> command! Try <eh>!wings help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>wings<e> command! Try <eh>!wings help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      var nbt = entity.getWornHelmet().nbt();
      var wings = nbt.getBoolean("wings");
      if (!system.isModuleDisabled(entity, this.name)) {
        if (modifier.name() == "fiskheroes:gliding") {
          result = wings;
        };
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      manager.setBoolean(nbt, "wings", false);
      manager.setData(entity, "skyhighocs:dyn/wings_deployed", false);
    },
    tickHandler: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      var wings = nbt.getBoolean("wings") && entity.getData("fiskheroes:gliding");
      if (entity.getData("fiskheroes:gliding_timer") > 0) {
        manager.setData(entity, "skyhighocs:dyn/wings", wings);
      };
    }
  };
};
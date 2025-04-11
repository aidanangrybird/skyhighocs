/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "wings",
    moduleMessageName: "Wings",
    type: 12,
    command: "wing",
    powers: ["skyhighocs:wings"],
    helpMessage: "<n>!wing <nh>-<n> Wings",
    disabledMessage: "<e>Module <eh>wings<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        var nbt = entity.getWornHelmet().nbt();
        switch(arguments[1]) {
          case "arm":
            manager.setBoolean(nbt, "wings", true);
            system.moduleMessage(this, entity, "<s>Armed <sh>wings<s>!");
            break;
          case "disarm":
            manager.setBoolean(nbt, "wings", false);
            system.moduleMessage(this, entity, "<s>Disarmed <sh>wings<s>!");
            break;
          case "deploy":
            switch(arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/wing_left_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left<s> wing!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/wing_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>right<s> wing!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/wing_left_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/wing_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>wings<s>!");
                break;
              };
            break;
          case "retract":
            switch(arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/wing_left_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left<s> wing!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/wing_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>right<s> wing!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/wing_left_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/wing_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>wings<s>!");
                break;
              };
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Wings commands:");
            system.moduleMessage(this, entity, "<n>!wing arm <nh>-<n> Arms wings");
            system.moduleMessage(this, entity, "<n>!wing disarm <nh>-<n> Disarms wings");
            system.moduleMessage(this, entity, "<n>!wing deploy <nh>-<n> Deploys wings");
            system.moduleMessage(this, entity, "<n>!wing retract <nh>-<n> Retracts wings");
            system.moduleMessage(this, entity, "<n>!wing status <nh>-<n> Shows status of wings");
            system.moduleMessage(this, entity, "<n>!wing help <nh>-<n> Shows wings commands");
            break;
          case "status":
            var wings = (entity.getData("skyhighocs:dyn/wings_timer") > 0);
            system.moduleMessage(this, entity, "<n>Wings status:");
            system.moduleMessage(this, entity, "<n>Wings: <nh>" + (nbt.getBoolean("wings") ? "ARMED" : "DISARMED"));
            system.moduleMessage(this, entity, "<n>Left wing: <nh>" + ((entity.getData("skyhighocs:dyn/wing_left_deploy_timer") > 0) || wings ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Right wing: <nh>" + ((entity.getData("skyhighocs:dyn/wing_right_deploy_timer") > 0) || wings ? "DEPLOYED" : "RETRACTED"));
            break;
          default:
            system.moduleMessage(this, entity, "<e>Unknown <eh>wings<e> command! Try <eh>!wing help<e> for a list of commands!");
            break;
        };
      } else {
        system.moduleMessage(this, entity, "<e>Unknown <eh>wings<e> command! Try <eh>!wing help<e> for a list of commands!");
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
      manager.setData(entity, "skyhighocs:dyn/wing_left_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/wing_right_deployed", false);
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
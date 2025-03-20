/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "thermoptics",
    type: 12,
    command: "thermo",
    powers: ["skyhighocs:thermoptic_manipulation"],
    helpMessage: "<n>!thermo <nh>-<n> Thermoptics",
    disabledMessage: "<e>Module <eh>thermoptics<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        switch (arguments[1]) {
          case "enable":
            switch (arguments[2]) {
              case "disguise":
                manager.setData(entity, "skyhighocs:dyn/thermoptic_disguise", true);
                system.systemMessage(entity, "<n>Enabled <nh>disguise<n>!");
                break;
              case "camo":
                manager.setData(entity, "skyhighocs:dyn/thermoptic_camouflage", true);
                system.systemMessage(entity, "<n>Enabled <nh>camo<n>!");
                break;
            };
            break;
          case "disable":
            switch (arguments[2]) {
              case "disguise":
                manager.setData(entity, "skyhighocs:dyn/thermoptic_disguise", false);
                system.systemMessage(entity, "<n>Disabled <nh>disguise<n>!");
                break;
              case "camo":
                manager.setData(entity, "skyhighocs:dyn/thermoptic_camouflage", false);
                system.systemMessage(entity, "<n>Disabled <nh>camo<n>!");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Thermoptics commands:");
            system.systemMessage(entity, "<n>!thermo enable <disguise|camo> <nh>-<n> Enables function");
            system.systemMessage(entity, "<n>!thermo disable <disguise|camo> <nh>-<n> Disables function");
            system.systemMessage(entity, "<n>!thermo help <nh>-<n> Shows thermoptics commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>disguise<e> command! Try <eh>!thermo help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>disguise<e> command! Try <eh>!thermo help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        if (modifier.name() == "fiskheroes:invisiblity") {
          result = true;
        };
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/thermoptic_disguise", false);
    },
    tickHandler: function (entity, manager) {
      var invis = entity.getData("skyhighocs:dyn/thermoptic_camouflage_timer") == 1;
      if (entity.getData("skyhighocs:dyn/thermoptic_camouflage_timer") > 0) {
        manager.setData(entity, "fiskheroes:invisible", invis);
      };
    }
  };
};
/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "communications",
    type: 12,
    command: "comms",
    powers: ["skyhighocs:communications"],
    helpMessage: "<n>!comms <nh>-<n> Communications",
    disabledMessage: "<e>Module <eh>communications<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        switch (arguments[1]) {
          case "deploy":
            switch (arguments[2]) {
              case "sat":
                manager.setData(entity, "skyhighocs:dyn/satellite", true);
                system.systemMessage(entity, "<n>Deploying satellite!");
                break;
              case "ant":
                manager.setData(entity, "skyhighocs:dyn/antenna", true);
                system.systemMessage(entity, "<n>Deploying antenna!");
                break;
              case "satRain":
                manager.setData(entity, "skyhighocs:dyn/satellite_rain_mode", true);
                system.systemMessage(entity, "<n>Activating satellite rain mode!");
                break;
            };
            break;
          case "retract":
            switch (arguments[2]) {
              case "sat":
                manager.setData(entity, "skyhighocs:dyn/satellite", false);
                system.systemMessage(entity, "<n>Retracting satellite!");
                break;
              case "ant":
                manager.setData(entity, "skyhighocs:dyn/antenna", false);
                system.systemMessage(entity, "<n>Retracting satellite!");
                break;
              case "satRain":
                manager.setData(entity, "skyhighocs:dyn/satellite_rain_mode", false);
                system.systemMessage(entity, "<n>Deactivating satellite rain mode!");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Communications commands:");
            system.systemMessage(entity, "<n>!comms deploy <sat|ant|satRain> <nh>-<n> Shows Communications activate commands");
            system.systemMessage(entity, "<n>!comms retract <sat|ant|satRain> <nh>-<n> Shows Communications deactivate commands");
            system.systemMessage(entity, "<n>!comms help <nh>-<n> Shows communications commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>comms<e> command! Try <eh>!comms help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>comms<e> command! Try <eh>!comms help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/satellite", false);
      manager.setData(entity, "skyhighocs:dyn/antenna", false);
      manager.setData(entity, "skyhighocs:dyn/satellite_rain_mode", false);
    }
  };
};
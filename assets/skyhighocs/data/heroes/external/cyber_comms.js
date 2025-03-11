/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "communicationsSystem",
    type: 14,
    command: "comms",
    powers: ["skyhighocs:cyber_comms"],
    helpMessage: "<n>!comms <nh>-<n> Communications",
    disabledMessage: "<e>Module <eh>communicationsSystem<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        switch (arguments[1]) {
          case "on":
            switch (arguments[2]) {
              case "sat":
                manager.setData(entity, "skyhighheroes:dyn/comms_satellite", true);
                break;
              case "ant":
                manager.setData(entity, "skyhighheroes:dyn/comms_antenna", true);
                break;
              case "satRain":
                manager.setData(entity, "skyhighheroes:dyn/comms_satellite_rain_mode", true);
                break;
              case "help":
                system.systemMessage(entity, "<n>Communications activate commands:");
                system.systemMessage(entity, "<n>!comms on sat <nh>-<n> Activates satellite");
                system.systemMessage(entity, "<n>!comms on ant <nh>-<n> Activates antenna");
                system.systemMessage(entity, "<n>!comms on satRain <nh>-<n> Activates satellite rain mode");
                system.systemMessage(entity, "<n>!comms help <nh>-<n> Shows communicationsSystem commands");
                break;
            };
            break;
          case "off":
            switch (arguments[2]) {
              case "sat":
                manager.setData(entity, "skyhighheroes:dyn/comms_satellite", false);
                break;
              case "ant":
                manager.setData(entity, "skyhighheroes:dyn/comms_antenna", false);
                break;
              case "satRain":
                manager.setData(entity, "skyhighheroes:dyn/comms_satellite_rain_mode", false);
                break;
              case "help":
                system.systemMessage(entity, "<n>Communications deactivate commands:");
                system.systemMessage(entity, "<n>!comms off sat <nh>-<n> Deactivate satellite");
                system.systemMessage(entity, "<n>!comms off ant <nh>-<n> Deactivate antenna");
                system.systemMessage(entity, "<n>!comms off satRain <nh>-<n> Deactivate satellite rain mode");
                system.systemMessage(entity, "<n>!comms help <nh>-<n> Shows communicationsSystem commands");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Scanner commands:");
            system.systemMessage(entity, "<n>!comms on help <nh>-<n> Shows Communications activate commands");
            system.systemMessage(entity, "<n>!comms off help <nh>-<n> Shows Communications deactivate commands");
            system.systemMessage(entity, "<n>!comms help <nh>-<n> Shows communicationsSystem commands");
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
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    isModifierDisabled: function (entity, modifier) {
      result = false;
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
  };
};
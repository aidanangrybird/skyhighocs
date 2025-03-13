/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "portsSystem",
    type: 12,
    command: "ports",
    powers: ["skyhighocs:cyber_ports"],
    helpMessage: "<n>!ports <nh>-<n> Ports",
    disabledMessage: "<e>Module <eh>portsSystem<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 3) {
        switch (arguments[1]) {
          case "on":
            manager.setData(entity, "skyhighocs:dyn/ports", true);
            break;
          case "off":
            manager.setData(entity, "skyhighocs:dyn/ports", false);
            break;
          case "help":
            system.systemMessage(entity, "<n>Ports commands:");
            system.systemMessage(entity, "<n>!ports on <nh>-<n> Turns on ports");
            system.systemMessage(entity, "<n>!ports off <nh>-<n> Turns off ports");
            system.systemMessage(entity, "<n>!ports help <nh>-<n> Shows portsSystem commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>ports<e> command! Try <eh>!ports help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>ports<e> command! Try <eh>!ports help<e> for a list of commands!");
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
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/portsd", false);
    }
  };
};
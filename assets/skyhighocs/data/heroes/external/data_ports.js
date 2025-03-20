/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "dataPorts",
    type: 12,
    command: "ports",
    powers: ["skyhighocs:data_ports"],
    helpMessage: "<n>!ports <nh>-<n> Ports",
    disabledMessage: "<e>Module <eh>dataPorts<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 3) {
        switch (arguments[1]) {
          case "deploy":
            manager.setData(entity, "skyhighocs:dyn/ports", true);
            system.systemMessage(entity, "<n>Exposing data ports!");
            break;
          case "retract":
            manager.setData(entity, "skyhighocs:dyn/ports", false);
            system.systemMessage(entity, "<n>Retracting data ports!");
            break;
          case "help":
            system.systemMessage(entity, "<n>Ports commands:");
            system.systemMessage(entity, "<n>!ports deploy <nh>-<n> Exposes data ports");
            system.systemMessage(entity, "<n>!ports retract <nh>-<n> Hides data ports");
            system.systemMessage(entity, "<n>!ports help <nh>-<n> Shows dataPorts commands");
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
      if (!system.isModuleDisabled(entity, this.name)) {
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/ports", false);
    }
  };
};
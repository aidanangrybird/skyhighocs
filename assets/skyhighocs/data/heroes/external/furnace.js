/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "furnace",
    type: 12,
    command: "furnace",
    powers: ["skyhighocs:furnace"],
    helpMessage: "<n>!furnace <nh>-<n> Furnace",
    disabledMessage: "<e>Module <eh>furnace<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 3) {
        switch (arguments[1]) {
          case "on":
            manager.setData(entity, "skyhighocs:dyn/furnace", true);
            break;
          case "off":
            manager.setData(entity, "skyhighocs:dyn/furnace", false);
            break;
          case "help":
            system.systemMessage(entity, "<n>Furnace commands:");
            system.systemMessage(entity, "<n>!furnace on <nh>-<n> Turns on furnace");
            system.systemMessage(entity, "<n>!furnace off <nh>-<n> Turns off furnace");
            system.systemMessage(entity, "<n>!furnace help <nh>-<n> Shows furnace commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>furnace<e> command! Try <eh>!furnace help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>furnace<e> command! Try <eh>!furnace help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        if (modifier.name() == "fiskheroes:transformation") {
          result = true;
        };
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/furnace", false);
    }
  };
};
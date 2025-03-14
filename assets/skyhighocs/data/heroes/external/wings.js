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
      if (arguments.length > 1 && arguments.length < 3) {
        switch (arguments[1]) {
          case "on":
            manager.setData(entity, "skyhighocs:dyn/wings", true);
            break;
          case "off":
            manager.setData(entity, "skyhighocs:dyn/wings", false);
            break;
          case "help":
            system.systemMessage(entity, "<n>Wings commands:");
            system.systemMessage(entity, "<n>!wings on <nh>-<n> Deployes wings");
            system.systemMessage(entity, "<n>!wings off <nh>-<n> Retracts wings");
            system.systemMessage(entity, "<n>!wings help <nh>-<n> Shows wings commands");
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
      manager.setData(entity, "skyhighocs:dyn/wingsd", false);
    }
  };
};
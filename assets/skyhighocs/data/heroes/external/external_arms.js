/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "externalArms",
    type: 12,
    command: "extarms",
    powers: ["skyhighocs:external_arms"],
    helpMessage: "<n>!extarms <nh>-<n> ExtArms",
    disabledMessage: "<e>Module <eh>externalArms<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 3) {
        switch (arguments[1]) {
          case "on":
            manager.setData(entity, "skyhighocs:dyn/external_arms", true);
            break;
          case "off":
            manager.setData(entity, "skyhighocs:dyn/external_arms", false);
            break;
          case "help":
            system.systemMessage(entity, "<n>External Arms commands:");
            system.systemMessage(entity, "<n>!extarms on <nh>-<n> Turns on external arms");
            system.systemMessage(entity, "<n>!extarms off <nh>-<n> Turns off external arms");
            system.systemMessage(entity, "<n>!extarms help <nh>-<n> Shows externalArms commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>extarms<e> command! Try <eh>!extarms help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>extarms<e> command! Try <eh>!extarms help<e> for a list of commands!");
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
      manager.setData(entity, "skyhighocs:dyn/extarms", false);
    }
  };
};
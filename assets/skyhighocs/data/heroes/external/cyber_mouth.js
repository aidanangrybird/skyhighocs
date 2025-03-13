/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "mouthSystem",
    type: 12,
    command: "mouth",
    powers: ["skyhighocs:cyber_mouth"],
    helpMessage: "<n>!mouth <nh>-<n> Mouth",
    disabledMessage: "<e>Module <eh>mouthSystem<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 3) {
        switch (arguments[1]) {
          case "on":
            manager.setData(entity, "skyhighocs:dyn/mouth", true);
            break;
          case "off":
            manager.setData(entity, "skyhighocs:dyn/mouth", false);
            break;
          case "help":
            system.systemMessage(entity, "<n>Mouth commands:");
            system.systemMessage(entity, "<n>!mouth on <nh>-<n> Turns on mouth");
            system.systemMessage(entity, "<n>!mouth off <nh>-<n> Turns off mouth");
            system.systemMessage(entity, "<n>!mouth help <nh>-<n> Shows mouthSystem commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>mouth<e> command! Try <eh>!mouth help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>mouth<e> command! Try <eh>!mouth help<e> for a list of commands!");
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
      manager.setData(entity, "skyhighocs:dyn/mouthd", false);
    }
  };
};
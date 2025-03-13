/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "disguiseSystem",
    type: 12,
    command: "disguise",
    powers: ["skyhighocs:cyber_disguise"],
    helpMessage: "<n>!disguise <nh>-<n> Disguise",
    disabledMessage: "<e>Module <eh>disguiseSystem<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 3) {
        switch (arguments[1]) {
          case "on":
            manager.setData(entity, "skyhighocs:dyn/disguised", true);
            break;
          case "off":
            manager.setData(entity, "skyhighocs:dyn/disguised", false);
            break;
          case "help":
            system.systemMessage(entity, "<n>Disguise commands:");
            system.systemMessage(entity, "<n>!disguise on <nh>-<n> Turns on disguise");
            system.systemMessage(entity, "<n>!disguise off <nh>-<n> Turns off disguise");
            system.systemMessage(entity, "<n>!disguise help <nh>-<n> Shows disguiseSystem commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>disguise<e> command! Try <eh>!disguise help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>disguise<e> command! Try <eh>!disguise help<e> for a list of commands!");
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
      manager.setData(entity, "skyhighocs:dyn/disguised", false);
    }
  };
};
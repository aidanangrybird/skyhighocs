/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "shieldSystem",
    type: 14,
    powers: ["skyhighocs:cyber_shields"],
    command: "shlds",
    helpMessage: "<n>!shlds <nh>-<n> Shields",
    disabledMessage: "<e>Module <eh>shieldSystem<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 5) {
        switch(arguments[1]) {
          case "on":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm", true);
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm", true);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm", true);
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm", true);
                break;
              case "help":
                system.systemMessage(entity, "<n>Shield activate commands:");
                system.systemMessage(entity, "<n>!shlds on * <nh>-<n> Activates both shields");
                system.systemMessage(entity, "<n>!shlds on left <nh>-<n> Activates left shield");
                system.systemMessage(entity, "<n>!shlds on right <nh>-<n> Activates right shield");
                system.systemMessage(entity, "<n>!shlds on help <nh>-<n> Shows Shield activate commands");
                system.systemMessage(entity, "<n>!shlds help <nh>-<n> Shows Shields commands");
                break;
            };
            break;
          case "off":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm", false);
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm", false);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm", false);
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm", false);
                break;
              case "help":
                system.systemMessage(entity, "<n>Shield deactivate commands:");
                system.systemMessage(entity, "<n>!shlds on * <nh>-<n> Deactivates both shields");
                system.systemMessage(entity, "<n>!shlds on left <nh>-<n> Deactivates left shield");
                system.systemMessage(entity, "<n>!shlds on right <nh>-<n> Deactivates right shield");
                system.systemMessage(entity, "<n>!shlds on help <nh>-<n> Shows Shield deactivate commands");
                system.systemMessage(entity, "<n>!shlds help <nh>-<n> Shows Shields commands");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Shields commands:");
            system.systemMessage(entity, "<n>!shlds on help <nh>-<n> Shows Shield activate commands");
            system.systemMessage(entity, "<n>!shlds off help <nh>-<n> Shows Shield deactivate commands");
            system.systemMessage(entity, "<n>!shlds help <nh>-<n> Shows shields commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>shields<e> command! Try <eh>!shlds help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>shields<e> command! Try <eh>!shlds help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (modifier.name() == "fiskheroes:shield") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    isModifierDisabled: function (entity, modifier) {
      result = false;
      if (modifier.name() == "fiskheroes:shield") {
        result = false;
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/shield_left_arm", false);
      manager.setData(entity, "skyhighocs:dyn/shield_left_arm_stealth", false);
      manager.setData(entity, "skyhighocs:dyn/shield_right_arm", false);
      manager.setData(entity, "skyhighocs:dyn/shield_right_arm_stealth", false);
    }
  };
};
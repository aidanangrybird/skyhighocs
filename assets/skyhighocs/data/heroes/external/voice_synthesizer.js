/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "voiceSynthesizer",
    type: 12,
    command: "vs",
    powers: ["skyhighocs:voice_synthesizer"],
    helpMessage: "<n>!vs <nh>-<n> Voice Synthesizer",
    disabledMessage: "<e>Module <eh>voiceSynthesizer<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 3) {
        switch (arguments[1]) {
          case "show":
            manager.setData(entity, "skyhighocs:dyn/mouth", true);
            break;
          case "off":
            manager.setData(entity, "skyhighocs:dyn/mouth", false);
            break;
          case "help":
            system.systemMessage(entity, "<n>Voice Synthesizer commands:");
            system.systemMessage(entity, "<n>!vs show <nh>-<n> Shows mouth");
            system.systemMessage(entity, "<n>!vs hide <nh>-<n> Hides mouth");
            system.systemMessage(entity, "<n>!vs help <nh>-<n> Shows voiceSynthesizer commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>voiceSynthesizer<e> command! Try <eh>!vs help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>voiceSynthesizer<e> command! Try <eh>!vs help<e> for a list of commands!");
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
      manager.setData(entity, "skyhighocs:dyn/mouth", false);
    }
  };
};
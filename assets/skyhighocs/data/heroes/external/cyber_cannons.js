/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "cannonSystem",
    type: 15,
    powers: ["skyhighocs:cyber_cannons"],
    command: "cns",
    helpMessage: "<n>!cns <nh>-<n> Communications",
    disabledMessage: "<e>Module <eh>communicationsSystem<e> is disabled!",
    keyBinds: function (hero) {
      hero.addKeyBind("HEAT_VISION", "Heat Vision", 2);
      hero.addKeyBind("EYE_CANNONS", "Eye Cannons", 2);
      hero.addKeyBind("CHARGED_BEAM", "Charged Beam", 3);
      hero.addKeyBind("BODY_CANNONS", "Body Cannons", 3);
      hero.addKeyBind("ENERGY_PROJECTION", "Energy Projection", 4);
      hero.addKeyBind("ARM_CANNONS", "Arm Cannons", 4);
    },
    isKeyBindEnabled: function (entity, keyBind) {
      result = false;
      if (keyBind == "HEAT_VISION") {
        result = entity.getData("skyhighocs:dyn/cannon_eye_timer") == 1;
      };
      if (keyBind == "EYE_CANNONS") {
        result = true;
      };
      if (keyBind == "CHARGED_BEAM") {
        result = entity.getData("skyhighocs:dyn/cannon_body_timer") == 1;
      };
      if (keyBind == "BODY_CANNONS") {
        result = true;
      };
      if (keyBind == "ENERGY_PROJECTION") {
        result = entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/cannon_arms_timer") == 1;
      };
      if (keyBind == "ARM_CANNONS") {
        result = true;
      };
      return result;
    },
    isKeyBindDisabled: function (entity, keyBind) {
      result = false;
      if (keyBind == "HEAT_VISION") {
        result = false;
      };
      if (keyBind == "EYE_CANNONS") {
        result = false;
      };
      if (keyBind == "CHARGED_BEAM") {
        result = false;
      };
      if (keyBind == "BODY_CANNONS") {
        result = false;
      };
      if (keyBind == "ENERGY_PROJECTION") {
        result = false;
      };
      if (keyBind == "ARM_CANNONS") {
        result = false;
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (modifier.name() == "fiskheroes:heat_vision") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:charged_beam") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:energy_projection") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    isModifierDisabled: function (entity, modifier) {
      result = false;
      if (modifier.name() == "fiskheroes:heat_vision") {
        result = false;
      };
      if (modifier.name() == "fiskheroes:charged_beam") {
        result = false;
      };
      if (modifier.name() == "fiskheroes:energy_projection") {
        result = false;
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
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
                system.systemMessage(entity, "<n>!cns on aux <nh>-<n> Activates satellite");
                system.systemMessage(entity, "<n>!cns on body <nh>-<n> Activates antenna");
                system.systemMessage(entity, "<n>!cns on legs <nh>-<n> Activates satellite rain mode");
                system.systemMessage(entity, "<n>!cns help <nh>-<n> Shows communicationsSystem commands");
                break;
            };
            break;
          case "on":
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
                system.systemMessage(entity, "<n>!cns on aux <nh>-<n> Deactivate satellite");
                system.systemMessage(entity, "<n>!cns on body <nh>-<n> Deactivate antenna");
                system.systemMessage(entity, "<n>!cns on legs <nh>-<n> Deactivate satellite rain mode");
                system.systemMessage(entity, "<n>!cns help <nh>-<n> Shows communicationsSystem commands");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Scanner commands:");
            system.systemMessage(entity, "<n>!cns on help <nh>-<n> Shows Communications activate commands");
            system.systemMessage(entity, "<n>!cns off help <nh>-<n> Shows Communications deactivate commands");
            system.systemMessage(entity, "<n>!cns help <nh>-<n> Shows communicationsSystem commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>comms<e> command! Try <eh>!cns help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>comms<e> command! Try <eh>!cns help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (modifier.name() == "fiskheroes:heat_vision") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:energy_projection") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:charged_beam") {
        result = true;
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    isModifierDisabled: function (entity, modifier) {
      result = false;
      if (modifier.name() == "fiskheroes:heat_vision") {
        result = false;
      };
      if (modifier.name() == "fiskheroes:energy_projection") {
        result = false;
      };
      if (modifier.name() == "fiskheroes:charged_beam") {
        result = false;
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
  };
};
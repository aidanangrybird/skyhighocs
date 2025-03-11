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
      hero.addKeyBind("LEFT_ARM_CANNON", "Arm Cannons", 4);
      hero.addKeyBind("RIGHT_ARM_CANNON", "Arm Cannons", 4);
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
        result = entity.getHeldItem().isEmpty() && entity.getData("skyhighocs:dyn/cannon_left_arm_timer") == 1 && entity.getData("skyhighocs:dyn/cannon_right_arm_timer") == 1;
      };
      if (keyBind == "LEFT_ARM_CANNON") {
        result = true;
      };
      if (keyBind == "RIGHT_ARM_CANNON") {
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
      if (keyBind == "LEFT_ARM_CANNON") {
        result = false;
      };
      if (keyBind == "RIGHT_ARM_CANNON") {
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
          case "eyes":
            switch (arguments[2]) {
              case "charged":
                systemMessage(entity, "<n>Will set eyes to charged beam!");
                break;
              case "heat":
                systemMessage(entity, "<n>Will set eyes to heat vision!");
                break;
              case "enproj":
                systemMessage(entity, "<n>Will set eyes to energy projection!");
                break;
              case "help":
                system.systemMessage(entity, "<n>Eye cannons commands:");
                system.systemMessage(entity, "<n>!cns eyes charged <nh>-<n> Sets eye cannons to charged beam!");
                system.systemMessage(entity, "<n>!cns eyes heat <nh>-<n> Sets eye cannons to heat vision!");
                system.systemMessage(entity, "<n>!cns eyes enproj <nh>-<n> Sets eye cannons to energy projection!");
                system.systemMessage(entity, "<n>!cns eyes help <nh>-<n> Shows eye cannons commands");
                system.systemMessage(entity, "<n>!cns help <nh>-<n> Shows cannons commands");
                break;
            };
            break;
          case "arms":
            switch (arguments[2]) {
              case "charged":
                systemMessage(entity, "<n>Will set arms to charged beam!");
                break;
              case "heat":
                systemMessage(entity, "<n>Will set arms to heat vision!");
                break;
              case "enproj":
                systemMessage(entity, "<n>Will set arms to energy projection!");
                break;
              case "help":
                system.systemMessage(entity, "<n>Arm cannons commands:");
                system.systemMessage(entity, "<n>!cns arms charged <nh>-<n> Sets arm cannons to charged beam!");
                system.systemMessage(entity, "<n>!cns arms heat <nh>-<n> Sets arm cannons to heat vision!");
                system.systemMessage(entity, "<n>!cns arms enproj <nh>-<n> Sets arm cannons to energy projection!");
                system.systemMessage(entity, "<n>!cns arms help <nh>-<n> Shows arm cannons commands");
                system.systemMessage(entity, "<n>!cns help <nh>-<n> Shows cannons commands");
                break;
            };
            break;
          case "body":
            switch (arguments[2]) {
              case "charged":
                systemMessage(entity, "<n>Will set body to charged beam!");
                break;
              case "heat":
                systemMessage(entity, "<n>Will set body to heat vision!");
                break;
              case "enproj":
                systemMessage(entity, "<n>Will set body to energy projection!");
                break;
              case "help":
                system.systemMessage(entity, "<n>Body cannons commands:");
                system.systemMessage(entity, "<n>!cns body charged <nh>-<n> Sets body cannons to charged beam!");
                system.systemMessage(entity, "<n>!cns body heat <nh>-<n> Sets body cannons to heat vision!");
                system.systemMessage(entity, "<n>!cns body enproj <nh>-<n> Sets body cannons to energy projection!");
                system.systemMessage(entity, "<n>!cns body help <nh>-<n> Shows body cannons commands");
                system.systemMessage(entity, "<n>!cns help <nh>-<n> Shows cannons commands");
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
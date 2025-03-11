/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "rocketSystem",
    type: 14,
    powers: ["skyhighocs:cyber_rockets"],
    command: "rkts",
    helpMessage: "<n>!rkts <nh>-<n> Rockets",
    disabledMessage: "<e>Module <eh>rocketSystem<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        switch(arguments[1]) {
          case "on":
            switch (arguments[2]) {
              case "aux":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", true);
                break;
              case "body":
                manager.setData(entity, "skyhighocs:dyn/rockets_body", true);
                break;
              case "legs":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", true);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", true);
                manager.setData(entity, "skyhighocs:dyn/rockets_body", true);
                break;
              case "help":
                system.systemMessage(entity, "<n>Rocket activate commands:");
                system.systemMessage(entity, "<n>!rkts on * <nh>-<n> Activates every rocket set");
                system.systemMessage(entity, "<n>!rkts on aux <nh>-<n> Activates aux rockets");
                system.systemMessage(entity, "<n>!rkts on body <nh>-<n> Activates body rockets");
                system.systemMessage(entity, "<n>!rkts on legs <nh>-<n> Activates leg rockets");
                system.systemMessage(entity, "<n>!rkts on help <nh>-<n> Shows Rocket activate commands");
                system.systemMessage(entity, "<n>!rkts help <nh>-<n> Shows Rockets commands");
                break;
            };
            break;
          case "off":
            switch (arguments[2]) {
              case "aux":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", false);
                break;
              case "body":
                manager.setData(entity, "skyhighocs:dyn/rockets_body", false);
                break;
              case "legs":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", false);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", false);
                manager.setData(entity, "skyhighocs:dyn/rockets_body", false);
                break;
              case "help":
                system.systemMessage(entity, "<n>Rocket deactivate commands:");
                system.systemMessage(entity, "<n>!rkts off * <nh>-<n> Deactivates every rocket set");
                system.systemMessage(entity, "<n>!rkts off aux <nh>-<n> Deactivates aux rockets");
                system.systemMessage(entity, "<n>!rkts off body <nh>-<n> Deactivates body rockets");
                system.systemMessage(entity, "<n>!rkts off legs <nh>-<n> Deactivates leg rockets");
                system.systemMessage(entity, "<n>!rkts off help <nh>-<n> Shows Rocket deactivate commands");
                system.systemMessage(entity, "<n>!rkts help <nh>-<n> Shows Rockets commands");
                break;
              };
              break;
            case "help":
            system.systemMessage(entity, "<n>Rockets commands:");
            system.systemMessage(entity, "<n>!rkts on help <nh>-<n> Shows Rocket activate commands");
            system.systemMessage(entity, "<n>!rkts off help <nh>-<n> Shows Rocket deactivate commands");
            system.systemMessage(entity, "<n>!rkts help <nh>-<n> Shows rockets commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>rockets<e> command! Try <eh>!rkts help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>rockets<e> command! Try <eh>!rkts help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      var aux = (entity.getData("skyhighocs:dyn/rocket_left_arm_booster") && entity.getData("skyhighocs:dyn/rocket_right_arm_booster") && entity.getData("skyhighocs:dyn/rocket_left_leg_booster") && entity.getData("skyhighocs:dyn/rocket_right_leg_booster")) ? "T" : "F";
      var body = (entity.getData("skyhighocs:dyn/rockets_body")) ? "T" : "F";
      var legs = (entity.getData("skyhighocs:dyn/rocket_left_leg_main") && entity.getData("skyhighocs:dyn/rocket_right_leg_main") && entity.getData("skyhighocs:dyn/rocket_left_leg") && entity.getData("skyhighocs:dyn/rocket_right_leg")) ? "T" : "F";
      if (modifier.name() == "fiskheroes:controlled_flight") {
        if (modifier.id() == "rocket_" + aux + body + legs) {
          result = true;
        };
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    isModifierDisabled: function (entity, modifier) {
      result = false;
      if (modifier.name() == "fiskheroes:controlled_flight") {
        result = false;
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", false);
      manager.setData(entity, "skyhighocs:dyn/rockets_body", false);
    }
  };
};
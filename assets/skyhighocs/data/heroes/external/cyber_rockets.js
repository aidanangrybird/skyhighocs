/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "rocketSystem",
    type: 12,
    powers: ["skyhighocs:cyber_rockets"],
    command: "rockets",
    helpMessage: "<n>!rockets <nh>-<n> Rockets",
    disabledMessage: "<e>Module <eh>rocketSystem<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        var nbt = entity.getWornHelmet().nbt();
        switch(arguments[1]) {
          case "on":
            switch (arguments[2]) {
              case "aux":
                manager.setBoolean(nbt, "rocketsAux", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", true);
                break;
              case "body":
                manager.setBoolean(nbt, "rocketsBody", true);
                manager.setData(entity, "skyhighocs:dyn/rockets_body", true);
                break;
              case "legs":
                manager.setBoolean(nbt, "rocketsLegs", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", true);
                break;
              case "*":
                manager.setBoolean(nbt, "rocketsAux", true);
                manager.setBoolean(nbt, "rocketsBody", true);
                manager.setBoolean(nbt, "rocketsLegs", true);
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
                system.systemMessage(entity, "<n>!rockets on * <nh>-<n> Activates every rocket set");
                system.systemMessage(entity, "<n>!rockets on aux <nh>-<n> Activates aux rockets");
                system.systemMessage(entity, "<n>!rockets on body <nh>-<n> Activates body rockets");
                system.systemMessage(entity, "<n>!rockets on legs <nh>-<n> Activates leg rockets");
                system.systemMessage(entity, "<n>!rockets on help <nh>-<n> Shows Rocket activate commands");
                system.systemMessage(entity, "<n>!rockets help <nh>-<n> Shows Rockets commands");
                break;
            };
            break;
          case "off":
            switch (arguments[2]) {
              case "aux":
                manager.setBoolean(nbt, "rocketsAux", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", false);
                break;
              case "body":
                manager.setBoolean(nbt, "rocketsBody", false);
                manager.setData(entity, "skyhighocs:dyn/rockets_body", false);
                break;
              case "legs":
                manager.setBoolean(nbt, "rocketLegs", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", false);
                break;
              case "*":
                manager.setBoolean(nbt, "rocketsAux", false);
                manager.setBoolean(nbt, "rocketsBody", false);
                manager.setBoolean(nbt, "rocketsLegs", false);
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
                system.systemMessage(entity, "<n>!rockets off * <nh>-<n> Deactivates every rocket set");
                system.systemMessage(entity, "<n>!rockets off aux <nh>-<n> Deactivates aux rockets");
                system.systemMessage(entity, "<n>!rockets off body <nh>-<n> Deactivates body rockets");
                system.systemMessage(entity, "<n>!rockets off legs <nh>-<n> Deactivates leg rockets");
                system.systemMessage(entity, "<n>!rockets off help <nh>-<n> Shows Rocket deactivate commands");
                system.systemMessage(entity, "<n>!rockets help <nh>-<n> Shows Rockets commands");
                break;
              };
              break;
            case "help":
            system.systemMessage(entity, "<n>Rockets commands:");
            system.systemMessage(entity, "<n>!rockets on help <nh>-<n> Shows Rocket activate commands");
            system.systemMessage(entity, "<n>!rockets off help <nh>-<n> Shows Rocket deactivate commands");
            system.systemMessage(entity, "<n>!rockets help <nh>-<n> Shows rockets commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>rockets<e> command! Try <eh>!rockets help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>rockets<e> command! Try <eh>!rockets help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      var nbt = entity.getWornHelmet().nbt();
      var aux = (nbt.getBoolean("rocketsAux")) ? "T" : "F";
      var body = (nbt.getBoolean("rocketsBody")) ? "T" : "F";
      var legs = (nbt.getBoolean("rocketsLegs")) ? "T" : "F";
      if (modifier.name() == "fiskheroes:controlled_flight") {
        if (modifier.id() == "rockets_" + aux + body + legs) {
          result = aux || body || legs;
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
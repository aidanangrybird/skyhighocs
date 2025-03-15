/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "rockets",
    type: 12,
    powers: ["skyhighocs:rockets"],
    command: "rockets",
    helpMessage: "<n>!rockets <nh>-<n> Rockets",
    disabledMessage: "<e>Module <eh>rockets<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        var nbt = entity.getWornHelmet().nbt();
        switch(arguments[1]) {
          case "aux":
            switch (arguments[2]) {
              case "arm":
                manager.setBoolean(nbt, "rocketsAux", true);
                break;
              case "disarm":
                manager.setBoolean(nbt, "rocketsAux", false);
                break;
              case "deploy":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", true);
                break;
              case "retract":
                manager.setBoolean(nbt, "rocketsAux", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", false);
                break;
              case "help":
                system.systemMessage(entity, "<n>Aux Rockets commands:");
                system.systemMessage(entity, "<n>!rockets aux arm <nh>-<n> Arms aux rockets");
                system.systemMessage(entity, "<n>!rockets aux disarm <nh>-<n> Disarms aux rockets");
                system.systemMessage(entity, "<n>!rockets aux deploy <nh>-<n> Deploys aux rockets");
                system.systemMessage(entity, "<n>!rockets aux retract <nh>-<n> Retracts aux rockets");
                system.systemMessage(entity, "<n>!rockets aux help <nh>-<n> Shows Aux Rockets commands");
                system.systemMessage(entity, "<n>!rockets help <nh>-<n> Shows Rockets commands");
                break;
            };
            break;
          case "body":
            switch (arguments[2]) {
              case "arm":
                manager.setBoolean(nbt, "rocketsBody", true);
                break;
              case "disarm":
                manager.setBoolean(nbt, "rocketsBody", false);
                break;
              case "deploy":
                manager.setData(entity, "skyhighocs:dyn/rockets_body", true);
                break;
              case "retract":
                manager.setBoolean(nbt, "rocketsBody", false);
                manager.setData(entity, "skyhighocs:dyn/rockets_body", false);
                break;
              case "help":
                system.systemMessage(entity, "<n>Body Rockets commands:");
                system.systemMessage(entity, "<n>!rockets body arm <nh>-<n> Arms body rockets");
                system.systemMessage(entity, "<n>!rockets body disarm <nh>-<n> Disarms body rockets");
                system.systemMessage(entity, "<n>!rockets body deploy <nh>-<n> Deploys body rockets");
                system.systemMessage(entity, "<n>!rockets body retract <nh>-<n> Retracts body rockets");
                system.systemMessage(entity, "<n>!rockets body help <nh>-<n> Shows Body Rockets commands");
                system.systemMessage(entity, "<n>!rockets help <nh>-<n> Shows Rockets commands");
                break;
            };
            break;
          case "legs":
            switch (arguments[2]) {
              case "arm":
                manager.setBoolean(nbt, "rocketsLegs", true);
                break;
              case "disarm":
                manager.setBoolean(nbt, "rocketsLegs", false);
                break;
              case "deploy":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", true);
                break;
              case "retract":
                manager.setBoolean(nbt, "rocketsLegs", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", false);
                break;
              case "help":
                system.systemMessage(entity, "<n>Legs Rockets commands:");
                system.systemMessage(entity, "<n>!rockets legs arm <nh>-<n> Arms legs rockets");
                system.systemMessage(entity, "<n>!rockets legs disarm <nh>-<n> Disarms legs rockets");
                system.systemMessage(entity, "<n>!rockets legs deploy <nh>-<n> Deploys legs rockets");
                system.systemMessage(entity, "<n>!rockets legs retract <nh>-<n> Retracts legs rockets");
                system.systemMessage(entity, "<n>!rockets legs help <nh>-<n> Shows Legs Rockets commands");
                system.systemMessage(entity, "<n>!rockets help <nh>-<n> Shows Rockets commands");
                break;
            };
            break;
          case "*":
            switch (arguments[2]) {
              case "arm":
                manager.setBoolean(nbt, "rocketsAux", true);
                manager.setBoolean(nbt, "rocketsBody", true);
                manager.setBoolean(nbt, "rocketsLegs", true);
                break;
              case "disarm":
                manager.setBoolean(nbt, "rocketsAux", false);
                manager.setBoolean(nbt, "rocketsBody", false);
                manager.setBoolean(nbt, "rocketsLegs", false);
                break;
              case "deploy":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", true);
                manager.setData(entity, "skyhighocs:dyn/rockets_body", true);
                break;
              case "retract":
                manager.setBoolean(nbt, "rocketsAux", false);
                manager.setBoolean(nbt, "rocketsBody", false);
                manager.setBoolean(nbt, "rocketsLegs", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", false);
                manager.setData(entity, "skyhighocs:dyn/rockets_body", false);
                break;
              case "help":
                system.systemMessage(entity, "<n>All Rockets commands:");
                system.systemMessage(entity, "<n>!rockets * arm <nh>-<n> Arms all rockets");
                system.systemMessage(entity, "<n>!rockets * disarm <nh>-<n> Disarms all rockets");
                system.systemMessage(entity, "<n>!rockets * deploy <nh>-<n> Deploys all rockets");
                system.systemMessage(entity, "<n>!rockets * retract <nh>-<n> Retracts all rockets");
                system.systemMessage(entity, "<n>!rockets * help <nh>-<n> Shows All Rockets commands");
                system.systemMessage(entity, "<n>!rockets help <nh>-<n> Shows Rockets commands");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Rockets commands:");
            system.systemMessage(entity, "<n>!rockets aux help <nh>-<n> Shows Aux Rockets commands");
            system.systemMessage(entity, "<n>!rockets body help <nh>-<n> Shows Body Rockets commands");
            system.systemMessage(entity, "<n>!rockets legs help <nh>-<n> Shows Leg Rockets commands");
            system.systemMessage(entity, "<n>!rockets * help <nh>-<n> Shows all Rockets commands");
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
      if (!system.isModuleDisabled(entity, this.name)) {
        var nbt = entity.getWornHelmet().nbt();
        var aux = (nbt.getBoolean("rocketsAux")) ? "T" : "F";
        var body = (nbt.getBoolean("rocketsBody")) ? "T" : "F";
        var legs = (nbt.getBoolean("rocketsLegs")) ? "T" : "F";
        if (modifier.name() == "fiskheroes:controlled_flight") {
          if (modifier.id() == "rockets_" + aux + body + legs) {
            result = nbt.getBoolean("rocketsAux") || nbt.getBoolean("rocketsBody") || nbt.getBoolean("rocketsLegs");
          };
        };
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
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
    },
    tickHandler: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      var aux = nbt.getBoolean("rocketsAux") && entity.getData("fiskheroes:flying");
      var body = nbt.getBoolean("rocketsBody") && entity.getData("fiskheroes:flying");
      var legs = nbt.getBoolean("rocketsLegs") && entity.getData("fiskheroes:flying");
      if (entity.getData("fiskheroes:flight_timer") > 0) {
        manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster", aux);
        manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster", aux);
        manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster", aux);
        manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster", aux);
        manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main", legs);
        manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main", legs);
        manager.setData(entity, "skyhighocs:dyn/rocket_left_leg", legs);
        manager.setData(entity, "skyhighocs:dyn/rocket_right_leg", legs);
        manager.setData(entity, "skyhighocs:dyn/rockets_body", body);
      };

    }
  };
};
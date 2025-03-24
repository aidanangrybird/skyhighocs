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
          case "enable":
            switch (arguments[2]) {
              case "onFall":
                manager.setBoolean(nbt, "rocketsOnFall", true);
                system.systemMessage(entity, "<s>Enable <sh>onFall<s>!");
                break;
            };
            break;
          case "onFall":
            switch (arguments[2]) {
              case "onFall":
                manager.setBoolean(nbt, "rocketsOnFall", true);
                system.systemMessage(entity, "<s>Disable <sh>onFall<s>!");
                break;
            };
            break;
          case "arm":
            switch (arguments[2]) {
              case "aux":
                manager.setBoolean(nbt, "rocketsAux", true);
                system.systemMessage(entity, "<s>Armed <sh>aux<s> rockets!");
                break;
              case "body":
                manager.setBoolean(nbt, "rocketsBody", true);
                system.systemMessage(entity, "<s>Armed <sh>body<s> rockets!");
                break;
              case "legs":
                manager.setBoolean(nbt, "rocketsLegs", true);
                system.systemMessage(entity, "<s>Armed <sh>leg<s> rockets!");
                break;
              case "*":
                manager.setBoolean(nbt, "rocketsAux", true);
                manager.setBoolean(nbt, "rocketsBody", true);
                manager.setBoolean(nbt, "rocketsLegs", true);
                system.systemMessage(entity, "<s>Armed <sh>all<s> rockets!");
                break;
            };
            break;
          case "disarm":
            switch (arguments[2]) {
              case "aux":
                if (!(nbt.getBoolean("rocketsAux") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsAux", false);
                  system.systemMessage(entity, "<s>Disarmed <sh>aux<s> rockets!");
                } else {
                  system.systemMessage(entity, "<e>Unable to disarm active <eh>aux<e> rockets!");
                };
                break;
              case "body":
                if (!(nbt.getBoolean("rocketsBody") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsBody", false);
                  system.systemMessage(entity, "<s>Disarmed <sh>body<s> rockets!");
                } else {
                  system.systemMessage(entity, "<e>Unable to disarm active <eh>body<e> rockets!");
                };
                break;
              case "legs":
                if (!(nbt.getBoolean("rocketsLegs") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsLegs", false);
                  system.systemMessage(entity, "<s>Disarmed <sh>leg<s> rockets!");
                } else {
                  system.systemMessage(entity, "<e>Unable to disarm active <eh>leg<e> rockets!");
                };
                break;
              case "*":
                if (!(nbt.getBoolean("rocketsAux") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsAux", false);
                  system.systemMessage(entity, "<s>Disarmed <sh>aux<s> rockets!");
                } else {
                  system.systemMessage(entity, "<e>Unable to disarm active <eh>aux<e> rockets!");
                };
                if (!(nbt.getBoolean("rocketsBody") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsBody", false);
                  system.systemMessage(entity, "<s>Disarmed <sh>body<s> rockets!");
                } else {
                  system.systemMessage(entity, "<e>Unable to disarm active <eh>body<e> rockets!");
                };
                if (!(nbt.getBoolean("rocketsLegs") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsLegs", false);
                  system.systemMessage(entity, "<s>Disarmed <sh>leg<s> rockets!");
                } else {
                  system.systemMessage(entity, "<e>Unable to disarm active <eh>leg<e> rockets!");
                };
                system.systemMessage(entity, "<s>Disarmed <sh>all<s> inactive rockets!");
                break;
            };
            break;
          case "deploy":
            switch (arguments[2]) {
              case "aux":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>aux<s> rockets!");
                break;
              case "body":
                manager.setData(entity, "skyhighocs:dyn/rockets_body_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>body<s> rockets!");
                break;
              case "legs":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>leg<s> rockets!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rockets_body_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>all<s> rockets!");
                break;
            };
            break;
          case "retract":
            switch (arguments[2]) {
              case "aux":
                if (!(nbt.getBoolean("rocketsAux") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", false);
                  system.systemMessage(entity, "<s>Retracted <sh>aux<s> rockets!");
                } else {
                  system.systemMessage(entity, "<e>Unable to retract armed <eh>aux<e> rockets!");
                };
                break;
              case "body":
                if (!(nbt.getBoolean("rocketsBody") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setData(entity, "skyhighocs:dyn/rockets_body_deployed", false);
                  system.systemMessage(entity, "<s>Retracted <sh>body<s> rockets!");
                } else {
                  system.systemMessage(entity, "<e>Unable to retract armed <eh>body<e> rockets!");
                };
                break;
              case "legs":
                if (!(nbt.getBoolean("rocketsLegs") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_deployed", false);
                  system.systemMessage(entity, "<s>Retracted <sh>leg<s> rockets!");
                } else {
                  system.systemMessage(entity, "<e>Unable to retract armed <eh>leg<e> rockets!");
                };
                break;
              case "*":
                if (!(nbt.getBoolean("rocketsAux") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", false);
                } else {
                  system.systemMessage(entity, "<e>Unable to retract armed <eh>aux<e> rockets!");
                };
                if (!(nbt.getBoolean("rocketsLegs") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_deployed", false);
                  manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_deployed", false);
                } else {
                  system.systemMessage(entity, "<e>Unable to retract armed <eh>leg<e> rockets!");
                };
                if (!(nbt.getBoolean("rocketsBody") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setData(entity, "skyhighocs:dyn/rockets_body_deployed", false);
                } else {
                  system.systemMessage(entity, "<e>Unable to retract armed <eh>body<e> rockets!");
                };
                system.systemMessage(entity, "<s>Retracted <sh>all<s> disarmed rockets!");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Rockets commands:");
            system.systemMessage(entity, "<n>!rockets arm <aux|body|legs|*> <nh>-<n> Arms set of rockets");
            system.systemMessage(entity, "<n>!rockets disarm <aux|body|legs|*> <nh>-<n> Disarms set of rockets");
            system.systemMessage(entity, "<n>!rockets deploy <aux|body|legs|*> <nh>-<n> Deploys set of rockets");
            system.systemMessage(entity, "<n>!rockets retract <aux|body|legs|*> <nh>-<n> Retracts set of rockets");
            system.systemMessage(entity, "<n>!rockets status <nh>-<n> Shows status of rockets");
            system.systemMessage(entity, "<n>!rockets help <nh>-<n> Shows rockets commands");
            break;
          case "status":
            var aux = (entity.getData("skyhighocs:dyn/rocket_left_arm_booster_deploy_timer") > 0) && (entity.getData("skyhighocs:dyn/rocket_right_arm_booster_deploy_timer") > 0) && (entity.getData("skyhighocs:dyn/rocket_left_leg_booster_deploy_timer") > 0) && (entity.getData("skyhighocs:dyn/rocket_right_leg_booster_deploy_timer") > 0);
            var body = (entity.getData("skyhighocs:dyn/rockets_body_deploy_timer") > 0);
            var legs = (entity.getData("skyhighocs:dyn/rocket_left_leg_main_deploy_timer") > 0) && (entity.getData("skyhighocs:dyn/rocket_right_leg_main_deploy_timer") > 0) && (entity.getData("skyhighocs:dyn/rocket_left_leg_deploy_timer") > 0) && (entity.getData("skyhighocs:dyn/rocket_right_leg_deploy_timer") > 0);
            system.systemMessage(entity, "<n>Rockets status:");
            system.systemMessage(entity, "<n>Aux: <nh>" + (nbt.getBoolean("rocketsAux") ? "ARMED" : "DISARMED") + " <n>-<nh> " + ((aux) || (entity.getData("skyhighocs:dyn/rockets_aux_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            system.systemMessage(entity, "<n>Body: <nh>" + (nbt.getBoolean("rocketsBody") ? "ARMED" : "DISARMED") + " <n>-<nh> " + ((body) || (entity.getData("skyhighocs:dyn/rockets_body_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            system.systemMessage(entity, "<n>Legs: <nh>" + (nbt.getBoolean("rocketsLegs") ? "ARMED" : "DISARMED") + " <n>-<nh> " + ((legs) || (entity.getData("skyhighocs:dyn/rockets_legs_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
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
      manager.setData(entity, "skyhighocs:dyn/rockets_aux", false);
      manager.setData(entity, "skyhighocs:dyn/rockets_legs", false);
      manager.setData(entity, "skyhighocs:dyn/rockets_body", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rockets_body_deployed", false);
    },
    tickHandler: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      if (!entity.isSneaking() && !entity.getData("fiskheroes:flying") && nbt.getBoolean("rocketsOnFall") && entity.world().isUnobstructed(entity.pos(), entity.pos().add(0, -5, 0)) && entity.motionY() < -0.75) {
        system.systemMessage(entity, "<n>Auto activated rockets!");
        manager.setData(entity, "fiskheroes:flying", true);
      };
      var aux = nbt.getBoolean("rocketsAux") && entity.getData("fiskheroes:flying");
      var body = nbt.getBoolean("rocketsBody") && entity.getData("fiskheroes:flying");
      var legs = nbt.getBoolean("rocketsLegs") && entity.getData("fiskheroes:flying");
      if (entity.getData("fiskheroes:flight_timer") > 0) {
        manager.setData(entity, "skyhighocs:dyn/rockets_aux", aux);
        manager.setData(entity, "skyhighocs:dyn/rockets_legs", legs);
        manager.setData(entity, "skyhighocs:dyn/rockets_body", body);
      };
    },
    fightOrFlight: function (entity, manager) {
      if (!entity.getWornHelmet().nbt().getBoolean("rocketsAux") || !entity.getWornHelmet().nbt().getBoolean("rocketsBody") || !entity.getWornHelmet().nbt().getBoolean("rocketsLegs")) {
        manager.setBoolean(entity.getWornHelmet().nbt(), "rocketsAux", true);
        manager.setBoolean(entity.getWornHelmet().nbt(), "rocketsBody", true);
        manager.setBoolean(entity.getWornHelmet().nbt(), "rocketsLegs", true);
        system.systemMessage(entity, "<n>Damage detected! Automatically armed <nh>rockets<n>!");
      };
    }
  };
};
/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "rockets",
    moduleMessageName: "Rockets",
    type: 12,
    powers: ["skyhighocs:rockets"],
    command: "rockets",
    helpMessage: "<n>!rockets <nh>-<n> Rockets",
    disabledMessage: "<e>Module <eh>rockets<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        var nbt = entity.getWornHelmet().nbt();
        switch(arguments[1]) {
          case "arm":
            switch (arguments[2]) {
              case "onFall":
                manager.setBoolean(nbt, "rocketsOnFall", true);
                system.moduleMessage(this, entity, "<s>Armed <sh>onFall<s> protection!");
                break;
              case "aux":
                manager.setBoolean(nbt, "rocketsAux", true);
                system.moduleMessage(this, entity, "<s>Armed <sh>aux<s> rockets!");
                break;
              case "body":
                manager.setBoolean(nbt, "rocketsBody", true);
                system.moduleMessage(this, entity, "<s>Armed <sh>body<s> rockets!");
                break;
              case "legs":
                manager.setBoolean(nbt, "rocketsLegs", true);
                system.moduleMessage(this, entity, "<s>Armed <sh>leg<s> rockets!");
                break;
              case "*":
                manager.setBoolean(nbt, "rocketsAux", true);
                manager.setBoolean(nbt, "rocketsBody", true);
                manager.setBoolean(nbt, "rocketsLegs", true);
                system.moduleMessage(this, entity, "<s>Armed <sh>all<s> rockets!");
                break;
            };
            break;
          case "disarm":
            switch (arguments[2]) {
              case "onFall":
                manager.setBoolean(nbt, "rocketsOnFall", false);
                system.moduleMessage(this, entity, "<s>Disarmed <sh>onFall<s> protection!");
                break;
              case "aux":
                if (!(nbt.getBoolean("rocketsAux") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsAux", false);
                  system.moduleMessage(this, entity, "<s>Disarmed <sh>aux<s> rockets!");
                } else {
                  system.moduleMessage(this, entity, "<e>Unable to disarm active <eh>aux<e> rockets!");
                };
                break;
              case "body":
                if (!(nbt.getBoolean("rocketsBody") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsBody", false);
                  system.moduleMessage(this, entity, "<s>Disarmed <sh>body<s> rockets!");
                } else {
                  system.moduleMessage(this, entity, "<e>Unable to disarm active <eh>body<e> rockets!");
                };
                break;
              case "legs":
                if (!(nbt.getBoolean("rocketsLegs") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsLegs", false);
                  system.moduleMessage(this, entity, "<s>Disarmed <sh>leg<s> rockets!");
                } else {
                  system.moduleMessage(this, entity, "<e>Unable to disarm active <eh>leg<e> rockets!");
                };
                break;
              case "*":
                if (!(nbt.getBoolean("rocketsAux") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsAux", false);
                  system.moduleMessage(this, entity, "<s>Disarmed <sh>aux<s> rockets!");
                } else {
                  system.moduleMessage(this, entity, "<e>Unable to disarm active <eh>aux<e> rockets!");
                };
                if (!(nbt.getBoolean("rocketsBody") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsBody", false);
                  system.moduleMessage(this, entity, "<s>Disarmed <sh>body<s> rockets!");
                } else {
                  system.moduleMessage(this, entity, "<e>Unable to disarm active <eh>body<e> rockets!");
                };
                if (!(nbt.getBoolean("rocketsLegs") && entity.getData("fiskheroes:flight_timer") > 0)) {
                  manager.setBoolean(nbt, "rocketsLegs", false);
                  system.moduleMessage(this, entity, "<s>Disarmed <sh>leg<s> rockets!");
                } else {
                  system.moduleMessage(this, entity, "<e>Unable to disarm active <eh>leg<e> rockets!");
                };
                system.moduleMessage(this, entity, "<s>Disarmed <sh>all<s> inactive rockets!");
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
                system.moduleMessage(this, entity, "<s>Deployed <sh>aux<s> rockets!");
                break;
              case "arms":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>arm<s> rockets!");
                break;
              case "leftArm":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left arm<s> rocket!");
                break;
              case "rightArm":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>right arm<s> rocket!");
                break;
              case "legsAux":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>aux legs<s> rockets!");
                break;
              case "leftLegAux":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left leg aux<s> rocket!");
                break;
              case "rightLegAux":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>right leg aux<s> rocket!");
                break;
              case "body":
                manager.setData(entity, "skyhighocs:dyn/rocket_body_left_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_body_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>body<s> rockets!");
                break;
              case "bodyLeft":
                manager.setData(entity, "skyhighocs:dyn/rocket_body_left_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left body<s> rocket!");
                break;
              case "bodyRight":
                manager.setData(entity, "skyhighocs:dyn/rocket_body_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>right body<s> rocket!");
              case "legs":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_sides_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_sides_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>leg<s> rockets!");
                break;
              case "leftLeg":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_sides_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left leg<s> rockets!");
                break;
              case "leftLegMain":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>main left leg<s> rocket!");
                break;
              case "leftLegSides":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_sides_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left leg side<s> rockets!");
                break;
              case "rightLeg":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_sides_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>right leg<s> rockets!");
                break;
              case "rightLegMain":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>main right leg<s> rocket!");
                break;
              case "rightLegSides":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_sides_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left leg side<s> rockets!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_sides_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_sides_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_body_left_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/rocket_body_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>all<s> rockets!");
                break;
              default:
                system.moduleMessage(this, entity, "<e>Unknown rocket!");
            };
            break;
          case "retract":
            switch (arguments[2]) {
              case "aux":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>aux<s> rockets!");
                break;
              case "arms":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>arm<s> rockets!");
                break;
              case "leftArm":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left arm<s> rocket!");
                break;
              case "rightArm":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>right arm<s> rocket!");
                break;
              case "legsAux":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>aux legs<s> rockets!");
                break;
              case "leftLegAux":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left leg aux<s> rocket!");
                break;
              case "rightLegAux":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>right leg aux<s> rocket!");
                break;
              case "body":
                manager.setData(entity, "skyhighocs:dyn/rocket_body_left_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_body_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>body<s> rockets!");
                break;
              case "bodyLeft":
                manager.setData(entity, "skyhighocs:dyn/rocket_body_left_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left body<s> rocket!");
                break;
              case "bodyRight":
                manager.setData(entity, "skyhighocs:dyn/rocket_body_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>right body<s> rocket!");
              case "legs":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_sides_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_sides_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>leg<s> rockets!");
                break;
              case "leftLeg":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_sides_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left leg<s> rockets!");
                break;
              case "leftLegMain":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>main left leg<s> rocket!");
                break;
              case "leftLegSides":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_sides_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left leg side<s> rockets!");
                break;
              case "rightLeg":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_sides_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>right leg<s> rockets!");
                break;
              case "rightLegMain":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>main right leg<s> rocket!");
                break;
              case "rightLegSides":
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_sides_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left leg side<s> rockets!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/rocket_left_arm_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_arm_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_booster_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_main_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_main_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_sides_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_sides_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_body_left_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/rocket_body_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>all<s> rockets!");
                break;
            };
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Rockets commands:");
            system.moduleMessage(this, entity, "<n>!rockets arm <onFall|aux|body|legs|*> <nh>-<n> Arms set of rockets or onFall protection");
            system.moduleMessage(this, entity, "<n>!rockets disarm <onFall|aux|body|legs|*> <nh>-<n> Disarms set of rockets or onFall protection");
            system.moduleMessage(this, entity, "<n>!rockets deploy <rocket|rocketSet> <nh>-<n> Deploys set of rockets");
            system.moduleMessage(this, entity, "<n>!rockets retract <rocket|rocketSet> <nh>-<n> Retracts set of rockets");
            system.moduleMessage(this, entity, "<n>!rockets status <nh>-<n> Shows status of rockets");
            system.moduleMessage(this, entity, "<n>!rockets help <nh>-<n> Shows rockets commands");
            break;
          case "status":
            var auxSet = (entity.getData("skyhighocs:dyn/rockets_aux_timer") > 0);
            var bodySet = (entity.getData("skyhighocs:dyn/rockets_body_timer") > 0);
            var legsSet = (entity.getData("skyhighocs:dyn/rockets_legs_timer") > 0);
            system.moduleMessage(this, entity, "<n>Rocket status:");
            system.moduleMessage(this, entity, "<n>Aux set: <nh>" + (nbt.getBoolean("rocketsAux") ? "ARMED" : "DISARMED"));
            system.moduleMessage(this, entity, "<n>Body set: <nh>" + (nbt.getBoolean("rocketsBody") ? "ARMED" : "DISARMED"));
            system.moduleMessage(this, entity, "<n>Leg set: <nh>" + (nbt.getBoolean("rocketsLegs") ? "ARMED" : "DISARMED"));
            system.moduleMessage(this, entity, "<n>Left Arm aux: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_left_arm_booster_deploy_timer") > 0) || auxSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Right Arm aux: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_right_arm_booster_deploy_timer") > 0) || auxSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Left Body: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_body_left_deploy_timer") > 0) || bodySet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Right Body: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_body_right_deploy_timer") > 0) || bodySet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Left Leg aux: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_left_leg_booster_deploy_timer") > 0) || auxSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Right Leg aux: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_right_leg_booster_deploy_timer") > 0) || auxSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Left Leg sides: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_left_leg_sides_deploy_timer") > 0) || legsSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Right Leg sides: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_right_leg_sides_deploy_timer") > 0) || legsSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Left Leg main: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_left_leg_main_deploy_timer") > 0) || legsSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Right Leg main: <nh>" + ((entity.getData("skyhighocs:dyn/rocket_right_leg_main_deploy_timer") > 0) || legsSet ? "DEPLOYED" : "RETRACTED"));
            break;
          default:
            system.moduleMessage(this, entity, "<e>Unknown <eh>rockets<e> command! Try <eh>!rockets help<e> for a list of commands!");
            break;
        };
      } else {
        system.moduleMessage(this, entity, "<e>Unknown <eh>rockets<e> command! Try <eh>!rockets help<e> for a list of commands!");
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
      manager.setData(entity, "skyhighocs:dyn/rocket_left_leg_sides_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_right_leg_sides_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_body_left_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/rocket_body_right_deployed", false);
    },
    tickHandler: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      if (!entity.isSneaking() && !entity.getData("fiskheroes:flying") && nbt.getBoolean("rocketsOnFall") && entity.world().isUnobstructed(entity.pos(), entity.pos().add(0, -5, 0)) && entity.motionY() < -0.75) {
        system.moduleMessage(this, entity, "<n>Auto activated rockets!");
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
      manager.setBoolean(entity.getWornHelmet().nbt(), "rocketsAux", true);
      manager.setBoolean(entity.getWornHelmet().nbt(), "rocketsBody", true);
      manager.setBoolean(entity.getWornHelmet().nbt(), "rocketsLegs", true);
      system.moduleMessage(this, entity, "<n>Automatically armed <nh>rockets<n>!");
    }
  };
};
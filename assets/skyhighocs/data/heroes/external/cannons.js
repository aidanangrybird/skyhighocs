/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  // Charged Beam = 0
  // Heat Vision = 1
  // Energy Projection = 2
  return {
    name: "cannons",
    moduleMessageName: "Cannons",
    type: 13,
    powers: ["skyhighocs:cannons"],
    command: "cannons",
    helpMessage: "<n>!cannons <nh>-<n> Cannons",
    disabledMessage: "<e>Module <eh>cannons<e> is disabled!",
    keyBinds: function (hero) {
      hero.addKeyBindFunc("CANNONS", (player, manager) => {
        system.moduleMessage(this, player, "<e>At least one cannon set must be armed!");
        return false;
      }, "Cannons (None armed)", 4);
      hero.addKeyBind("CHARGED_BEAM", "Cannons", 4);
    },
    isKeyBindEnabled: function (entity, keyBind) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        var nbt = entity.getWornHelmet().nbt();
        var eyes = nbt.getBoolean("cannonsEyes");
        var body = nbt.getBoolean("cannonsBody");
        var arms = nbt.getBoolean("cannonsArms");
        if (keyBind == "CANNONS" && entity.getData("fiskheroes:tentacles") == null) {
          result = (!eyes && !body && !arms);
        };
        if (keyBind == "CHARGED_BEAM" && entity.getData("fiskheroes:tentacles") == null) {
          result = (eyes || body || arms);
        };
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        var nbt = entity.getWornHelmet().nbt();
        var eyes = (nbt.getBoolean("cannonsEyes")) ? "T" : "F";
        var body = (nbt.getBoolean("cannonsBody")) ? "T" : "F";
        var arms = (nbt.getBoolean("cannonsArms")) ? "T" : "F";
        if (modifier.name() == "fiskheroes:charged_beam") {
          if (modifier.id() == "cannons_" + eyes + body + arms) {
            result = true;
          };
        };
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        var nbt = entity.getWornHelmet().nbt();
        switch (arguments[1]) {
          case "arm":
            switch (arguments[2]) {
              case "eyes":
                manager.setBoolean(nbt, "cannonsEyes", true);
                system.moduleMessage(this, entity, "<s>Armed <sh>eye<s> cannons!");
                break;
              case "body":
                manager.setBoolean(nbt, "cannonsBody", true);
                system.moduleMessage(this, entity, "<s>Armed <sh>body<s> cannons!");
                break;
              case "arms":
                manager.setBoolean(nbt, "cannonsArms", true);
                system.moduleMessage(this, entity, "<s>Armed <sh>arm<s> cannons!");
                break;
              case "*":
                manager.setBoolean(nbt, "cannonsEyes", true);
                manager.setBoolean(nbt, "cannonsBody", true);
                manager.setBoolean(nbt, "cannonsArms", true);
                system.moduleMessage(this, entity, "<s>Armed <sh>all<s> cannons!");
                break;
            };
            break;
          case "disarm":
            switch (arguments[2]) {
              case "eyes":
                manager.setBoolean(nbt, "cannonsEyes", false);
                system.moduleMessage(this, entity, "<s>Disarmed <sh>eye<s> cannons!");
                break;
              case "body":
                manager.setBoolean(nbt, "cannonsBody", false);
                system.moduleMessage(this, entity, "<s>Disarmed <sh>body<s> cannons!");
                break;
              case "arms":
                manager.setBoolean(nbt, "cannonsArms", false);
                system.moduleMessage(this, entity, "<s>Disarmed <sh>arm<s> cannons!");
                break;
              case "*":
                manager.setBoolean(nbt, "cannonsEyes", false);
                manager.setBoolean(nbt, "cannonsBody", false);
                manager.setBoolean(nbt, "cannonsArms", false);
                system.moduleMessage(this, entity, "<s>Disarmed <sh>all<s> cannons!");
                break;
            };
            break;
          case "deploy":
            switch (arguments[2]) {
              case "eyes":
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_left_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>eyes<s> cannons!");
                break;
              case "leftEye":
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_left_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left eye<s> cannon!");
                break;
              case "rightEye":
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>right eye<s> cannon!");
                break;
              case "body":
                manager.setData(entity, "skyhighocs:dyn/cannon_body_left_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_body_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>body<s> cannons!");
                break;
              case "bodyLeft":
                manager.setData(entity, "skyhighocs:dyn/cannon_body_left_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left body<s> cannon!");
                break;
              case "bodyRight":
                manager.setData(entity, "skyhighocs:dyn/cannon_body_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>right body<s> cannon!");
                break;
              case "arms":
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>arm<s> cannons!");
                break;
              case "leftArm":
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>left arm<s> cannon!");
                break;
              case "rightArm":
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>right arm<s> cannon!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_left_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_right_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_body_left_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_body_right_deployed", true);
                system.moduleMessage(this, entity, "<s>Deployed <sh>all<s> cannons!");
                break;
            };
            break;
          case "retract":
            switch (arguments[2]) {
              case "eyes":
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_left_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>eyes<s> cannons!");
                break;
              case "leftEye":
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_left_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left eye<s> cannon!");
                break;
              case "rightEye":
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>right eye<s> cannon!");
                break;
              case "body":
                manager.setData(entity, "skyhighocs:dyn/cannon_body_left_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_body_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>body<s> cannons!");
                break;
              case "bodyLeft":
                manager.setData(entity, "skyhighocs:dyn/cannon_body_left_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left body<s> cannon!");
                break;
              case "bodyRight":
                manager.setData(entity, "skyhighocs:dyn/cannon_body_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>right body<s> cannon!");
                break;
              case "arms":
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>arm<s> cannons!");
                break;
              case "leftArm":
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>left arm<s> cannon!");
                break;
              case "rightArm":
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>right arm<s> cannon!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_left_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_eye_right_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_body_left_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_body_right_deployed", false);
                system.moduleMessage(this, entity, "<s>Retracted <sh>all<s> cannons!");
                break;
            };
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Cannons commands:");
            system.moduleMessage(this, entity, "<n>!cannons arm <eyes|body|arms|*> <nh>-<n> Arms set of cannons");
            system.moduleMessage(this, entity, "<n>!cannons disarm <eyes|body|arms|*> <nh>-<n> Disarm set of cannons");
            system.moduleMessage(this, entity, "<n>!cannons deploy <eyes|body|arms|*> <nh>-<n> Deploys cannons");
            system.moduleMessage(this, entity, "<n>!cannons retract <eyes|body|arms|*> <nh>-<n> Retracts cannons");
            system.moduleMessage(this, entity, "<n>!cannons help <nh>-<n> Shows cannons commands");
            break;
          case "status":
            var eyeSet = (entity.getData("skyhighocs:dyn/cannons_eyes_timer") > 0);
            var bodySet = (entity.getData("skyhighocs:dyn/cannons_body_timer") > 0);
            var armSet = (entity.getData("skyhighocs:dyn/cannons_arms_timer") > 0);
            system.moduleMessage(this, entity, "<n>Cannons status:");
            system.moduleMessage(this, entity, "<n>Eye set: <nh>" + (nbt.getBoolean("cannonsEyes") ? "ARMED" : "DISARMED"));
            system.moduleMessage(this, entity, "<n>Body set: <nh>" + (nbt.getBoolean("cannonsBody") ? "ARMED" : "DISARMED"));
            system.moduleMessage(this, entity, "<n>Arm set: <nh>" + (nbt.getBoolean("cannonsArms") ? "ARMED" : "DISARMED"));
            system.moduleMessage(this, entity, "<n>Left Eye: <nh>" + ((entity.getData("skyhighocs:dyn/cannon_eye_left_deploy_timer") > 0) || eyeSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Right Eye: <nh>" + ((entity.getData("skyhighocs:dyn/cannon_eye_right_deploy_timer") > 0) || eyeSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Left Body: <nh>" + ((entity.getData("skyhighocs:dyn/cannon_body_left_deploy_timer") > 0) || bodySet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Right Body: <nh>" + ((entity.getData("skyhighocs:dyn/cannon_body_right_deploy_timer") > 0) || bodySet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Left Arm: <nh>" + ((entity.getData("skyhighocs:dyn/cannon_left_arm_deploy_timer") > 0) || armSet ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Right Arm: <nh>" + ((entity.getData("skyhighocs:dyn/cannon_right_arm_deploy_timer") > 0) || armSet ? "DEPLOYED" : "RETRACTED"));
            break;
          default:
            system.moduleMessage(this, entity, "<e>Unknown <eh>cannons<e> command! Try <eh>!cannons help<e> for a list of commands!");
            break;
        };
      } else {
        system.moduleMessage(this, entity, "<e>Unknown <eh>cannons<e> command! Try <eh>!cannons help<e> for a list of commands!");
      };
    },
    whenDisabled: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      manager.setBoolean(nbt, "cannonsEyes", false);
      manager.setBoolean(nbt, "cannonsBody", false);
      manager.setBoolean(nbt, "cannonsArms", false);
      manager.setData(entity, "skyhighocs:dyn/cannons_arms", false);
      manager.setData(entity, "skyhighocs:dyn/cannons_body", false);
      manager.setData(entity, "skyhighocs:dyn/cannons_eyes", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_eye_left_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_eye_right_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_body_left_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_body_right_deployed", false);
    },
    tickHandler: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      var eyes = nbt.getBoolean("cannonsEyes") && entity.getData("fiskheroes:beam_charging");
      var body = nbt.getBoolean("cannonsBody") && entity.getData("fiskheroes:beam_charging");
      var arms = nbt.getBoolean("cannonsArms") && entity.getData("fiskheroes:beam_charging");
      if (entity.getData("fiskheroes:beam_charge") > 0) {
        manager.setData(entity, "skyhighocs:dyn/cannons_arms", arms);
        manager.setData(entity, "skyhighocs:dyn/cannons_body", body);
        manager.setData(entity, "skyhighocs:dyn/cannons_eyes", eyes);
      };
    },
    fightOrFlight: function (entity, manager) {
      manager.setBoolean(entity.getWornHelmet().nbt(), "cannonsEyes", true);
      manager.setBoolean(entity.getWornHelmet().nbt(), "cannonsBody", true);
      manager.setBoolean(entity.getWornHelmet().nbt(), "cannonsArms", true);
      system.moduleMessage(this, entity, "<n>Automatically armed <nh>cannons<n>!");
    }
  };
};
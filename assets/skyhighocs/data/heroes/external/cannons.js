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
    type: 13,
    powers: ["skyhighocs:cannons"],
    command: "cannons",
    helpMessage: "<n>!cannons <nh>-<n> Cannons",
    disabledMessage: "<e>Module <eh>cannons<e> is disabled!",
    keyBinds: function (hero) {
      hero.addKeyBind("CANNONS", "Cannons (None armed)", 4);
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
                system.systemMessage(entity, "<s>Armed <sh>eye<s> cannons!");
                break;
              case "body":
                manager.setBoolean(nbt, "cannonsBody", true);
                system.systemMessage(entity, "<s>Armed <sh>body<s> cannons!");
                break;
              case "arms":
                manager.setBoolean(nbt, "cannonsArms", true);
                system.systemMessage(entity, "<s>Armed <sh>arm<s> cannons!");
                break;
              case "*":
                manager.setBoolean(nbt, "cannonsEyes", true);
                manager.setBoolean(nbt, "cannonsBody", true);
                manager.setBoolean(nbt, "cannonsArms", true);
                system.systemMessage(entity, "<s>Armed <sh>all<s> cannons!");
                break;
            };
            break;
          case "disarm":
            switch (arguments[2]) {
              case "eyes":
                manager.setBoolean(nbt, "cannonsEyes", false);
                system.systemMessage(entity, "<s>Disarmed <sh>eye<s> cannons!");
                break;
              case "body":
                manager.setBoolean(nbt, "cannonsBody", false);
                system.systemMessage(entity, "<s>Disarmed <sh>body<s> cannons!");
                break;
              case "arms":
                manager.setBoolean(nbt, "cannonsArms", false);
                system.systemMessage(entity, "<s>Disarmed <sh>arm<s> cannons!");
                break;
              case "*":
                manager.setBoolean(nbt, "cannonsEyes", false);
                manager.setBoolean(nbt, "cannonsBody", false);
                manager.setBoolean(nbt, "cannonsArms", false);
                system.systemMessage(entity, "<s>Disarmed <sh>all<s> cannons!");
                break;
            };
            break;
          case "deploy":
            switch (arguments[2]) {
              case "eyes":
                manager.setData(entity, "skyhighocs:dyn/cannon_eyes_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>eyes<s> cannons!");
                break;
              case "body":
                manager.setData(entity, "skyhighocs:dyn/cannon_body_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>body<s> cannons!");
                break;
              case "arms":
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>arm<s> cannons!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/cannon_eyes_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_body_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>all<s> cannons!");
                break;
            };
            break;
          case "retract":
            switch (arguments[2]) {
              case "eyes":
                manager.setData(entity, "skyhighocs:dyn/cannon_eyes_deployed", false);
                system.systemMessage(entity, "<s>Retracted <sh>eyes<s> cannons!");
                break;
              case "body":
                manager.setData(entity, "skyhighocs:dyn/cannon_body_deployed", false);
                system.systemMessage(entity, "<s>Retracted <sh>body<s> cannons!");
                break;
              case "arms":
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", false);
                system.systemMessage(entity, "<s>Retracted <sh>arm<s> cannons!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/cannon_eyes_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_body_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", false);
                system.systemMessage(entity, "<s>Retracted <sh>all<s> cannons!");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Cannons commands:");
            system.systemMessage(entity, "<n>!cannons arm <eyes|body|arms|*> <nh>-<n> Arms set of cannons");
            system.systemMessage(entity, "<n>!cannons disarm <eyes|body|arms|*> <nh>-<n> Disarm set of cannons");
            system.systemMessage(entity, "<n>!cannons deploy <eyes|body|arms|*> <nh>-<n> Deploys cannons");
            system.systemMessage(entity, "<n>!cannons retract <eyes|body|arms|*> <nh>-<n> Retracts cannons");
            system.systemMessage(entity, "<n>!cannons help <nh>-<n> Shows cannons commands");
            break;
          case "status":
            system.systemMessage(entity, "<n>Cannons status:");
            system.systemMessage(entity, "<n>Eyes: <nh>" + (nbt.getBoolean("cannonsEyes") ? "ARMED" : "DISARMED") + " <n>-<nh> " + ((entity.getData("skyhighocs:dyn/cannon_eyes_deploy_timer") > 0) || (entity.getData("skyhighocs:dyn/cannon_eyes_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            system.systemMessage(entity, "<n>Body: <nh>" + (nbt.getBoolean("cannonsBody") ? "ARMED" : "DISARMED") + " <n>-<nh> " + ((entity.getData("skyhighocs:dyn/cannon_body_deploy_timer") > 0) || (entity.getData("skyhighocs:dyn/cannon_body_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            system.systemMessage(entity, "<n>Arms: <nh>" + (nbt.getBoolean("cannonsArms") ? "ARMED" : "DISARMED") + " <n>-<nh> " + ((entity.getData("skyhighocs:dyn/blade_left_arm_deploy_timer") > 0) || (entity.getData("skyhighocs:dyn/blade_left_arm_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>cannons<e> command! Try <eh>!cannons help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>cannons<e> command! Try <eh>!cannons help<e> for a list of commands!");
      };
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/cannon_left_arm", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_right_arm", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_body", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_eyes", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_left_arm_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_right_arm_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_eyes_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_body_deployed", false);
    },
    tickHandler: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      var eyes = nbt.getBoolean("cannonsEyes") && entity.getData("fiskheroes:beam_charging");
      var body = nbt.getBoolean("cannonsBody") && entity.getData("fiskheroes:beam_charging");
      var arms = nbt.getBoolean("cannonsArms") && entity.getData("fiskheroes:beam_charging");
      if (entity.getData("fiskheroes:beam_charge") > 0) {
        manager.setData(entity, "skyhighocs:dyn/cannon_left_arm", arms);
        manager.setData(entity, "skyhighocs:dyn/cannon_right_arm", arms);
        manager.setData(entity, "skyhighocs:dyn/cannon_body", body);
        manager.setData(entity, "skyhighocs:dyn/cannon_eyes", eyes);
      };
    },
    fightOrFlight: function (entity, manager) {
      if (!entity.getWornHelmet().nbt().getBoolean("cannonsEyes") || !entity.getWornHelmet().nbt().getBoolean("cannonsBody") || !entity.getWornHelmet().nbt().getBoolean("cannonsArms")) {
        manager.setBoolean(entity.getWornHelmet().nbt(), "cannonsEyes", true);
        manager.setBoolean(entity.getWornHelmet().nbt(), "cannonsBody", true);
        manager.setBoolean(entity.getWornHelmet().nbt(), "cannonsArms", true);
        system.systemMessage(entity, "<n>Damage detected! Automatically armed <nh>cannons<n>!");
      };
    }
  };
};
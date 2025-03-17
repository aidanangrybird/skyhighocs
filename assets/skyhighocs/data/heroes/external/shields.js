/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "shields",
    type: 14,
    powers: ["skyhighocs:shields"],
    command: "shields",
    helpMessage: "<n>!shields <nh>-<n> Shields",
    disabledMessage: "<e>Module <eh>shields<e> is disabled!",
    keyBinds: function (hero) {
      hero.addKeyBind("SHIELDS", "Shields (None armed)", 2);
      hero.addKeyBind("SHIELD", "Shields", 2);
    },
    isKeyBindEnabled: function (entity, keyBind) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        var nbt = entity.getWornHelmet().nbt();
        var left = nbt.getBoolean("shieldsLeft");
        var right = nbt.getBoolean("shieldsRight");
        if (keyBind == "SHIELDS") {
          result = (!left && !right);
        };
        if (keyBind == "SHIELD") {
          result = (left || right);
        };
      };
      return result;
    },
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        var nbt = entity.getWornHelmet().nbt();
        switch (arguments[1]) {
          case "arm":
            switch (arguments[2]) {
              case "left":
                manager.setBoolean(nbt, "shieldsLeft", true);
                system.systemMessage(entity, "<s>Armed <sh>left arm<s> shield!");
                break;
              case "right":
                manager.setBoolean(nbt, "shieldsRight", true);
                system.systemMessage(entity, "<s>Armed <sh>right arm<s> shield!");
                break;
              case "*":
                manager.setBoolean(nbt, "shieldsLeft", true);
                manager.setBoolean(nbt, "shieldsRight", true);
                system.systemMessage(entity, "<s>Armed <sh>all<s> shields!");
                break;
            };
            break;
          case "disarm":
            switch (arguments[2]) {
              case "left":
                manager.setBoolean(nbt, "shieldsLeft", false);
                system.systemMessage(entity, "<s>Disarmed <sh>left arm<s> shield!");
                break;
              case "right":
                manager.setBoolean(nbt, "shieldsRight", false);
                system.systemMessage(entity, "<s>Disarmed <sh>right arm<s> shield!");
                break;
              case "*":
                manager.setBoolean(nbt, "shieldsLeft", false);
                manager.setBoolean(nbt, "shieldsRight", false);
                system.systemMessage(entity, "<s>Disarmed <sh>all<s> shields!");
                break;
            };
            break;
          case "deploy":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>left arm<s> shield!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>right arm<s> shield!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>all<s> shields!");
                break;
            };
            break;
          case "retract":
            switch (arguments[2]) {
              case "left":
                if (!nbt.getBoolean("shieldsLeft") && entity.getData("fiskheroes:shield_timer") > 0) {
                  manager.setData(entity, "skyhighocs:dyn/shield_left_arm_deployed", false);
                  system.systemMessage(entity, "<s>Retracted <sh>left arm<s> shield!");
                } else {
                  system.systemMessage(entity, "<e>Unable to retract armed <eh>left arm<e> shield!");
                };
                break;
              case "right":
                if (!nbt.getBoolean("shieldsRight") && entity.getData("fiskheroes:shield_timer") > 0) {
                  manager.setData(entity, "skyhighocs:dyn/shield_right_arm_deployed", false);
                  system.systemMessage(entity, "<s>Retracted <sh>right arm<s> shield!");
                } else {
                  system.systemMessage(entity, "<e>Unable to retract armed <eh>right arm<e> shield!");
                };
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm_deployed", false);
                system.systemMessage(entity, "<s>Retracted <sh>all<s> shields!");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Shields commands:");
            system.systemMessage(entity, "<n>!shields arm <left|right|*> <nh>-<n> Arms shields");
            system.systemMessage(entity, "<n>!shields disarm <left|right|*> <nh>-<n> Disarms shields");
            system.systemMessage(entity, "<n>!shields deploy <left|right|*> <nh>-<n> Deploys shields");
            system.systemMessage(entity, "<n>!shields retract <left|right|*> <nh>-<n> Retracts disarmed shields");
            system.systemMessage(entity, "<n>!shields help <nh>-<n> Shows shields commands");
            break;
          case "status":
            system.systemMessage(entity, "<n>Shields status:");
            system.systemMessage(entity, "<n>Left: <nh>" + (nbt.getBoolean("shieldsLeft") ? "ARMED" : "DISARMED"));
            system.systemMessage(entity, "<n>Right: <nh>" + (nbt.getBoolean("shieldsRight") ? "ARMED" : "DISARMED"));
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>shields<e> command! Try <eh>!shields help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>shields<e> command! Try <eh>!shields help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      var nbt = entity.getWornHelmet().nbt();
      var left = (nbt.getBoolean("shieldsLeft")) ? "T" : "F";
      var right = (nbt.getBoolean("shieldsRight")) ? "T" : "F";
      if (modifier.name() == "fiskheroes:shield") {
        if (modifier.id() == "shields_" + left + right) {
          result = true;
        };
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    initDamageProfiles: function (hero) {
      hero.addDamageProfile("SHIELD", {
        "types": {
          "BLUNT": 1.0
        }
      });
    },
    getDamageProfile: function (entity) {
      var result = null;
      if (!system.isModuleDisabled(entity, this.name)) {
        if (entity.getData("skyhighocs:dyn/shield_left_arm_timer") == 1 || entity.getData("skyhighocs:dyn/shield_right_arm_timer") == 1) {
          result = "SHIELD";
        };
      };
      return result;
    },
    initAttributeProfiles: function (hero) {
      hero.addAttributeProfile("SHIELD_LEFT_ARM", function (profile) {
        profile.inheritDefaults();
        profile.addAttribute("BASE_SPEED", -0.75, 1);
        profile.addAttribute("SPRINT_SPEED", 0.0, 0);
        profile.addAttribute("WEAPON_DAMAGE", -1.0, 1);
        profile.addAttribute("JUMP_HEIGHT", -1.0, 1);
        profile.addAttribute("STEP_HEIGHT", -1.0, 1);
        profile.addAttribute("KNOCKBACK", 0.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
      });
      hero.addAttributeProfile("SHIELD_RIGHT_ARM", function (profile) {
        profile.inheritDefaults();
        profile.addAttribute("BASE_SPEED", -0.75, 1);
        profile.addAttribute("SPRINT_SPEED", 0.0, 0);
        profile.addAttribute("WEAPON_DAMAGE", -1.0, 1);
        profile.addAttribute("JUMP_HEIGHT", -1.0, 1);
        profile.addAttribute("STEP_HEIGHT", -1.0, 1);
        profile.addAttribute("KNOCKBACK", 0.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
      });
      hero.addAttributeProfile("SHIELD_BOTH_ARMS", function (profile) {
        profile.inheritDefaults();
        profile.addAttribute("BASE_SPEED", -0.75, 1);
        profile.addAttribute("SPRINT_SPEED", 0.0, 0);
        profile.addAttribute("WEAPON_DAMAGE", -1.0, 1);
        profile.addAttribute("JUMP_HEIGHT", -1.0, 1);
        profile.addAttribute("STEP_HEIGHT", -1.0, 1);
        profile.addAttribute("KNOCKBACK", 0.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
      });
    },
    getAttributeProfile: function (entity) {
      var result = null;
      if (!system.isModuleDisabled(entity, this.name)) {
        if (entity.getData("fiskheroes:shield_blocking_timer") > 0 && entity.getData("skyhighocs:dyn/shield_left_arm_timer") == 1) {
          result = "SHIELD_LEFT_ARM";
        };
        if (entity.getData("fiskheroes:shield_blocking_timer") > 0 && entity.getData("skyhighocs:dyn/shield_right_arm_timer") == 1) {
          result = "SHIELD_RIGHT_ARM";
        };
        if (entity.getData("fiskheroes:shield_blocking_timer") > 0 && entity.getData("skyhighocs:dyn/shield_left_arm_timer") == 1 && entity.getData("skyhighocs:dyn/shield_right_arm_timer") == 1) {
          result = "SHIELD_BOTH_ARMS";
        };
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/shield_left_arm", false);
      manager.setData(entity, "skyhighocs:dyn/shield_right_arm", false);
      manager.setData(entity, "skyhighocs:dyn/shield_left_arm_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/shield_right_arm_deployed", false);
    },
    tickHandler: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      var left = nbt.getBoolean("shieldsLeft") && entity.getData("fiskheroes:shield");
      var right = nbt.getBoolean("shieldsRight") && entity.getData("fiskheroes:shield");
      if (entity.getData("fiskheroes:shield_timer") > 0) {
        manager.setData(entity, "skyhighocs:dyn/shield_left_arm", left);
        manager.setData(entity, "skyhighocs:dyn/shield_right_arm", right);
      };
    }
  };
};
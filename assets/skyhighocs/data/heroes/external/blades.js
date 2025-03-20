/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "blades",
    type: 14,
    powers: ["skyhighocs:blades"],
    command: "blades",
    helpMessage: "<n>!blades <nh>-<n> Blades",
    disabledMessage: "<e>Module <eh>bladeSystem<e> is disabled!",
    keyBinds: function (hero) {
      hero.addKeyBind("BLADES", "Blades (None armed)", 1);
      hero.addKeyBind("BLADE", "Blades", 1);
    },
    isKeyBindEnabled: function (entity, keyBind) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        var nbt = entity.getWornHelmet().nbt();
        var left = nbt.getBoolean("bladesLeft");
        var right = nbt.getBoolean("bladesRight");
        if (keyBind == "BLADES" && !entity.isSneaking() && entity.getData("fiskheroes:tentacles") == null) {
          result = (!left && !right);
        };
        if (keyBind == "BLADE" && !entity.isSneaking() && entity.getData("fiskheroes:tentacles") == null) {
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
                manager.setBoolean(nbt, "bladesLeft", true);
                system.systemMessage(entity, "<s>Armed <sh>left arm<s> blade!");
                break;
              case "right":
                manager.setBoolean(nbt, "bladesRight", true);
                system.systemMessage(entity, "<s>Armed <sh>right arm<s> blade!");
                break;
              case "*":
                manager.setBoolean(nbt, "bladesLeft", true);
                manager.setBoolean(nbt, "bladesRight", true);
                system.systemMessage(entity, "<s>Armed <sh>all<s> blades!");
                break;
            };
            break;
          case "disarm":
            switch (arguments[2]) {
              case "left":
                manager.setBoolean(nbt, "bladesLeft", false);
                system.systemMessage(entity, "<s>Disarmed <sh>left arm<s> blade!");
                break;
              case "right":
                manager.setBoolean(nbt, "bladesRight", false);
                system.systemMessage(entity, "<s>Disarmed <sh>right arm<s> blade!");
                break;
              case "*":
                manager.setBoolean(nbt, "bladesLeft", false);
                manager.setBoolean(nbt, "bladesRight", false);
                system.systemMessage(entity, "<s>Disarmed <sh>all<s> blades!");
                break;
            };
            break;
          case "deploy":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/blade_left_arm_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>left arm<s> blade!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/blade_right_arm_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>right arm<s> blade!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/blade_left_arm_deployed", true);
                manager.setData(entity, "skyhighocs:dyn/blade_right_arm_deployed", true);
                system.systemMessage(entity, "<s>Deployed <sh>all<s> blades!");
                break;
            };
            break;
          case "retract":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/blade_left_arm_deployed", false);
                system.systemMessage(entity, "<s>Retracted <sh>left arm<s> blade!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/blade_right_arm_deployed", false);
                system.systemMessage(entity, "<s>Retracted <sh>right arm<s> blade!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/blade_left_arm_deployed", false);
                manager.setData(entity, "skyhighocs:dyn/blade_right_arm_deployed", false);
                system.systemMessage(entity, "<s>Retracted <sh>all<s> blades!");
                break;
            };
            break;
          case "stealthOn":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", true);
                system.systemMessage(entity, "<s>Enabled stealth mode on <sh>left arm<s> blade!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", true);
                system.systemMessage(entity, "<s>Enabled stealth mode on <sh>right arm<s> blade!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", true);
                manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", true);
                system.systemMessage(entity, "<s>Enabled stealth mode on <sh>all<s> blades!");
                break;
            };
            break;
          case "stealthOff":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", false);
                system.systemMessage(entity, "<s>Disabled stealth mode on <sh>left arm<s> blade!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", false);
                system.systemMessage(entity, "<s>Disabled stealth mode on <sh>right arm<s> blade!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", false);
                manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", false);
                system.systemMessage(entity, "<s>Disabled stealth mode on <sh>all<s> blades!");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Blades commands:");
            system.systemMessage(entity, "<n>!blades arm <left|right|*> <nh>-<n> Arms blades");
            system.systemMessage(entity, "<n>!blades disarm <left|right|*> <nh>-<n> Disarms blades");
            system.systemMessage(entity, "<n>!blades deploy <left|right|*> <nh>-<n> Deploys blades");
            system.systemMessage(entity, "<n>!blades retract <left|right|*> <nh>-<n> Retracts disarmed blades");
            system.systemMessage(entity, "<n>!blades retract <left|right|*> <nh>-<n> Retracts disarmed blades");
            system.systemMessage(entity, "<n>!blades help <nh>-<n> Shows blades commands");
            break;
          case "status":
            system.systemMessage(entity, "<n>Blades status:");
            system.systemMessage(entity, "<n>Left: <nh>" + (nbt.getBoolean("bladesLeft") ? "ARMED" : "DISARMED"));
            system.systemMessage(entity, "<n>Right: <nh>" + (nbt.getBoolean("bladesRight") ? "ARMED" : "DISARMED"));
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>blades<e> command! Try <eh>!blades help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>blades<e> command! Try <eh>!blades help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        if (modifier.name() == "fiskheroes:blade") {
          result = true;
        };
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    initDamageProfiles: function (hero) {
      hero.addDamageProfile("BLADE", {
        "types": {
          "SHARP": 1.0
        }
      });
    },
    getDamageProfile: function (entity) {
      var result = null;
      if (!system.isModuleDisabled(entity, this.name)) {
        if (entity.getData("skyhighocs:dyn/blade_left_arm_timer") == 1 || entity.getData("skyhighocs:dyn/blade_right_arm_timer") == 1) {
          result = "BLADE";
        };
      };
      return result;
    },
    initAttributeProfiles: function (hero) {
      hero.addAttributeProfile("BLADE_LEFT_ARM", function (profile) {
        profile.inheritDefaults();
        profile.addAttribute("SPRINT_SPEED", 0.5, 1);
        profile.addAttribute("KNOCKBACK", 5.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", 9.5, 0);
      });
      hero.addAttributeProfile("BLADE_RIGHT_ARM", function (profile) {
        profile.inheritDefaults();
        profile.addAttribute("SPRINT_SPEED", 0.5, 1);
        profile.addAttribute("KNOCKBACK", 5.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", 9.5, 0);
      });
      hero.addAttributeProfile("BLADE_BOTH_ARMS", function (profile) {
        profile.inheritDefaults();
        profile.addAttribute("SPRINT_SPEED", 0.5, 1);
        profile.addAttribute("KNOCKBACK", 5.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", 14.5, 0);
      });
    },
    getAttributeProfile: function (entity) {
      var result = null;
      if (!system.isModuleDisabled(entity, this.name)) {
        if (entity.getData("skyhighocs:dyn/blade_left_arm_timer") == 1) {
          result = "BLADE_LEFT_ARM";
        };
        if (entity.getData("skyhighocs:dyn/blade_right_arm_timer") == 1) {
          result = "BLADE_RIGHT_ARM";
        };
        if (entity.getData("skyhighocs:dyn/blade_left_arm_timer") == 1 && entity.getData("skyhighocs:dyn/blade_right_arm_timer") == 1) {
          result = "BLADE_BOTH_ARMS";
        };
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/blade_left_arm", false);
      manager.setData(entity, "skyhighocs:dyn/blade_right_arm", false);
      manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", false);
      manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", false);
      manager.setData(entity, "skyhighocs:dyn/blade_left_arm_deployed", false);
      manager.setData(entity, "skyhighocs:dyn/blade_right_arm_deployed", false);
    },
    tickHandler: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      var left = nbt.getBoolean("bladesLeft") && entity.getData("fiskheroes:blade");
      var right = nbt.getBoolean("bladesRight") && entity.getData("fiskheroes:blade");
      if (entity.getData("fiskheroes:blade_timer") > 0) {
        manager.setData(entity, "skyhighocs:dyn/blade_left_arm", left);
        manager.setData(entity, "skyhighocs:dyn/blade_right_arm", right);
      };
    },
  };
};
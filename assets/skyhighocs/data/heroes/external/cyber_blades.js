/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "bladeSystem",
    type: 14,
    powers: ["skyhighocs:cyber_blades"],
    command: "blades",
    helpMessage: "<n>!blades <nh>-<n> Blades",
    disabledMessage: "<e>Module <eh>bladeSystem<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 5) {
        switch(arguments[1]) {
          case "on":
            switch (arguments[2]) {
              case "left":
                (arguments.length == 4 && arguments[3] == "stealth") ? manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", true) : manager.setData(entity, "skyhighocs:dyn/blade_left_arm", true);
                break;
              case "right":
                (arguments.length == 4 && arguments[3] == "stealth") ? manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", true) : manager.setData(entity, "skyhighocs:dyn/blade_right_arm", true);
                break;
              case "*":
                (arguments.length == 4 && arguments[3] == "stealth") ? manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", true) : manager.setData(entity, "skyhighocs:dyn/blade_left_arm", true);
                (arguments.length == 4 && arguments[3] == "stealth") ? manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", true) : manager.setData(entity, "skyhighocs:dyn/blade_right_arm", true);
                break;
              case "help":
                system.systemMessage(entity, "<n>Blade activate commands:");
                system.systemMessage(entity, "<n>!blades on * <nh>-<n> Activates both blades");
                system.systemMessage(entity, "<n>!blades on left <nh>-<n> Activates left blade");
                system.systemMessage(entity, "<n>!blades on right <nh>-<n> Activates right blade");
                system.systemMessage(entity, "<n>!blades on help <nh>-<n> Shows Blade activate commands");
                system.systemMessage(entity, "<n>!blades help <nh>-<n> Shows Blades commands");
                break;
            };
            break;
          case "off":
            switch (arguments[2]) {
              case "left":
                (arguments.length == 4 && arguments[3] == "stealth") ? manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", false) : manager.setData(entity, "skyhighocs:dyn/blade_left_arm", false);
                break;
              case "right":
                (arguments.length == 4 && arguments[3] == "stealth") ? manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", false) : manager.setData(entity, "skyhighocs:dyn/blade_right_arm", false);
                break;
              case "*":
                (arguments.length == 4 && arguments[3] == "stealth") ? manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", false) : manager.setData(entity, "skyhighocs:dyn/blade_left_arm", false);
                (arguments.length == 4 && arguments[3] == "stealth") ? manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", false) : manager.setData(entity, "skyhighocs:dyn/blade_right_arm", false);
                break;
              case "help":
                system.systemMessage(entity, "<n>Blade deactivate commands:");
                system.systemMessage(entity, "<n>!blades on * <nh>-<n> Deactivates both blades");
                system.systemMessage(entity, "<n>!blades on left <nh>-<n> Deactivates left blade");
                system.systemMessage(entity, "<n>!blades on right <nh>-<n> Deactivates right blade");
                system.systemMessage(entity, "<n>!blades on help <nh>-<n> Shows Blade deactivate commands");
                system.systemMessage(entity, "<n>!blades help <nh>-<n> Shows Blades commands");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Blades commands:");
            system.systemMessage(entity, "<n>!blades on help <nh>-<n> Shows Blade activate commands");
            system.systemMessage(entity, "<n>!blades off help <nh>-<n> Shows Blade deactivate commands");
            system.systemMessage(entity, "<n>!blades help <nh>-<n> Shows blades commands");
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
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    isModifierDisabled: function (entity, modifier) {
      result = false;
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
    getDamageProfiles: function (entity) {
      var result = null;
      if (entity.getData("skyhighocs:dyn/blade_left_arm_timer") == 1 || entity.getData("skyhighocs:dyn/blade_right_arm_timer") == 1) {
        result = "BLADE";
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
    getAttributeProfiles: function (entity) {
      if (entity.getData("skyhighocs:dyn/blade_left_arm_timer") == 1) {
        return "BLADE_LEFT_ARM";
      };
      if (entity.getData("skyhighocs:dyn/blade_right_arm_timer") == 1) {
        return "BLADE_RIGHT_ARM";
      };
      if (entity.getData("skyhighocs:dyn/blade_left_arm_timer") == 1 && entity.getData("skyhighocs:dyn/blade_right_arm_timer") == 1) {
        return "BLADE_BOTH_ARMS";
      };
      if (entity.getData("skyhighocs:dyn/blade_left_arm_timer") < 1 && entity.getData("skyhighocs:dyn/blade_right_arm_timer") < 1) {
        return null;
      };
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/blade_left_arm", false);
      manager.setData(entity, "skyhighocs:dyn/blade_left_arm_stealth", false);
      manager.setData(entity, "skyhighocs:dyn/blade_right_arm", false);
      manager.setData(entity, "skyhighocs:dyn/blade_right_arm_stealth", false);
    }
  };
};
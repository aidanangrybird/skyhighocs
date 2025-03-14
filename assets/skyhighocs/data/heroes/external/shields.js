/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //All of the required functions and stuff go here
  return {
    name: "shieldSystem",
    type: 14,
    powers: ["skyhighocs:shields"],
    command: "shields",
    helpMessage: "<n>!shields <nh>-<n> Shields",
    disabledMessage: "<e>Module <eh>shieldSystem<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 5) {
        switch(arguments[1]) {
          case "on":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm", true);
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm", true);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm", true);
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm", true);
                break;
              case "help":
                system.systemMessage(entity, "<n>Shield activate commands:");
                system.systemMessage(entity, "<n>!shields on * <nh>-<n> Activates both shields");
                system.systemMessage(entity, "<n>!shields on left <nh>-<n> Activates left shield");
                system.systemMessage(entity, "<n>!shields on right <nh>-<n> Activates right shield");
                system.systemMessage(entity, "<n>!shields on help <nh>-<n> Shows Shield activate commands");
                system.systemMessage(entity, "<n>!shields help <nh>-<n> Shows Shields commands");
                break;
            };
            break;
          case "off":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm", false);
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm", false);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/shield_left_arm", false);
                manager.setData(entity, "skyhighocs:dyn/shield_right_arm", false);
                break;
              case "help":
                system.systemMessage(entity, "<n>Shield deactivate commands:");
                system.systemMessage(entity, "<n>!shields on * <nh>-<n> Deactivates both shields");
                system.systemMessage(entity, "<n>!shields on left <nh>-<n> Deactivates left shield");
                system.systemMessage(entity, "<n>!shields on right <nh>-<n> Deactivates right shield");
                system.systemMessage(entity, "<n>!shields on help <nh>-<n> Shows Shield deactivate commands");
                system.systemMessage(entity, "<n>!shields help <nh>-<n> Shows Shields commands");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Shields commands:");
            system.systemMessage(entity, "<n>!shields on help <nh>-<n> Shows Shield activate commands");
            system.systemMessage(entity, "<n>!shields off help <nh>-<n> Shows Shield deactivate commands");
            system.systemMessage(entity, "<n>!shields help <nh>-<n> Shows shields commands");
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
      if (!system.isModuleDisabled(entity, this.name)) {
        if (modifier.name() == "fiskheroes:shield") {
          result = true;
        };
        if (modifier.name() == "fiskheroes:transformation") {
          result = true;
        };
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
    getDamageProfiles: function (entity) {
      var result = null;
      if (entity.getData("skyhighocs:dyn/shield_left_arm_timer") == 1 || entity.getData("skyhighocs:dyn/shield_right_arm_timer") == 1) {
        result = "SHIELD";
      };
      return result;
    },
    initAttributeProfiles: function (hero) {
      hero.addAttributeProfile("SHIELD_LEFT_ARM", function (profile) {
        profile.inheritDefaults();
        profile.addAttribute("SPRINT_SPEED", 0.5, 1);
        profile.addAttribute("KNOCKBACK", 5.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", 9.5, 0);
      });
      hero.addAttributeProfile("SHIELD_RIGHT_ARM", function (profile) {
        profile.inheritDefaults();
        profile.addAttribute("SPRINT_SPEED", 0.5, 1);
        profile.addAttribute("KNOCKBACK", 5.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", 9.5, 0);
      });
      hero.addAttributeProfile("SHIELD_BOTH_ARMS", function (profile) {
        profile.inheritDefaults();
        profile.addAttribute("SPRINT_SPEED", 0.5, 1);
        profile.addAttribute("KNOCKBACK", 5.0, 0);
        profile.addAttribute("PUNCH_DAMAGE", 14.5, 0);
      });
    },
    getAttributeProfiles: function (entity) {
      if (entity.getData("skyhighocs:dyn/shield_left_arm_timer") == 1) {
        return "SHIELD_LEFT_ARM";
      };
      if (entity.getData("skyhighocs:dyn/shield_right_arm_timer") == 1) {
        return "SHIELD_RIGHT_ARM";
      };
      if (entity.getData("skyhighocs:dyn/shield_left_arm_timer") == 1 && entity.getData("skyhighocs:dyn/shield_right_arm_timer") == 1) {
        return "SHIELD_BOTH_ARMS";
      };
      if (entity.getData("skyhighocs:dyn/shield_left_arm_timer") < 1 && entity.getData("skyhighocs:dyn/shield_right_arm_timer") < 1) {
        return null;
      };
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/shield_left_arm", false);
      manager.setData(entity, "skyhighocs:dyn/shield_right_arm", false);
    }
  };
};
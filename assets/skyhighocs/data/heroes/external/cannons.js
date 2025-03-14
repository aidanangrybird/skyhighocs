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
      hero.addKeyBindFunc("CANNON_SWITCH", (player, manager) => {
        manager.setData(player, "skyhighocs:dyn/cannon_type", player.getData("skyhighocs:dyn/cannon_type") + 1);
        if (player.getData("skyhighocs:dyn/cannon_type") > 3) {
          manager.setData(player, "skyhighocs:dyn/cannon_type", 0);
        };
        return true;
      }, "Switch beam type", 3);
      hero.addKeyBind("CANNONS", "Cannons", 3);
      hero.addKeyBind("CHARGED_BEAM", "Charged Beam", 3);
      hero.addKeyBind("HEAT_VISION", "Heat Vision", 3);
      hero.addKeyBind("ENERGY_PROJECTION", "Energy Projection", 3);
      hero.addKeyBind("EYE_CANNONS", "Eye Cannons", 3);
      hero.addKeyBind("BODY_CANNONS", "Body Cannons", 3);
      hero.addKeyBind("LEFT_ARM_CANNON", "Left Arm Cannon", 3);
      hero.addKeyBind("RIGHT_ARM_CANNON", "Right Arm Cannon", 3);
    },
    isKeyBindEnabled: function (entity, keyBind) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        var nbt = entity.getWornHelmet().nbt();
        var eyes = (nbt.getByte("cannonsEyes") == entity.getData("skyhighocs:dyn/cannon_type"));
        var body = (nbt.getByte("cannonsBody") == entity.getData("skyhighocs:dyn/cannon_type"));
        var arms = (nbt.getByte("cannonsArms") == entity.getData("skyhighocs:dyn/cannon_type"));
        var eyesOn = (nbt.getByte("cannonsEyes") == entity.getData("skyhighocs:dyn/cannon_type")) && (entity.getData("skyhighocs:dyn/cannon_eyes_timer") == 1);
        var bodyOn = (nbt.getByte("cannonsBody") == entity.getData("skyhighocs:dyn/cannon_type")) && (entity.getData("skyhighocs:dyn/cannon_body_timer") == 1);
        var armsOn = (nbt.getByte("cannonsArms") == entity.getData("skyhighocs:dyn/cannon_type")) && (entity.getData("skyhighocs:dyn/cannon_left_arm_timer") == 1 && entity.getData("skyhighocs:dyn/cannon_right_arm_timer") == 1);
        if (keyBind == "CANNON_SWITCH") {
          result = entity.isSneaking();
        };
        if (!entity.isSneaking()) {
          if (keyBind == "CANNONS") {
            result = true;
          };
          if (keyBind == "HEAT_VISION") {
            result = eyesOn || bodyOn || armsOn;
          };
          if (keyBind == "CHARGED_BEAM") {
            result = eyesOn || bodyOn || armsOn;
          };
          if (keyBind == "ENERGY_PROJECTION") {
            result = eyesOn || bodyOn || armsOn;
          };
          if (keyBind == "EYE_CANNONS") {
            result = eyes;
          };
          if (keyBind == "BODY_CANNONS") {
            result = body;
          };
          if (keyBind == "LEFT_ARM_CANNON") {
            result = arms;
          };
          if (keyBind == "RIGHT_ARM_CANNON") {
            result = arms;
          };
        };
      };
      return result;
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
        var nbt = entity.getWornHelmet().nbt();
        var eyes = (nbt.getByte("cannonsEyes") == entity.getData("skyhighocs:dyn/cannon_type")) ? "T" : "F";
        var body = (nbt.getByte("cannonsBody") == entity.getData("skyhighocs:dyn/cannon_type")) ? "T" : "F";
        var arms = (nbt.getByte("cannonsArms") == entity.getData("skyhighocs:dyn/cannon_type")) ? "T" : "F";
        if (modifier.name() == "fiskheroes:heat_vision") {
          if (modifier.id() == "cannons_" + eyes + body + arms) {
            result = true;
          };
        };
        if (modifier.name() == "fiskheroes:charged_beam") {
          if (modifier.id() == "cannons_" + eyes + body + arms) {
            result = true;
          };
        };
        if (modifier.name() == "fiskheroes:energy_projection") {
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
          case "eyes":
            switch (arguments[2]) {
              case "charged":
                manager.setByte(nbt, "cannonsEyes", 0);
                system.systemMessage(entity, "<n>Will set eyes to charged beam!");
                break;
              case "heat":
                manager.setByte(nbt, "cannonsEyes", 1);
                system.systemMessage(entity, "<n>Will set eyes to heat vision!");
                break;
              case "engproj":
                manager.setByte(nbt, "cannonsEyes", 2);
                system.systemMessage(entity, "<n>Will set eyes to energy projection!");
                break;
              case "help":
                system.systemMessage(entity, "<n>Eye cannons commands:");
                system.systemMessage(entity, "<n>!cannons eyes charged <nh>-<n> Sets eye cannons to charged beam!");
                system.systemMessage(entity, "<n>!cannons eyes heat <nh>-<n> Sets eye cannons to heat vision!");
                system.systemMessage(entity, "<n>!cannons eyes engproj <nh>-<n> Sets eye cannons to energy projection!");
                system.systemMessage(entity, "<n>!cannons eyes help <nh>-<n> Shows eye cannons commands");
                system.systemMessage(entity, "<n>!cannons help <nh>-<n> Shows cannons commands");
                break;
            };
            break;
          case "arms":
            switch (arguments[2]) {
              case "charged":
                manager.setByte(nbt, "cannonsArms", 0);
                system.systemMessage(entity, "<n>Will set arms to charged beam!");
                break;
              case "heat":
                manager.setByte(nbt, "cannonsArms", 1);
                system.systemMessage(entity, "<n>Will set arms to heat vision!");
                break;
              case "engproj":
                manager.setByte(nbt, "cannonsArms", 2);
                system.systemMessage(entity, "<n>Will set arms to energy projection!");
                break;
              case "help":
                system.systemMessage(entity, "<n>Arm cannons commands:");
                system.systemMessage(entity, "<n>!cannons arms charged <nh>-<n> Sets arm cannons to charged beam!");
                system.systemMessage(entity, "<n>!cannons arms heat <nh>-<n> Sets arm cannons to heat vision!");
                system.systemMessage(entity, "<n>!cannons arms engproj <nh>-<n> Sets arm cannons to energy projection!");
                system.systemMessage(entity, "<n>!cannons arms help <nh>-<n> Shows arm cannons commands");
                system.systemMessage(entity, "<n>!cannons help <nh>-<n> Shows cannons commands");
                break;
            };
            break;
          case "body":
            switch (arguments[2]) {
              case "charged":
                manager.setByte(nbt, "cannonsBody", 0);
                system.systemMessage(entity, "<n>Will set body to charged beam!");
                break;
              case "heat":
                manager.setByte(nbt, "cannonsBody", 1);
                system.systemMessage(entity, "<n>Will set body to heat vision!");
                break;
              case "engproj":
                manager.setByte(nbt, "cannonsBody", 2);
                system.systemMessage(entity, "<n>Will set body to energy projection!");
                break;
              case "help":
                system.systemMessage(entity, "<n>Body cannons commands:");
                system.systemMessage(entity, "<n>!cannons body charged <nh>-<n> Sets body cannons to charged beam!");
                system.systemMessage(entity, "<n>!cannons body heat <nh>-<n> Sets body cannons to heat vision!");
                system.systemMessage(entity, "<n>!cannons body engproj <nh>-<n> Sets body cannons to energy projection!");
                system.systemMessage(entity, "<n>!cannons body help <nh>-<n> Shows body cannons commands");
                system.systemMessage(entity, "<n>!cannons help <nh>-<n> Shows cannons commands");
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Cannons commands:");
            system.systemMessage(entity, "<n>!cannons eyes help <nh>-<n> Shows cannon eye commands");
            system.systemMessage(entity, "<n>!cannons arms help <nh>-<n> Shows cannon arm commands");
            system.systemMessage(entity, "<n>!cannons body help <nh>-<n> Shows cannon body commands");
            system.systemMessage(entity, "<n>!cannons help <nh>-<n> Shows cannons commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>comms<e> command! Try <eh>!cannons help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>comms<e> command! Try <eh>!cannons help<e> for a list of commands!");
      };
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/cannon_left_arm", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_right_arm", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_body", false);
      manager.setData(entity, "skyhighocs:dyn/cannon_eyes", false);
    }
  };
};
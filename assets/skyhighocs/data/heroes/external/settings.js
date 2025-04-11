/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "settings",
    moduleMessageName: "Settings",
    type: 1,
    command: "set",
    helpMessage: "<n>!set <nh>-<n> Settings",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        var nbt = entity.getWornHelmet().nbt();
        switch(arguments[1]) {
          case "fightOrFlightDur":
            manager.setShort(nbt, "durationFightOrFlight", parseInt(arguments[2]));
            system.moduleMessage(this, entity, "<n>Fight or Flight duration set to <nh>" + nbt.getShort("durationFightOrFlight") + "<n>!");
            break;
          case "fightOrFlightMin":
            manager.setInteger(nbt, "minHealthFightOrFlight", parseInt(arguments[2]));
            system.moduleMessage(this, entity, "<n>Fight or Flight min health set to <nh>" + nbt.getShort("minHealthFightOrFlight") + "<n>!");
            break;
          case "naturalArms":
            manager.setBoolean(nbt, "naturalArms", ((arguments[2] == "true") ? true : (arguments[2] == "false") ? false : nbt.getBoolean("naturalArms")));
            system.moduleMessage(this, entity, "<n>Natural arms set to <nh>" + nbt.getBoolean("naturalArms") + "<n>!");
            break;
          case "aliasActive":
            manager.setBoolean(nbt, "aliasActive", ((arguments[2] == "true") ? true : (arguments[2] == "false") ? false : nbt.getBoolean("aliasActive")));
            system.moduleMessage(this, entity, "<n>Alias active set to <nh>" + nbt.getBoolean("aliasActive") + "<n>!");
            break;
          case "nightVision":
            manager.setBoolean(nbt, "nightVision", ((arguments[2] == "true") ? true : (arguments[2] == "false") ? false : nbt.getBoolean("nightVision")));
            system.moduleMessage(this, entity, "<n>Night vision set to <nh>" + nbt.getBoolean("nightVision") + "<n>!");
            break;
          case "innerRockets":
            manager.setBoolean(nbt, "innerRockets", ((arguments[2] == "true") ? true : (arguments[2] == "false") ? false : nbt.getBoolean("innerRockets")));
            system.moduleMessage(this, entity, "<n>Inner rockets set to <nh>" + nbt.getBoolean("innerRockets") + "<n>!");
            break;
          case "flushEyeCannons":
            manager.setBoolean(nbt, "flushLeftEyeCannon", ((arguments[2] == "true") ? true : (arguments[2] == "false") ? false : nbt.getBoolean("flushLeftEyeCannon")));
            system.moduleMessage(this, entity, "<n>Flush left eye cannon set to <nh>" + nbt.getBoolean("flushEyeCannons") + "<n>!");
            break;
          case "flushLeftArmCannon":
            manager.setBoolean(nbt, "flushLeftArmCannon", ((arguments[2] == "true") ? true : (arguments[2] == "false") ? false : nbt.getBoolean("flushLeftArmCannon")));
            system.moduleMessage(this, entity, "<n>Flush left arm cannon set to <nh>" + nbt.getBoolean("flushLeftArmCannon") + "<n>!");
            break;
          case "flushRightArmCannon":
            manager.setBoolean(nbt, "flushRightArmCannon", ((arguments[2] == "true") ? true : (arguments[2] == "false") ? false : nbt.getBoolean("flushRightArmCannon")));
            system.moduleMessage(this, entity, "<n>Flush right arm cannon set to <nh>" + nbt.getBoolean("flushRightArmCannon") + "<n>!");
            break;
          case "flushMouth":
            manager.setBoolean(nbt, "flushMouth", ((arguments[2] == "true") ? true : (arguments[2] == "false") ? false : nbt.getBoolean("flushMouth")));
            system.moduleMessage(this, entity, "<n>Flush mouth set to <nh>" + nbt.getBoolean("flushMouth") + "<n>!");
            break;
          case "list":
            system.moduleMessage(this, entity, "<n>Fight or Flight duration: <nh>" + nbt.getShort("durationFightOrFlight"));
            system.moduleMessage(this, entity, "<n>Fight or Flight min health: <nh>" + nbt.getShort("minHealthFightOrFlight"));
            system.moduleMessage(this, entity, "<n>Natural arms: <nh>" + nbt.getBoolean("naturalArms"));
            system.moduleMessage(this, entity, "<n>Alias active: <nh>" + nbt.getBoolean("aliasActive"));
            system.moduleMessage(this, entity, "<n>Night vision active: <nh>" + nbt.getBoolean("nightVision"));
            system.moduleMessage(this, entity, "<n>Inner inner rockets: <nh>" + nbt.getBoolean("innerRockets"));
            system.moduleMessage(this, entity, "<n>Flush eye cannons: <nh>" + nbt.getBoolean("flushEyeCannons"));
            system.moduleMessage(this, entity, "<n>Flush left arm cannon: <nh>" + nbt.getBoolean("flushLeftArmCannon"));
            system.moduleMessage(this, entity, "<n>Flush right arm cannon: <nh>" + nbt.getBoolean("flushRightArmCannon"));
            system.moduleMessage(this, entity, "<n>Flush mouth: <nh>" + nbt.getBoolean("flushMouth"));
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Settings commands:");
            system.moduleMessage(this, entity, "<n>!set list <nh>-<n> Lists current settings and their values");
            system.moduleMessage(this, entity, "<n>!set fightOrFlightDur <number> <nh>-<n> Sets duration of fight or flight response");
            system.moduleMessage(this, entity, "<n>!set fightOrFlightMin <number> <nh>-<n> Sets minimum health to activate fight or flight");
            system.moduleMessage(this, entity, "<n>!set naturalArms <true|false> <nh>-<n> Sets if natural arm movement is not supressed");
            system.moduleMessage(this, entity, "<n>!set aliasActive <true|false> <nh>-<n> Sets if alias name appears above head");
            system.moduleMessage(this, entity, "<n>!set nightVision <true|false> <nh>-<n> Sets if night is active");
            system.moduleMessage(this, entity, "<n>!set innerRockets <true|false> <nh>-<n> ");
            system.moduleMessage(this, entity, "<n>!set flushEyeCannons <true|false> <nh>-<n> ");
            system.moduleMessage(this, entity, "<n>!set flushLeftArmCannon <true|false> <nh>-<n> ");
            system.moduleMessage(this, entity, "<n>!set flushRightArmCannon <true|false> <nh>-<n> ");
            system.moduleMessage(this, entity, "<n>!set flushMouth <true|false> <nh>-<n> ");
            system.moduleMessage(this, entity, "<n>!set help <nh>-<n> Shows this list");
            break;
          default:
            system.moduleMessage(this, entity, "<e>Unknown <eh>settings<e> command! Try <eh>!set help<e> for a list of commands!");
            break;
        };
      } else {
        system.moduleMessage(this, entity, "<e>Unknown <eh>settings<e> command! Try <eh>!set help<e> for a list of commands!");
      };
    },
  };
};
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
    commandHandler: function (entity, manager, argList) {
      if (argList.length > 1 && argList.length < 4) {
        var nbt = entity.getWornLeggings().nbt();
        switch(argList[1]) {
          case "leftEyeHuman":
            manager.setBoolean(nbt, "leftEyeHuman", ((argList[2] == "true") ? true : (argList[2] == "false") ? false : nbt.getBoolean("leftEyeHuman")));
            system.moduleMessage(this, entity, "<n>leftEyeHuman set to <nh>" + nbt.getBoolean("leftEyeHuman") + "<n>!");
            break;
          case "rightEyeHuman":
            manager.setBoolean(nbt, "rightEyeHuman", ((argList[2] == "true") ? true : (argList[2] == "false") ? false : nbt.getBoolean("rightEyeHuman")));
            system.moduleMessage(this, entity, "<n>rightEyeHuman set to <nh>" + nbt.getBoolean("rightEyeHuman") + "<n>!");
            break;
          case "leftEyeGlow":
            manager.setBoolean(nbt, "leftEyeGlow", ((argList[2] == "true") ? true : (argList[2] == "false") ? false : nbt.getBoolean("leftEyeGlow")));
            system.moduleMessage(this, entity, "<n>leftEyeGlow set to <nh>" + nbt.getBoolean("leftEyeGlow") + "<n>!");
            break;
          case "rightEyeGlow":
            manager.setBoolean(nbt, "rightEyeGlow", ((argList[2] == "true") ? true : (argList[2] == "false") ? false : nbt.getBoolean("rightEyeGlow")));
            system.moduleMessage(this, entity, "<n>rightEyeGlow set to <nh>" + nbt.getBoolean("rightEyeHuman") + "<n>!");
            break;
          case "hudRange":
            manager.setShort(nbt, "hudRange", parseInt(argList[2]));
            system.moduleMessage(this, entity, "<n>hudRange set to <nh>" + nbt.getShort("hudRange") + "<n>!");
            break;
          case "friendliesOnHud":
            manager.setBoolean(nbt, "friendliesOnHud", ((argList[2] == "true") ? true : (argList[2] == "false") ? false : nbt.getBoolean("friendliesOnHud")));
            system.moduleMessage(this, entity, "<n>friendliesOnHud set to <nh>" + nbt.getBoolean("friendliesOnHud") + "<n>!");
            break;
          case "hostilesOnHud":
            manager.setBoolean(nbt, "hostilesOnHud", ((argList[2] == "true") ? true : (argList[2] == "false") ? false : nbt.getBoolean("hostilesOnHud")));
            system.moduleMessage(this, entity, "<n>hostilesOnHud set to <nh>" + nbt.getBoolean("hostilesOnHud") + "<n>!");
            break;
          case "playersOnHud":
            manager.setBoolean(nbt, "playersOnHud", ((argList[2] == "true") ? true : (argList[2] == "false") ? false : nbt.getBoolean("playersOnHud")));
            system.moduleMessage(this, entity, "<n>playersOnHud set to <nh>" + nbt.getBoolean("playersOnHud") + "<n>!");
            break;
          case "list":
            system.moduleMessage(this, entity, "<n>leftEyeHuman: <nh>" + nbt.getBoolean("leftEyeHuman"));
            system.moduleMessage(this, entity, "<n>rightEyeHuman: <nh>" + nbt.getBoolean("rightEyeHuman"));
            system.moduleMessage(this, entity, "<n>leftEyeGlow: <nh>" + nbt.getBoolean("leftEyeGlow"));
            system.moduleMessage(this, entity, "<n>rightEyeGlow: <nh>" + nbt.getBoolean("rightEyeGlow"));
            system.moduleMessage(this, entity, "<n>hudRange: <nh>" + nbt.getShort("hudRange"));
            system.moduleMessage(this, entity, "<n>friendliesOnHud: <nh>" + nbt.getBoolean("friendliesOnHud"));
            system.moduleMessage(this, entity, "<n>hostilesOnHud: <nh>" + nbt.getBoolean("hostilesOnHud"));
            system.moduleMessage(this, entity, "<n>playersOnHud: <nh>" + nbt.getBoolean("playersOnHud"));
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Settings commands:");
            system.moduleMessage(this, entity, "<n>!set list <nh>-<n> Lists current settings and their values");
            system.moduleMessage(this, entity, "<n>!set leftEyeHuman <true|false> <nh>-<n> Sets if left eye appears human");
            system.moduleMessage(this, entity, "<n>!set rightEyeHuman <true|false> <nh>-<n> Sets if right eye appears human");
            system.moduleMessage(this, entity, "<n>!set leftEyeGlow <true|false> <nh>-<n> Sets if left eye glows");
            system.moduleMessage(this, entity, "<n>!set rightEyeGlow <true|false> <nh>-<n> Sets if right eye glows");
            system.moduleMessage(this, entity, "<n>!set hudRange <number> <nh>-<n> Sets range of HUD scanner");
            system.moduleMessage(this, entity, "<n>!set friendliesOnHud <true|false> <nh>-<n> Sets if friendly mobs appear on HUD");
            system.moduleMessage(this, entity, "<n>!set hostilesOnHud <true|false> <nh>-<n> Sets if hostile mobs appear on HUD");
            system.moduleMessage(this, entity, "<n>!set playersOnHud <true|false> <nh>-<n> Sets if players appear on HUD");
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
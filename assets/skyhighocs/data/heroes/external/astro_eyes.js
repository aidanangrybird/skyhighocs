/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "eyes",
    moduleMessageName: "Eyes",
    type: 1,
    command: "eyes",
    helpMessage: "<n>!eyes <nh>-<n> Eyes",
    disabledMessage: "<e>Module <eh>eyes<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        var nbt = entity.getWornLeggings().nbt();
        switch(arguments[1]) {
          case "human":
            switch (arguments[2]) {
              case "left":
                manager.setBoolean(nbt, "leftEyeHuman", true);
                system.moduleMessage(this, entity, "<s>Set <sh>left eye<s> to human eye!");
                break;
              case "right":
                manager.setBoolean(nbt, "rightEyeHuman", true);
                system.moduleMessage(this, entity, "<s>Set <sh>right eye<s> to human eye!");
                break;
              case "*":
                manager.setBoolean(nbt, "leftEyeHuman", true);
                manager.setBoolean(nbt, "rightEyeHuman", true);
                system.moduleMessage(this, entity, "<s>Set <sh>both eyes<s> to human eyes!");
                break;
            };
            break;
          case "normal":
            switch (arguments[2]) {
              case "left":
                manager.setBoolean(nbt, "leftEyeHuman", false);
                system.moduleMessage(this, entity, "<s>Set <sh>left eye<s> to normal eye!");
                break;
              case "right":
                manager.setBoolean(nbt, "rightEyeHuman", false);
                system.moduleMessage(this, entity, "<s>Set <sh>right eye<s> to normal eye!");
                break;
              case "*":
                manager.setBoolean(nbt, "leftEyeHuman", false);
                manager.setBoolean(nbt, "rightEyeHuman", false);
                system.moduleMessage(this, entity, "<s>Set <sh>both eyes<s> to normal eyes!");
                break;
            };
            break;
          case "glowOn":
            switch (arguments[2]) {
              case "left":
                manager.setBoolean(nbt, "leftEyeGlow", true);
                system.moduleMessage(this, entity, "<s>Set left eye to glow!");
                break;
              case "right":
                manager.setBoolean(nbt, "rightEyeGlow", true);
                system.moduleMessage(this, entity, "<s>Set right eye to glow!");
                break;
              case "*":
                manager.setBoolean(nbt, "leftEyeGlow", true);
                manager.setBoolean(nbt, "rightEyeGlow", true);
                system.moduleMessage(this, entity, "<s>Set both eyes to glow!");
                break;
            };
            break;
          case "glowOff":
            switch (arguments[2]) {
              case "left":
                manager.setBoolean(nbt, "leftEyeGlow", false);
                system.moduleMessage(this, entity, "<s>Set left eye to not glow!");
                break;
              case "right":
                manager.setBoolean(nbt, "rightEyeGlow", false);
                system.moduleMessage(this, entity, "<s>Set right eye to not glow!");
                break;
              case "*":
                manager.setBoolean(nbt, "leftEyeGlow", false);
                manager.setBoolean(nbt, "rightEyeGlow", false);
                system.moduleMessage(this, entity, "<s>Set both eyes to not glow!");
                break;
            };
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Eyes commands:");
            system.moduleMessage(this, entity, "<n>!eyes human <nh><eyes><n> <nh>-<n> Sets eye/s to human color");
            system.moduleMessage(this, entity, "<n>!eyes normal <nh><eyes><n> <nh>-<n> Sets eye/s to normal color");
            system.moduleMessage(this, entity, "<n>!eyes glowOn <nh><eyes><n> <nh>-<n> Makes eye/s glow");
            system.moduleMessage(this, entity, "<n>!eyes glowOff <nh><eyes><n> <nh>-<n> Makes eye/s not glow");
            system.moduleMessage(this, entity, "<n>!eyes help <nh>-<n> Shows eyes commands");
            break;
          case "status":
            system.moduleMessage(this, entity, "<n>Eyes status:");
            system.moduleMessage(this, entity, "<n>Left: <nh>" + (nbt.getBoolean("leftEyeHuman") ? "HUMAN" : "NORMAL"));
            system.moduleMessage(this, entity, "<n>Left glow: <nh>" + (nbt.getBoolean("leftEyeGlow") ? "ACTIVE" : "INACTIVE"));
            system.moduleMessage(this, entity, "<n>Right: <nh>" + (nbt.getBoolean("rightEyeHuman") ? "HUMAN" : "NORMAL"));
            system.moduleMessage(this, entity, "<n>Right glow: <nh>" + (nbt.getBoolean("rightEyeGlow") ? "ACTIVE" : "INACTIVE"));
            break;
          default:
            system.moduleMessage(this, entity, "<e>Unknown <eh>eyes<e> command! Try <eh>!eyes help<e> for a list of commands!");
            break;
        };
      } else {
        system.moduleMessage(this, entity, "<e>Unknown <eh>eyes<e> command! Try <eh>!eyes help<e> for a list of commands!");
      };
    },
  };
};
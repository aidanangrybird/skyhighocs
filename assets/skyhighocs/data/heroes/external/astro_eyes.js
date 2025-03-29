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
    helpMessage: "<n>!eyes <nh>-<n> Night vision",
    disabledMessage: "<e>Module <eh>eyes<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        switch(arguments[1]) {
          case "human":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left", 0);
                system.moduleMessage(this, entity, "<n>Set left eye to human eye!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 0);
                system.moduleMessage(this, entity, "<n>Set left eye to human eye!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left", 0);
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 0);
                system.moduleMessage(this, entity, "<n>Set both eyes to human eyes!");
                break;
            };
            break;
          case "normal":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left", 1);
                system.moduleMessage(this, entity, "<n>Set left eye to normal eye!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 1);
                system.moduleMessage(this, entity, "<n>Set left eye to normal eye!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left", 1);
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 1);
                system.moduleMessage(this, entity, "<n>Set both eyes to normal eyes!");
                break;
            };
            break;
          case "nv":
            switch (arguments[2]) {
              case "on":
                manager.setData(entity, "skyhighheroes:dyn/night_vision", true);
                system.moduleMessage(this, entity, "<n>Set night vision on!");
                break;
              case "off":
                manager.setData(entity, "skyhighheroes:dyn/night_vision", false);
                system.moduleMessage(this, entity, "<n>Set night vision off!");
                break;
            };
            break;
          case "glowOn":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left_glow", true);
                system.moduleMessage(this, entity, "<n>Set left eye to glow!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right_glow", true);
                system.moduleMessage(this, entity, "<n>Set right eye to glow!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left_glow", true);
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right_glow", true);
                system.moduleMessage(this, entity, "<n>Set both eyes to glow!");
                break;
            };
            break;
          case "glowOff":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left_glow", false);
                system.moduleMessage(this, entity, "<n>Set left eye to not glow!");
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right_glow", false);
                system.moduleMessage(this, entity, "<n>Set right eye to not glow!");
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left_glow", false);
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right_glow", false);
                system.moduleMessage(this, entity, "<n>Set both eyes to not glow!");
                break;
            };
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Night vision commands:");
            system.moduleMessage(this, entity, "<n>!eyes human <nh><eyes><n> <nh>-<n> Sets eye/s to human color");
            system.moduleMessage(this, entity, "<n>!eyes normal <nh><eyes><n> <nh>-<n> Sets eye/s to normal color");
            system.moduleMessage(this, entity, "<n>!eyes glowOn <nh><eyes><n> <nh>-<n> Makes eye/s glow");
            system.moduleMessage(this, entity, "<n>!eyes glowOff <nh><eyes><n> <nh>-<n> Makes eye/s not glow");
            system.moduleMessage(this, entity, "<n>!eyes help <nh>-<n> Shows night vision commands");
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
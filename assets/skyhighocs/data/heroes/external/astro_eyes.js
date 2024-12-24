/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  return {
    name: "eyes",
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
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 0);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left", 0);
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 0);
                break;
            };
            break;
          case "normal":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left", 1);
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 1);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left", 1);
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 1);
                break;
            };
            break;
          case "normal":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left", 1);
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 1);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left", 1);
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right", 1);
                break;
            };
            break;
          case "glowOn":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left_glow", true);
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right_glow", true);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left_glow", true);
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right_glow", true);
                break;
            };
            break;
          case "glowOff":
            switch (arguments[2]) {
              case "left":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left_glow", false);
                break;
              case "right":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right_glow", false);
                break;
              case "*":
                manager.setData(entity, "skyhighocs:dyn/astro_eye_left_glow", false);
                manager.setData(entity, "skyhighocs:dyn/astro_eye_right_glow", false);
                break;
            };
            break;
          case "help":
            system.systemMessage(entity, "<n>Night vision commands:");
            system.systemMessage(entity, "<n>!eyes human <nh><eyes><n> <nh>-<n> Sets eye/s to human color");
            system.systemMessage(entity, "<n>!eyes normal <nh><eyes><n> <nh>-<n> Sets eye/s to normal color");
            system.systemMessage(entity, "<n>!eyes glowOn <nh><eyes><n> <nh>-<n> Makes eye/s glow");
            system.systemMessage(entity, "<n>!eyes glowOff <nh><eyes><n> <nh>-<n> Makes eye/s not glow");
            system.systemMessage(entity, "<n>!eyes help <nh>-<n> Shows night vision commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>eyes<e> command! Try <eh>!eyes help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>eyes<e> command! Try <eh>!eyes help<e> for a list of commands!");
      };
    },
  };
};
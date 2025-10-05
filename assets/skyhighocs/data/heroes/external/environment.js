function initModule(system) {
  function getRainfall(entity) {
    var rainfall = entity.world().getLocation(entity.pos()).getRainfall();
    system.moduleMessage(this, entity, "<n>Rainfall at this location: <nh>" + rainfall + "<n>!");
  };
  function canSnow(entity) {
    var snows = entity.world().getLocation(entity.pos()).canSnow();
    system.moduleMessage(this, entity, (snows)?"<n>It can snow here.":"<n>It can not snow here.");
  };
  function canRain(entity) {
    var rains = entity.world().getLocation(entity.pos()).canRain();
    system.moduleMessage(this, entity, (rains)?"<n>It can rain here.":"<n>It can not rain here.");
  };
  function getTemp(entity) {
    var temperature = entity.world().getLocation(entity.pos()).getTemperature()*80.0;
    system.moduleMessage(this, entity, "<n>Temperature at this location: <nh>" + temperature + " <n>F!");
  };
  return {
    name: "Environment",
    type: 1,
    command: "env",
    helpMessage: "<n>!env <nh>-<n> Environment",
    commandHandler: function (entity, manager, argList) {
      if (argList.length > 1 && argList.length < 3) {
        switch (argList[1]) {
          case "rainfall":
            (argList.length == 2) ? getRainfall(entity) : system.moduleMessage(this, entity, "<n>!env rainfall");
            break;
          case "snow":
            (argList.length == 2) ? canSnow(entity) : system.moduleMessage(this, entity, "<n>!env snow");
            break;
          case "rain":
            (argList.length == 2) ? canRain(entity) : system.moduleMessage(this, entity, "<n>!env rain");
            break;
          case "temp":
            (argList.length == 2) ? getTemp(entity) : system.moduleMessage(this, entity, "<n>!env temp");
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Environment commands:");
            system.moduleMessage(this, entity, "<n>!env rainfall <nh>-<n> Shows rainfall at your location");
            system.moduleMessage(this, entity, "<n>!env snow <nh>-<n> Shows if it can snow at your location");
            system.moduleMessage(this, entity, "<n>!env rain <nh>-<n> Shows if it can rain at your location");
            system.moduleMessage(this, entity, "<n>!env temp <nh>-<n> Shows temperature at your location");
            system.moduleMessage(this, entity, "<n>!env help <nh>-<n> Shows Environment commands");
            break;
          default:
            system.moduleMessage(this, entity, "<e>Unknown <eh>Environment<e> command! Try <eh>!env help<e> for a list of commands!");
            break;
        };
      } else {
        system.moduleMessage(this, entity, "<e>Unknown <eh>Environment<e> command! Try <eh>!env help<e> for a list of commands!");
      };
    },
  }
}
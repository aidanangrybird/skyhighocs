function init(transer) {
  function getRainfall(entity) {
    var rainfall = entity.world().getLocation(entity.pos()).getRainfall();
    transer.systemMessage(entity, "<n>Rainfall at this location: <nh>" + rainfall + "<n>!");
  };
  function canSnow(entity) {
    var snows = entity.world().getLocation(entity.pos()).canSnow();
    transer.systemMessage(entity, (snows)?"<n>It can snow here.":"<n>It can not snow here.");
  };
  function canRain(entity) {
    var rains = entity.world().getLocation(entity.pos()).canRain();
    transer.systemMessage(entity, (rains)?"<n>It can rain here.":"<n>It can not rain here.");
  };
  function getTemp(entity) {
    var temperature = entity.world().getLocation(entity.pos()).getTemperature();
    transer.systemMessage(entity, "<n>Temperature at this location: <nh>" + temperature + "<n>!");
  };
  return {
    name: "Environment",
    type: 1,
    command: "env",
    helpMessage: "<n>!env <nh>-<n> Environment",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 3) {
        switch (arguments[1]) {
          case "rainfall":
            (arguments.length == 2) ? getRainfall(entity) : transer.systemMessage(entity, "<n>!env rainfall");
            break;
          case "snow":
            (arguments.length == 2) ? canSnow(entity) : transer.systemMessage(entity, "<n>!env snow");
            break;
          case "rain":
            (arguments.length == 2) ? canRain(entity) : transer.systemMessage(entity, "<n>!env rain");
            break;
          case "temp":
            (arguments.length == 2) ? getTemp(entity) : transer.systemMessage(entity, "<n>!env temp");
            break;
          case "help":
            transer.systemMessage(entity, "<n>Environment commands:");
            transer.systemMessage(entity, "<n>!env rainfall <nh>-<n> Shows rainfall at your location");
            transer.systemMessage(entity, "<n>!env snow <nh>-<n> Shows if it can snow at your location");
            transer.systemMessage(entity, "<n>!env rain <nh>-<n> Shows if it can rain at your location");
            transer.systemMessage(entity, "<n>!env temp <nh>-<n> Shows temperature at your location");
            transer.systemMessage(entity, "<n>!env help <nh>-<n> Shows Environment commands");
            break;
          default:
            transer.systemMessage(entity, "<e>Unknown <eh>Environment<e> command! Try <eh>!env help<e> for a list of commands!");
            break;
        };
      } else {
        transer.systemMessage(entity, "<e>Unknown <eh>Environment<e> command! Try <eh>!env help<e> for a list of commands!");
      };
    },
  }
}
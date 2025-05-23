function initModule(system) {
  /**
   * Sends message in group format
   * @param {JSPlayer} player - Entity recieving message
   * @param {string} sender - Name of entity sending message
   * @param {string} message - Message content
   **/
  function cyberMessage(player, sender, message) {
    if (PackLoader.getSide() == "SERVER") {
      player.as("PLAYER").addChatMessage("|Cyber| " + sender + "> " + message);
    };
  };
  return {
    name: "cyberMessaging",
    type: 2,
    modeID: "cyber",
    chatModeInfo: "<n>You are now in <nh>cyber<n> mode!",
    messageHandler: function (entity, name, range) {
      var message = entity.getData("skyhighocs:dyn/entry");
      var foundPlayers = [];
      var newRange = (range*1);
      var newName = system.getModelID(entity);
      var txAntennaDeployed = (entity.getData("skyhighocs:dyn/antenna_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
      var txSatelliteDeployed = (entity.getData("skyhighocs:dyn/satellite_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
      if (txAntennaDeployed) {
        newRange = (range*4);
      };
      var entities = [];
      if (PackLoader.getSide() == "SERVER") {
        entities = entity.world().getEntitiesInRangeOf(entity.pos(), newRange);
      };
      entities.forEach(player => {
        if (player.is("PLAYER") && (player.getUUID() != entity.getUUID())) {
          if (system.hasCyberneticBody(player)) {
            foundPlayers.push(player);
          };
        };
      });
      if (foundPlayers.length > 0) {
        foundPlayers.forEach(player => {
          var rxAntennaDeployed = (player.getData("skyhighocs:dyn/antenna_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
          if (entity.pos().distanceTo(player.pos()) <= range) {
            cyberMessage(player, newName, message);
          } else if (txAntennaDeployed && rxAntennaDeployed && entity.canSee(player) && (entity.pos().distanceTo(player.pos()) <= range*4)) {
            cyberMessage(player, newName, message);
          };
        });
      } else {
        system.systemMessage(entity, "<n>No other cybers in range!")
      };
      if (txSatelliteDeployed) {
        system.cybers.forEach(entry => {
          var id = entity.getWornHelmet().nbt().getInteger("id" + entry);
          if (id > -1) {
            var player = entity.world().getEntityById(id);
            var rxSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            if (rxSatelliteDeployed && player.getUUID() != entity.getUUID()) {
              cyberMessage(player, newName, message);
            };
          };
        });
      };
      cyberMessage(entity, newName, message);
    },
    chatInfo: function (player, manager, chat) {
      system.systemMessage(player, "<n>You are in <nh>cyber messaging <n>mode!");
    },
  };
};

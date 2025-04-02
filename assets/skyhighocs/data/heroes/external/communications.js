/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  /**
  * Gets position of other cybers
  * @param tx - Transmitter
  * @param rx - Receiver
  **/
  function getPos(tx, rx) {
    var otherName = system.getModelID(tx);
    system.moduleMessage(this, rx, "<nh>" + otherName + "<n> | <nh>" + tx.posX().toFixed(0) + "<n> | <nh>" + tx.posY().toFixed(0) + "<n> | <nh>" + tx.posZ().toFixed(0) + "<n> | <nh>" + tx.world().getLocation(tx.pos()).biome());
  };
  /**
  * Gets status of other cybers
  * @param tx - Transmitter
  * @param rx - Receiver
  **/
  function getStatus(tx, rx) {
    var otherName = system.getModelID(tx);
    system.moduleMessage(this, rx, "<nh>" + otherName + "<n> | <nh>" + ((tx.getHealth()/tx.getMaxHealth())*100) + "%<n> | <nh>" + ((tx.as("PLAYER").getFoodLevel()/20)*100) + "%<n>");
  };
  /**
  * Receives suits
  * @param tx - Transmitter
  * @param rx - Receiver
  * @param manager - Required
  **/
  function receiveSuits(tx, rx, manager) {
    var txName = system.getModelID(tx);
    var rxName = system.getModelID(rx);
    if (!tx.getWornHelmet().nbt().hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(tx.getWornHelmet().nbt(), "suitDatastore", newSuitsList);
    };
    if (!rx.getWornHelmet().nbt().hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(rx.getWornHelmet().nbt(), "suitDatastore", newSuitsList);
    };
    var txSuitDatastoreArray = system.getStringArray(tx.getWornHelmet().nbt().getStringList("suitDatastore"));
    var rxSuitDatastoreArray = system.getStringArray(rx.getWornHelmet().nbt().getStringList("suitDatastore"));
    var suitsToReceive = tx.getData("skyhighocs:dyn/suit_data_buffer").split(",");
    var suitsReceived = 0;
    var rxSuitDatastore = rx.getWornHelmet().nbt().getStringList("suitDatastore");
    suitsToReceive.forEach(entry => {
      if ((entry < txSuitDatastoreArray.length) && (entry > -1)) {
        var currentSuit = txSuitDatastoreArray[entry];
        system.moduleMessage(this, rx, "<n>Receiving suit \"<nh>" + currentSuit + "<n>\" from <nh>" + txName + "<n>!");
        system.moduleMessage(this, tx, "<n>Transmitting suit \"<nh>" + currentSuit + "<n>\" to " + rxName + "!");
        if (rxSuitDatastoreArray.indexOf(currentSuit) == -1) {
          rxSuitDatastoreArray.push(currentSuit);
          manager.appendString(rxSuitDatastore, currentSuit);
          system.moduleMessage(this, rx, "<s>Successfully received suit \"<sh>" + currentSuit + "<s>\" from " + txName + "!");
          system.moduleMessage(this, tx, "<n>Successfully transmited suit \"<nh>" + currentSuit + "<n>\" to " + rxName + "!");
          suitsReceived = suitsReceived + 1;
        } else {
          system.moduleMessage(this, rx, "<e>Failed to receive suit \"<eh>" + currentSuit + "<e>\" from " + txName + "!");
          system.moduleMessage(this, tx, "<n>Failed to transmit suit \"<nh>" + currentSuit + "<n>\" to " + rxName + "!");
        };
      };
    });
    system.moduleMessage(this, rx, "<nh>" + suitsReceived + "<n> " + ((suitsReceived == 1) ? "suit received!" : "suits received!"));
  };
  /**
  * Transmits suits
  * @param entity - Required
  * @param manager - Required
  * @param suitList - List of suit indexes seperated by commas
  **/
  function transmitSuits(entity, manager, suitList) {
    if (!entity.getWornHelmet().nbt().hasKey("suitDatastore")) {
      var newSuits = manager.newTagList();
      manager.setTagList(entity.getWornHelmet().nbt(), "suitDatastore", newSuits);
    };
    var suitDatastoreArray = system.getStringArray(entity.getWornHelmet().nbt().getStringList("suitDatastore"));
    var suitsToTransmit = [];
    if (suitList == "*") {
      for (var i = 0;i<suitDatastoreArray.length;i++) {
        suitsToTransmit.push(i);
      };
    } else {
      suitsToTransmit = suitList.split(",");
    };
    var numSuitsTransmitted = 0;
    var suitsTransmited = "-1";
    suitsToTransmit.forEach(entry => {
      system.moduleMessage(this, entity, "<n>Transmiting suit entry \"<nh>" + entry + "<n>\"!");
      if ((entry < (suitDatastoreArray.length-1)) && (entry > -1)) {
        var currentSuit = suitDatastoreArray[entry];
        system.moduleMessage(this, entity, "<s>Successfully transmited suit \"<sh>" + currentSuit + "<s>\"!");
        suitsTransmited = suitsTransmited + ("," + entry);
        numSuitsTransmitted = numSuitsTransmitted + 1;
      } else {
        system.moduleMessage(this, entity, "<e>Failed to transmit suit entry \"<eh>" + entry + "<e>\"!");
      };
    });
    manager.setData(entity, "skyhighocs:dyn/suit_data_buffer", suitsTransmited);
    system.moduleMessage(this, entity, "<nh>" + numSuitsTransmitted + (numSuitsTransmitted == 1) ? "<n>suit transmited!" : "<n>suits transmited!");
  };
  return {
    /*
    Make similar functions to how I did download and upload for the suit data drive
    */
    name: "communications",
    moduleMessageName: "Comms",
    type: 12,
    command: "comms",
    powers: ["skyhighocs:communications"],
    helpMessage: "<n>!comms <nh>-<n> Communications",
    disabledMessage: "<e>Module <eh>communications<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        switch (arguments[1]) {
          case "pos":
            var range = 32;
            var foundPlayers = [];
            var newRange = (range*1);
            var txAntennaDeployed = (entity.getData("skyhighocs:dyn/antenna_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            var txSatelliteDeployed = (entity.getData("skyhighocs:dyn/satellite_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            if (txAntennaDeployed) {
              newRange = (range*2);
            };
            if (txSatelliteDeployed) {
              newRange = (range*4);
            };
            var entities = entity.world().getEntitiesInRangeOf(entity.pos(), newRange);
            entities.forEach(player => {
              if (player.is("PLAYER") && (player.getUUID() != entity.getUUID())) {
                if (system.hasCyberneticBody(player)) {
                  foundPlayers.push(player);
                };
              };
            });
            if (foundPlayers.length > 0) {
              var name = system.getModelID(entity);
              system.moduleMessage(this, entity, "<nh>Name<n> | <nh>posX<n> | <nh>posY<n> | <nh>posZ<n> | <nh>Biome");
              system.moduleMessage(this, entity, "<nh>" + name + "<n> | <nh>" + entity.posX().toFixed(0) + "<n> | <nh>" + entity.posY().toFixed(0) + "<n> | <nh>" + entity.posZ().toFixed(0) + "<n> | <nh>" + entity.world().getLocation(entity.pos()).biome());
              //entity = tx
              //player = rx
              foundPlayers.forEach(player => {
                var rxAntennaDeployed = (player.getData("skyhighocs:dyn/antenna_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                var rxSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                if (entity.pos().distanceTo(player.pos()) <= range) {
                  getPos(player, entity);
                } else if (txAntennaDeployed && rxAntennaDeployed && (entity.pos().distanceTo(player.pos()) <= range*2)) {
                  getPos(player, entity);
                } else if (txSatelliteDeployed && rxSatelliteDeployed && (entity.pos().distanceTo(player.pos()) <= range*4)) {
                  getPos(player, entity);
                };
              });
            } else {
              system.moduleMessage(this, entity, "<n>No other cybers in range!")
            };
            break;
          case "stats":
            var range = 32;
            var foundPlayers = [];
            var newRange = (range*1);
            var txAntennaDeployed = (entity.getData("skyhighocs:dyn/antenna_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            var txSatelliteDeployed = (entity.getData("skyhighocs:dyn/satellite_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            if (txAntennaDeployed) {
              newRange = (range*2);
            };
            if (txSatelliteDeployed) {
              newRange = (range*4);
            };
            var entities = entity.world().getEntitiesInRangeOf(entity.pos(), newRange);
            entities.forEach(player => {
              if (player.is("PLAYER") && (player.getUUID() != entity.getUUID())) {
                if (system.hasCyberneticBody(player)) {
                  foundPlayers.push(player);
                };
              };
            });
            var name = system.getModelID(entity);
            system.moduleMessage(this, entity, "<nh>Name<n> | <nh>Health<n> | <nh>Hunger<n>");
            system.moduleMessage(this, entity, "<nh>" + name + "<n> | <nh>" + ((entity.getHealth()/entity.getMaxHealth())*100) + "%<n> | <nh>" + ((entity.as("PLAYER").getFoodLevel()/20)*100) + "%<n>");
            if (foundPlayers.length > 0) {
              //entity = tx
              //player = rx
              foundPlayers.forEach(player => {
                var rxAntennaDeployed = (player.getData("skyhighocs:dyn/antenna_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                var rxSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                if (entity.pos().distanceTo(player.pos()) <= range) {
                  getStatus(player, entity);
                } else if (txAntennaDeployed && rxAntennaDeployed && (entity.pos().distanceTo(player.pos()) <= range*2)) {
                  getStatus(player, entity);
                } else if (txSatelliteDeployed && rxSatelliteDeployed && (entity.pos().distanceTo(player.pos()) <= range*4)) {
                  getStatus(player, entity);
                };
              });
            } else {
              system.moduleMessage(this, entity, "<n>No other cybers in range!")
            };
            break;
          case "tx":
            var range = 32;
            var foundPlayers = [];
            var newRange = (range*1);
            var txAntennaDeployed = (entity.getData("skyhighocs:dyn/antenna_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            var txSatelliteDeployed = (entity.getData("skyhighocs:dyn/satellite_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            if (txAntennaDeployed) {
              newRange = (range*2);
            };
            if (txSatelliteDeployed) {
              newRange = (range*4);
            };
            var entities = entity.world().getEntitiesInRangeOf(entity.pos(), newRange);
            entities.forEach(player => {
              if (player.is("PLAYER") && (player.getUUID() != entity.getUUID())) {
                if (system.hasCyberneticBody(player)) {
                  foundPlayers.push(player);
                };
              };
            });
            if (foundPlayers.length > 0) {
              //entity = tx
              //player = rx
              transmitSuits(entity, manager, arguments[2]);
              foundPlayers.forEach(player => {
                var rxAntennaDeployed = (player.getData("skyhighocs:dyn/antenna_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                var rxSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                if (entity.pos().distanceTo(player.pos()) <= range) {
                  receiveSuits(entity, player, manager);
                } else if (txAntennaDeployed && rxAntennaDeployed && (entity.pos().distanceTo(player.pos()) <= range*2)) {
                  receiveSuits(entity, player, manager);
                } else if (txSatelliteDeployed && rxSatelliteDeployed && (entity.pos().distanceTo(player.pos()) <= range*4)) {
                  receiveSuits(entity, player, manager);
                };
              });
            } else {
              system.moduleMessage(this, entity, "<n>No other cybers in range!")
            };
            break;
          case "rx":
            var range = 32;
            var foundPlayers = [];
            var newRange = (range*1);
            var rxAntennaDeployed = (entity.getData("skyhighocs:dyn/antenna_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            var rxSatelliteDeployed = (entity.getData("skyhighocs:dyn/satellite_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            if (rxAntennaDeployed) {
              newRange = (range*2);
            };
            if (rxSatelliteDeployed) {
              newRange = (range*4);
            };
            var entities = entity.world().getEntitiesInRangeOf(entity.pos(), newRange);
            entities.forEach(player => {
              if (player.is("PLAYER") && (player.getUUID() != entity.getUUID())) {
                if (system.hasCyberneticBody(player)) {
                  foundPlayers.push(player);
                };
              };
            });
            if (foundPlayers.length > 0) {
              //player = tx
              //entity = rx
              foundPlayers.forEach(player => {
                var txAntennaDeployed = (player.getData("skyhighocs:dyn/antenna_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                var txSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                if (entity.pos().distanceTo(player.pos()) <= range) {
                  receiveSuits(player, entity, manager);
                } else if (rxAntennaDeployed && txAntennaDeployed && (entity.pos().distanceTo(player.pos()) <= range*2)) {
                  receiveSuits(player, entity, manager);
                } else if (rxSatelliteDeployed && txSatelliteDeployed && (entity.pos().distanceTo(player.pos()) <= range*4)) {
                  receiveSuits(entity, player, manager);
                };
              });
            } else {
              system.moduleMessage(this, entity, "<n>No other cybers in range!")
            };
            break;
          case "deploy":
            switch (arguments[2]) {
              case "sat":
                manager.setData(entity, "skyhighocs:dyn/satellite", true);
                system.moduleMessage(this, entity, "<n>Deploying satellite!");
                break;
              case "ant":
                manager.setData(entity, "skyhighocs:dyn/antenna", true);
                system.moduleMessage(this, entity, "<n>Deploying antenna!");
                break;
              case "satRain":
                manager.setData(entity, "skyhighocs:dyn/satellite_rain_mode", true);
                system.moduleMessage(this, entity, "<n>Activating satellite rain mode!");
                break;
            };
            break;
          case "retract":
            switch (arguments[2]) {
              case "sat":
                manager.setData(entity, "skyhighocs:dyn/satellite", false);
                system.moduleMessage(this, entity, "<n>Retracting satellite!");
                break;
              case "ant":
                manager.setData(entity, "skyhighocs:dyn/antenna", false);
                system.moduleMessage(this, entity, "<n>Retracting antenna!");
                break;
              case "satRain":
                manager.setData(entity, "skyhighocs:dyn/satellite_rain_mode", false);
                system.moduleMessage(this, entity, "<n>Deactivating satellite rain mode!");
                break;
            };
            break;
          case "status":
            system.moduleMessage(this, entity, "<n>Comms status:");
            system.moduleMessage(this, entity, "<n>Antenna: <nh>" + ((entity.getData("skyhighocs:dyn/antenna_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Satellite: <nh>" + ((entity.getData("skyhighocs:dyn/satellite_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            system.moduleMessage(this, entity, "<n>Satellite Rain Mode: <nh>" + ((entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") > 0) ? "DEPLOYED" : "RETRACTED"));
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Communications commands:");
            system.moduleMessage(this, entity, "<n>!comms deploy <sat|ant|satRain> <nh>-<n> Deploys comms type");
            system.moduleMessage(this, entity, "<n>!comms retract <sat|ant|satRain> <nh>-<n> Retracts comms type");
            system.moduleMessage(this, entity, "<n>!comms tx <suits> <nh>-<n> Transmits suits (comma seperated indexes) to other Cybers");
            system.moduleMessage(this, entity, "<n>!comms rx <nh>-<n> Receives suits from other Cybers");
            system.moduleMessage(this, entity, "<n>!comms pos <nh>-<n> Gets position of other Cybers");
            system.moduleMessage(this, entity, "<n>!comms stats <nh>-<n> Gets stats of other Cybers");
            system.moduleMessage(this, entity, "<n>!comms status <nh>-<n> Status of comms");
            system.moduleMessage(this, entity, "<n>!comms help <nh>-<n> Shows communications commands");
            break;
          default:
            system.moduleMessage(this, entity, "<e>Unknown <eh>comms<e> command! Try <eh>!comms help<e> for a list of commands!");
            break;
        };
      } else {
        system.moduleMessage(this, entity, "<e>Unknown <eh>comms<e> command! Try <eh>!comms help<e> for a list of commands!");
      };
    },
    isModifierEnabled: function (entity, modifier) {
      result = false;
      if (!system.isModuleDisabled(entity, this.name)) {
      };
      if (modifier.name() == "fiskheroes:transformation") {
        result = true;
      };
      return result;
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/satellite", false);
      manager.setData(entity, "skyhighocs:dyn/antenna", false);
      manager.setData(entity, "skyhighocs:dyn/satellite_rain_mode", false);
    },
    tickHandler: function (entity, manager) {
      if (entity.getData("skyhighocs:dyn/satellite_timer") == 1) {
        manager.setData(entity, "skyhighocs:dyn/transmitting", true);
        manager.setData(entity, "skyhighocs:dyn/receiving", true);
      };
      if (!entity.getData("skyhighocs:dyn/satellite")) {
        manager.setData(entity, "skyhighocs:dyn/transmitting", false);
        manager.setData(entity, "skyhighocs:dyn/receiving", false);
      };
      /* 
      var nbt = entity.getWornHelmet().nbt();
      if (entity.getData("skyhighocs:dyn/receive_timer") == 1) {
        manager.setData(entity, "skyhighocs:dyn/receiving", false);
        system.moduleMessage(this, entity, "<s>Finished receiving suits!");
        manager.setString(nbt, "receiveBuffer", "");
        manager.setShort(nbt, "receiveTime", 0);
      };
      var suitReceiveQueue = [];
      if (nbt.getString("receiveBuffer") != null) {
        suitReceiveQueue = nbt.getString("receiveBuffer").split(",");
      };
      var receiveTime = nbt.getShort("receiveTime");
      manager.incrementData(entity, "skyhighocs:dyn/receive_timer", receiveTime, 1, entity.getData("skyhighocs:dyn/receiving"));
      if (PackLoader.getSide() == "SERVER" && (entity.getData("skyhighocs:dyn/receive_timer") < 1) && (entity.getData("skyhighocs:dyn/receive_timer") > 0) && entity.getData("skyhighocs:dyn/receiving")) {
        var suitReceiveTime = (receiveTime/suitReceiveQueue.length).toFixed(0);
        var currentTime = Math.ceil(entity.getData("skyhighocs:dyn/receive_timer")*receiveTime);
        if (currentTime % suitReceiveTime == 0) {
          var suitIndex = suitReceiveQueue[(currentTime/suitReceiveTime)-1];
          receiveSuit(entity, manager, suitIndex);
        };
      };
      if (entity.getData("skyhighocs:dyn/transmit_timer") == 1) {
        manager.setData(entity, "skyhighocs:dyn/transmiting", false);
        system.moduleMessage(this, entity, "<s>Finished transmiting suits!");
        manager.setString(nbt, "transmitBuffer", "");
        manager.setShort(nbt, "transmitTime", 0);
      };
      var suitTransmitQueue = [];
      if (nbt.getString("transmitBuffer") != null) {
        suitTransmitQueue = nbt.getString("transmitBuffer").split(",");
      };
      var transmitTime = nbt.getShort("transmitTime");
      manager.incrementData(entity, "skyhighocs:dyn/transmit_timer", transmitTime, 1, entity.getData("skyhighocs:dyn/transmiting"));
      if (PackLoader.getSide() == "SERVER" && (entity.getData("skyhighocs:dyn/transmit_timer") < 1) && (entity.getData("skyhighocs:dyn/transmit_timer") > 0) && entity.getData("skyhighocs:dyn/transmiting")) {
        var suitTransmitTime = (transmitTime/suitTransmitQueue.length).toFixed(0);
        var currentTime = Math.ceil(entity.getData("skyhighocs:dyn/transmit_timer")*transmitTime);
        if (currentTime % suitTransmitTime == 0) {
          var suitIndex = suitTransmitQueue[(currentTime/suitTransmitTime)-1];
          transmitSuit(entity, manager, suitIndex);
        };
      };
      */
    }
  };
};
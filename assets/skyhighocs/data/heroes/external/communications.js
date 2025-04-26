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
    var positionMessage = "<nh>" + otherName + "<n> | (<nh>" + tx.posX().toFixed(0) + "<n>, <nh>" + tx.posY().toFixed(0) + "<n>, <nh>" + tx.posZ().toFixed(0) + "<n>)";
    if (system.hasOwnProperty("distance")) {
      var distance = system.distance(rx.pos(), tx.pos());
      positionMessage = positionMessage + "<n> | <nh>" + distance;
    };
    if (system.hasOwnProperty("direction")) {
      var direction = system.direction(rx.pos(), tx.pos());
      positionMessage = positionMessage + "<n> | <nh>" + direction;
    };
    if (system.hasOwnProperty("elevation")) {
      var elevation = system.elevation(rx.pos(), tx.pos());
      positionMessage = positionMessage + "<n> | <nh>" + ((elevation == 0) ? "-" : ((elevation > 0) ? "+" + elevation : elevation));
    };
    system.moduleMessage(this, rx, positionMessage);
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
  * @param module - module passthrough
  * @param tx - Transmitter requried
  * @param rx - Receiver requried
  * @param manager - Required
  **/
  function receiveSuits(module, tx, rx, manager) {
    var nbt = rx.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuitsList);
    };
    if (!nbt.hasKey("receiveBuffer")) {
      var newBuffer = manager.newTagList();
      manager.setTagList(nbt, "receiveBuffer", newBuffer);
    };
    var suitReceiveDuration = 0;
    var receivesBuffered = 0;
    var transmitBuffer = tx.getWornHelmet().nbt().getStringList("transmitBuffer");
    var receiveBuffer = nbt.getStringList("receiveBuffer");
    var transmitBufferArray = system.getStringArray(transmitBuffer);
    transmitBufferArray.forEach(entry => {
      manager.appendString(receiveBuffer, entry);
      var receiveDuration = 0;
      if (PackLoader.getSide() == "SERVER") {
        receiveDuration = system.clamp(Math.floor(Math.random() * 30), 10, 30)
      };
      suitReceiveDuration = suitReceiveDuration + receiveDuration;
      receivesBuffered = receivesBuffered + 1;
    });
    var txName = system.getModelID(tx);
    var rxName = system.getModelID(rx);
    system.moduleMessage(module, rx, "<n>Receiving suits from <nh>" + txName + "<n>!");
    system.moduleMessage(module, tx, "<n>Transmitting suits to " + rxName + "!");
    manager.setDataWithNotify(tx, "skyhighocs:dyn/receive_duration", suitReceiveDuration);
    system.moduleMessage(module, rx, "<n>Attempting to receive <nh>" + receivesBuffered + "<n> " + ((receivesBuffered == 1) ? "suit!" : "suits!"));
    manager.setDataWithNotify(rx, "skyhighocs:dyn/receiving", true);
  };
  /**
  * Receives suit
  * @param module - module passthrough
  * @param entity - Required
  * @param manager - Required
  * @param currentReceive - Current suit being received
  **/
  function receiveSuit(module, entity, manager, currentReceive) {
    var nbt = entity.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuitsList);
    };
    var receiveBuffer = nbt.getStringList("receiveBuffer");
    var suitDatastore = nbt.getStringList("suitDatastore");
    var suitDatastoreArray = system.getStringArray(nbt.getStringList("suitDatastore"));
    var currentSuit = receiveBuffer.getString(currentReceive);
    system.moduleMessage(module, entity, "<n>Receiving suit \"<nh>" + currentSuit + "<n>\"!");
    if (suitDatastoreArray.indexOf(currentSuit) == -1) {
      suitDatastoreArray.push(currentSuit);
      manager.appendString(suitDatastore, currentSuit);
      system.moduleMessage(module, entity, "<s>Successfully received suit \"<sh>" + currentSuit + "<s>\" to " + system.getModelID(entity) + "!");
    } else {
      system.moduleMessage(module, entity, "<e>Failed to receive suit \"<eh>" + currentSuit + "<e>\"! Already exists in datastore!");
    };
  };
  /**
  * Transmits suits
  * @param module - module passthrough
  * @param entity - Required
  * @param manager - Required
  * @param suitList - List of suit indexes seperated by commas
  **/
  function transmitSuits(module, entity, manager, suitList) {
    var nbt = entity.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuits = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuits);
    };
    if (!nbt.hasKey("transmitBuffer")) {
      var newBuffer = manager.newTagList();
      manager.setTagList(nbt, "transmitBuffer", newBuffer);
    };
    var suitDatastoreArray = system.getStringArray(nbt.getStringList("suitDatastore"));
    if (suitList == "*") {
      for (var i = 0;i<suitDatastoreArray.length;i++) {
        suitsToTransmit.push(i);
      };
    } else {
      suitsToTransmit = suitList.split(",");
    };
    var suitsToTransmit = [];
    var suitTransmitBuffer = nbt.getStringList("transmitBuffer")
    var suitTransmitBufferArray = system.getStringArray(nbt.getStringList("transmitBuffer"));
    var suitTransmitDuration = 0;
    var transmitsBuffered = 0;
    suitsToTransmit.forEach(entry => {
      if ((entry < (suitDatastoreArray.length)) && (entry > -1)) {
        var currentSuit = dataDriveSuitsArray[entry];
        if (suitTransmitBufferArray.indexOf(currentSuit) == -1) {
          manager.appendString(suitTransmitBuffer, currentSuit);
          suitTransmitBufferArray.push(currentSuit);
          var transmitDuration = 0;
          if (PackLoader.getSide() == "SERVER") {
            transmitDuration = system.clamp(Math.floor(Math.random() * 30), 10, 30)
          };
          suitTransmitDuration = suitTransmitDuration + transmitDuration;
          transmitsBuffered = transmitsBuffered + 1;
        };
      };
    });
    manager.setTagList(nbt, "transmitBuffer", suitTransmitBuffer);
    manager.setDataWithNotify(entity, "skyhighocs:dyn/transmit_duration", suitTransmitDuration);
    system.moduleMessage(module, entity, "<n>Attempting to transmit <nh>" + transmitsBuffered + "<n> " + ((transmitsBuffered == 1) ? "suit!" : "suits!"));
    manager.setDataWithNotify(entity, "skyhighocs:dyn/transmitting", true);
  };
  /**
  * Transmits suit
  * @param module - module passthrough
  * @param entity - Required
  * @param manager - Required
  * @param currentTransmission - Suit index
  **/
  function transmitSuit(module, entity, manager, currentTransmission) {
    var nbt = entity.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuitsList);
    };
    var suitDatastore = nbt.getStringList("suitDatastore");
    var suitDatastoreArray = system.getStringArray(nbt.getStringList("suitDatastore"));
    var currentSuit = suitDatastore.getString(currentTransmission);
    system.moduleMessage(module, entity, "<n>Transmitting suit \"<nh>" + currentSuit + "<n>\"!");
    if (suitDatastoreArray.indexOf(currentSuit) == -1) {
      system.moduleMessage(module, entity, "<s>Successfully transmitted suit \"<sh>" + currentSuit + "<s>\" to other cybers in range!");
    } else {
      system.moduleMessage(module, entity, "<e>Failed to transmitted suit \"<eh>" + currentSuit + "<e>\"!");
    };
  };
  return {
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
          case "cyberPos":
            var range = 32;
            var foundPlayers = [];
            var newRange = (range*1);
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
              var name = system.getModelID(entity);
              system.moduleMessage(this, entity, "<nh>Name<n> | <nh>posX<n> | <nh>posY<n> | <nh>posZ<n> | <nh>Distance<n> | <nh>Direction<n> | <nh>Elevation");
              var positionMessage = "<nh>" + name + "<n> | (<nh>" + entity.posX().toFixed(0) + "<n>, <nh>" + entity.posY().toFixed(0) + "<n>, <nh>" + entity.posZ().toFixed(0) + "<n>)";
              if (system.hasOwnProperty("distance")) {
                positionMessage = positionMessage + "<n> | <nh>0";
              };
              if (system.hasOwnProperty("direction")) {
                positionMessage = positionMessage + "<n> | <nh>-";
              };
              if (system.hasOwnProperty("elevation")) {
                positionMessage = positionMessage + "<n> | <nh>-";
              };
              system.moduleMessage(this, entity, positionMessage);
              //entity = tx
              //player = rx
              foundPlayers.forEach(player => {
                var rxAntennaDeployed = (player.getData("skyhighocs:dyn/antenna_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                var rxSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                if (entity.pos().distanceTo(player.pos()) <= range) {
                  getPos(player, entity);
                } else if (txAntennaDeployed && rxAntennaDeployed && entity.canSee(player) && (entity.pos().distanceTo(player.pos()) <= range*4)) {
                  getPos(player, entity);
                };
              });
            } else {
              system.moduleMessage(this, entity, "<n>No other cybers in range!")
            };
            if (txSatelliteDeployed) {
              system.cybers.forEach(entry => {
                var id = entity.getWornHelmet().nbt().getInteger("id" + entry);
                if (id > -1) {
                  var player = entity.world().getEntityById(id);
                  var rxSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                  if (rxSatelliteDeployed && (player.getUUID() != entity.getUUID())) {
                    getPos(player, entity);
                  };
                };
              });
            };
            break;
          case "cyberStatus":
            var range = 32;
            var foundPlayers = [];
            var newRange = (range*1);
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
            var name = system.getModelID(entity);
            system.moduleMessage(this, entity, "<nh>Name<n> | <nh>Health<n> | <nh>Hunger<n>");
            system.moduleMessage(this, entity, "<nh>" + name + "<n> | <nh>" + ((entity.getHealth()/entity.getMaxHealth())*100) + "%<n> | <nh>" + ((entity.as("PLAYER").getFoodLevel()/20)*100) + "%<n>");
            if (foundPlayers.length > 0) {
              //entity = tx
              //player = rx
              foundPlayers.forEach(player => {
                var rxAntennaDeployed = (player.getData("skyhighocs:dyn/antenna_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                if (entity.pos().distanceTo(player.pos()) <= range) {
                  getStatus(player, entity);
                } else if (txAntennaDeployed && rxAntennaDeployed && (entity.pos().distanceTo(player.pos()) <= range*4)) {
                  getStatus(player, entity);
                };
              });
            } else {
              system.moduleMessage(this, entity, "<n>No other cybers in range!")
            };
            if (txSatelliteDeployed) {
              system.cybers.forEach(entry => {
                var id = entity.getWornHelmet().nbt().getInteger("id" + entry);
                if (id > -1) {
                  var player = entity.world().getEntityById(id);
                  var rxSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                  if (rxSatelliteDeployed && (player.getUUID() != entity.getUUID())) {
                    getStatus(player, entity);
                  };
                };
              });
            };
            break;
          case "suits":
            var range = 32;
            var foundPlayers = [];
            var newRange = (range*1);
            var txAntennaDeployed = (entity.getData("skyhighocs:dyn/antenna_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            var txSatelliteDeployed = (entity.getData("skyhighocs:dyn/satellite_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            if (txAntennaDeployed) {
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
              transmitSuits(this, entity, manager, arguments[2]);
              foundPlayers.forEach(player => {
                var rxAntennaDeployed = (player.getData("skyhighocs:dyn/antenna_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                var rxSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                if (entity.pos().distanceTo(player.pos()) <= range) {
                  receiveSuits(this, entity, player, manager);
                } else if (txAntennaDeployed && rxAntennaDeployed && entity.canSee(player) && (entity.pos().distanceTo(player.pos()) <= range*4)) {
                  receiveSuits(this, entity, player, manager);
                } else if (txSatelliteDeployed && rxSatelliteDeployed && (entity.pos().distanceTo(player.pos()) <= range*4)) {
                  receiveSuits(this, entity, player, manager);
                };
              });
            } else {
              system.moduleMessage(this, entity, "<n>No other cybers in range!")
            };
            break;
          case "suitsC":
            var range = 32;
            var foundPlayers = [];
            var newRange = (range*1);
            var txAntennaDeployed = (entity.getData("skyhighocs:dyn/antenna_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            var txSatelliteDeployed = (entity.getData("skyhighocs:dyn/satellite_timer") == 1) && (entity.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
            if (txAntennaDeployed) {
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
              transmitSuits(this, entity, manager, arguments[2]);
              foundPlayers.forEach(player => {
                var rxAntennaDeployed = (player.getData("skyhighocs:dyn/antenna_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                if (entity.pos().distanceTo(player.pos()) <= range) {
                  receiveSuits(this, entity, player, manager);
                } else if (txAntennaDeployed && rxAntennaDeployed && entity.canSee(player) && (entity.pos().distanceTo(player.pos()) <= range*4)) {
                  receiveSuits(this, entity, player, manager);
                };
              });
            } else {
              system.moduleMessage(this, entity, "<n>No other cybers in range!")
            };
            if (txSatelliteDeployed) {
              system.cybers.forEach(entry => {
                var id = entity.getWornHelmet().nbt().getInteger("id" + entry);
                if (id > -1) {
                  var player = entity.world().getEntityById(id);
                  var rxSatelliteDeployed = (player.getData("skyhighocs:dyn/satellite_timer") == 1) && (player.getData("skyhighocs:dyn/satellite_rain_mode_timer") == 0);
                  if (rxSatelliteDeployed && (player.getUUID() != entity.getUUID())) {
                    receiveSuits(this, entity, player, manager);
                  };
                };
              });
            };
            break;
          case "show":
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
          case "hide":
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
            system.moduleMessage(this, entity, "<n>!comms show <sat|ant|satRain> <nh>-<n> Deploys comms type");
            system.moduleMessage(this, entity, "<n>!comms hide <sat|ant|satRain> <nh>-<n> Retracts comms type");
            system.moduleMessage(this, entity, "<n>!comms suits <suits> <nh>-<n> Transmits suits (comma seperated indexes) to other Cybers");
            system.moduleMessage(this, entity, "<n>!comms cyberPos <nh>-<n> Gets position of other Cybers");
            system.moduleMessage(this, entity, "<n>!comms cyberStatus <nh>-<n> Gets stats of other Cybers");
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
        manager.setData(entity, "skyhighocs:dyn/transmit_beam", true);
        manager.setData(entity, "skyhighocs:dyn/receive_beam", true);
      };
      if (!entity.getData("skyhighocs:dyn/satellite")) {
        manager.setData(entity, "skyhighocs:dyn/transmit_beam", false);
        manager.setData(entity, "skyhighocs:dyn/receive_beam", false);
      };
      var nbt = entity.getWornHelmet().nbt();
      if (entity.getData("skyhighocs:dyn/receive_timer") == 1) {
        manager.setDataWithNotify(entity, "skyhighocs:dyn/receiving", false);
        system.moduleMessage(this, entity, "<s>Finished receiving suits!");
        manager.setTagList(nbt, "receiveBuffer", manager.newTagList());
        manager.setDataWithNotify(entity, "skyhighocs:dyn/receive_duration", 0);
      };
      var suitReceiveBuffer = manager.newTagList();
      if (nbt.getStringList("receiveBuffer") != null) {
        suitReceiveBuffer = nbt.getStringList("receiveBuffer");
      };
      var receiveDuration = entity.getData("skyhighocs:dyn/receive_duration");
      if (entity.getData("skyhighocs:dyn/receiving")) {
        var step = (1/receiveDuration)
        manager.setDataWithNotify(entity, "skyhighocs:dyn/receive_timer", entity.getData("skyhighocs:dyn/receive_timer")+step);
      };
      if (!entity.getData("skyhighocs:dyn/receiving") && entity.getData("skyhighocs:dyn/receive_timer") >= 1) {
        manager.setDataWithNotify(entity, "skyhighocs:dyn/receive_timer", 0);
      };
      if (PackLoader.getSide() == "SERVER" && (entity.getData("skyhighocs:dyn/receive_timer") < 1) && (entity.getData("skyhighocs:dyn/receive_timer") > 0) && entity.getData("skyhighocs:dyn/receiving")) {
        var suitReceiveDuration = (receiveDuration/suitReceiveBuffer.tagCount()).toFixed(0);
        var currentTime = Math.ceil(entity.getData("skyhighocs:dyn/receive_timer")*receiveDuration);
        if (currentTime % suitReceiveDuration == 0) {
          var currentReceive = (currentTime/suitReceiveDuration)-1;
          receiveSuit(this, entity, manager, currentReceive);
        };
      };
      if (entity.getData("skyhighocs:dyn/transmit_timer") == 1) {
        manager.setDataWithNotify(entity, "skyhighocs:dyn/transmitting", false);
        system.moduleMessage(this, entity, "<s>Finished transmitting suits!");
        manager.setTagList(nbt, "transmitBuffer", manager.newTagList());
        manager.setDataWithNotify(nbt, "skyhighocs:dyn/transmit_duration", 0);
      };
      var suitTransmitBuffer = manager.newTagList();
      if (nbt.getStringList("transmitBuffer") != null) {
        suitTransmitBuffer = nbt.getStringList("transmitBuffer");
      };
      var transmitDuration = entity.getData("skyhighocs:dyn/transmit_duration");
      if (entity.getData("skyhighocs:dyn/transmitting")) {
        var step = (1/transmitDuration)
        manager.setDataWithNotify(entity, "skyhighocs:dyn/transmit_timer", entity.getData("skyhighocs:dyn/transmit_timer")+step);
      };
      if (!entity.getData("skyhighocs:dyn/transmitting") && entity.getData("skyhighocs:dyn/transmit_timer") >= 1) {
        manager.setDataWithNotify(entity, "skyhighocs:dyn/transmit_timer", 0);
      };
      if (PackLoader.getSide() == "SERVER" && (entity.getData("skyhighocs:dyn/transmit_timer") < 1) && (entity.getData("skyhighocs:dyn/transmit_timer") > 0) && entity.getData("skyhighocs:dyn/transmitting")) {
        var suitTransmitDuration = (transmitDuration/suitTransmitBuffer.tagCount()).toFixed(0);
        var currentTime = Math.ceil(entity.getData("skyhighocs:dyn/transmit_timer")*transmitDuration);
        if (currentTime % suitTransmitDuration == 0) {
          var currentTransmit = (currentTime/suitTransmitDuration)-1;
          transmitSuit(this, entity, manager, currentTransmit);
        };
      };
    }
  };
};
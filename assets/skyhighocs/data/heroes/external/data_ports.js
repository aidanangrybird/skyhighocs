/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  //Maybe try using the equipment thing so that you can't remove the suit drive from your hand
  /**
  * Lists suits on suit data drive
  * @param entity - Required
  * @param manager - Required
  **/
  function listSuits(entity, manager) {
    if (!entity.getWornHelmet().nbt().hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(entity.getWornHelmet().nbt(), "suitDatastore", newSuitsList);
    };
    var dataDriveSuits = system.getStringArray(entity.getHeldItem().nbt().getStringList("Suits"));
    system.systemMessage(entity, "<nh>" + (dataDriveSuits.length == 1) ? dataDriveSuits.length + " suit:" : dataDriveSuits.length + "<n> suits:");
    dataDriveSuits.forEach(entry => {
      system.systemMessage(entity, "<nh>" + dataDriveSuits.indexOf(entry) + "<n>> <nh>" + entry);
    });
  };
  /**
  * Downloads suits off of suit data drive
  * @param entity - Required
  * @param manager - Required
  * @param suitList - List of suit indexes seperated by commas
  **/
  function downloadSuits(entity, manager, suitList) {
    if (!entity.getWornHelmet().nbt().hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(entity.getWornHelmet().nbt(), "suitDatastore", newSuitsList);
    };
    var dataDriveSuitsArray = system.getStringArray(entity.getHeldItem().nbt().getStringList("Suits"));
    var suitDatastoreArray = system.getStringArray(entity.getWornHelmet().nbt().getStringList("suitDatastore"));
    var suitsToDownload = [];
    if (suitList == "*") {
      for (var i = 0;i<dataDriveSuitsArray.length;i++) {
        suitsToDownload.push(i);
      };
    } else {
      suitsToDownload = suitList.split(",");
    };
    var suitsDownloaded = 0;
    var suitDatastore = entity.getWornHelmet().nbt().getStringList("suitDatastore");
    suitsToDownload.forEach(entry => {
      if ((entry < 9) && (entry > -1)) {
        var currentSuit = dataDriveSuitsArray[entry];
        system.systemMessage(entity, "<n>Downloading suit \"<nh>" + currentSuit + "<n>\"!");
        if (suitDatastoreArray.indexOf(currentSuit) == -1) {
          suitDatastoreArray.push(currentSuit);
          manager.appendString(suitDatastore, currentSuit);
          system.systemMessage(entity, "<s>Successfully downloaded suit \"<sh>" + currentSuit + "<s>\"!");
          suitsDownloaded = suitsDownloaded + 1;
        } else {
          system.systemMessage(entity, "<e>Failed to download suit \"<eh>" + currentSuit + "<e>\"!");
        };
      };
    });
    system.systemMessage(entity, "<nh>" + suitsDownloaded + "<n> " + ((suitsDownloaded == 1) ? "suit downloaded!" : "suits downloaded!"));
  };
  /**
  * Uploads suits to suit data drive
  * @param entity - Required
  * @param manager - Required
  * @param suitList - List of suit indexes seperated by commas
  **/
  function uploadSuits(entity, manager, suitList) {
    if (!entity.getWornHelmet().nbt().hasKey("suitDatastore")) {
      var newSuits = manager.newTagList();
      manager.setTagList(player.getWornHelmet().nbt(), "suitDatastore", newSuits);
    };
    var dataDriveSuitsArray = system.getStringArray(entity.getHeldItem().nbt().getStringList("Suits"));
    var suitDatastoreArray = system.getStringArray(entity.getWornHelmet().nbt().getStringList("suitDatastore"));
    var suitsToUpload = suitList.split(","); //Indexes of suits
    var suitsUploaded = 0;
    var dataDriveSuits = entity.getHeldItem().nbt().getStringList("Suits");
    suitsToUpload.forEach(entry => {
      if ((entry < (suitDatastoreArray.length-1)) && (entry > -1)) {
        var currentSuit = suitDatastoreArray[entry];
        system.systemMessage(entity, "<n>Uploading suit \"<nh>" + currentSuit + "<n>\"!");
        if ((dataDriveSuitsArray.indexOf(currentSuit) == -1) && (dataDriveSuitsArray.length < 11)) {
          dataDriveSuitsArray.push(currentSuit);
          manager.appendString(dataDriveSuits, currentSuit);
          system.systemMessage(entity, "<s>Successfully uploaded suit \"<sh>" + currentSuit + "<s>\"!");
          suitsUploaded = suitsUploaded + 1;
        } else {
          system.systemMessage(entity, "<e>Failed to upload suit \"<eh>" + currentSuit + "<e>\"!");
        };
      };
    });
    system.systemMessage(entity, "<nh>" + suitsUploaded + (suitsUploaded == 1) ? "<n>suit uploaded!" : "<n>suits uploaded!");
  };
  return {
    name: "dataPorts",
    type: 12,
    command: "ports",
    powers: ["skyhighocs:data_ports"],
    helpMessage: "<n>!ports <nh>-<n> Ports",
    disabledMessage: "<e>Module <eh>dataPorts<e> is disabled!",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        switch (arguments[1]) {
          case "list":
            if ((entity.getData("skyhighocs:dyn/ports_timer") == 1) && (entity.getHeldItem().name() == "fiskheroes:suit_data_drive")) {
              listSuits(entity, manager);
            } else {
              system.systemMessage(entity, "<e>Suit drive must be inserted into a data port!");
            };
            break;
          case "insert":
            if (entity.getHeldItem().name() == "fiskheroes:suit_data_drive") {
              manager.setData(entity, "skyhighocs:dyn/ports", true);
              system.systemMessage(entity, "<n>Inserting suit drive into data ports!");
            } else {
              system.systemMessage(entity, "<e>Must be holding suit drive!");
            };
            break;
          case "unplug":
            manager.setData(entity, "skyhighocs:dyn/ports", false);
            system.systemMessage(entity, "<n>Retracting data ports!");
            break;
          case "download":
            downloadSuits(entity, manager, arguments[2]);
            break;
          case "upload":
            uploadSuits(entity, manager, arguments[2]);
            break;
          case "deploy":
            manager.setData(entity, "skyhighocs:dyn/ports_deployed", true);
            system.systemMessage(entity, "<n>Deploying data ports!");
            break;
          case "retract":
            manager.setData(entity, "skyhighocs:dyn/ports_deployed", false);
            system.systemMessage(entity, "<n>Retracting data ports!");
            break;
          case "help":
            system.systemMessage(entity, "<n>Ports commands:");
            system.systemMessage(entity, "<n>!ports deploy <nh>-<n> Exposes data ports");
            system.systemMessage(entity, "<n>!ports retract <nh>-<n> Hides data ports");
            system.systemMessage(entity, "<n>!ports help <nh>-<n> Shows dataPorts commands");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>ports<e> command! Try <eh>!ports help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>ports<e> command! Try <eh>!ports help<e> for a list of commands!");
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
      manager.setData(entity, "skyhighocs:dyn/ports", false);
    }
  };
};
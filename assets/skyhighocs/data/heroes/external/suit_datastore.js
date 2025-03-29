/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  /**
  * Lists suits on suit data drive
  * @param entity - Required
  * @param manager - Required
  **/
  function listDriveSuits(entity, manager) {
    if (!entity.getWornHelmet().nbt().hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(entity.getWornHelmet().nbt(), "suitDatastore", newSuitsList);
    };
    var suitDrive = null;
    var equipment = entity.getWornHelmet().nbt().getTagList("Equipment");
    if (equipment.tagCount() == 1) {
      var firstItem = equipment.getCompoundTag(0).getCompoundTag("Item");
      if (firstItem.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        suitDrive = firstItem.getCompoundTag("tag");
      };
    };
    if (equipment.tagCount() == 2) {
      var firstItem = equipment.getCompoundTag(0).getCompoundTag("Item");
      var secondItem = equipment.getCompoundTag(1).getCompoundTag("Item");
      if (firstItem.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        suitDrive = firstItem.getCompoundTag("tag");
      };
      if (secondItem.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        suitDrive = secondItem.getCompoundTag("tag");
      };
    };
    if (suitDrive != null) {
      var dataDriveSuits = system.getStringArray(suitDrive.getStringList("Suits"));
      system.moduleMessage(this, entity, "<nh>" + (dataDriveSuits.length == 1) ? ("<nh>" + dataDriveSuits.length + "<n> suit:") : ("<nh>" + dataDriveSuits.length + "<n> suits:"));
      dataDriveSuits.forEach(entry => {
        system.moduleMessage(this, entity, "<nh>" + dataDriveSuits.indexOf(entry) + "<n>> <nh>" + entry);
      });
    } else {
      system.moduleMessage(this, entity, "<e>Suit drive not plugged in!");
    };
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
    var suitDrive = null;
    var equipment = entity.getWornHelmet().nbt().getTagList("Equipment");
    if (equipment.tagCount() == 1) {
      var firstItem = equipment.getCompoundTag(0).getCompoundTag("Item");
      if (firstItem.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        suitDrive = firstItem.getCompoundTag("tag");
      };
    };
    if (equipment.tagCount() == 2) {
      var firstItem = equipment.getCompoundTag(0).getCompoundTag("Item");
      var secondItem = equipment.getCompoundTag(1).getCompoundTag("Item");
      if (firstItem.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        suitDrive = firstItem.getCompoundTag("tag");
      };
      if (secondItem.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        suitDrive = secondItem.getCompoundTag("tag");
      };
    };
    if (suitDrive != null) {
      var dataDriveSuitsArray = system.getStringArray(suitDrive.getStringList("Suits"));
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
        if ((entry < 10) && (entry > -1)) {
          var currentSuit = dataDriveSuitsArray[entry];
          system.moduleMessage(this, entity, "<n>Downloading suit \"<nh>" + currentSuit + "<n>\"!");
          if (suitDatastoreArray.indexOf(currentSuit) == -1) {
            suitDatastoreArray.push(currentSuit);
            manager.appendString(suitDatastore, currentSuit);
            system.moduleMessage(this, entity, "<s>Successfully downloaded suit \"<sh>" + currentSuit + "<s>\" to " + system.getModelID(entity) + "!");
            suitsDownloaded = suitsDownloaded + 1;
          } else {
            system.moduleMessage(this, entity, "<e>Failed to download suit \"<eh>" + currentSuit + "<e>\"!");
          };
        };
      });
      system.moduleMessage(this, entity, "<nh>" + suitsDownloaded + "<n> " + ((suitsDownloaded == 1) ? "suit downloaded!" : "suits downloaded!"));
    } else {
      system.moduleMessage(this, entity, "<e>Suit drive not plugged in!");
    };
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
      manager.setTagList(entity.getWornHelmet().nbt(), "suitDatastore", newSuits);
    };
    var suitDrive = null;
    var equipment = entity.getWornHelmet().nbt().getTagList("Equipment");
    if (equipment.tagCount() == 1) {
      var firstItem = equipment.getCompoundTag(0).getCompoundTag("Item");
      if (firstItem.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        suitDrive = firstItem.getCompoundTag("tag");
      };
    };
    if (equipment.tagCount() == 2) {
      var firstItem = equipment.getCompoundTag(0).getCompoundTag("Item");
      var secondItem = equipment.getCompoundTag(1).getCompoundTag("Item");
      if (firstItem.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        suitDrive = firstItem.getCompoundTag("tag");
      };
      if (secondItem.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        suitDrive = secondItem.getCompoundTag("tag");
      };
    };
    if (suitDrive != null) {
      var dataDriveSuitsArray = system.getStringArray(suitDrive.getStringList("Suits"));
      var suitDatastoreArray = system.getStringArray(entity.getWornHelmet().nbt().getStringList("suitDatastore"));
      var suitsToUpload = suitList.split(","); //Indexes of suits
      var suitsUploaded = 0;
      var dataDriveSuits = suitDrive.getStringList("Suits");
      suitsToUpload.forEach(entry => {
        if ((entry < suitDatastoreArray.length) && (entry > -1)) {
          var currentSuit = suitDatastoreArray[entry];
          system.moduleMessage(this, entity, "<n>Uploading suit \"<nh>" + currentSuit + "<n>\"!");
          if ((dataDriveSuitsArray.indexOf(currentSuit) == -1) && (dataDriveSuitsArray.length < 9)) {
            dataDriveSuitsArray.push(currentSuit);
            manager.appendString(dataDriveSuits, currentSuit);
            system.moduleMessage(this, entity, "<s>Successfully uploaded suit \"<sh>" + currentSuit + "<s>\"!");
            suitsUploaded = suitsUploaded + 1;
          } else {
            system.moduleMessage(this, entity, "<e>Failed to upload suit \"<eh>" + currentSuit + "<e>\"!");
          };
        };
      });
      system.moduleMessage(this, entity, "<nh>" + suitsUploaded + (suitsUploaded == 1) ? "<n>suit uploaded!" : "<n>suits uploaded!");
    } else {
      system.moduleMessage(this, entity, "<e>Suit drive not plugged in!");
    };
  };
  /**
   * Removes suits by indexes
   * @param {JSEntity} entity - Required
   * @param {JSDataManager} manager - Required
   * @param {string} suitList - username of contact
   **/
  function removeSuits(entity, manager, suitList) {
    if (!entity.getWornHelmet().nbt().hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(entity.getWornHelmet().nbt(), "suitDatastore", newSuitsList);
    };
    var suitDatastoreArray = system.getStringArray(entity.getWornHelmet().nbt().getStringList("suitDatastore"));
    var suitsToRemove = suitList.split(","); //Indexes of suits
    var suitsRemoved = 0;
    var suitDatastore = entity.getWornHelmet().nbt().getStringList("suitDatastore");
    suitsToRemove.forEach(entry => {
      if ((entry < suitDatastoreArray.length) && (entry > -1)) {
        var currentSuit = suitDatastoreArray[entry];
        system.moduleMessage(this, entity, "<n>Removeing suit \"<nh>" + currentSuit + "<n>\"!");
        if (suitDatastoreArray.indexOf(currentSuit) > -1) {
          manager.removeTag(suitDatastore, entry);
          system.moduleMessage(this, entity, "<s>Successfully removed suit \"<sh>" + currentSuit + "<s>\"!");
          suitsRemoved = suitsRemoved + 1;
        } else {
          system.moduleMessage(this, entity, "<e>Failed to remove suit \"<eh>" + currentSuit + "<e>\"!");
        };
      };
    });
    system.moduleMessage(this, entity, "<nh>" + suitsRemoved + (suitsRemoved == 1) ? "<n>suit removed!" : "<n>suits removed!");
  };
  /**
  * Lists suits stored internally
  * @param entity - Required
  * @param manager - Required
  **/
  function listSuits(entity, manager) {
    if (!entity.getWornHelmet().nbt().hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(entity.getWornHelmet().nbt(), "suitDatastore", newSuitsList);
    };
    var suitDatastoreArray = system.getStringArray(entity.getWornHelmet().nbt().getStringList("suitDatastore"));
    system.moduleMessage(this, entity, "<nh>" + ((suitDatastoreArray.length == 1) ? suitDatastoreArray.length + "<n> suit:" : suitDatastoreArray.length + "<n> suits:"));
    suitDatastoreArray.forEach(entry => {
      system.moduleMessage(this, entity, "<nh>" + suitDatastoreArray.indexOf(entry) + "<n>> <nh>" + entry);
    });
  };
  return {
    name: "suitDatastore",
    moduleMessageName: "Suits",
    type: 1,
    command: "suits",
    helpMessage: "<n>!suits <nh>-<n> Suit Datastore",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        switch(arguments[1]) {
          case "listDrive":
            listDriveSuits(entity, manager);
            break;
          case "download":
            downloadSuits(entity, manager, arguments[2]);
            break;
          case "upload":
            uploadSuits(entity, manager, arguments[2]);
            break;
          case "rem":
            removeSuits(entity, manager, arguments[2]);
            break;
          case "list":
            listSuits(entity, manager);
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Suits Datastore commands:");
            system.moduleMessage(this, entity, "<n>!suits rem <nh><index><n> <nh>-<n> Deletes suit by index");
            system.moduleMessage(this, entity, "<n>!suits list <nh>-<n> Lists stored suits");
            system.moduleMessage(this, entity, "<n>!suits listDrive <nh>-<n> Lists suits on plugged in data drive");
            system.moduleMessage(this, entity, "<n>!suits download <suits> <nh>-<n> Downloads suits (comma seperated indexes) from inserted data drive");
            system.moduleMessage(this, entity, "<n>!suits upload <suits> <nh>-<n> Uploads suits (comma seperated indexes) to inserted data drive");
            system.moduleMessage(this, entity, "<n>!suits help <nh>-<n> Shows this list");
            break;
          default:
            system.moduleMessage(this, entity, "<e>Unknown <eh>suitDatastore<e> command! Try <eh>!suits help<e> for a list of commands!");
            break;
        };
      } else {
        system.moduleMessage(this, entity, "<e>Unknown <eh>suitDatastore<e> command! Try <eh>!suits help<e> for a list of commands!");
      };
    },
  };
};
/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
  /**
  * Checks if a suit drive is inserted
  * @param entity - Required
  **/
  function isSuitDriveInserted(entity) {
    var nbt = entity.getWornHelmet().nbt();
    var result = false;
    var equipment = nbt.getTagList("Equipment");
    if (equipment.tagCount() == 1) {
      var item = equipment.getCompoundTag(0).getCompoundTag("Item");
      if (item.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        result = true;
      };
    };
    return result;
  };
  /**
  * Checks if a suit drive is inserted
  * @param entity - Required
  **/
  function suitDriveName(entity) {
    var nbt = entity.getWornHelmet().nbt();
    var result = "";
    var equipment = nbt.getTagList("Equipment");
    if (equipment.tagCount() == 1) {
      var item = equipment.getCompoundTag(0).getCompoundTag("Item");
      if (item.getShort("id") == PackLoader.getNumericalItemId("fiskheroes:suit_data_drive")) {
        result = item.getCompoundTag("tag").getCompoundTag("display").getString("Name");
      };
    };
    return result;
  };
  /**
  * Lists suits on suit data drive
  * @param entity - Required
  * @param manager - Required
  **/
  function listDriveSuits(entity, manager) {
    var nbt = entity.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuitsList);
    };
    var suitDrive = null;
    if (isSuitDriveInserted(entity)) {
      suitDrive = nbt.getTagList("Equipment").getCompoundTag(0).getCompoundTag("Item").getCompoundTag("tag");
    };
    if (suitDrive != null) {
      var dataDriveSuits = system.getStringArray(suitDrive.getStringList("Suits"));
      system.moduleMessage(this, entity, "<nh>" + ((dataDriveSuits.length == 1) ? ("<nh>" + dataDriveSuits.length + "<n> suit:") : ("<nh>" + dataDriveSuits.length + "<n> suits:")));
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
    var nbt = entity.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuitsList);
    };
    var suitDrive = null;
    if (isSuitDriveInserted(entity)) {
      suitDrive = nbt.getTagList("Equipment").getCompoundTag(0).getCompoundTag("Item").getCompoundTag("tag");
    };
    if (suitDrive != null) {
      var dataDriveSuitsArray = system.getStringArray(suitDrive.getStringList("Suits"));
      var suitsToDownload = [];
      var suitDownloadQueue = [];
      var suitDownloadTime = 0;
      if (suitList == "*") {
        for (var i = 0;i<dataDriveSuitsArray.length;i++) {
          suitsToDownload.push(i);
        };
      } else {
        suitsToDownload = suitList.split(",");
      };
      var downloadsQueued = 0;
      suitsToDownload.forEach(entry => {
        if ((entry < (dataDriveSuitsArray.length)) && (entry > -1)) {
          var currentSuit = dataDriveSuitsArray[entry];
          if (suitDownloadQueue.indexOf(currentSuit) == -1) {
            suitDownloadQueue.push(entry);
            var downloadTime = 0;
            if (PackLoader.getSide() == "SERVER") {
              downloadTime = system.clamp(Math.floor(Math.random() * 30), 10, 30)
            };
            suitDownloadTime = suitDownloadTime + downloadTime;
            downloadsQueued = downloadsQueued + 1;
          };
        };
      });
      manager.setString(nbt, "downloadBuffer", suitDownloadQueue);
      manager.setShort(nbt, "downloadTime", suitDownloadTime);
      system.moduleMessage(this, entity, "<n>Attempting to download <nh>" + downloadsQueued + "<n> " + ((downloadsQueued == 1) ? "suit!" : "suits!"));
      manager.setData(entity, "skyhighocs:dyn/downloading", true);
    } else {
      system.moduleMessage(this, entity, "<e>Suit drive not plugged in!");
    };
  };
  /**
  * Downloads suits off of suit data drive
  * @param entity - Required
  * @param manager - Required
  * @param suitIndex - Suit index
  **/
  function downloadSuit(entity, manager, suitIndex) {
    var nbt = entity.getWornHelmet().nbt();
    /*
    Another function that downloads an individual suit
    Does all the same checks that the current downloadSuits function does
    Also figure out a way to essentially set the download time so downloading or uploading suits takes a bit of time and is not instant
    */
    if (!nbt.hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuitsList);
    };
    if (isSuitDriveInserted(entity)) {
      var suitDrive = nbt.getTagList("Equipment").getCompoundTag(0).getCompoundTag("Item").getCompoundTag("tag");
      var suitDatastore = nbt.getStringList("suitDatastore");
      var suitDatastoreArray = system.getStringArray(nbt.getStringList("suitDatastore"));
      var currentSuit = suitDrive.getStringList("Suits").getString(suitIndex);
      system.moduleMessage(this, entity, "<n>Downloading suit \"<nh>" + currentSuit + "<n>\"!");
      if (suitDatastoreArray.indexOf(currentSuit) == -1) {
        suitDatastoreArray.push(currentSuit);
        manager.appendString(suitDatastore, currentSuit);
        system.moduleMessage(this, entity, "<s>Successfully downloaded suit \"<sh>" + currentSuit + "<s>\" to " + system.getModelID(entity) + "!");
      } else {
        system.moduleMessage(this, entity, "<e>Failed to download suit \"<eh>" + currentSuit + "<e>\"!");
      };
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
    var nbt = entity.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuits = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuits);
    };
    var suitDrive = null;
    if (isSuitDriveInserted(entity)) {
      suitDrive = nbt.getTagList("Equipment").getCompoundTag(0).getCompoundTag("Item").getCompoundTag("tag");
    };
    if (suitDrive != null) {
      var suitDatastoreArray = system.getStringArray(nbt.getStringList("suitDatastore"));
      var suitsToUpload = suitList.split(","); //Indexes of suits
      var suitUploadQueue = [];
      var suitUploadTime = 0;
      var uploadsQueued = 0;
      suitsToUpload.forEach(entry => {
        if ((entry < (suitDatastoreArray.length)) && (entry > -1)) {
          var currentSuit = suitDatastoreArray[entry];
          if (suitUploadQueue.indexOf(currentSuit) == -1) {
            suitUploadQueue.push(entry);
            var uploadTime = 0;
            if (PackLoader.getSide() == "SERVER") {
              uploadTime = system.clamp(Math.floor(Math.random() * 30), 10, 30)
            };
            suitUploadTime = suitUploadTime + uploadTime;
            uploadsQueued = uploadsQueued + 1;
          };
        };
      });
      manager.setString(nbt, "uploadBuffer", suitUploadQueue);
      manager.setShort(nbt, "uploadTime", suitUploadTime);
      system.moduleMessage(this, entity, "<n>Attempting to upload <nh>" + uploadsQueued + "<n> " + ((uploadsQueued == 1) ? "suit!" : "suits!"));
      manager.setData(entity, "skyhighocs:dyn/uploading", true);
    } else {
      system.moduleMessage(this, entity, "<e>Suit drive not plugged in!");
    };
  };
  /**
  * Downloads suits off of suit data drive
  * @param entity - Required
  * @param manager - Required
  * @param suitIndex - Suit index
  **/
  function uploadSuit(entity, manager, suitIndex) {
    var nbt = entity.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuitsList);
    };
    if (isSuitDriveInserted(entity)) {
      var suitDatastore = nbt.getStringList("suitDatastore");
      var suitDrive = nbt.getTagList("Equipment").getCompoundTag(0).getCompoundTag("Item").getCompoundTag("tag");
      var suitDriveArray = system.getStringArray(suitDrive.getStringList("Suits"));
      var currentSuit = suitDatastore.getString(suitIndex);
      system.moduleMessage(this, entity, "<n>Uploading suit \"<nh>" + currentSuit + "<n>\"!");
      if ((suitDriveArray.indexOf(currentSuit) == -1) && (suitDriveArray.length < 9)) {
        suitDriveArray.push(currentSuit);
        manager.appendString(suitDrive.getStringList("Suits"), currentSuit);
        system.moduleMessage(this, entity, "<s>Successfully uploading suit \"<sh>" + currentSuit + "<s>\" to " + suitDriveName(entity) + "<s>!");
      } else {
        system.moduleMessage(this, entity, "<e>Failed to uploading suit \"<eh>" + currentSuit + "<e>\"!");
      };
    } else {
      system.moduleMessage(this, entity, "<e>Suit drive not plugged in!");
    };
  };
  /**
   * Removes suits by index
   * @param {JSEntity} entity - Required
   * @param {JSDataManager} manager - Required
   * @param {string} suitIndex - Index of suit to remove
   **/
  function removeSuit(entity, manager, suitIndex) {
    var nbt = entity.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuitsList);
    };
    var suitDatastoreArray = system.getStringArray(nbt.getStringList("suitDatastore"));
    var suitsRemoved = 0;
    var suitDatastore = nbt.getStringList("suitDatastore");
    if ((suitIndex < suitDatastoreArray.length) && (suitIndex > -1)) {
      var currentSuit = suitDatastoreArray[suitIndex];
      system.moduleMessage(this, entity, "<n>Removeing suit \"<nh>" + currentSuit + "<n>\"!");
      if (suitDatastoreArray.indexOf(currentSuit) > -1) {
        manager.removeTag(suitDatastore, suitIndex);
        system.moduleMessage(this, entity, "<s>Successfully removed suit \"<sh>" + currentSuit + "<s>\"!");
        suitsRemoved = suitsRemoved + 1;
      } else {
        system.moduleMessage(this, entity, "<e>Failed to remove suit \"<eh>" + currentSuit + "<e>\"!");
      };
    };
  };
  /**
  * Lists suits stored internally
  * @param entity - Required
  * @param manager - Required
  **/
  function listSuits(entity, manager) {
    var nbt = entity.getWornHelmet().nbt();
    if (!nbt.hasKey("suitDatastore")) {
      var newSuitsList = manager.newTagList();
      manager.setTagList(nbt, "suitDatastore", newSuitsList);
    };
    var suitDatastoreArray = system.getStringArray(nbt.getStringList("suitDatastore"));
    system.moduleMessage(this, entity, "<nh>" + ((suitDatastoreArray.length == 1) ? suitDatastoreArray.length + "<n> suit:" : suitDatastoreArray.length + "<n> suits:"));
    suitDatastoreArray.forEach(entry => {
      system.moduleMessage(this, entity, "<nh>" + suitDatastoreArray.indexOf(entry) + "<n>> <nh>" + entry);
    });
  };
  return {
    name: "suitDatastore",
    moduleMessageName: "Suits",
    type: 11,
    command: "suits",
    powers: ["skyhighocs:suit_datastore"],
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
            removeSuit(entity, manager, arguments[2]);
            break;
          case "list":
            listSuits(entity, manager);
            break;
          case "help":
            system.moduleMessage(this, entity, "<n>Suits Datastore commands:");
            system.moduleMessage(this, entity, "<n>!suits rem <index> <nh>-<n> Deletes suit by index");
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
    tickHandler: function (entity, manager) {
      var nbt = entity.getWornHelmet().nbt();
      if (entity.getData("skyhighocs:dyn/download_timer") == 1) {
        manager.setData(entity, "skyhighocs:dyn/downloading", false);
        system.moduleMessage(this, entity, "<s>Finished downloading suits!");
        manager.setString(nbt, "downloadBuffer", "");
        manager.setShort(nbt, "downloadTime", 0);
      };
      var suitDownloadQueue = [];
      if (nbt.getString("downloadBuffer") != null) {
        suitDownloadQueue = nbt.getString("downloadBuffer").split(",");
      };
      var downloadTime = nbt.getShort("downloadTime");
      manager.incrementData(entity, "skyhighocs:dyn/download_timer", downloadTime, 1, entity.getData("skyhighocs:dyn/downloading"));
      if (PackLoader.getSide() == "SERVER" && (entity.getData("skyhighocs:dyn/download_timer") < 1) && (entity.getData("skyhighocs:dyn/download_timer") > 0) && entity.getData("skyhighocs:dyn/downloading")) {
        var suitDownloadTime = (downloadTime/suitDownloadQueue.length).toFixed(0);
        var currentTime = Math.ceil(entity.getData("skyhighocs:dyn/download_timer")*downloadTime);
        if (currentTime % suitDownloadTime == 0) {
          var suitIndex = suitDownloadQueue[(currentTime/suitDownloadTime)-1];
          downloadSuit(entity, manager, suitIndex);
        };
      };
      if (entity.getData("skyhighocs:dyn/upload_timer") == 1) {
        manager.setData(entity, "skyhighocs:dyn/uploading", false);
        system.moduleMessage(this, entity, "<s>Finished uploading suits!");
        manager.setString(nbt, "uploadBuffer", "");
        manager.setShort(nbt, "uploadTime", 0);
      };
      var suitDownloadQueue = [];
      if (nbt.getString("uploadBuffer") != null) {
        suitDownloadQueue = nbt.getString("uploadBuffer").split(",");
      };
      var uploadTime = nbt.getShort("uploadTime");
      manager.incrementData(entity, "skyhighocs:dyn/upload_timer", uploadTime, 1, entity.getData("skyhighocs:dyn/uploading"));
      if (PackLoader.getSide() == "SERVER" && (entity.getData("skyhighocs:dyn/upload_timer") < 1) && (entity.getData("skyhighocs:dyn/upload_timer") > 0) && entity.getData("skyhighocs:dyn/uploading")) {
        var suitDownloadTime = (uploadTime/suitDownloadQueue.length).toFixed(0);
        var currentTime = Math.ceil(entity.getData("skyhighocs:dyn/upload_timer")*uploadTime);
        if (currentTime % suitDownloadTime == 0) {
          var suitIndex = suitDownloadQueue[(currentTime/suitDownloadTime)-1];
          uploadSuit(entity, manager, suitIndex);
        };
      };
    },
    whenDisabled: function (entity, manager) {
      manager.setData(entity, "skyhighocs:dyn/downloading", false);
      manager.setData(entity, "skyhighocs:dyn/uploading", false);
    },
  };
};
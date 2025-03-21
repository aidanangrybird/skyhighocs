/**
 * You put all of the required functions in here
 * @param system - Required
 **/
function initModule(system) {
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
      if ((entry < (suitDatastoreArray.length-1)) && (entry > -1)) {
        var currentSuit = suitDatastoreArray[entry];
        system.systemMessage(entity, "<n>Removeing suit \"<nh>" + currentSuit + "<n>\"!");
        if (suitDatastoreArray.indexOf(currentSuit) > -1) {
          manager.removeTag(suitDatastore, entry);
          system.systemMessage(entity, "<s>Successfully removed suit \"<sh>" + currentSuit + "<s>\"!");
          suitsRemoved = suitsRemoved + 1;
        } else {
          system.systemMessage(entity, "<e>Failed to remove suit \"<eh>" + currentSuit + "<e>\"!");
        };
      };
    });
    system.systemMessage(entity, "<nh>" + suitsRemoved + (suitsRemoved == 1) ? "<n>suit removed!" : "<n>suits removed!");
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
    system.systemMessage(entity, "<nh>" + ((suitDatastoreArray.length == 1) ? suitDatastoreArray.length + "<n> suit:" : suitDatastoreArray.length + "<n> suits:"));
    suitDatastoreArray.forEach(entry => {
      system.systemMessage(entity, "<nh>" + suitDatastoreArray.indexOf(entry) + "<n>> <nh>" + entry);
    });
  };
  return {
    name: "suitDatastore",
    type: 1,
    command: "suit",
    helpMessage: "<n>!suit <nh>-<n> Suit Datastore",
    commandHandler: function (entity, manager, arguments) {
      if (arguments.length > 1 && arguments.length < 4) {
        switch(arguments[1]) {
          case "rem":
            removeSuits(entity, manager, arguments[2]);
            break;
          case "list":
            listSuits(entity, manager);
            break;
          case "help":
            system.systemMessage(entity, "<n>Suits Datastore commands:");
            system.systemMessage(entity, "<n>!suit rem <nh><name><n> <nh>-<n> Deletes suit by index");
            system.systemMessage(entity, "<n>!suit list <nh>-<n> Lists stored suits");
            system.systemMessage(entity, "<n>!suit help <nh>-<n> Shows this list");
            break;
          default:
            system.systemMessage(entity, "<e>Unknown <eh>suitDatastore<e> command! Try <eh>!suit help<e> for a list of commands!");
            break;
        };
      } else {
        system.systemMessage(entity, "<e>Unknown <eh>suitDatastore<e> command! Try <eh>!suit help<e> for a list of commands!");
      };
    },
  };
};
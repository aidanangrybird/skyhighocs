function initModule(system) {
  /**
   * Checks if a player has another player as a contact
   * @param {JSEntity} sender - Player getting checked
   * @param {JSEntity} receiver - Player whose group list is being checked
   * @param {string} groupName - Group name being checked
   * @returns If sender is in receiver's contacts
   **/
  function hasGroup(sender, receiver, groupName) {
    var nbt = null;
    if (receiver.isWearingFullSuit()) {
      if (receiver.getWornHelmet().nbt().hasKey("computerID")) {
        nbt = receiver.getWornHelmet().nbt();
      };
      if (receiver.getWornChestplate().nbt().hasKey("computerID")) {
        nbt = receiver.getWornChestplate().nbt();
      };
      if (receiver.getWornLeggings().nbt().hasKey("computerID")) {
        nbt = receiver.getWornLeggings().nbt();
      };
      if (receiver.getWornBoots().nbt().hasKey("computerID")) {
        nbt = receiver.getWornBoots().nbt();
      };
    };
    var result = false;
    if (nbt.hasKey("groups")) {
      var groupIndex = getGroupArray(receiver).indexOf(groupName);
      if (groupIndex > -1) {
        var members = nbt.getTagList("groups").getCompoundTag(groupIndex).getStringList("members");
        var memberIndex = system.getStringArray(members).indexOf(sender.getName());
        if (memberIndex > -1) {
          result = true;
        };
      };
    };
    return result;
  };
  /**
   * Sends message in group format
   * @param {JSEntity} entity - Entity recieving message
   * @param {string} groupName - Name of group
   * @param {string} sender - Name of entity sending message
   * @param {string} message - Message content
   **/
  function groupMessage(entity, groupName, sender, message) {
    if (PackLoader.getSide() == "SERVER") {
      entity.as("PLAYER").addChatMessage("[" + groupName + "]>" + sender + "> " + message);
    };
  };
  /**
   * Turns NBT String List into an array for easier use in code
   * @param {JSEntity} entity - Entity to create group array from
   * @returns Array of group names
   **/
  function getGroupArray(entity) {
    var nbt = null;
    if (entity.isWearingFullSuit()) {
      if (entity.getWornHelmet().nbt().hasKey("computerID")) {
        nbt = entity.getWornHelmet().nbt();
      };
      if (entity.getWornChestplate().nbt().hasKey("computerID")) {
        nbt = entity.getWornChestplate().nbt();
      };
      if (entity.getWornLeggings().nbt().hasKey("computerID")) {
        nbt = entity.getWornLeggings().nbt();
      };
      if (entity.getWornBoots().nbt().hasKey("computerID")) {
        nbt = entity.getWornBoots().nbt();
      };
    };
    var groupList = nbt.getTagList("groups");
    var count = groupList.tagCount();
    var result = [];
    for (i=0;i<count;i++) {
      result.push(groupList.getCompoundTag(i).getString("groupName"));
    };
    return result;
  };
  return {
    name: "groupMessaging",
    moduleMessageName: "Group Messaging",
    type: 2,
    modeID: "group",
    chatModeInfo: "<n>You are now in <nh>group<n> mode!",
    messageHandler: function (entity, name, range) {
      var message = entity.getData("skyhighocs:dyn/entry");
      var activeChat = entity.getData("skyhighocs:dyn/active_chat");
      var foundPlayers = [];
      var groupName = "";
      var nbt = null;
      if (entity.isWearingFullSuit()) {
        if (entity.getWornHelmet().nbt().hasKey("computerID")) {
          nbt = entity.getWornHelmet().nbt();
        };
        if (entity.getWornChestplate().nbt().hasKey("computerID")) {
          nbt = entity.getWornChestplate().nbt();
        };
        if (entity.getWornLeggings().nbt().hasKey("computerID")) {
          nbt = entity.getWornLeggings().nbt();
        };
        if (entity.getWornBoots().nbt().hasKey("computerID")) {
          nbt = entity.getWornBoots().nbt();
        };
      };
      if (nbt != null) {
        if (nbt.getTagList("groups").tagCount() > 0) {
          var group = nbt.getTagList("groups").getCompoundTag(activeChat);
          groupName = group.getString("groupName");
          var members = system.getStringArray(group.getStringList("members"));
          var entities = entity.world().getEntitiesInRangeOf(entity.pos(), range);
          entities.forEach(player => {
            if (player.is("PLAYER") && members.indexOf(player.getName()) > -1) {
              foundPlayers.push(player);
            };
          });
        } else {
          system.moduleMessage(this, entity, "<e>You have no groups to message!")
        };
      };
      if (foundPlayers.length > 0) {
        foundPlayers.forEach(player => {
          if (system.hasComputer(player)) {
            if (hasGroup(entity, player, groupName)) {
              groupMessage(player, groupName, name, message);
            };
          };
        });
        groupMessage(entity, groupName, name, message);
      };
    },
    chatInfo: function (entity, manager, chat) {
      var nbt = null;
      if (entity.isWearingFullSuit()) {
        if (entity.getWornHelmet().nbt().hasKey("computerID")) {
          nbt = entity.getWornHelmet().nbt();
        };
        if (entity.getWornChestplate().nbt().hasKey("computerID")) {
          nbt = entity.getWornChestplate().nbt();
        };
        if (entity.getWornLeggings().nbt().hasKey("computerID")) {
          nbt = entity.getWornLeggings().nbt();
        };
        if (entity.getWornBoots().nbt().hasKey("computerID")) {
          nbt = entity.getWornBoots().nbt();
        };
      };
      if (nbt != null) {
        if (nbt.hasKey("groups")) {
          if (nbt.getTagList("groups").tagCount() > 0) {
            var groupList = system.getGroupArray(entity);
            if (typeof chat === "string") {
              var chatIndex = groupList.indexOf(chat);
              if (chatIndex > -1) {
                manager.setData(entity, "skyhighocs:dyn/active_chat", chatIndex);
              } else {
                system.moduleMessage(this, entity, "<e>You do not have <eh>" + chat + "<e> as a group!");
                return;
              };
            } else {
              if (entity.getData("skyhighocs:dyn/active_chat") > (groupList.length-1)) {
                manager.setData(entity, "skyhighocs:dyn/active_chat", 0);
              };
            };
            var group = groupList[entity.getData("skyhighocs:dyn/active_chat")];
            system.moduleMessage(this, entity, "<n>You are now messaging <nh>" + group + "<n>!");
          } else {
            system.moduleMessage(this, entity, "<e>You do not have any groups!");
          };
        } else {
          system.moduleMessage(this, entity, "<e>You do not have any groups!");
        };
      };
    },
  };
};

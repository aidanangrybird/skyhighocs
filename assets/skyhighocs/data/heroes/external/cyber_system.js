//If I see anyone steal this, I will be very mad as I have spent a lot of time working on this to get it working well
//So please don't steal this, it will look very bad on you

regex = /((<ob>))|(<n>)|(<nh>)|(<s>)|(<sh>)|(<e>)|(<eh>)|(<r>)/gm;

var formatting = {
  "<ob>": "\u00A7k",
  "<n>": "\u00A7b",
  "<nh>": "\u00A7a",
  "<s>": "\u00A7a",
  "<sh>": "\u00A7e",
  "<e>": "\u00A7c",
  "<eh>": "\u00A76",
  "<r>": "\u00A7r"
};

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function asssignID(entity, manager, cyberName, color) {
  manager.setString(entity.getWornHelmet().nbt(), "cyberID", cyberName+"-"+color);
  if (!entity.getWornHelmet().nbt().hasKey("computerID")) {
    if (PackLoader.getSide() == "SERVER") {
      var computerID = Math.random().toFixed(8).toString().substring(2);
      manager.setString(entity.getWornHelmet().nbt(), "computerID", computerID);
    };
  };
};

/**
 * Checks if an entity is cyber
 * @param {JSEntity} entity - Entity getting checked
 * @returns If the entity is cyber
 **/
function isCyber(entity) {
  return entity.getWornHelmet().nbt().hasKey("cyberID");
};

/**
 * Gets the Cyber ID
 * @param {JSEntity} entity - Entity getting checked
 * @returns The Cyber ID
 **/
function getID(entity) {
  return entity.getWornHelmet().nbt().getString("cyberID");
};

/**
 * Checks if an entity has a device that is a computer
 * @param {JSEntity} entity - Entity getting checked
 * @returns If the entity has a device that is a computer
 **/
function hasComputer(entity) {
  return entity.getWornHelmet().nbt().hasKey("computerID") || entity.getWornChestplate().nbt().hasKey("computerID") || entity.getWornLeggings().nbt().hasKey("computerID") || entity.getWornBoots().nbt().hasKey("computerID");
};

/**
 * Applies formatting to system messages
 * @param {string} input - Message to format
 * @returns Formatted message
 **/
function formatSystem(input) {
  output = input.replace(regex, function(thing) {
    return formatting[thing];
  });
  return output;
};

/**
 * Turns NBT String List into an array for easier use in code
 * @param {JSNBTList} nbtList - NBTList
 * @returns Array of values from the NBTList
 **/
function getStringArray(nbtList) {
  var count = nbtList.tagCount();
  var result = [];
  for (i=0;i<count;i++) {
    result.push(nbtList.getString(i));
  };
  return result;
};
/**
 * Turns NBT String List into an array for easier use in code
 * @param {JSEntity} entity - Entity to create group array from
 * @returns Array of group names
 **/
function getGroupArray(entity) {
  var groupList = entity.getWornHelmet().nbt().getTagList("groups");
  var count = groupList.tagCount();
  var result = [];
  for (i=0;i<count;i++) {
    result.push(groupList.getCompoundTag(i).getString("groupName"));
  };
  return result;
};
/**
 * Turns NBT String List into an array for easier use in code
 * @param {JSEntity} entity - Entity to create group array from
 * @returns Array of group names and member counts
 **/
function getGroupArrayMembers(entity) {
  var groupList = entity.getWornHelmet().nbt().getTagList("groups");
  var count = groupList.tagCount();
  var result = [];
  for (i=0;i<count;i++) {
    var group = groupList.getCompoundTag(i);
    var entry = {
      "groupName": group.getString("groupName"),
      "memberCount": group.getStringList("members").tagCount(),
    };
    result.push(entry);
  };
  return result;
};
/**
 * Disables a module
 * @param {JSEntity} entity - Required
 * @param {JSDataManager} manager - Required
 * @param {Array} moduleList - List of available module names
 * @param {string} moduleName - Module name to disable
 **/
function disableModule(player, manager, moduleList, moduleName) {
  var moduleIndex = moduleList.indexOf(moduleName);
  if (moduleIndex > -1) {
    if (!player.getWornHelmet().nbt().hasKey("disabledModules")) {
      var disabledModules = manager.newTagList();
      manager.appendString(disabledModules, moduleName);
      manager.setTagList(player.getWornHelmet().nbt(), "disabledModules", disabledModules);
      systemMessage(player, "<s>Module <sh>" + moduleName + "<s> disabled!");
    } else {
      var disabledModules = player.getWornHelmet().nbt().getStringList("disabledModules");
      var disabledModulesIndex = getStringArray(disabledModules).indexOf(moduleName);
      if (disabledModulesIndex > -1) {
        systemMessage(player, "<e>You have already disabled module <eh>" + moduleName + "<e>!");
      } else {
        systemMessage(player, "<s>Module <sh>" + moduleName + "<s> disabled!");
        if (modules[moduleIndex].hasOwnProperty(whenDisable)) {
          modules[moduleIndex].whenDisable(player, manager);
        };
        manager.appendString(disabledModules, moduleName);
      };
    };
  } else {
    systemMessage(player, "<e>Unknown module of name <eh>" + moduleName + "<e>!");
  };
};
/**
 * Enables module
 * @param {JSPlayer} player - Player cutting BrotherBand
 * @param {JSDataManager} manager - Required
 * @param {Array} moduleList - List of available module names
 * @param {integer} moduleName - Username of player cutting BrotherBand with
 **/
function enableModule(player, manager, moduleList, moduleName) {
  if (moduleList.indexOf(moduleName) > -1) {
    if (!player.getWornHelmet().nbt().hasKey("disabledModules")) {
      systemMessage(player, "<e>You have no disabled modules to enable!");
    } else {
      var disabledModules = player.getWornHelmet().nbt().getStringList("disabledModules");
      if (disabledModules.tagCount() == 0) {
        systemMessage(player, "<e>You have no disabled modules to enable!");
      } else {
        var index = getStringArray(disabledModules).indexOf(moduleName);
        if (index < 0) {
          systemMessage(player, "<e>Module <eh>" + moduleName + "<e> is already enabled!");
        } else {
          systemMessage(player, "<s>Successfully enabled <sh>" + moduleName + "<s> module!");
          manager.removeTag(disabledModules, index);
        };
      };
    };
  } else {
    systemMessage(player, "<e>Unknown module of name <eh>" + moduleName + "<e>!");
  };
};
/**
 * Checks if a module is disabled
 * @param {JSEntity} entity - Player getting checked
 * @param {string} moduleName - Module being checked if disabled
 * @returns If module is disabled
 **/
function isModuleDisabled(entity, moduleName) {
  var disabledModules = entity.getWornHelmet().nbt().getStringList("disabledModules");
  var modulesDisabled = getStringArray(disabledModules);
  var result = false;
  modulesDisabled.forEach(entry => {
    if (entry == moduleName) {
      result = true;
    };
  });
  return result;
};
/**
 * Prints message to player's chat
 * @param {JSPlayer} player - Required
 * @param {string} message - Message to be shown to player
 **/
function chatMessage(player, message) {
  if (PackLoader.getSide() == "SERVER") {
    player.as("PLAYER").addChatMessage(message);
  };
};
/**
 * Sends system message, formatting tags are below
 * ```
 * "<ob>": "\u00A7k"
 * "<n>": "\u00A7b"
 * "<nh>": "\u00A7a"
 * "<s>": "\u00A7a"
 * "<sh>": "\u00A7e"
 * "<e>": "\u00A7c"
 * "<eh>": "\u00A76"
 * "<r>": "\u00A7r"
 * ```
 * @param {JSPlayer} player - Entity recieving message
 * @param {string} message - Message content
 **/
function systemMessage(player, message) {
  var id = getID(player);
  var color = id.split("-")[1];
  chatMessage(player, formatSystem("\u00A7" + color + "SYSTEM<r>> " + message));
};
/**
 * Sends message in group format
 * @param {string} message - Entity recieving message
 **/
function logMessage(message) {
  PackLoader.print(message);
};

/**
 * Initializes cyber system
 * @param {object} moduleList - cyber system modules
 * @param {string} cyberName - Required, you'll be happy that is a thing or else debugging is painful
 * @param {string} satellite - Required, or other cybers will not recognize this cyber as a cyber
 **/
function initSystem(moduleList, name, normalName, color) {
  var cyberInstance = this;
  primaryPiece = 1;
  //Type 1 - commands (can have data management)
  /** @var type1Specs - Type 1 Specs */
  var type1Specs = ["command", "commandHandler", "helpMessage"];
  //Type 2 - messaging only
  /** @var type2Specs - Type 2 Specs */
  var type2Specs = ["messageHandler", "chatModeInfo", "chatInfo", "modeID"];
  //Type 3 - commands messaging and data management
  /** @var type3Specs - Type 3 Specs */
  var type3Specs = ["command", "messageHandler", "commandHandler", "chatModeInfo", "chatInfo", "helpMessage", "modeID"];
  //Type 11 - commands (can have data management) with disabled thing
  /** @var type11Specs - Type 11 Specs */
  var type11Specs = ["command", "commandHandler", "helpMessage", "powers", "whenDisabled"];
  //Type 12 - cyber module
  /** @var type12Specs - Type 12 Specs */
  var type12Specs = ["command", "commandHandler", "helpMessage", "isModifierEnabled", "powers", "whenDisabled"];
  //Type 13 - cyber module
  /** @var type13Specs - Type 13 Specs */
  var type13Specs = ["command", "commandHandler", "helpMessage", "keyBinds", "isKeyBindEnabled", "isModifierEnabled", "powers", "whenDisabled"];
  //Type 14 - cyber module
  /** @var type14Specs - Type 14 Specs */
  var type14Specs = ["command", "commandHandler", "helpMessage", "isModifierEnabled", "initAttributeProfiles", "initDamageProfiles", "getAttributeProfiles", "getDamageProfiles", "powers", "whenDisabled"];
  /** @var modules - Array of modules */
  var modules = [];
  /** @var moduleNames - Module names */
  var moduleNames = [];
  /** @var cyberModules - Cyber module names */
  var cyberModules = [];
  /** @var normalModules - Normal module names */
  var normalModules = [];
  /** @var commands - Command prefixes */
  var commands = [];
  /** @var commandIndexes - Indexes of command handlers */
  var commandIndexes = [];
  /** @var messagingIndexes - Indexes of messaging handlers */
  var messagingIndexes = [];
  /** @var chatModes - Chat modes */
  var chatModes = [];
  /** @var modifierIndexes - Indexes of modifier capable modules */
  var modifierIndexes = [];
  /** @var keyBindIndexes - Indexes of keybind capable modules */
  var keyBindIndexes = [];
  /** @var attributeProfileIndexes - Indexes of attribute profile capable modules */
  var attributeProfileIndexes = [];
  /** @var damageProfileIndexes - Indexes of damage profile capable modules */
  var damageProfileIndexes = [];
  /** @var powerArray - Array of powers to add */
  var powerArray = [];
  /** @var disguisedName - disguised name */
  var disguisedName = normalName;
  /** @var cyberName - cyber name */
  var cyberName = name;
  var hasError = false;
  var errors = [];
  logMessage("Attempting to initialize " + ((moduleList.length > 1) ? moduleList.length + " modules" : moduleList.length + " module") + " on cyber " + cyberName + "!");
  moduleList.forEach(module => {
    if (module.hasOwnProperty("initModule")) {
      var moduleInit = module.initModule(cyberInstance);
      if (moduleInit.hasOwnProperty("type")) {
        switch (moduleInit.type) {
          case 1:
            type1Specs.forEach(spec => {
              if (!moduleInit.hasOwnProperty(spec)) {
                errors.push(spec);
                hasError = true;
              };
            });
            if (hasError) {
              logMessage("Module \"" + moduleInit.name + "\" cannot be initialized!");
              errors.forEach(error => {
                logMessage("Module is missing the \"" + error + "\" specification!");
              });
              errors = [];
            } else {
              modules.push(moduleInit);
              moduleNames.push(moduleInit.name);
              commands.push(moduleInit.command);
              commandIndexes.push(modules.length-1);
              normalModules.push(moduleInit.name);
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on cyber " + cyberName + "!");
            };
            hasError = false;
            break;
          case 2:
            type2Specs.forEach(spec => {
              if (!moduleInit.hasOwnProperty(spec)) {
                errors.push(spec);
                hasError = true;
              };
            });
            if (hasError) {
              logMessage("Module \"" + moduleInit.name + "\" cannot be initialized!");
              errors.forEach(error => {
                logMessage("Module is missing the \"" + error + "\" specification!");
              });
              errors = [];
            } else {
              modules.push(moduleInit);
              moduleNames.push(moduleInit.name);
              chatModes.push(moduleInit.modeID);
              messagingIndexes.push(modules.length-1);
              normalModules.push(moduleInit.name);
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on cyber " + cyberName + "!");
            };
            hasError = false;
            break;
          case 3:
            type3Specs.forEach(spec => {
              if (!moduleInit.hasOwnProperty(spec)) {
                errors.push(spec);
                hasError = true;
              };
            });
            if (hasError) {
              logMessage("Module \"" + moduleInit.name + "\" cannot be initialized!");
              errors.forEach(error => {
                logMessage("Module is missing the \"" + error + "\" specification!");
              });
              errors = [];
            } else {
              modules.push(moduleInit);
              moduleNames.push(moduleInit.name);
              commands.push(moduleInit.command);
              chatModes.push(moduleInit.modeID);
              commandIndexes.push(modules.length-1);
              messagingIndexes.push(modules.length-1);
              normalModules.push(moduleInit.name);
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on cyber " + cyberName + "!");
            };
            hasError = false;
            break;
          case 11:
            type11Specs.forEach(spec => {
              if (!moduleInit.hasOwnProperty(spec)) {
                errors.push(spec);
                hasError = true;
              };
            });
            if (hasError) {
              logMessage("Module \"" + moduleInit.name + "\" cannot be initialized!");
              errors.forEach(error => {
                logMessage("Module is missing the \"" + error + "\" specification!");
              });
              errors = [];
            } else {
              modules.push(moduleInit);
              moduleNames.push(moduleInit.name);
              commands.push(moduleInit.command);
              commandIndexes.push(modules.length-1);
              cyberModules.push(moduleInit.name);
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on cyber " + cyberName + "!");
            };
            hasError = false;
            break;
          case 12:
            type12Specs.forEach(spec => {
              if (!moduleInit.hasOwnProperty(spec)) {
                errors.push(spec);
                hasError = true;
              };
            });
            if (hasError) {
              logMessage("Module \"" + moduleInit.name + "\" cannot be initialized!");
              errors.forEach(error => {
                logMessage("Module is missing the \"" + error + "\" specification!");
              });
              errors = [];
            } else {
              modules.push(moduleInit);
              moduleNames.push(moduleInit.name);
              commands.push(moduleInit.command);
              commandIndexes.push(modules.length-1);
              cyberModules.push(moduleInit.name);
              var modulePowers = moduleInit.powers;
              modulePowers.forEach(power => {
                powerArray.push(power);
              });
              modifierIndexes.push(modules.length-1);
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on cyber " + cyberName + "!");
            };
            hasError = false;
            break;
          case 13:
            type13Specs.forEach(spec => {
              if (!moduleInit.hasOwnProperty(spec)) {
                errors.push(spec);
                hasError = true;
              };
            });
            if (hasError) {
              logMessage("Module \"" + moduleInit.name + "\" cannot be initialized!");
              errors.forEach(error => {
                logMessage("Module is missing the \"" + error + "\" specification!");
              });
              errors = [];
            } else {
              modules.push(moduleInit);
              moduleNames.push(moduleInit.name);
              commands.push(moduleInit.command);
              commandIndexes.push(modules.length-1);
              cyberModules.push(moduleInit.name);
              var modulePowers = moduleInit.powers;
              modulePowers.forEach(power => {
                powerArray.push(power);
              });
              keyBindIndexes.push(modules.length-1);
              modifierIndexes.push(modules.length-1);
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on cyber " + cyberName + "!");
            };
            hasError = false;
            break;
          case 14:
            type14Specs.forEach(spec => {
              if (!moduleInit.hasOwnProperty(spec)) {
                errors.push(spec);
                hasError = true;
              };
            });
            if (hasError) {
              logMessage("Module \"" + moduleInit.name + "\" cannot be initialized!");
              errors.forEach(error => {
                logMessage("Module is missing the \"" + error + "\" specification!");
              });
              errors = [];
            } else {
              modules.push(moduleInit);
              moduleNames.push(moduleInit.name);
              commands.push(moduleInit.command);
              commandIndexes.push(modules.length-1);
              cyberModules.push(moduleInit.name);
              var modulePowers = moduleInit.powers;
              modulePowers.forEach(power => {
                powerArray.push(power);
              });
              attributeProfileIndexes.push(modules.length-1);
              damageProfileIndexes.push(modules.length-1);
              modifierIndexes.push(modules.length-1);
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on cyber " + cyberName + "!");
            };
            hasError = false;
            break;
          default:
            logMessage("Module at position " + moduleList.indexOf(module) + " does not have valid type value!");
        };
      } else {
        logMessage("Module at position " + moduleList.indexOf(module) + " does not have a type value!");
      };
    } else {
      logMessage("Module at position " + moduleList.indexOf(module) + " cannot be initialized!");
    };
  });
  logMessage("Successfully initialized " + modules.length + " out of " + ((moduleList.length > 1) ? moduleList.length + " modules" : moduleList.length + " module") + " on cyber " + cyberName + "!");
  function cycleChatModes(player, manager) {
    manager.setData(player, "skyhighheroes:dyn/chat_mode", player.getData("skyhighheroes:dyn/chat_mode") + 1);
    if (player.getData("skyhighheroes:dyn/chat_mode") > (messagingIndexes.length-1)) {
      manager.setData(player, "skyhighheroes:dyn/chat_mode", 0);
    };
    var chatMode = player.getData("skyhighheroes:dyn/chat_mode");
    systemMessage(player, modules[messagingIndexes[chatMode]].chatModeInfo);
    modules[messagingIndexes[chatMode]].chatInfo(player, manager);
    return true;
  };
  function cycleChats(player, manager) {
    var chatMode = player.getData("skyhighheroes:dyn/chat_mode");
    modules[messagingIndexes[chatMode]].chatInfo(player, manager);
    return true;
  };
  function switchChatModes(player, manager, mode) {
    var modeIndex = chatModes.indexOf(mode);
    if (modeIndex > -1) {
      manager.setData(player, "skyhighheroes:dyn/chat_mode", modeIndex);
      var chatMode = player.getData("skyhighheroes:dyn/chat_mode");
      systemMessage(player, modules[messagingIndexes[chatMode]].chatModeInfo);
      modules[messagingIndexes[chatMode]].chatInfo(player, manager);
    };
  };
  function switchChats(player, manager, chat) {
    var chatMode = player.getData("skyhighheroes:dyn/chat_mode");
    modules[messagingIndexes[chatMode]].chatInfo(player, manager, chat);
  };
  function systemInfo(entity) {
    var normalModulesMessage = (normalModules.length > 1) ? "<n>Loaded " + normalModules.length + " modules: " : "<n>Loaded " + normalModules.length + " module: ";
    normalModules.forEach(moduleName => {
      if (normalModules.indexOf(moduleName) == 0) {
        normalModulesMessage = normalModulesMessage + ((isModuleDisabled(entity, moduleName))?"<eh>":"<nh>") + moduleName;
      } else {
        normalModulesMessage = normalModulesMessage + ((isModuleDisabled(entity, moduleName))?"<n>, <eh>":"<n>, <nh>") + moduleName;
      };
    });
    var cyberModulesMessage = (cyberModules.length > 1) ? "<n>Loaded " + cyberModules.length + " cyber systems: " : "<n>Loaded " + cyberModules.length + " cyber system: ";
    cyberModules.forEach(moduleName => {
      if (cyberModules.indexOf(moduleName) == 0) {
        cyberModulesMessage = cyberModulesMessage + ((isModuleDisabled(entity, moduleName))?"<eh>":"<nh>") + moduleName;
      } else {
        cyberModulesMessage = cyberModulesMessage + ((isModuleDisabled(entity, moduleName))?"<n>, <eh>":"<n>, <nh>") + moduleName;
      };
    });
    systemMessage(entity, "<n>cyberOS");
    systemMessage(entity, normalModulesMessage);
    systemMessage(entity, cyberModulesMessage);
    systemMessage(entity, "<n>computerID: <nh>" + entity.getWornHelmet().nbt().getString("computerID"));
  };
  function status(entity) {
    var date = new Date();
    systemMessage(entity, "<n>Date: <nh>" + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear());
    systemMessage(entity, "<n>Time: <nh>" + date.getHours() + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : "0"+date.getMinutes()));
    systemMessage(entity, "<n>Current location: <nh>" + entity.posX().toFixed(0) + "<n>, <nh>" + entity.posY().toFixed(0) + "<n>, <nh>" + entity.posZ().toFixed(0));
    systemMessage(entity, "<n>Biome: <nh>" + entity.world().getLocation(entity.pos()).biome());
    systemMessage(entity, "<n>Do <nh>!help<n> for available commands!");
  };
  return {
    /**
     * Power stuff (I hate that I had to do it this way)
     * @param {JSHero} hero - Required
     **/
    addPowers: (hero) => {
      if (powerArray.length == 0) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body");
      };
      if (powerArray.length == 1) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0]);
      };
      if (powerArray.length == 2) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1]);
      };
      if (powerArray.length == 3) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2]);
      };
      if (powerArray.length == 4) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3]);
      };
      if (powerArray.length == 5) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4]);
      };
      if (powerArray.length == 6) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5]);
      };
      if (powerArray.length == 7) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6]);
      };
      if (powerArray.length == 8) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7]);
      };
      if (powerArray.length == 9) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8]);
      };
      if (powerArray.length == 10) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8], powerArray[9]);
      };
      if (powerArray.length == 11) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8], powerArray[9], powerArray[10]);
      };
      if (powerArray.length == 12) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8], powerArray[9], powerArray[10], powerArray[11]);
      };
      if (powerArray.length == 13) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8], powerArray[9], powerArray[10], powerArray[11], powerArray[12]);
      };
      if (powerArray.length == 14) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8], powerArray[9], powerArray[10], powerArray[11], powerArray[12], powerArray[13]);
      };
      if (powerArray.length == 15) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8], powerArray[9], powerArray[10], powerArray[11], powerArray[12], powerArray[13], powerArray[14]);
      };
      if (powerArray.length >= 16) {
        hero.addPowers("skyhighocs:cybernetic_os", "skyhighocs:cybernetic_body", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8], powerArray[9], powerArray[10], powerArray[11], powerArray[12], powerArray[13], powerArray[14], powerArray[15]);
      };
    },
    /**
     * Basic keybinds
     * @param {JSHero} hero - Required
     **/
    keyBinds: (hero) => {
      hero.addKeyBind("SHAPE_SHIFT", "Send message/Enter command", 5);
      modules.forEach(module => {
        if (module.hasOwnProperty("keyBinds")) {
          module.keyBinds(hero);
        };
      });
    },
    /**
     * Attribute profile stuff
     * @param {JSEntity} entity - Required
     * @returns attribute profile
     **/
    getAttributeProfile: function (entity) {
      var result = null;
      if (entity.getData("skyhighocs:dyn/power_timer") < 1) {
        result = "SHUT_DOWN";
      };
      if (attributeProfileIndexes.length == 1) {
        if (isModuleDisabled(entity, modules[attributeProfileIndexes[0]].name)) {
          result = modules[attributeProfileIndexes[0]].getAttributeProfile(entity);
        };
      };
      if (attributeProfileIndexes.length == 2) {
        if (isModuleDisabled(entity, modules[attributeProfileIndexes[0]].name)) {
          result = modules[attributeProfileIndexes[0]].getAttributeProfile(entity);
        };
        if (isModuleDisabled(entity, modules[attributeProfileIndexes[1]].name)) {
          result = modules[attributeProfileIndexes[1]].getAttributeProfile(entity);
        };
      };
      if (attributeProfileIndexes.length == 3) {
        if (isModuleDisabled(entity, modules[attributeProfileIndexes[0]].name)) {
          result = modules[attributeProfileIndexes[0]].getAttributeProfile(entity);
        };
        if (isModuleDisabled(entity, modules[attributeProfileIndexes[1]].name)) {
          result = modules[attributeProfileIndexes[1]].getAttributeProfile(entity);
        };
        if (isModuleDisabled(entity, modules[attributeProfileIndexes[2]].name)) {
          result = modules[attributeProfileIndexes[2]].getAttributeProfile(entity);
        };
      };
      return result;
    },
    /**
     * Damage profile stuff
     * @param {JSEntity} entity - Required
     * @returns damage profile
     **/
    getDamageProfile: function (entity) {
      var result = null;
      if (entity.getData("skyhighocs:dyn/power_timer") < 1) {
        result = null;
      };
      if (damageProfileIndexes.length == 1) {
        if (isModuleDisabled(entity, modules[damageProfileIndexes[0]].name)) {
          result = modules[damageProfileIndexes[0]].getDamageProfile(entity);
        };
      };
      if (damageProfileIndexes.length == 2) {
        if (isModuleDisabled(entity, modules[damageProfileIndexes[0]].name)) {
          result = modules[damageProfileIndexes[0]].getDamageProfile(entity);
        };
        if (isModuleDisabled(entity, modules[damageProfileIndexes[1]].name)) {
          result = modules[damageProfileIndexes[1]].getDamageProfile(entity);
        };
      };
      if (damageProfileIndexes.length == 3) {
        if (isModuleDisabled(entity, modules[damageProfileIndexes[0]].name)) {
          result = modules[damageProfileIndexes[0]].getDamageProfile(entity);
        };
        if (isModuleDisabled(entity, modules[damageProfileIndexes[1]].name)) {
          result = modules[damageProfileIndexes[1]].getDamageProfile(entity);
        };
        if (isModuleDisabled(entity, modules[damageProfileIndexes[2]].name)) {
          result = modules[damageProfileIndexes[2]].getDamageProfile(entity);
        };
      };
      return result;
    },
    initProfiles: function (hero) {
      hero.addAttribute("SPRINT_SPEED", 0.2, 1);
      hero.addAttribute("STEP_HEIGHT", 0.5, 0);
      hero.addAttribute("JUMP_HEIGHT", 3.0, 0);
      hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
      hero.addAttribute("KNOCKBACK", 2.5, 0);
      hero.addAttribute("IMPACT_DAMAGE", 50.0, 0);
      hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
      hero.addAttributeProfile("SHUT_DOWN", function (profile) {
        profile.addAttribute("BASE_SPEED", -1.0, 1);
        profile.addAttribute("SPRINT_SPEED", -1.0, 1);
        profile.addAttribute("WEAPON_DAMAGE", -1.0, 1);
        profile.addAttribute("JUMP_HEIGHT", -1.0, 1);
        profile.addAttribute("STEP_HEIGHT", -1.0, 1);
        profile.addAttribute("KNOCKBACK", -1.0, 1);
        profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
      });
      damageProfileIndexes.forEach(index => {
        modules[index].initDamageProfiles(hero);
      });
      attributeProfileIndexes.forEach(index => {
        modules[index].initAttributeProfiles(hero);
      });
    },
    /**
     * Keybind enabled stuff for em
     * @param {JSEntity} entity - Required
     * @param {string} keyBind - Required
     **/
    isKeyBindEnabled: function (entity, keyBind) {
      if (entity.getData("skyhighocs:dyn/power_timer") < 1) {
        return false;
      };
      if (keyBindIndexes.length == 1) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 2) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 3) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 4) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 5) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 6) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 7) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 8) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[7]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 9) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[7]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[8]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 10) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[7]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[8]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[9]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 11) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[7]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[8]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[9]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[10]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 12) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[7]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[8]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[9]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[10]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[11]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 13) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[7]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[8]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[9]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[10]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[11]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[12]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 14) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[7]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[8]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[9]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[10]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[11]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[12]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[13]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length == 15) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[7]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[8]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[9]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[10]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[11]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[12]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[13]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[14]].isKeyBindEnabled(entity, keyBind);
      };
      if (keyBindIndexes.length >= 16) {
        return modules[keyBindIndexes[0]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[1]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[2]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[3]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[4]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[5]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[6]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[7]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[8]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[9]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[10]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[11]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[12]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[13]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[14]].isKeyBindEnabled(entity, keyBind) || modules[keyBindIndexes[15]].isKeyBindEnabled(entity, keyBind);
      };
    },
    /**
     * Modifier enabled stuff for em
     * @param {JSEntity} entity - Required
     * @param {string} modifier - Required
     **/
    isModifierEnabled: function (entity, modifier) {
      if (entity.getData("skyhighocs:dyn/power_timer") < 1) {
        return false;
      };
      if (modifierIndexes.length == 1) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 2) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 3) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 4) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 5) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 6) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 7) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 8) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[7]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 9) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[7]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[8]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 10) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[7]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[8]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[9]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 11) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[7]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[8]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[9]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[10]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 12) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[7]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[8]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[9]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[10]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[11]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 13) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[7]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[8]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[9]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[10]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[11]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[12]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 14) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[7]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[8]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[9]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[10]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[11]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[12]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[13]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length == 15) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[7]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[8]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[9]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[10]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[11]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[12]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[13]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[14]].isModifierEnabled(entity, modifier);
      };
      if (modifierIndexes.length >= 16) {
        return modules[modifierIndexes[0]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[1]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[2]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[3]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[4]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[5]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[6]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[7]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[8]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[9]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[10]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[11]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[12]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[13]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[14]].isModifierEnabled(entity, modifier) || modules[modifierIndexes[15]].isModifierEnabled(entity, modifier);
      };
    },
    /**
     * Handles all cyber stuff
     * @param {JSEntity} entity - Required
     * @param {JSDataManager} manager - Required
     **/
    systemHandler: (entity, manager) => {
      if (!entity.getData("skyhighheroes:dyn/system_init")) {
        asssignID(entity, manager, cyberName, color);
        status(entity);
        manager.setData(entity, "skyhighheroes:dyn/system_init", true);
        manager.setData(entity, "skyhighheroes:dyn/primary_piece", primaryPiece);
      };
      if (typeof entity.getData("fiskheroes:disguise") === "string") {
        if (!(entity.getData("fiskheroes:disguise") == cyberName || entity.getData("fiskheroes:disguise") == disguisedName)) {
          if (entity.getData("skyhighocs:dyn/disguised_timer") == 1) {
            manager.setData(entity, "skyhighheroes:dyn/entry", entity.getData("fiskheroes:disguise"));
            manager.setData(entity, "fiskheroes:disguise", disguisedName);
          } else {
            manager.setData(entity, "skyhighheroes:dyn/entry", entity.getData("fiskheroes:disguise"));
            manager.setData(entity, "fiskheroes:disguise", cyberName);
          };
          manager.setData(entity, "fiskheroes:shape_shifting_to", null);
          manager.setData(entity, "fiskheroes:shape_shifting_from", null);
          manager.setData(entity, "fiskheroes:shape_shift_timer", 0);
          var entry = entity.getData("skyhighheroes:dyn/entry");
          if (entry.startsWith("!")) {
            manager.setData(entity, "skyhighheroes:dyn/entry", entry.substring(1));
            var args = entity.getData("skyhighheroes:dyn/entry").split(" ");
            switch (args[0]) {
              case "systemInfo":
                systemInfo(entity);
                break;
              case "status":
                status(entity);
                break;
              case "powerOff":
                manager.setData(entity, "skyhighocs:dyn/powered", false);
                systemMessage(entity, "<n>Powering down!");
                break;
              case "powerOn":
                manager.setData(entity, "skyhighocs:dyn/powered", true);
                systemMessage(entity, "<n>Powering on!");
                break;
              case "help":
                systemMessage(entity, "<n>Available commands:");
                commandIndexes.forEach(index => {
                  var module = modules[index];
                  if (!isModuleDisabled(entity, module.name) && entity.getData("skyhighocs:dyn/power_timer") == 1) {
                    systemMessage(entity, module.helpMessage);
                  };
                });
                systemMessage(entity, "<n>!status <nh>-<n> Shows your current status");
                systemMessage(entity, "<n>!systemInfo <nh>-<n> Shows your system info");
                systemMessage(entity, "<n>!powerOn <nh>-<n> Powers you up");
                systemMessage(entity, "<n>!powerOff <nh>-<n> Powers you down");
                systemMessage(entity, "<n>!help <nh>-<n> Shows this list");
                break;
              case "disable":
                disableModule(entity, manager, moduleNames, args[1]);
                whenDisable(entity, manager, moduleNames, args[1]);
                break;
              case "enable":
                enableModule(entity, manager, moduleNames, args[1]);
                break;
              case "cv":
                systemMessage(entity, entity.getDataOrDefault("skyhighocs:dyn/"+args[1], -1))
              case "chatMode":
                switchChatModes(entity, manager, args[1]);
                break;
              case "msg":
                switchChats(entity, manager, args[1]);
                break;
              default:
                var index = commands.indexOf(args[0]);
                if (index > -1 && entity.getData("skyhighocs:dyn/power_timer") == 1) {
                  var module = modules[commandIndexes[index]];
                  if (!isModuleDisabled(entity, module.name)) {
                    module.commandHandler(entity, manager, args);
                  } else {
                    systemMessage(entity, "<e>Module <eh>" + module.name +"<e> is disabled!");
                  };
                } else {
                  systemMessage(entity, "<e>Unknown command! Try <eh>!help<e> for a list of commands!");
                };
                break;
            }
          } else {
            modules[messagingIndexes[entity.getData("skyhighheroes:dyn/chat_mode")]].messageHandler(entity);
          };
        };
      };
      if (typeof cyberName === "string" && entity.getData("skyhighocs:dyn/disguised_timer") < 1) {
        manager.setData(entity, "fiskheroes:disguise", cyberName);
      };
      if (typeof disguisedName === "string" && entity.getData("skyhighocs:dyn/disguised_timer") == 1) {
        manager.setData(entity, "fiskheroes:disguise", disguisedName);
      };
      var x = entity.posX();
      var y = entity.posY();
      var z = entity.posZ();
      if (entity.world().getDimension() == 0 && entity.posY() >= 4000 && (entity.rotPitch() <= -87.5) && entity.getData("fiskheroes:flight_boost_timer") == 1) {
        manager.setData(entity, "fiskheroes:teleport_dest", manager.newCoords(x, y, z, 2595));
        manager.setData(entity, "fiskheroes:teleport_delay", 6);
      };
      if (entity.world().getDimension() == 2595 && entity.posY() >= 1000 && (entity.rotPitch() <= -87.5) && entity.getData("fiskheroes:flight_boost_timer") == 1) {
        manager.setData(entity, "fiskheroes:teleport_dest", new DimensionalCoords(x, y, z, 0));
        manager.setData(entity, "fiskheroes:teleport_delay", 6);
      };
      var t = entity.getData("skyhighheroes:dyn/superhero_boosting_landing_ticks");
      if (t == 0 && !entity.isSprinting() && !entity.isOnGround() && entity.motionY() < -1.25 && entity.getData("fiskheroes:flight_boost_timer") > 0 && entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() && entity.world().blockAt(entity.pos()).name() == "minecraft:air") {
        manager.setDataWithNotify(entity, "skyhighheroes:dyn/superhero_boosting_landing_ticks", t = 12);
      } else if (t > 0) {
        manager.setData(entity, "skyhighheroes:dyn/superhero_boosting_landing_ticks", --t);
      };
      manager.incrementData(entity, "skyhighheroes:dyn/superhero_boosting_landing_timer", 2, 8, t > 0);
      var pain = (entity.rotPitch() > 12.5 && entity.motionY() < -0.075 && entity.motionY() > -1.25 && (entity.motionZ() > 0.125 || entity.motionZ() < -0.125 || entity.motionX() > 0.125 || entity.motionX() < -0.125)) && !entity.isSprinting() && !entity.isOnGround() && entity.getData("fiskheroes:flight_timer") > 0 && (entity.world().blockAt(entity.pos().add(0, -1, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() || entity.world().blockAt(entity.pos().add(0, -3, 0)).isSolid()) && entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.world().blockAt(entity.pos()).name() == "minecraft:air";
      manager.incrementData(entity, "skyhighheroes:dyn/superhero_landing_timer", 10, 10, pain);
      if (PackLoader.getSide() == "SERVER" && entity.getData("skyhighocs:dyn/power_timer") < 1 && entity.getData("skyhighocs:dyn/power_timer") > 0) {
        var moduleTotal = cyberModules.length;
        var moduleTime = (80/moduleTotal).toFixed(0);
        var currentTime = Math.ceil(entity.getData("skyhighocs:dyn/power_timer")*80);
        if (currentTime % moduleTime == 0) {
          var moduleName = cyberModules[(currentTime/moduleTime)-1];
          var message = !entity.getData("skyhighocs:dyn/powered") ? "<n>Shutting down <nh>" + moduleName + "<n>!" : "<n>Starting up <nh>" + moduleName + "<n>!";
          systemMessage(entity, message);
        };
      };
    }
  };
};
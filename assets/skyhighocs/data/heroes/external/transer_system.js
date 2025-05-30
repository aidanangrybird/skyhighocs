//If I see anyone steal this, I will be very mad as I have spent a lot of time working on this to get it working well
//So please don't steal this, it will look very bad on you

regex = /((<ob>))|(<n>)|(<nh>)|(<s>)|(<sh>)|(<e>)|(<eh>)|(<r>)|(<dragon>)|(<leo>)|(<pegasus>)/gm;

var formatting = {
  "<ob>": "\u00A7k",
  "<n>": "\u00A7b",
  "<nh>": "\u00A7a",
  "<s>": "\u00A7a",
  "<sh>": "\u00A7e",
  "<e>": "\u00A7c",
  "<eh>": "\u00A76",
  "<dragon>": "\u00A72Dragon \u00A77Sky\u00A7r",
  "<leo>": "\u00A76Leo \u00A74Kingdom\u00A7r",
  "<pegasus>": "\u00A7bPegasus \u00A79Magic\u00A7r",
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

var hexColors = {
  "Ace Stelar": "0xFF0000",
  "Aidan Stelar": "0xFF8900",
  "Lucas Stelar": "0xFF0000",
  "Chase Stelar": "0x55FF00",
  "Damien Stelar": "0x8000FF"
};

function assignTranser(entity, manager, satellite) {
  manager.setString(entity.getWornChestplate().nbt(), "satellite", satellite);
  manager.setBoolean(entity.getWornChestplate().nbt(), "Unbreakable", true);
  if (!entity.getWornChestplate().nbt().hasKey("computerID")) {
    if (PackLoader.getSide() == "SERVER") {
      var computerID = Math.random().toFixed(8).toString().substring(2);
      manager.setString(entity.getWornChestplate().nbt(), "computerID", computerID);
    };
  };
  if (!entity.getWornChestplate().nbt().hasKey("systemColor")) {
    switch (satellite) {
      case "dragon":
        manager.setString(entity.getWornChestplate().nbt(), "systemColor", "2");
        break;
      case "leo":
        manager.setString(entity.getWornChestplate().nbt(), "systemColor", "4");
        break;
      case "pegasus":
        manager.setString(entity.getWornChestplate().nbt(), "systemColor", "1");
        break;
      default:
        manager.setString(entity.getWornChestplate().nbt(), "systemColor", "0");
        break;
    };
  };
};

/**
 * Checks if an entity is wearing a transer
 * @param {JSEntity} entity - Entity getting checked
 * @returns If the entity is wearing a transer
 **/
function isWearingTranser(entity) {
  return entity.getWornChestplate().nbt().hasKey("satellite");
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
 * Gets the satellite a transer is assigned to
 * @param {JSEntity} entity - Entity getting checked
 * @returns The satellite a transer is assigned to
 **/
function getAssignedSatellite(entity) {
  return entity.getWornChestplate().nbt().getString("satellite");
};

/**
 * Gets the system color of a transer
 * @param {JSEntity} entity - Entity getting checked
 * @returns The system color of a transer
 **/
function getSystemColor(entity) {
  return "\u00A7" + entity.getWornChestplate().nbt().getString("systemColor");
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
 * Number degree to a cardinal direction
 * @param {JSVector3} base - Base vector
 * @param {JSVector3} other - Vector to measure to
 * @returns Cardinal direction
 **/
function angleToDirection(angle) {
  var direction = angle.toFixed(0);
  if (((angle >= 0) && (angle <= 11.25)) || ((angle > 348.75) && (angle <= 360))) {
    direction = "N";
  };
  if ((angle <= 33.75) && (angle > 11.25)) {
    direction = "NNE";
  };
  if ((angle <= 56.25) && (angle > 33.75)) {
    direction = "NE";
  };
  if ((angle <= 78.75) && (angle > 56.25)) {
    direction = "ENE";
  };
  if ((angle <= 101.25) && (angle > 78.75)) {
    direction = "E";
  };
  if ((angle <= 123.75) && (angle > 101.25)) {
    direction = "ESE";
  };
  if ((angle <= 146.25) && (angle > 123.75)) {
    direction = "SE";
  };
  if ((angle <= 168.75) && (angle > 146.25)) {
    direction = "SSE";
  };
  if ((angle <= 191.25) && (angle > 168.75)) {
    direction = "S";
  };
  if ((angle <= 213.75) && (angle > 191.25)) {
    direction = "SSW";
  };
  if ((angle <= 236.25) && (angle > 213.75)) {
    direction = "SW";
  };
  if ((angle <= 258.75) && (angle > 236.25)) {
    direction = "WSW";
  };
  if ((angle <= 281.25) && (angle > 258.75)) {
    direction = "W";
  };
  if ((angle <= 303.75) && (angle > 281.25)) {
    direction = "WNW";
  };
  if ((angle <= 326.25) && (angle > 303.75)) {
    direction = "NW";
  };
  if ((angle <= 348.75) && (angle > 326.25)) {
    direction = "NNW";
  };
  return direction;
};
/**
 * Gets distance from one vector to another
 * @param {JSVector3} base - Base vector
 * @param {JSVector3} other - Vector to measure to
 * @returns Distance
 **/
function distance(base, other) {
  var distance = base.multiply(1, 0, 1).distanceTo(other.multiply(1, 0, 1)).toFixed(0);
  return distance;
};

/**
 * Gets distance from one vector to another
 * @param {JSVector3} base - Base vector
 * @param {JSVector3} other - Vector to measure to
 * @returns Distance
 **/
function elevation(base, other) {
  var elevation = other.y() - base.y();
  return elevation;
};

/**
 * Gets direction from one vector to another
 * @param {JSVector3} base - Base vector
 * @param {JSVector3} other - Vector to measure to
 * @returns Direction
 **/
function direction(base, other) {
  var angle = (((Math.atan2(-1*(other.z()-base.z()), -1*(other.x()-base.x())) * 180) / Math.PI) + 270) % 360;
  var direction = angleToDirection(angle);
  return direction;
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
 * Disables a module
 * @param {JSEntity} entity - Required
 * @param {JSDataManager} manager - Required
 * @param {Array} moduleList - List of available module names
 * @param {string} moduleName - Module name to disable
 **/
function disableModule(entity, manager, moduleList, moduleName) {
  if (moduleList.indexOf(moduleName) > -1) {
    if (!entity.getWornChestplate().nbt().hasKey("disabledModules")) {
      var disabledModules = manager.newTagList();
      manager.appendString(disabledModules, moduleName);
      manager.setTagList(entity.getWornChestplate().nbt(), "disabledModules", disabledModules);
      systemMessage(entity, "<s>Successfully disabled module <sh>" + moduleName + "<s>!");
    } else {
      var disabledModules = entity.getWornChestplate().nbt().getStringList("disabledModules");
      var disabledModulesIndex = getStringArray(disabledModules).indexOf(moduleName);
      if (disabledModulesIndex > -1) {
        systemMessage(entity, "<e>You have already disabled module <eh>" + moduleName + "<e>!");
      } else {
        systemMessage(entity, "<s>Successfully disabled module <sh>" + moduleName + "<s>!");
        manager.appendString(disabledModules, moduleName);
      };
    };
  } else {
    systemMessage(entity, "<e>Unknown module of name <eh>" + moduleName + "<e>!");
  };
};
/**
 * Enables module
 * @param {JSEntity} entity - Required
 * @param {JSDataManager} manager - Required
 * @param {Array} moduleList - List of available module names
 * @param {integer} moduleName - Name of module to enable
 **/
function enableModule(entity, manager, moduleList, moduleName) {
  if (moduleList.indexOf(moduleName) > -1) {
    if (!entity.getWornChestplate().nbt().hasKey("disabledModules")) {
      systemMessage(entity, "<e>You have no disabled modules to enable!");
    } else {
      var disabledModules = entity.getWornChestplate().nbt().getStringList("disabledModules");
      if (disabledModules.tagCount() == 0) {
        systemMessage(entity, "<e>You have no disabled modules to enable!");
      } else {
        var index = getStringArray(disabledModules).indexOf(moduleName);
        if (index < 0) {
          systemMessage(entity, "<e>Module <eh>" + moduleName + "<e> is already enabled!");
        } else {
          systemMessage(entity, "<s>Successfully enabled <sh>" + moduleName + "<s> module!");
          manager.removeTag(disabledModules, index);
        };
      };
    };
  } else {
    systemMessage(entity, "<e>Unknown module of name <eh>" + moduleName + "<e>!");
  };
};
/**
 * Checks if a module is disabled
 * @param {JSEntity} entity - Player getting checked
 * @param {string} moduleName - Module being checked if disabled
 * @returns If module is disabled
 **/
function isModuleDisabled(entity, moduleName) {
  var disabledModules = entity.getWornChestplate().nbt().getStringList("disabledModules");
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
 * @param {JSEntity} entity - Required
 * @param {string} message - Message to be shown to player
 **/
function chatMessage(entity, message) {
  if (PackLoader.getSide() == "SERVER") {
    entity.as("PLAYER").addChatMessage(message);
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
 * "<dragon>": "\u00A72Dragon \u00A77Sky\u00A7r"
 * "<leo>": "\u00A76Leo \u00A74Kingdom\u00A7r"
 * "<pegasus>": "\u00A7bPegasus \u00A79Magic\u00A7r"
 * "<r>": "\u00A7r"
 * ```
 * @param {JSEntity} entity - Entity recieving message
 * @param {string} message - Message content
 **/
function systemMessage(entity, message) {
  chatMessage(entity, formatSystem(getSystemColor(entity) + "\u00A7ltranserOS\u00A7r> " + message));
};
/**
 * Sends message in group format
 * @param {string} message - Entity recieving message
 **/
function logMessage(message) {
  PackLoader.print("skyhighocs: " + message);
};

/**
 * Sends message from module
 * @param {object} module - Reference 'this' module
 * @param {JSEntity} entity - Entity recieving message
 * @param {string} message - Message content
 **/
function moduleMessage(module, entity, message) {
  var messageName = "\u00A7ltranserOS";
  if (module.hasOwnProperty("moduleMessageName")) {
    messageName = module.moduleMessageName;
  };
  chatMessage(entity, formatSystem(getSystemColor(entity) + messageName + "<r>> " + message));
};
/**
 * Is the setKeyBind stuff for basic transers
 * @param {JSEntity} entity - Required
 * @param {string} keyBind - Required
 **/
function setKeyBind(entity, keyBind) {
  switch (keyBind) {
    case "CYCLE_CHATS":
      return !entity.isSneaking();
    case "CYCLE_CHAT_MODES":
      return entity.isSneaking();
    default:
      return true;
  };
};

function basicTierOverride(entity) {
  return 0;
};

/**
 * Initializes transer system
 * @param {object} moduleList - Transer system modules
 * @param {string} transerName - Required, you'll be happy that is a thing or else debugging is painful
 * @param {string} satellite - Required, or other transers will not recognize this transer as a transer
 **/
function initSystem(moduleList, transerName, satellite) {
  var transerInstance = this;
  var assignedSatellite;
  if (typeof satellite === "string") {
    assignedSatellite = satellite;
  } else {
    assignedSatellite = "";
  };
  //Type 1 - commands (can have data management)
  var type1Specs = ["command", "commandHandler", "helpMessage"];
  //Type 2 - messaging only
  var type2Specs = ["messageHandler", "chatModeInfo", "chatInfo", "modeID"];
  //Type 3 - commands messaging and data management
  var type3Specs = ["command", "messageHandler", "commandHandler", "chatModeInfo", "chatInfo", "helpMessage", "modeID"];
  //Type 7 - EM Being calling signal
  var type7Specs = ["waveHandler", "waveCalling", "selfProfile", "otherProfile"];
  //Type 8 - EM Being
  var type8Specs = ["emBeing", "powers", "keyBinds", "isKeyBindEnabled", "isModifierEnabled", "tickHandler"];
  //Type 9 - EM Wave Change
  var type9Specs = ["waveChange", "powers", "keyBinds", "tierOverride", "properties", "initDamageProfiles", "damageProfiles", "initProfiles", "attributeProfiles", "isKeyBindEnabled", "isModifierEnabled", "tickHandler"];
  /** @var modules - Array of modules */
  var modules = [];
  /** @var moduleNames - Module names */
  var moduleNames = [];
  /** @var commands - Command prefixes */
  var commands = [];
  /** @var commandIndexes - Indexes of command handlers */
  var commandIndexes = [];
  /** @var messagingIndexes - Indexes of messaging handlers */
  var messagingIndexes = [];
  /** @var chatModes - Chat modes */
  var chatModes = [];
  /** @var waveIndex - Wave calling index */
  var waveIndex = -1;
  /** @var emBeingIndex - Index of EM Being */
  var emBeingIndex = -1;
  /** @var waveChangeIndex - Index of EM Wave Change */
  var waveChangeIndex = -1;
  /** @var powerArray - Array of powers to add */
  var powerArray = [];
  /** @var human - Untransformed name */
  var human = null;
  /** @var waveChange - Transformed name */
  var waveChange = null;
  /** @var waveColor - Transformd color */
  var waveColor = null;
  /** @var emBeing - EM Being name */
  var emBeing = null;
  var hasError = false;
  var errors = [];
  logMessage("Attempting to initialize " + ((moduleList.length > 1) ? moduleList.length + " modules" : moduleList.length + " module") + " on transer " + transerName + "!");
  moduleList.forEach(module => {
    if (module.hasOwnProperty("initModule")) {
      var moduleInit = module.initModule(transerInstance);
      if ((moduleInit.hasOwnProperty("type")) ? typeof moduleInit.type === "number" : false) {
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
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on transer " + transerName + "!");
            };
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
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on transer " + transerName + "!");
            };
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
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on transer " + transerName + "!");
            };
            break;
          case 7:
            type7Specs.forEach(spec => {
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
              waveIndex = modules.length-1;
              human = (moduleInit.hasOwnProperty("human")) ? moduleInit.human : null;
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on transer " + transerName + "!");
            };
            break;
          case 8:
            type8Specs.forEach(spec => {
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
              var modulePowers = moduleInit.powers;
              modulePowers.forEach(power => {
                powerArray.push(power);
              });
              emBeingIndex = modules.length-1;
              emBeing = moduleInit.emBeing;
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on transer " + transerName + "!");
            };
            break;
          case 9:
            type9Specs.forEach(spec => {
              if (!moduleInit.hasOwnProperty(spec)) {
                errors.push(spec);
                hasError = true;
              };
            });
            if (hasError) {
              logMessage("Module \"" + moduleInit.name + "\" cannot be initialized on transer " + transerName + "!");
              errors.forEach(error => {
                logMessage("Module is missing the \"" + error + "\" specification!");
              });
              errors = [];
            } else {
              modules.push(moduleInit);
              moduleNames.push(moduleInit.name);
              var modulePowers = moduleInit.powers;
              modulePowers.forEach(power => {
                powerArray.push(power);
              });
              waveChangeIndex = modules.length-1;
              waveColor = moduleInit.color;
              waveChange = moduleInit.waveChange;
              human = moduleInit.human;
              logMessage("Module \"" + moduleInit.name + "\" was initialized successfully on transer " + transerName + "!");
            };
            break;
          default:
            logMessage("Module at position " + moduleList.indexOf(module) + " does not have a valid type value!");
        };
      } else {
        logMessage("Module at position " + moduleList.indexOf(module) + " does not have a valid type value!");
      };
    } else {
      logMessage("Module at position " + moduleList.indexOf(module) + " cannot be initialized!");
    };
  });
  logMessage("Successfully initialized " + modules.length + " out of " + ((moduleList.length > 1) ? moduleList.length + " modules" : moduleList.length + " module") + " on transer " + transerName + "!");
  function cycleChatModes(entity, manager) {
    manager.setData(entity, "skyhighocs:dyn/chat_mode", entity.getData("skyhighocs:dyn/chat_mode") + 1);
    if (entity.getData("skyhighocs:dyn/chat_mode") > (messagingIndexes.length-1)) {
      manager.setData(entity, "skyhighocs:dyn/chat_mode", 0);
    };
    var chatMode = entity.getData("skyhighocs:dyn/chat_mode");
    systemMessage(entity, modules[messagingIndexes[chatMode]].chatModeInfo);
    modules[messagingIndexes[chatMode]].chatInfo(entity, manager);
    return true;
  };
  function cycleChats(entity, manager) {
    var chatMode = entity.getData("skyhighocs:dyn/chat_mode");
    modules[messagingIndexes[chatMode]].chatInfo(entity, manager);
    return true;
  };
  function switchChatModes(entity, manager, mode) {
    var modeIndex = chatModes.indexOf(mode);
    if (modeIndex > -1) {
      manager.setData(entity, "skyhighocs:dyn/chat_mode", modeIndex);
      var chatMode = entity.getData("skyhighocs:dyn/chat_mode");
      systemMessage(entity, modules[messagingIndexes[chatMode]].chatModeInfo);
      modules[messagingIndexes[chatMode]].chatInfo(entity, manager);
    };
  };
  function switchChats(entity, manager, chat) {
    var chatMode = entity.getData("skyhighocs:dyn/chat_mode");
    modules[messagingIndexes[chatMode]].chatInfo(entity, manager, chat);
  };
  function systemInfo(entity) {
    var modulesMessage = (moduleNames.length > 1) ? "<n>Loaded " + moduleNames.length + " modules: " : "<n>Loaded " + moduleNames.length + " module: ";
    moduleNames.forEach(moduleName => {
      if (moduleNames.indexOf(moduleName) == 0) {
        modulesMessage = modulesMessage + ((isModuleDisabled(entity, moduleName))?"<eh>":"<nh>") + moduleName;
      } else {
        modulesMessage = modulesMessage + ((isModuleDisabled(entity, moduleName))?"<n>, <eh>":"<n>, <nh>") + moduleName;
      };
    });
    systemMessage(entity, "<n>transerOS");
    systemMessage(entity, modulesMessage);
    systemMessage(entity, "<n>computerID: <nh>" + entity.getWornChestplate().nbt().getString("computerID"));
  };
  function status(entity) {
    var date = new Date();
    if (typeof human === "string") {
      systemMessage(entity, "<n>Hello <nh>" + human + "<n>!");
    } else {
      systemMessage(entity, "<n>Hello <nh>" + entity.getName() + "<n>!");
    };
    systemMessage(entity, "<n>It is <nh>" + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear());
    systemMessage(entity, "<n>The current time is <nh>" + date.getHours() + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : "0"+date.getMinutes()));
    systemMessage(entity, "<n>Your current location is<nh> " + entity.posX().toFixed(0) + "<n>, <nh>" + entity.posY().toFixed(0) + "<n>, <nh>" + entity.posZ().toFixed(0));
    systemMessage(entity, "<n>You are in <nh>" + entity.world().getLocation(entity.pos()).biome() + " <n>biome");
    systemMessage(entity, "<n>Do <nh>!help<n> for available commands!");
  };
  return {
    /**
     * Power stuff (I hate that I had to do it this way)
     * @param {JSHero} hero - Required
     **/
    addPowers: (hero) => {
      if (powerArray.length == 0) {
        hero.addPowers("skyhighocs:transer_system");
      };
      if (powerArray.length == 1) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0]);
      };
      if (powerArray.length == 2) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0], powerArray[1]);
      };
      if (powerArray.length == 3) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0], powerArray[1], powerArray[2]);
      };
      if (powerArray.length == 4) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0], powerArray[1], powerArray[2], powerArray[3]);
      };
      if (powerArray.length == 5) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4]);
      };
      if (powerArray.length == 6) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5]);
      };
      if (powerArray.length == 7) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6]);
      };
      if (powerArray.length == 8) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7]);
      };
      if (powerArray.length == 9) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8]);
      };
      if (powerArray.length == 10) {
        hero.addPowers("skyhighocs:transer_system", powerArray[0], powerArray[1], powerArray[2], powerArray[3], powerArray[4], powerArray[5], powerArray[6], powerArray[7], powerArray[8], powerArray[9]);
      };
    },
    /**
     * Basic keybinds
     * @param {JSHero} hero - Required
     **/
    keyBinds: (hero) => {
      hero.addKeyBind("SHAPE_SHIFT", "Send message/Enter command", 4);
      hero.addKeyBindFunc("CYCLE_CHATS", (player, manager) => cycleChats(player, manager), "Cycle chats", 3);
      hero.addKeyBindFunc("CYCLE_CHAT_MODES", (player, manager) => cycleChatModes(player, manager), "Cycle chat modes", 3);
    },
    setKeyBind: (entity, keyBind) => {
      switch (keyBind) {
        case "CYCLE_CHATS":
          return !entity.isSneaking();
        case "CYCLE_CHAT_MODES":
          return entity.isSneaking();
        default:
          return true;
      };
    },
    /**
     * EM wave change stuff
     * @param {JSHero} hero - Required
     **/
    initEMWaveChange: (hero) => {
      hero.addKeyBindFunc("CYCLE_CHATS_EM", (player, manager) => cycleChats(player, manager), "Cycle chats", 2);
      hero.addKeyBindFunc("CYCLE_CHAT_MODES_EM", (player, manager) => cycleChatModes(player, manager), "Cycle chat modes", 2);
      if (emBeingIndex > -1) {
        modules[emBeingIndex].keyBinds(hero);
      };
      if (emBeingIndex > -1 && modules[emBeingIndex].hasOwnProperty("canAim")) {
        hero.supplyFunction("canAim", entity => modules[emBeingIndex].canAim(entity));
      };
      if (waveChangeIndex > -1) {
        modules[waveChangeIndex].keyBinds(hero);
        modules[waveChangeIndex].initDamageProfiles(hero);
        modules[waveChangeIndex].initProfiles(hero);
      };
      if (waveChangeIndex > -1 && modules[waveChangeIndex].hasOwnProperty("initEquipment")) {
        modules[waveChangeIndex].initEquipment(hero);
      };
      if (waveChangeIndex > -1 && modules[waveChangeIndex].hasOwnProperty("initSounds")) {
        modules[waveChangeIndex].initSounds(hero);
      };
    },
    /**
     * Property stuff
     * @param {JSEntity} entity - Required
     * @param {string} property - Required
     * @returns property
     **/
    getProperty: function (entity, property) {
      return ((waveChangeIndex == -1) ? null : ((isModuleDisabled(entity, modules[waveChangeIndex].name)) ? null : modules[waveChangeIndex].properties(entity, property)));
    },
    /**
     * Property stuff
     * @param {JSEntity} entity - Required
     * @param {string} permission - Required
     * @returns permission
     **/
    getPermission: function (entity, permission) {
      return ((waveChangeIndex == -1) ? null : ((!modules[waveChangeIndex].hasOwnProperty("permissions") && isModuleDisabled(entity, modules[waveChangeIndex].name)) ? null : modules[waveChangeIndex].permissions(entity, permission)));
    },
    /**
     * Tier override stuff
     * @param {JSEntity} entity - Required
     * @returns tier
     **/
    getTierOverride: function (entity) {
      return ((waveChangeIndex == -1) ? basicTierOverride(entity) : ((isModuleDisabled(entity, modules[waveChangeIndex].name)) ? basicTierOverride(entity) : modules[waveChangeIndex].tierOverride(entity)));
    },
    /**
     * Attribute profile stuff
     * @param {JSEntity} entity - Required
     * @returns attribute profile
     **/
    getAttributeProfile: function (entity) {
      return ((waveChangeIndex == -1) ? null : ((isModuleDisabled(entity, modules[waveChangeIndex].name)) ? null : modules[waveChangeIndex].attributeProfiles(entity)));
    },
    /**
     * Damage profile stuff
     * @param {JSEntity} entity - Required
     * @returns damage profile
     **/
    getDamageProfile: function (entity) {
      return ((waveChangeIndex == -1) ? null : ((isModuleDisabled(entity, modules[waveChangeIndex].name)) ? null : modules[waveChangeIndex].damageProfiles(entity)));
    },
    /**
     * Wave calling profile
     * @param {JSHero} hero - Required
     **/
    profileWave: function (hero) {
      hero.addAttributeProfile("WAVE_CALLING", (profile) => {
        profile.addAttribute("BASE_SPEED", -1.0, 1);
        profile.addAttribute("SPRINT_SPEED", -1.0, 1);
        profile.addAttribute("WEAPON_DAMAGE", -1.0, 1);
        profile.addAttribute("JUMP_HEIGHT", -2.0, 1);
        profile.addAttribute("PUNCH_DAMAGE", -1.0, 1);
      });
      if (waveIndex > -1) {
        modules[waveIndex].otherProfile(hero);
        modules[waveIndex].selfProfile(hero);
      };
    },
    /**
     * Sets wave calling profile
     * @param {JSEntity} entity - Required
     * @returns Profile for wave calling
     **/
    getWaveProfile: function (entity) {
      return ((entity.getData("skyhighocs:dyn/calling_timer") > 0) ? "WAVE_CALLING" : null);
    },
    /**
     * Keybind enabled stuff for em
     * @param {JSEntity} entity - Required
     * @param {string} keyBind - Required
     **/
    isKeyBindEnabled: function (entity, keyBind) {
      return ((emBeingIndex == -1) ? false : ((isModuleDisabled(entity, modules[emBeingIndex].name)) ? false : modules[emBeingIndex].isKeyBindEnabled(entity, keyBind))) || ((waveChangeIndex == -1) ? false : (((entity.getDataOrDefault("skyhighocs:dyn/wave_changing_timer", 0.0) < 1) || isModuleDisabled(entity, modules[waveChangeIndex].name)) ? false : modules[waveChangeIndex].isKeyBindEnabled(entity, keyBind)));
    },
    /**
     * Modifier enabled stuff for em
     * @param {JSEntity} entity - Required
     * @param {string} modifier - Required
     **/
    isModifierEnabled: function (entity, modifier) {
      return ((emBeingIndex == -1) ? false : ((isModuleDisabled(entity, modules[emBeingIndex].name)) ? false : modules[emBeingIndex].isModifierEnabled(entity, modifier))) || ((waveChangeIndex == -1) ? false : (((entity.getDataOrDefault("skyhighocs:dyn/wave_changing_timer", 0.0) < 1) || isModuleDisabled(entity, modules[waveChangeIndex].name)) ? false : modules[waveChangeIndex].isModifierEnabled(entity, modifier)));
    },
    /**
     * Handles all transer stuff
     * @param {JSEntity} entity - Required
     * @param {JSDataManager} manager - Required
     **/
    systemHandler: (entity, manager) => {
      if (!entity.getData("skyhighocs:dyn/system_init")) {
        assignTranser(entity, manager, assignedSatellite);
        status(entity);
        if (human != null) {
          var hexColor = hexColors[human];
          manager.setString(entity.getWornChestplate().nbt(), "hudColorSkyHigh", hexColor);
        };
      if (!entity.getWornChestplate().nbt().hasKey("hudRange")) {
        manager.setShort(entity.getWornChestplate().nbt(), "hudRange", 32);
      };
      if (!entity.getWornChestplate().nbt().hasKey("hostilesOnHud")) {
        manager.setBoolean(entity.getWornChestplate().nbt(), "hostilesOnHud", true);
      };
      if (!entity.getWornChestplate().nbt().hasKey("friendliesOnHud")) {
        manager.setBoolean(entity.getWornChestplate().nbt(), "friendliesOnHud", true);
      };
      if (!entity.getWornChestplate().nbt().hasKey("playersOnHud")) {
        manager.setBoolean(entity.getWornChestplate().nbt(), "playersOnHud", true);
      };
        manager.setData(entity, "skyhighocs:dyn/system_init", true);
        manager.setData(entity, "fiskheroes:penetrate_martian_invis", false);
      };
      if (typeof entity.getData("fiskheroes:disguise") === "string") {
        if (!(entity.getData("fiskheroes:disguise") == waveChange || entity.getData("fiskheroes:disguise") == human)) {
          if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
            manager.setData(entity, "skyhighocs:dyn/entry", entity.getData("fiskheroes:disguise"));
            manager.setData(entity, "fiskheroes:disguise", waveChange);
          } else {
            manager.setData(entity, "skyhighocs:dyn/entry", entity.getData("fiskheroes:disguise"));
            manager.setData(entity, "fiskheroes:disguise", null);
            if (typeof human === "string") {
              manager.setData(entity, "fiskheroes:disguise", human);
            };
          };
          manager.setData(entity, "fiskheroes:shape_shifting_to", null);
          manager.setData(entity, "fiskheroes:shape_shifting_from", null);
          manager.setData(entity, "fiskheroes:shape_shift_timer", 0);
          var entry = entity.getData("skyhighocs:dyn/entry");
          if (entry.startsWith("!")) {
            manager.setData(entity, "skyhighocs:dyn/entry", entry.substring(1));
            var args = entity.getData("skyhighocs:dyn/entry").split(" ");
            switch (args[0]) {
              case "systemInfo":
                systemInfo(entity);
                break;
              case "status":
                status(entity);
                break;
              case "help":
                systemMessage(entity, "<n>Available commands:");
                commandIndexes.forEach(index => {
                  var module = modules[index];
                  if (!isModuleDisabled(entity, module.name)) {
                    systemMessage(entity, module.helpMessage);
                  };
                });
                systemMessage(entity, "<n>!status <nh>-<n> Shows your current status");
                systemMessage(entity, "<n>!systemInfo <nh>-<n> Shows your system info");
                systemMessage(entity, "<n>!help <nh>-<n> Shows this list");
                break;
              case "disable":
                disableModule(entity, manager, moduleNames, args[1]);
                break;
              case "enable":
                enableModule(entity, manager, moduleNames, args[1]);
                break;
              case "chatMode":
                switchChatModes(entity, manager, args[1]);
                break;
              case "msg":
                switchChats(entity, manager, args[1]);
                break;
              default:
                var index = commands.indexOf(args[0]);
                if (index > -1) {
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
            };
          } else {
            var name = null;
            if ((typeof waveChangeIndex === "undefined") ? false : waveChangeIndex > -1) {
              if (entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
                name = waveColor+waveChange+"\u00A7r";
              } else {
                name = human;
              };
            } else {
              name = entity.getName();
            };
            modules[messagingIndexes[entity.getData("skyhighocs:dyn/chat_mode")]].messageHandler(entity, name, 32);
          };
        };
      };
      if (waveIndex > -1) {
        if (PackLoader.getSide() == "SERVER") {
          modules[waveIndex].waveCalling(entity, manager);
        };
      };
      if (typeof human === "string" && entity.getData("skyhighocs:dyn/wave_changing_timer") < 1) {
        manager.setData(entity, "fiskheroes:disguise", human);
      };
      if (typeof waveChange === "string" && entity.getData("skyhighocs:dyn/wave_changing_timer") == 1) {
        manager.setData(entity, "fiskheroes:disguise", waveChange);
      };
    },
    waveHandler: function (entity, hero) {
      if (waveIndex > -1) {
        if (PackLoader.getSide() == "SERVER") {
          modules[waveIndex].waveHandler(entity, hero);
        };
      };
    },
    /**
     * Handles all em stuff
     * @param {JSEntity} entity - Required
     * @param {JSDataManager} manager - Required
     **/
    emWaveHandler: (entity, manager) => {
      if (waveChangeIndex > -1 && !isModuleDisabled(entity, modules[waveChangeIndex].name)) {
        modules[waveChangeIndex].tickHandler(entity, manager);
      };
      if (emBeingIndex > -1 && !isModuleDisabled(entity, modules[emBeingIndex].name)) {
        modules[emBeingIndex].tickHandler(entity, manager);
      };
    }
  };
};
aliasRegex = /[\s]/gm;

/**
 * Formats name to alias format
 * @param {string} input - Name to format
 * @returns Formatted alias
 **/
function formatAlias(input) {
  input = input.toLowerCase();
  output = input.replace(aliasRegex, function(thing) {
    return "_";
  });
  return output;
};

function initWaveSuit(hero, name, uuid) {
  var suit_name = name;
  var suit_alias = formatAlias(name) + "_wave_suit";
  hero.setName(suit_name);
  hero.setAliases(suit_alias);
  hero.setTier(1);
  hero.setChestplate("Wave Suit");
  hero.addPowers("skyhighocs:wave_suit")
  hero.setVersion("OC");

  hero.addKeyBind("INVISIBILITY", "Wave World", 4);

  hero.setDefaultScale(1.0);
  hero.addDamageProfile("MAIN", {
    "types": {
      "ELEMENT_NONE": 1.0
    }
  });
  hero.setDamageProfile((entity) => {
    return "MAIN";
  });
  hero.setModifierEnabled((entity, modifier) => {
    switch (modifier.name()) {
      case "fiskheroes:invisibility":
        return true;
      case "fiskheroes:damage_immunity":
        return entity.getData("fiskheroes:invisible");
      case "fiskheroes:fire_immunity":
        return entity.getData("fiskheroes:invisible");
      case "fiskheroes:shape_shifting":
        return entity.getUUID() == uuid;
      default:
        return false;
    };
  });
  hero.setKeyBindEnabled((entity, keyBind) => {
    switch (keyBind) {
      case "INVISIBILITY":
        return true;
      default:
        return false;
    };
  });
  hero.setTickHandler((entity, manager) => {
    manager.setData(entity, "fiskheroes:penetrate_martian_invis", true);
    manager.setData(entity, "fiskheroes:disguise", suit_name);
  });
};
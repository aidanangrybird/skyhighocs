var system = implement("skyhighocs:external/cyber_system");
var messaging = implement("skyhighheroes:external/messaging");
var groupMessaging = implement("skyhighheroes:external/group_messaging");
var contacts = implement("skyhighheroes:external/contacts");
var scanner = implement("skyhighheroes:external/scanner");
var waypoints = implement("skyhighheroes:external/waypoint");
var communications = implement("skyhighocs:external/communications");
var cannons = implement("skyhighocs:external/cannons");
var rockets = implement("skyhighocs:external/rockets");
var blades = implement("skyhighocs:external/blades");
var shields = implement("skyhighocs:external/shields");
var thermopticManipulation = implement("skyhighocs:external/thermoptic_manipulation");
var wings = implement("skyhighocs:external/wings");
var furnace = implement("skyhighocs:external/furnace");
var externalArms = implement("skyhighocs:external/external_arms");
var dataPorts = implement("skyhighocs:external/data_ports");
var voiceSynthesizer = implement("skyhighocs:external/voice_synthesizer");
var cyberOS = system.initSystem([messaging,
  groupMessaging,
  contacts,
  scanner,
  waypoints,
  communications,
  cannons,
  rockets,
  blades,
  shields,
  thermopticManipulation,
  wings,
  furnace,
  externalArms,
  dataPorts,
  voiceSynthesizer,
], "Cyber Shadow", "Dam1en_", "5");
function init(hero) {
  hero.setAliases("cyber_shadow");
  hero.setName("Cyber Shadow");
  hero.setTier(10);
  hero.setHelmet("Cybernetic Brain");
  hero.setVersion("OC");

  cyberOS.keyBinds(hero);
  cyberOS.initProfiles(hero);
  cyberOS.addPowers(hero);
  
  hero.setHasProperty((entity, property) => {
    return property == "BREATHE_SPACE" && true;
  });
  hero.supplyFunction("canAim", (entity) => {
    return entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:beam_charge") == 0 && entity.getData("fiskheroes:energy_projection_timer") == 0;
  });
  hero.setDefaultScale(1.0);
  hero.setModifierEnabled((entity, modifier) => {
    if (modifier.name() == "fiskheroes:shape_shifting") {
      return true;
    };
    if (modifier.name() == "fiskheroes:potion_immunity") {
      return true;
    };
    if (modifier.name() == "fiskheroes:regeneration") {
      return true;
    };
    if (modifier.name() == "fiskheroes:healing_factor") {
      return true;
    };
    if (modifier.name() == "fiskheroes:water_breathing") {
      return true;
    };
    if (modifier.name() == "fiskheroes:fire_immunity") {
      return true;
    };
    if (modifier.name() == "fiskheroes:damage_immunity") {
      return true;
    };
    if (modifier.name() == "fiskheroes:projectile_immunity") {
      return true;
    };
    if (modifier.name() == "fiskheroes:transformation") {
      return true;
    };
    if (modifier.name() == "fiskheroes:metal_skin") {
      return entity.getData("fiskheroes:metal_heat") < 1.0;
    };
    return cyberOS.isModifierEnabled(entity, modifier);
  });
  hero.setKeyBindEnabled((entity, keyBind) => {
    if (keyBind == "SHAPE_SHIFT") {
      return true;
    };
    return cyberOS.isKeyBindEnabled(entity, keyBind);
  });
  hero.setDamageProfile((entity) => {
    return cyberOS.getDamageProfile(entity);
  });
  hero.setAttributeProfile((entity) => {
    return cyberOS.getAttributeProfile(entity);
  });
  hero.setTickHandler((entity, manager) => {
    cyberOS.systemHandler(entity, manager);
  });
};
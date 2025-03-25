var uuid = "c4bc5db6-3cf6-44fe-8427-304a7b211bc4";
var cybernetics = implement("skyhighocs:external/cybernetics");
var messaging = implement("skyhighheroes:external/messaging");
var groupMessaging = implement("skyhighheroes:external/group_messaging");
var groups = implement("skyhighheroes:external/groups");
var contacts = implement("skyhighheroes:external/contacts");
var scanner = implement("skyhighheroes:external/scanner");
var waypoints = implement("skyhighheroes:external/waypoint");
var communications = implement("skyhighocs:external/communications");
var cyberneticMessaging = implement("skyhighocs:external/cybernetic_messaging");
var cannons = implement("skyhighocs:external/cannons");
var rockets = implement("skyhighocs:external/rockets");
var blades = implement("skyhighocs:external/blades");
var shields = implement("skyhighocs:external/shields");
var thermopticManipulation = implement("skyhighocs:external/thermoptic_manipulation");
var wings = implement("skyhighocs:external/wings");
var furnace = implement("skyhighocs:external/furnace");
var externalArms = implement("skyhighocs:external/external_arms");
var dataPorts = implement("skyhighocs:external/data_ports");
var suitDatastore = implement("skyhighocs:external/suit_datastore");
var voiceSynthesizer = implement("skyhighocs:external/voice_synthesizer");
var cyberOS = cybernetics.initSystem([
  messaging,
  groupMessaging,
  groups,
  contacts,
  scanner,
  waypoints,
  communications,
  cyberneticMessaging,
  cannons,
  rockets,
  blades,
  shields,
  thermopticManipulation,
  wings,
  furnace,
  externalArms,
  dataPorts,
  suitDatastore,
  voiceSynthesizer,
], "Cyber Asteroid", "CA", "pezzo134", "4", uuid);
function init(hero) {
  hero.setAliases("cyber_asteroid");
  hero.setName("Cyber Asteroid/Model CA-4 Cybernetic Body");
  hero.setTier(9);
  hero.setHelmet("Cybernetic Brain");
  hero.setVersion("OC");

  cyberOS.keyBinds(hero);
  cyberOS.initProfiles(hero);
  cyberOS.addPowers(hero);
  
  hero.setHasProperty((entity, property) => {
    return property == "BREATHE_SPACE" && entity.getUUID() == uuid;
  });
  hero.supplyFunction("canAim", (entity) => {
    return entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:beam_charge") == 0 && entity.getData("fiskheroes:energy_projection_timer") == 0;
  });
  hero.setDefaultScale(1.0);
  hero.setModifierEnabled((entity, modifier) => {
    if (modifier.name() == "fiskheroes:shape_shifting") {
      return entity.getUUID() == uuid;
    };
    if (modifier.name() == "fiskheroes:potion_immunity") {
      return entity.getUUID() == uuid;
    };
    if (modifier.name() == "fiskheroes:regeneration") {
      return entity.getUUID() == uuid;
    };
    if (modifier.name() == "fiskheroes:healing_factor") {
      return entity.getUUID() == uuid;
    };
    if (modifier.name() == "fiskheroes:water_breathing") {
      return entity.getUUID() == uuid;
    };
    if (modifier.name() == "fiskheroes:fire_immunity") {
      return entity.getUUID() == uuid;
    };
    if (modifier.name() == "fiskheroes:damage_immunity") {
      return entity.getUUID() == uuid;
    };
    if (modifier.name() == "fiskheroes:projectile_immunity") {
      return entity.getUUID() == uuid;
    };
    if (modifier.name() == "fiskheroes:transformation") {
      return entity.getUUID() == uuid;
    };
    if (modifier.name() == "fiskheroes:metal_skin") {
      return entity.getData("fiskheroes:metal_heat") < 1.0;
    };
    return cyberOS.isModifierEnabled(entity, modifier);
  });
  hero.setKeyBindEnabled((entity, keyBind) => {
    if (keyBind == "SHAPE_SHIFT") {
      return entity.getUUID() == uuid;
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
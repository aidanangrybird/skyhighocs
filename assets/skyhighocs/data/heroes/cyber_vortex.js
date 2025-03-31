var uuid = "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
var cybernetics = implement("skyhighocs:external/cybernetics");
var settings = implement("skyhighocs:external/settings");
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
var externalArms = implement("skyhighocs:external/external_arms");
var suitDatastore = implement("skyhighocs:external/suit_datastore");
var voiceSynthesizer = implement("skyhighocs:external/voice_synthesizer");
var cyberOS = cybernetics.initSystem([
  settings,
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
  externalArms,
  suitDatastore,
  voiceSynthesizer,
], "Cyber Vortex", "CV", "aidanangrybird", "6", uuid);
function init(hero) {
  hero.setAliases("cyber_vortex");
  hero.setName("Cyber Vortex/Model CV-6 Cybernetic Body");
  hero.setTier(9);
  hero.setHelmet("Cybernetic Brain");
  hero.setVersion("OC");

  hero.addPrimaryEquipment("fiskheroes:suit_data_drive@14{display:{Name:\u00A76Cyber Vortex's Data Drive}}", true, item => (item.damage() == 14 && item.displayName() == "\u00A76Cyber Vortex's Data Drive"));

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
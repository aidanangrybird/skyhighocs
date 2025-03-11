var system = implement("skyhighocs:external/astro_system");
var messaging = implement("skyhighocs:external/cyber_messaging");
var groupMessaging = implement("skyhighocs:external/cyber_group_messaging");
var contacts = implement("skyhighocs:external/cyber_contacts");
var scanner = implement("skyhighocs:external/cyber_scanner");
var waypoints = implement("skyhighocs:external/cyber_waypoint");
var comms = implement("skyhighocs:external/cyber_comms");
var cannons = implement("skyhighocs:external/cyber_cannons");
var rockets = implement("skyhighocs:external/cyber_rockets");
var cyberOS = system.initSystem([messaging,
  groupMessaging,
  contacts,
  scanner,
  waypoints,
  comms,
  cannons,
  flight
], "Cyber Vortex", "aidanangrybird", "6");
function init(hero) {
  hero.setAliases("cyber_vortex");
  hero.setName("Cyber Vortex");
  hero.setTier(10);
  hero.setLeggings("Brain");
  hero.setVersion("OC");

  hero.addAttribute("SPRINT_SPEED", 0.5, 1);
  hero.addAttribute("STEP_HEIGHT", 0.5, 0);
  hero.addAttribute("JUMP_HEIGHT", 3.0, 0);
  hero.addAttribute("PUNCH_DAMAGE", 10.0, 0);
  hero.addAttribute("KNOCKBACK", 2.5, 0);
  hero.addAttribute("BASE_SPEED_LEVELS", 30.0, 0);
  hero.addAttribute("IMPACT_DAMAGE", 25.0, 0);
  hero.addAttribute("FALL_RESISTANCE", 1.0, 1);

  cyberOS.keyBinds(hero);
  cyberOS.profiles(hero);
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
    if (modifier.name() == "fiskheroes:metal_skin") {
      return entity.getData("fiskheroes:metal_heat") < 1.0;
    };
    return cyberOS.isModifierEnabled(entity, modifier);
  });
  hero.setKeyBindEnabled((entity, keyBind) => {
    if (keyBind == "SHAPE_SHIFT") {
      return !entity.isSneaking();
    };
    return cyberOS.isKeyBindEnabled(entity, keyBind);
  });
  hero.setTickHandler((entity, manager) => {
    cyberOS.systemHandler(entity, manager);
  });
};
var uuid = "c4bc5db6-3cf6-44fe-8427-304a7b211bc4";
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
], "Cyber Asteroid", "pezzo134", "4", uuid);
function init(hero) {
  cyberOS.initCybernetics(hero);
};
var uuid = "4da600b8-582a-4fc3-ac2e-ada03d3e478c";
var cybernetics = implement("skyhighocs:external/cybernetics");
var settings = implement("skyhighocs:external/cybernetic_settings");
var messaging = implement("skyhighocs:external/messaging");
var groupMessaging = implement("skyhighocs:external/group_messaging");
var groups = implement("skyhighocs:external/groups");
var contacts = implement("skyhighocs:external/contacts");
var scanner = implement("skyhighocs:external/scanner");
var waypoints = implement("skyhighocs:external/waypoint");
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
], "Cyber Nebula", "C_sp", "2", uuid);
function init(hero) {
  cyberOS.initCybernetics(hero);
};
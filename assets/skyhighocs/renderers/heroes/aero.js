extend("skyhighocs:base_astro");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "full": "skyhighocs:aidan/aero_full_base",
  "full_lights": "skyhighocs:aidan/aero_full_lights",
  "eye_left": "skyhighocs:aidan/aero_eye_left.tx.json",
  "eye_right": "skyhighocs:aidan/aero_eye_right.tx.json",
  "head": "skyhighocs:aidan/aero_head.tx.json",
  "body": "skyhighocs:aidan/aero_body.tx.json",
  "left_arm": "skyhighocs:aidan/aero_left_arm.tx.json",
  "right_arm": "skyhighocs:aidan/aero_right_arm.tx.json",
  "left_leg": "skyhighocs:aidan/aero_left_leg.tx.json",
  "right_leg": "skyhighocs:aidan/aero_right_leg.tx.json",
  "boots": "skyhighocs:aidan/aero_boots",
  "shorts": "skyhighocs:aidan/aero_shorts",
  "santa_hat": "skyhighocs:aidan/aero_santa_hat"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initCustomBoosters(renderer, 0xFF8900);
  astro.initBeams(renderer, 0xFF8900);
  stuff.bindSpeedTrail(renderer, "skyhighocs:aero_speed");
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "aero_shorts");
  renderer.setItemIcon("BOOTS", "aero_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  rockets.renderBoosters(entity, renderLayer, isFirstPersonArm);
  parent.render(entity, renderLayer, isFirstPersonArm);
};
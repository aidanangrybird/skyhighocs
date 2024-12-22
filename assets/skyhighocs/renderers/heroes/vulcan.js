extend("skyhighocs:base_astro");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "full": "skyhighocs:damien/vulcan_full_base",
  "full_lights": "skyhighocs:damien/vulcan_full_lights",
  "head": "skyhighocs:damien/vulcan_head.tx.json",
  "body": "skyhighocs:damien/vulcan_body.tx.json",
  "left_arm": "skyhighocs:damien/vulcan_left_arm.tx.json",
  "right_arm": "skyhighocs:damien/vulcan_right_arm.tx.json",
  "left_leg": "skyhighocs:damien/vulcan_left_leg.tx.json",
  "right_leg": "skyhighocs:damien/vulcan_right_leg.tx.json",
  "boots": "skyhighocs:damien/vulcan_boots",
  "shorts": "skyhighocs:damien/vulcan_shorts",
  "santa_hat": "skyhighocs:damien/vulcan_santa_hat"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initCustomBoosters(renderer, 0x8000FF);
  astro.initBeams(renderer, 0x8000FF);
  stuff.bindSpeedTrail(renderer, "skyhighocs:vulcan_speed");
};

function getID() {
  return "e51532a1-19fc-4d4f-9da0-f952c4645891";
};

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  rockets.renderBoosters(entity, renderLayer, isFirstPersonArm);
  parent.render(entity, renderLayer, isFirstPersonArm);
};
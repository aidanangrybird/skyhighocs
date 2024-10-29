extend("skyhighocs:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:chase/astro/chase_tenma.tx.json",
  "rocket_legs": "skyhighocs:chase/astro/chase_tenma_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:chase/astro/chase_tenma_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:chase/astro/chase_tenma_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:chase/astro/chase_tenma_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:chase/astro/chase_tenma_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:chase/astro/chase_tenma_eyes",
  "boots_lights": "skyhighocs:chase/astro/chase_tenma_boots_lights",
  "arms_lights": "skyhighocs:chase/astro/chase_tenma_arms_lights",
  "boots": "skyhighocs:chase/astro/chase_tenma_boots",
  "shorts": "skyhighocs:chase/astro/chase_tenma_shorts",
  "cannon_lights": "skyhighocs:chase/astro/chase_tenma_cannon_lights",
  "shield": "skyhighocs:chase/astro/chase_tenma_shield",
  "katana": "skyhighocs:chase/astro/chase_tenma_katana",
  "katana_lights": "skyhighocs:chase/astro/chase_tenma_katana_lights",
  "scythe": "skyhighocs:chase/astro/chase_tenma_scythe",
  "scythe_lights": "skyhighocs:chase/astro/chase_tenma_scythe_lights",
  "rifle": "skyhighocs:chase/astro/chase_tenma_rifle",
  "rifle_lights": "skyhighocs:chase/astro/chase_tenma_rifle_lights"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initCustomBoosters(renderer, 0x55FF00);
  astro.initBeams(renderer, 0x55FF00);
  stuff.bindSpeedTrail(renderer, "skyhighocs:chase_tenma_speed");
};

function getID() {
  return "4da600b8-582a-4fc3-ac2e-ada03d3e478c";
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
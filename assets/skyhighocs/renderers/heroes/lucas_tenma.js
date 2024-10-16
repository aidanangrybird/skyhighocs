extend("skyhighocs:base_tenma");

var tenma = implement("skyhighheroes:external/tenma");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:lucas/astro/lucas_tenma.tx.json",
  "rocket_legs": "skyhighocs:lucas/astro/lucas_tenma_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:lucas/astro/lucas_tenma_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:lucas/astro/lucas_tenma_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:lucas/astro/lucas_tenma_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:lucas/astro/lucas_tenma_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:lucas/astro/lucas_tenma_eyes",
  "boots_lights": "skyhighocs:lucas/astro/lucas_tenma_boots_lights",
  "arms_lights": "skyhighocs:lucas/astro/lucas_tenma_arms_lights",
  "boots": "skyhighocs:lucas/astro/lucas_tenma_boots",
  "shorts": "skyhighocs:lucas/astro/lucas_tenma_shorts",
  "cannon_lights": "skyhighocs:lucas/astro/lucas_tenma_cannon_lights",
  "shield": "skyhighocs:lucas/astro/lucas_tenma_shield",
  "katana": "skyhighocs:lucas/astro/lucas_tenma_katana",
  "katana_lights": "skyhighocs:lucas/astro/lucas_tenma_katana_lights",
  "scythe": "skyhighocs:lucas/astro/lucas_tenma_scythe",
  "scythe_lights": "skyhighocs:lucas/astro/lucas_tenma_scythe_lights",
  "rifle": "skyhighocs:lucas/astro/lucas_tenma_rifle",
  "rifle_lights": "skyhighocs:lucas/astro/lucas_tenma_rifle_lights"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = tenma.initCustomBoosters(renderer, 0xFF0000);
  tenma.initBeams(renderer, 0xFF0000);
  stuff.bindSpeedTrail(renderer, "skyhighocs:lucas_tenma_speed");
};

function getID() {
  return "c4bc5db6-3cf6-44fe-8427-304a7b211bc4";
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
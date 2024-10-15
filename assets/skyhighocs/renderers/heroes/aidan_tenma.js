extend("skyhighheroes:base_tenma");

var tenma = implement("skyhighheroes:external/tenma");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:aidan/astro/aidan_tenma.tx.json",
  "rocket_legs": "skyhighocs:aidan/astro/aidan_tenma_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:aidan/astro/aidan_tenma_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:aidan/astro/aidan_tenma_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:aidan/astro/aidan_tenma_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:aidan/astro/aidan_tenma_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:aidan/astro/aidan_tenma_eyes",
  "boots_lights": "skyhighocs:aidan/astro/aidan_tenma_boots_lights",
  "arms_lights": "skyhighocs:aidan/astro/aidan_tenma_arms_lights",
  "boots": "skyhighocs:aidan/astro/aidan_tenma_boots",
  "shorts": "skyhighocs:aidan/astro/aidan_tenma_shorts",
  "cannon_lights": "skyhighocs:aidan/astro/aidan_tenma_cannon_lights",
  "shield": "skyhighocs:aidan/astro/aidan_tenma_shield",
  "katana": "skyhighocs:aidan/astro/aidan_tenma_katana",
  "katana_lights": "skyhighocs:aidan/astro/aidan_tenma_katana_lights",
  "scythe": "skyhighocs:aidan/astro/aidan_tenma_scythe",
  "scythe_lights": "skyhighocs:aidan/astro/aidan_tenma_scythe_lights",
  "rifle": "skyhighocs:aidan/astro/aidan_tenma_rifle",
  "rifle_lights": "skyhighocs:aidan/astro/aidan_tenma_rifle_lights"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = tenma.initCustomBoosters(renderer, 0xFF8900);
  tenma.initBeams(renderer, 0xFF8900);
  stuff.bindSpeedTrail(renderer, "skyhighocs:aidan_tenma_speed");
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
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
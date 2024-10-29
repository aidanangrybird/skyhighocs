extend("skyhighocs:base_tenma");

var astro = implement("skyhighheroes:external/astro");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:ace/astro/ace_tenma.tx.json",
  "rocket_legs": "skyhighocs:ace/astro/ace_tenma_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:ace/astro/ace_tenma_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:ace/astro/ace_tenma_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:ace/astro/ace_tenma_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:ace/astro/ace_tenma_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:ace/astro/ace_tenma_eyes",
  "boots_lights": "skyhighocs:ace/astro/ace_tenma_boots_lights",
  "arms_lights": "skyhighocs:ace/astro/ace_tenma_arms_lights",
  "boots": "skyhighocs:ace/astro/ace_tenma_boots",
  "shorts": "skyhighocs:ace/astro/ace_tenma_shorts",
  "cannon_lights": "skyhighocs:ace/astro/ace_tenma_cannon_lights",
  "shield": "skyhighocs:ace/astro/ace_tenma_shield",
  "katana": "skyhighocs:ace/astro/ace_tenma_katana",
  "katana_lights": "skyhighocs:ace/astro/ace_tenma_katana_lights",
  "scythe": "skyhighocs:ace/astro/ace_tenma_scythe",
  "scythe_lights": "skyhighocs:ace/astro/ace_tenma_scythe_lights",
  "rifle": "skyhighocs:ace/astro/ace_tenma_rifle",
  "rifle_lights": "skyhighocs:ace/astro/ace_tenma_rifle_lights"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = astro.initCustomBoosters(renderer, 0xFF0000);
  astro.initBeams(renderer, 0xFF0000);
  stuff.bindSpeedTrail(renderer, "skyhighocs:ace_tenma_speed");
};

function getID() {
  return "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0";
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
extend("skyhighheroes:base_tenma");

var tenma = implement("skyhighheroes:external/tenma");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:grand/astro/grand_tenma.tx.json",
  "rocket_legs": "skyhighocs:grand/astro/grand_tenma_rocket_legs.tx.json",
  "rocket_arms_lights": "skyhighocs:grand/astro/grand_tenma_rocket_arms_lights.tx.json",
  "rocket_legs_lights": "skyhighocs:grand/astro/grand_tenma_rocket_legs_lights.tx.json",
  "cannon_arm": "skyhighocs:grand/astro/grand_tenma_cannon_arm.tx.json",
  "cannon_arm_lights": "skyhighocs:grand/astro/grand_tenma_cannon_arm_lights.tx.json",
  "eyes": "skyhighocs:grand/astro/grand_tenma_eyes",
  "boots_lights": "skyhighocs:grand/astro/grand_tenma_boots_lights",
  "arms_lights": "skyhighocs:grand/astro/grand_tenma_arms_lights",
  "boots": "skyhighocs:grand/astro/grand_tenma_boots",
  "shorts": "skyhighocs:grand/astro/grand_tenma_shorts",
  "cannon_lights": "skyhighocs:grand/astro/grand_tenma_cannon_lights",
  "shield": "skyhighocs:grand/astro/grand_tenma_shield",
  "katana": "skyhighocs:grand/astro/grand_tenma_katana",
  "katana_lights": "skyhighocs:grand/astro/grand_tenma_katana_lights",
  "scythe": "skyhighocs:grand/astro/grand_tenma_scythe",
  "scythe_lights": "skyhighocs:grand/astro/grand_tenma_scythe_lights",
  "rifle": "skyhighocs:grand/astro/grand_tenma_rifle",
  "rifle_lights": "skyhighocs:grand/astro/grand_tenma_rifle_lights"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
  rockets = tenma.initCustomBoosters(renderer, 0xFF0000);
  tenma.initBeams(renderer, 0xFF0000);
  stuff.bindSpeedTrail(renderer, "skyhighocs:grand_tenma_speed");
};

function getID() {
  return "d699ffcd-8177-4325-91ac-3e815e87bb95";
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
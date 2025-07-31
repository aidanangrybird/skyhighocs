extend("skyhighocs:base_em_wave_change");

var stelar = implement("skyhighocs:external/stelar");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "base": "skyhighocs:chase/pryetak_nebula_base",
  "lights": "skyhighocs:chase/pryetak_nebula_lights",
  "base_wave_change": "skyhighocs:chase/pryetak_nebula_wave_change.tx.json",
  "lights_wave_change": "skyhighocs:chase/pryetak_nebula_wave_change_lights.tx.json",
  "wave_changing_lights": "skyhighocs:chase/pryetak_nebula_wave_changing_lights.tx.json",
  "mask": "skyhighocs:chase/pryetak_nebula_mask.tx.json",
  "mask_lights": "skyhighocs:chase/pryetak_nebula_mask_lights.tx.json",
  "mask_wave_changing_lights": "skyhighocs:chase/pryetak_nebula_mask_wave_changing_lights.tx.json",
  "sword_blade": "skyhighocs:chase/pryetak_nebula_sword_blade.tx.json",
  "sword": "skyhighocs:chase/pryetak_nebula_sword.tx.json",
  "sword_wave_changing_lights": "skyhighocs:chase/pryetak_nebula_sword_wave_changing_lights.tx.json",
  "sword_sides": "skyhighocs:chase/pryetak_nebula_sword_sides.tx.json",
  "sword_front": "skyhighocs:chase/pryetak_nebula_sword_front.tx.json",
  "nebula_blast_sides": "skyhighocs:chase/pryetak_nebula_nebula_blast_sides.tx.json",
  "nebula_blast_front": "skyhighocs:chase/pryetak_nebula_nebula_blast_front.tx.json",
  "nebula_blast_front_lights": "skyhighocs:chase/pryetak_nebula_nebula_blast_front_lights.tx.json",
  "nebula_burst_sides": "skyhighocs:chase/pryetak_nebula_nebula_burst_sides.tx.json",
  "nebula_burst_front": "skyhighocs:chase/pryetak_nebula_nebula_burst_front.tx.json",
  "nebula_burst_front_lights": "skyhighocs:chase/pryetak_nebula_nebula_burst_front_lights.tx.json",
  "ice_bomb_sides": "skyhighocs:chase/pryetak_nebula_ice_bomb_sides.tx.json",
  "ice_bomb_front": "skyhighocs:chase/pryetak_nebula_ice_bomb_front.tx.json",
  "predation_wave_changing_sides_lights": "skyhighocs:chase/pryetak_nebula_predation_wave_changing_sides_lights.tx.json",
  "predation_wave_changing_front_lights": "skyhighocs:chase/pryetak_nebula_predation_wave_changing_front_lights.tx.json",
  "em_being_base": "skyhighocs:chase/pryetak_base",
  "em_being_lights": "skyhighocs:chase/pryetak_lights",
  "head_right": "skyhighocs:chase/pryetak_right.tx.json",
  "head_wave_change_right": "skyhighocs:chase/pryetak_wave_change_right.tx.json",
  "head_wave_change_right_lights": "skyhighocs:chase/pryetak_wave_change_right_lights.tx.json",
  "head_right_lights": "skyhighocs:chase/pryetak_right_lights.tx.json",
  "head_wave_changing_right_lights": "skyhighocs:chase/pryetak_wave_changing_right_lights.tx.json",
  "head_left": "skyhighocs:chase/pryetak_left.tx.json",
  "head_wave_change_left": "skyhighocs:chase/pryetak_wave_change_left.tx.json",
  "head_left_lights": "skyhighocs:chase/pryetak_left_lights.tx.json",
  "head_wave_change_left_lights": "skyhighocs:chase/pryetak_wave_change_left_lights.tx.json",
  "head_wave_changing_left_lights": "skyhighocs:chase/pryetak_wave_changing_left_lights.tx.json",
  "head_top": "skyhighocs:chase/pryetak_top.tx.json",
  "head_wave_change_top": "skyhighocs:chase/pryetak_wave_change_top.tx.json",
  "head_top_lights": "skyhighocs:chase/pryetak_top_lights.tx.json",
  "head_wave_change_top_lights": "skyhighocs:chase/pryetak_wave_change_top_lights.tx.json",
  "head_wave_changing_top_lights": "skyhighocs:chase/pryetak_wave_changing_top_lights.tx.json",
  "head_bottom": "skyhighocs:chase/pryetak_bottom.tx.json",
  "head_wave_change_bottom": "skyhighocs:chase/pryetak_wave_change_bottom.tx.json",
  "head_bottom_lights": "skyhighocs:chase/pryetak_bottom_lights.tx.json",
  "head_wave_change_bottom_lights": "skyhighocs:chase/pryetak_wave_change_bottom_lights.tx.json",
  "head_wave_changing_bottom_lights": "skyhighocs:chase/pryetak_wave_changing_bottom_lights.tx.json",
  "head_front": "skyhighocs:chase/pryetak_front.tx.json",
  "head_wave_change_front": "skyhighocs:chase/pryetak_wave_change_front.tx.json",
  "head_wave_changing_front_lights": "skyhighocs:chase/pryetak_wave_changing_front_lights.tx.json",
  "transer": "skyhighocs:chase/chase_stelar_transer.tx.json",
  "transer_wave_change": "skyhighocs:chase/chase_stelar_transer_wave_change.tx.json",
  "visualizer_lights": "skyhighocs:chase/chase_stelar_visualizer_lights.tx.json",
  "visualizer_lights_wave_change": "skyhighocs:chase/chase_stelar_visualizer_lights_wave_change.tx.json",
  "transer_default": "skyhighocs:chase/chase_stelar_transer",
  "transer_default_lights": "skyhighocs:chase/chase_stelar_transer_lights",
  "shield": "skyhighocs:chase/pryetak_nebula_shield",
  "shield_lights": "skyhighocs:chase/pryetak_nebula_shield_lights",
  "katana": "skyhighocs:chase/pryetak_nebula_katana",
  "katana_lights": "skyhighocs:chase/pryetak_nebula_katana_lights",
  "scythe": "skyhighocs:chase/pryetak_nebula_scythe",
  "scythe_lights": "skyhighocs:chase/pryetak_nebula_scythe_lights",
  "rifle": "skyhighocs:chase/pryetak_nebula_rifle",
  "rifle_lights": "skyhighocs:chase/pryetak_nebula_rifle_lights",
  "santa_hat_em": "skyhighocs:chase/pryetak_nebula_santa_hat"
});

function getColor() {
  return 0x44FF00;
};

function getID() {
  return "4da600b8-582a-4fc3-ac2e-ada03d3e478c";
};

var santaHat;

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  stelar.addAnimationWithData(renderer, "stelar.NEBULA_BLAST_AIM", "skyhighocs:em_wave_change_aim", "fiskheroes:energy_projection_timer")
  .priority = 10;
  stelar.addAnimationWithData(renderer, "stelar.NEBULA_BURST_AIM", "skyhighocs:em_wave_change_aim", "fiskheroes:beam_charge")
  .priority = 10;
  renderer.setItemIcon("CHESTPLATE", "leo_transer");
};

function initEffects(renderer) {
  parent.initEffects(renderer);
  maskWaveChangingLights = renderer.createEffect("fiskheroes:overlay");
  maskWaveChangingLights.texture.set(null, "mask_wave_changing_lights");
  mask = renderer.createEffect("fiskheroes:overlay");
  mask.texture.set("mask", "mask_lights");
  stelar.bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:pryetak_nebula_nebula_burst", "rightArm", 0xAA00FF, [
      { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-1.0, 9.0, -0.5], "size": [3.0, 3.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  stelar.bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:pryetak_nebula_nebula_blast", "rightArm", 0x44FF00, [
      { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-1.0, 9.0, -0.5], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  stuff.bindFlightTrail(renderer, "skyhighocs:pryetak_nebula_flight");
  //Battle card predation wave changing
  predation = stelar.initHandThing(renderer, "predation_wave_changing", 0, 2);
  //Nebula Blast
  nebulaBlast = stelar.initHandThing(renderer, "nebula_blast", 2, 3);
  //Ice Bomb
  iceBomb = stelar.initHandThing(renderer, "ice_bomb", 2, 0);
  //Nebula Burst
  nebulaBurst = stelar.initHandThing(renderer, "nebula_burst", 2, 3);
  //Sword
  swordMain = renderer.createEffect("fiskheroes:shield");
  swordMain.texture.set("sword");
  swordMain.anchor.set("rightArm");
  swordMain.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 12.5, 0.0);
  swordMain.large = true;
  swordBlade = renderer.createEffect("fiskheroes:shield");
  swordBlade.texture.set(null, "sword_blade");
  swordBlade.anchor.set("rightArm");
  swordBlade.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 14.5, 0.0);
  swordBlade.large = true;
  swordWaveChanging = renderer.createEffect("fiskheroes:shield");
  swordWaveChanging.texture.set(null, "sword_wave_changing_lights");
  swordWaveChanging.anchor.set("rightArm");
  swordWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 12.5, 0.0);
  swordWaveChanging.large = true;
  sword = stelar.initHandThing(renderer, "sword", 2, 0);
  //Head
  head = stelar.initHandThing(renderer, "head", 1, 4, 3);
  headWaveChange = stelar.initHandThing(renderer, "head_wave_change", 1, 4, 3);
  headWaveChanging = stelar.initHandThing(renderer, "head_wave_changing", 0, 1, 3);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
  if (renderLayer == "CHESTPLATE") {
    if ((entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("fiskheroes:mask_open_timer2") > 0) || (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
      maskWaveChangingLights.render();
      mask.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") > 0 || (entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) {
        headWaveChange.render();
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && (entity.getInterpolatedData("skyhighocs:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_blast_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/ice_bomb_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_burst_timer") < 1) || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        head.render();
      };
      if (((entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) || entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) && (entity.getInterpolatedData("skyhighocs:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_blast_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/ice_bomb_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_burst_timer") < 1)) {
        headWaveChanging.render();
      };
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) {
      predation.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/sword_timer") > 0) {
      swordWaveChanging.render();
      swordMain.render();
      sword.render();
      if (entity.getData("skyhighocs:dyn/sword") && entity.getHeldItem().isEmpty()) {
        swordBlade.render();
      };
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/nebula_blast_timer") > 0) {
      nebulaBlast.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/ice_bomb_timer") > 0) {
      iceBomb.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/nebula_burst_timer") > 0) {
      nebulaBurst.render();
    };
  };
};
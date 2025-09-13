extend("skyhighocs:base_em_wave_change");

var stelar = implement("skyhighocs:external/stelar");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "base": "skyhighocs:damien/abyssal_shadow_base",
  "lights": "skyhighocs:damien/abyssal_shadow_lights",
  "base_wave_change": "skyhighocs:damien/abyssal_shadow_wave_change.tx.json",
  "lights_wave_change": "skyhighocs:damien/abyssal_shadow_wave_change_lights.tx.json",
  "wave_changing_lights": "skyhighocs:damien/abyssal_shadow_wave_changing_lights.tx.json",
  "mask": "skyhighocs:damien/abyssal_shadow_mask.tx.json",
  "mask_lights": "skyhighocs:damien/abyssal_shadow_mask_lights.tx.json",
  "mask_wave_changing_lights": "skyhighocs:damien/abyssal_shadow_mask_wave_changing_lights.tx.json",
  "soul_splitter_blade": "skyhighocs:damien/abyssal_shadow_soul_splitter_blade.tx.json",
  "soul_splitter": "skyhighocs:damien/abyssal_shadow_soul_splitter.tx.json",
  "soul_splitter_wave_changing_lights": "skyhighocs:damien/abyssal_shadow_soul_splitter_wave_changing_lights.tx.json",
  "soul_splitter_sides": "skyhighocs:damien/abyssal_shadow_soul_splitter_sides.tx.json",
  "soul_splitter_front": "skyhighocs:damien/abyssal_shadow_soul_splitter_front.tx.json",
  "soul_splitter_wave_changing_sides_lights": "skyhighocs:damien/abyssal_shadow_soul_splitter_wave_changing_sides_lights.tx.json",
  "soul_splitter_wave_changing_front_lights": "skyhighocs:damien/abyssal_shadow_soul_splitter_wave_changing_front_lights.tx.json",
  "abyssal_shroud_sides": "skyhighocs:damien/abyssal_shadow_abyssal_shroud_sides.tx.json",
  "abyssal_shroud_front": "skyhighocs:damien/abyssal_shadow_abyssal_shroud_front.tx.json",
  "abyssal_shroud_wave_changing_sides_lights": "skyhighocs:damien/abyssal_shadow_abyssal_shroud_wave_changing_sides_lights.tx.json",
  "abyssal_shroud_wave_changing_front_lights": "skyhighocs:damien/abyssal_shadow_abyssal_shroud_wave_changing_front_lights.tx.json",
  "unleashed_darkness_sides": "skyhighocs:damien/abyssal_shadow_unleashed_darkness_sides.tx.json",
  "unleashed_darkness_front": "skyhighocs:damien/abyssal_shadow_unleashed_darkness_front.tx.json",
  "unleashed_darkness_front_lights": "skyhighocs:damien/abyssal_shadow_unleashed_darkness_front_lights.tx.json",
  "unleashed_darkness_wave_changing_sides_lights": "skyhighocs:damien/abyssal_shadow_unleashed_darkness_wave_changing_sides_lights.tx.json",
  "unleashed_darkness_wave_changing_front_lights": "skyhighocs:damien/abyssal_shadow_unleashed_darkness_wave_changing_front_lights.tx.json",
  "shadow_blast_sides": "skyhighocs:damien/abyssal_shadow_shadow_blast_sides.tx.json",
  "shadow_blast_front": "skyhighocs:damien/abyssal_shadow_shadow_blast_front.tx.json",
  "shadow_blast_front_lights": "skyhighocs:damien/abyssal_shadow_shadow_blast_front_lights.tx.json",
  "shadow_blast_wave_changing_sides_lights": "skyhighocs:damien/abyssal_shadow_shadow_blast_wave_changing_sides_lights.tx.json",
  "shadow_blast_wave_changing_front_lights": "skyhighocs:damien/abyssal_shadow_shadow_blast_wave_changing_front_lights.tx.json",
  "em_being_base": "skyhighocs:damien/achyls_base",
  "em_being_lights": "skyhighocs:damien/achyls_lights",
  "head_right": "skyhighocs:damien/achlys_right.tx.json",
  "head_wave_change_right": "skyhighocs:damien/achlys_wave_change_right.tx.json",
  "head_wave_change_right_lights": "skyhighocs:damien/achlys_wave_change_right_lights.tx.json",
  "head_right_lights": "skyhighocs:damien/achlys_right_lights.tx.json",
  "head_wave_changing_right_lights": "skyhighocs:damien/achlys_wave_changing_right_lights.tx.json",
  "head_left": "skyhighocs:damien/achlys_left.tx.json",
  "head_wave_change_left": "skyhighocs:damien/achlys_wave_change_left.tx.json",
  "head_left_lights": "skyhighocs:damien/achlys_left_lights.tx.json",
  "head_wave_change_left_lights": "skyhighocs:damien/achlys_wave_change_left_lights.tx.json",
  "head_wave_changing_left_lights": "skyhighocs:damien/achlys_wave_changing_left_lights.tx.json",
  "head_top": "skyhighocs:damien/achlys_top.tx.json",
  "head_wave_change_top": "skyhighocs:damien/achlys_wave_change_top.tx.json",
  "head_top_lights": "skyhighocs:damien/achlys_top_lights.tx.json",
  "head_wave_change_top_lights": "skyhighocs:damien/achlys_wave_change_top_lights.tx.json",
  "head_wave_changing_top_lights": "skyhighocs:damien/achlys_wave_changing_top_lights.tx.json",
  "head_bottom": "skyhighocs:damien/achlys_bottom.tx.json",
  "head_wave_change_bottom": "skyhighocs:damien/achlys_wave_change_bottom.tx.json",
  "head_bottom_lights": "skyhighocs:damien/achlys_bottom_lights.tx.json",
  "head_wave_change_bottom_lights": "skyhighocs:damien/achlys_wave_change_bottom_lights.tx.json",
  "head_wave_changing_bottom_lights": "skyhighocs:damien/achlys_wave_changing_bottom_lights.tx.json",
  "head_front": "skyhighocs:damien/achlys_front.tx.json",
  "head_wave_change_front": "skyhighocs:damien/achlys_wave_change_front.tx.json",
  "head_wave_changing_front_lights": "skyhighocs:damien/achlys_wave_changing_front_lights.tx.json",
  "transer": "skyhighocs:damien/damien_stelar_transer.tx.json",
  "transer_wave_change": "skyhighocs:damien/damien_stelar_transer_wave_change.tx.json",
  "visualizer_lights": "skyhighocs:damien/damien_stelar_visualizer_lights.tx.json",
  "visualizer_lights_wave_change": "skyhighocs:damien/damien_stelar_visualizer_lights_wave_change.tx.json",
  "transer_default": "skyhighocs:damien/damien_stelar_transer",
  "transer_default_lights": "skyhighocs:damien/damien_stelar_transer_lights",
  "shield": "skyhighocs:damien/abyssal_shadow_shield",
  "shield_lights": "skyhighocs:damien/abyssal_shadow_shield_lights",
  "katana": "skyhighocs:damien/abyssal_shadow_katana",
  "katana_lights": "skyhighocs:damien/abyssal_shadow_katana_lights",
  "scythe": "skyhighocs:damien/abyssal_shadow_scythe",
  "scythe_lights": "skyhighocs:damien/abyssal_shadow_scythe_lights",
  "rifle": "skyhighocs:damien/abyssal_shadow_rifle",
  "rifle_lights": "skyhighocs:damien/abyssal_shadow_rifle_lights",
  "santa_hat_em": "skyhighocs:damien/abyssal_shadow_santa_hat"
});

function getColor() {
  return 0x8000FF;
};

function getID() {
  return "e51532a1-19fc-4d4f-9da0-f952c4645891";
};

var santaHat;

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  stelar.addSwordAnimations(renderer, "em_wave_change.SOUL_SPLITTER", "skyhighocs:em_wave_change_sword", "soul_splitter");
  stelar.addAnimationWithData(renderer, "em_wave_change.SHADOW_BLAST_AIM", "skyhighocs:em_wave_change_aim", "fiskheroes:energy_projection_timer")
  .priority = 10;
  stelar.addAnimationWithData(renderer, "em_wave_change.UNLEASHED_DARKNESS_AIM", "skyhighocs:em_wave_change_aim", "fiskheroes:beam_charge")
  .priority = 10;
  renderer.setItemIcon("CHESTPLATE", "dragon_transer");
};

function initEffects(renderer) {
  parent.initEffects(renderer);
  maskWaveChangingLights = renderer.createEffect("fiskheroes:overlay");
  maskWaveChangingLights.texture.set(null, "mask_wave_changing_lights");
  mask = renderer.createEffect("fiskheroes:overlay");
  mask.texture.set("mask", "mask_lights");
  stelar.bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:abyssal_shadow_unleashed_darkness", "rightArm", 0x8000FF, [
      { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-1.0, 9.0, -0.5], "size": [3.0, 3.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  stelar.bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:abyssal_shadow_shadow_blast", "rightArm", 0x8000FF, [
      { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-1.0, 9.0, -0.5], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  stuff.bindFlightTrail(renderer, "skyhighocs:abyssal_shadow_flight");
  //Abyssal Shroud
  abyssalShroud = stelar.initHandThing(renderer, "abyssal_shroud", 2, 0);
  abyssalShroudPredation = stelar.initHandThing(renderer, "abyssal_shroud_wave_changing", 0, 2);
  //Unleashed Darkness
  unleashedDarkness = stelar.initHandThing(renderer, "unleashed_darkness", 2, 3);
  unleashedDarknessPredation = stelar.initHandThing(renderer, "unleashed_darkness_wave_changing", 0, 2);
  //Shadow Blast
  shadowBlast = stelar.initHandThing(renderer, "shadow_blast", 2, 3);
  shadowBlastPredation = stelar.initHandThing(renderer, "shadow_blast_wave_changing", 0, 2);
  //Soul Splitter
  soulSplitterMain = renderer.createEffect("fiskheroes:shield");
  soulSplitterMain.texture.set("soul_splitter");
  soulSplitterMain.anchor.set("rightArm");
  soulSplitterMain.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 12.5, 0.0);
  soulSplitterMain.large = true;
  soulSplitterBlade = renderer.createEffect("fiskheroes:shield");
  soulSplitterBlade.texture.set(null, "soul_splitter_blade");
  soulSplitterBlade.anchor.set("rightArm");
  soulSplitterBlade.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 14.5, 0.0);
  soulSplitterBlade.large = true;
  soulSplitterWaveChanging = renderer.createEffect("fiskheroes:shield");
  soulSplitterWaveChanging.texture.set(null, "soul_splitter_wave_changing_lights");
  soulSplitterWaveChanging.anchor.set("rightArm");
  soulSplitterWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 12.5, 0.0);
  soulSplitterWaveChanging.large = true;
  soulSplitter = stelar.initHandThing(renderer, "soul_splitter", 2, 0);
  soulSplitterPredation = stelar.initHandThing(renderer, "soul_splitter_wave_changing", 0, 2);
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
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && (entity.getInterpolatedData("skyhighocs:dyn/soul_splitter_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/abyssal_shroud_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/unleashed_darkness_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/shadow_blast_timer") < 1) || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        head.render();
      };
      if (((entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) || entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) && (entity.getInterpolatedData("skyhighocs:dyn/soul_splitter_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/abyssal_shroud_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/unleashed_darkness_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/shadow_blast_timer") < 1)) {
        headWaveChanging.render();
      };
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/soul_splitter_timer") > 0) {
      soulSplitterWaveChanging.render();
      soulSplitterMain.render();
      soulSplitter.render();
      soulSplitterPredation.render();
      if (entity.getData("skyhighocs:dyn/soul_splitter") && entity.getHeldItem().isEmpty()) {
        soulSplitterBlade.render();
      };
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/abyssal_shroud_timer") > 0) {
      abyssalShroud.render();
      abyssalShroudPredation.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/unleashed_darkness_timer") > 0) {
      unleashedDarkness.render();
      unleashedDarknessPredation.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/shadow_blast_timer") > 0) {
      shadowBlast.render();
      shadowBlastPredation.render();
    };
  };
};
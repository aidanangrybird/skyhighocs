extend("skyhighocs:base_em_wave_change");

var stelar = implement("skyhighocs:external/stelar");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "base": "skyhighocs:lucas/crimson_asteroid_base",
  "lights": "skyhighocs:lucas/crimson_asteroid_lights",
  "base_wave_change": "skyhighocs:lucas/crimson_asteroid_wave_change.tx.json",
  "lights_wave_change": "skyhighocs:lucas/crimson_asteroid_wave_change_lights.tx.json",
  "wave_changing_lights": "skyhighocs:lucas/crimson_asteroid_wave_changing_lights.tx.json",
  "mask": "skyhighocs:lucas/crimson_asteroid_mask.tx.json",
  "mask_lights": "skyhighocs:lucas/crimson_asteroid_mask_lights.tx.json",
  "mask_wave_changing_lights": "skyhighocs:lucas/crimson_asteroid_mask_wave_changing_lights.tx.json",
  "predation_wave_changing_sides_lights": "skyhighocs:lucas/crimson_asteroid_predation_wave_changing_sides_lights.tx.json",
  "predation_wave_changing_front_lights": "skyhighocs:lucas/crimson_asteroid_predation_wave_changing_front_lights.tx.json",
  "sword_blade": "skyhighocs:lucas/crimson_asteroid_sword_blade.tx.json",
  "sword": "skyhighocs:lucas/crimson_asteroid_sword.tx.json",
  "sword_wave_changing_lights": "skyhighocs:lucas/crimson_asteroid_sword_wave_changing_lights.tx.json",
  "sword_sides": "skyhighocs:lucas/crimson_asteroid_sword_sides.tx.json",
  "sword_front": "skyhighocs:lucas/crimson_asteroid_sword_front.tx.json",
  "asteroid_strike_sides": "skyhighocs:lucas/crimson_asteroid_asteroid_strike_sides.tx.json",
  "asteroid_strike_front": "skyhighocs:lucas/crimson_asteroid_asteroid_strike_front.tx.json",
  "asteroid_strike_front_lights": "skyhighocs:lucas/crimson_asteroid_asteroid_strike_front_lights.tx.json",
  "asteroid_blast_sides": "skyhighocs:lucas/crimson_asteroid_asteroid_blast_sides.tx.json",
  "asteroid_blast_front": "skyhighocs:lucas/crimson_asteroid_asteroid_blast_front.tx.json",
  "asteroid_blast_front_lights": "skyhighocs:lucas/crimson_asteroid_asteroid_blast_front_lights.tx.json",
  "asteroid_crash_sides": "skyhighocs:lucas/crimson_asteroid_asteroid_crash_sides.tx.json",
  "asteroid_crash_front": "skyhighocs:lucas/crimson_asteroid_asteroid_crash_front.tx.json",
  "em_being_base": "skyhighocs:lucas/crimson_base",
  "em_being_lights": "skyhighocs:lucas/crimson_lights",
  "head_right": "skyhighocs:lucas/crimson_right.tx.json",
  "head_wave_change_right": "skyhighocs:lucas/crimson_wave_change_right.tx.json",
  "head_wave_change_right_lights": "skyhighocs:lucas/crimson_wave_change_right_lights.tx.json",
  "head_right_lights": "skyhighocs:lucas/crimson_right_lights.tx.json",
  "head_wave_changing_right_lights": "skyhighocs:lucas/crimson_wave_changing_right_lights.tx.json",
  "head_left": "skyhighocs:lucas/crimson_left.tx.json",
  "head_wave_change_left": "skyhighocs:lucas/crimson_wave_change_left.tx.json",
  "head_left_lights": "skyhighocs:lucas/crimson_left_lights.tx.json",
  "head_wave_change_left_lights": "skyhighocs:lucas/crimson_wave_change_left_lights.tx.json",
  "head_wave_changing_left_lights": "skyhighocs:lucas/crimson_wave_changing_left_lights.tx.json",
  "head_top": "skyhighocs:lucas/crimson_top.tx.json",
  "head_wave_change_top": "skyhighocs:lucas/crimson_wave_change_top.tx.json",
  "head_top_lights": "skyhighocs:lucas/crimson_top_lights.tx.json",
  "head_wave_change_top_lights": "skyhighocs:lucas/crimson_wave_change_top_lights.tx.json",
  "head_wave_changing_top_lights": "skyhighocs:lucas/crimson_wave_changing_top_lights.tx.json",
  "head_bottom": "skyhighocs:lucas/crimson_bottom.tx.json",
  "head_wave_change_bottom": "skyhighocs:lucas/crimson_wave_change_bottom.tx.json",
  "head_bottom_lights": "skyhighocs:lucas/crimson_bottom_lights.tx.json",
  "head_wave_change_bottom_lights": "skyhighocs:lucas/crimson_wave_change_bottom_lights.tx.json",
  "head_wave_changing_bottom_lights": "skyhighocs:lucas/crimson_wave_changing_bottom_lights.tx.json",
  "head_front": "skyhighocs:lucas/crimson_front.tx.json",
  "head_wave_change_front": "skyhighocs:lucas/crimson_wave_change_front.tx.json",
  "head_wave_changing_front_lights": "skyhighocs:lucas/crimson_wave_changing_front_lights.tx.json",
  "transer": "skyhighocs:lucas/lucas_stelar_transer.tx.json",
  "transer_wave_change": "skyhighocs:lucas/lucas_stelar_transer_wave_change.tx.json",
  "visualizer_lights": "skyhighocs:lucas/lucas_stelar_visualizer_lights.tx.json",
  "visualizer_lights_wave_change": "skyhighocs:lucas/lucas_stelar_visualizer_lights_wave_change.tx.json",
  "transer_default": "skyhighocs:lucas/lucas_stelar_transer",
  "transer_default_lights": "skyhighocs:lucas/lucas_stelar_transer_lights",
  "shield": "skyhighocs:lucas/crimson_asteroid_shield",
  "shield_lights": "skyhighocs:lucas/crimson_asteroid_shield_lights",
  "katana": "skyhighocs:lucas/crimson_asteroid_katana",
  "katana_lights": "skyhighocs:lucas/crimson_asteroid_katana_lights",
  "scythe": "skyhighocs:lucas/crimson_asteroid_scythe",
  "scythe_lights": "skyhighocs:lucas/crimson_asteroid_scythe_lights",
  "rifle": "skyhighocs:lucas/crimson_asteroid_rifle",
  "rifle_lights": "skyhighocs:lucas/crimson_asteroid_rifle_lights",
  "santa_hat_em": "skyhighocs:lucas/crimson_asteroid_santa_hat"
});

function getColor() {
  return 0xFF0000;
};

function getID() {
  return "c4bc5db6-3cf6-44fe-8427-304a7b211bc4";
};

var santaHat;

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  stelar.addAnimationWithData(renderer, "stelar.ASTEROID_BLAST_AIM", "skyhighocs:em_wave_change_aim", "fiskheroes:energy_projection_timer")
  .priority = 10;
  renderer.setItemIcon("CHESTPLATE", "dragon_transer");
};

function initEffects(renderer) {
  parent.initEffects(renderer);
  maskWaveChangingLights = renderer.createEffect("fiskheroes:overlay");
  maskWaveChangingLights.texture.set(null, "mask_wave_changing_lights");
  mask = renderer.createEffect("fiskheroes:overlay");
  mask.texture.set("mask", "mask_lights");
  stelar.bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:crimson_asteroid_asteroid_blast", "rightArm", 0xFF0000, [
    { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [4.0, 4.0] }
  ]);
  stuff.bindFlightTrail(renderer, "skyhighocs:crimson_asteroid_flight");
  //Battle card predation wave changing
  predation = stelar.initHandThing(renderer, "predation_wave_changing", 0, 2);
  //Asteroid Crash
  asteroidCrash = stelar.initHandThing(renderer, "asteroid_crash", 2, 0);
  //Asteroid Blast
  asteroidBlast = stelar.initHandThing(renderer, "asteroid_blast", 2, 3);
  //Asteroid Strike
  asteroidStrike = stelar.initHandThing(renderer, "asteroid_strike", 2, 3);
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
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && (entity.getInterpolatedData("skyhighocs:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_crash_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_strike_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_blast_timer") < 1) || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        head.render();
      }
      if (((entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) || entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) && (entity.getInterpolatedData("skyhighocs:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_crash_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_strike_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_blast_timer") < 1)) {
        headWaveChanging.render();
      }
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
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/asteroid_crash_timer") > 0) {
      asteroidCrash.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/asteroid_strike_timer") > 0) {
      asteroidStrike.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/asteroid_blast_timer") > 0) {
      asteroidBlast.render();
    };
  };
};
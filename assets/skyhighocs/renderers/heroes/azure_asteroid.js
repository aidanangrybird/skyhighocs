extend("skyhighocs:base_em_wave_change");

var stelar = implement("skyhighocs:external/stelar");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "base": "skyhighocs:cade/azure_asteroid_base",
  "lights": "skyhighocs:cade/azure_asteroid_lights",
  "base_wave_change": "skyhighocs:cade/azure_asteroid_wave_change.tx.json",
  "lights_wave_change": "skyhighocs:cade/azure_asteroid_wave_change_lights.tx.json",
  "wave_changing_lights": "skyhighocs:cade/azure_asteroid_wave_changing_lights.tx.json",
  "mask": "skyhighocs:cade/azure_asteroid_mask.tx.json",
  "mask_lights": "skyhighocs:cade/azure_asteroid_mask_lights.tx.json",
  "mask_wave_changing_lights": "skyhighocs:cade/azure_asteroid_mask_wave_changing_lights.tx.json",
  "gas_plume_blade": "skyhighocs:cade/azure_asteroid_gas_plume_blade.tx.json",
  "gas_plume": "skyhighocs:cade/azure_asteroid_gas_plume.tx.json",
  "gas_plume_wave_changing_lights": "skyhighocs:cade/azure_asteroid_gas_plume_wave_changing_lights.tx.json",
  "gas_plume_sides": "skyhighocs:cade/azure_asteroid_gas_plume_sides.tx.json",
  "gas_plume_front": "skyhighocs:cade/azure_asteroid_gas_plume_front.tx.json",
  "gas_plume_wave_changing_sides_lights": "skyhighocs:cade/azure_asteroid_gas_plume_wave_changing_sides_lights.tx.json",
  "gas_plume_wave_changing_front_lights": "skyhighocs:cade/azure_asteroid_gas_plume_wave_changing_front_lights.tx.json",
  "asteroid_crash_sides": "skyhighocs:cade/azure_asteroid_asteroid_crash_sides.tx.json",
  "asteroid_crash_front": "skyhighocs:cade/azure_asteroid_asteroid_crash_front.tx.json",
  "asteroid_crash_wave_changing_sides_lights": "skyhighocs:cade/azure_asteroid_asteroid_crash_wave_changing_sides_lights.tx.json",
  "asteroid_crash_wave_changing_front_lights": "skyhighocs:cade/azure_asteroid_asteroid_crash_wave_changing_front_lights.tx.json",
  "asteroid_strike_sides": "skyhighocs:cade/azure_asteroid_asteroid_strike_sides.tx.json",
  "asteroid_strike_front": "skyhighocs:cade/azure_asteroid_asteroid_strike_front.tx.json",
  "asteroid_strike_front_lights": "skyhighocs:cade/azure_asteroid_asteroid_strike_front_lights.tx.json",
  "asteroid_strike_wave_changing_sides_lights": "skyhighocs:cade/azure_asteroid_asteroid_strike_wave_changing_sides_lights.tx.json",
  "asteroid_strike_wave_changing_front_lights": "skyhighocs:cade/azure_asteroid_asteroid_strike_wave_changing_front_lights.tx.json",
  "azure_river_sides": "skyhighocs:cade/azure_asteroid_azure_river_sides.tx.json",
  "azure_river_front": "skyhighocs:cade/azure_asteroid_azure_river_front.tx.json",
  "azure_river_front_lights": "skyhighocs:cade/azure_asteroid_azure_river_front_lights.tx.json",
  "azure_river_wave_changing_sides_lights": "skyhighocs:cade/azure_asteroid_azure_river_wave_changing_sides_lights.tx.json",
  "azure_river_wave_changing_front_lights": "skyhighocs:cade/azure_asteroid_azure_river_wave_changing_front_lights.tx.json",
  "em_being_base": "skyhighocs:cade/aegir_base",
  "em_being_lights": "skyhighocs:cade/aegir_lights",
  "head_right": "skyhighocs:cade/aegir_right.tx.json",
  "head_wave_change_right": "skyhighocs:cade/aegir_wave_change_right.tx.json",
  "head_wave_change_right_lights": "skyhighocs:cade/aegir_wave_change_right_lights.tx.json",
  "head_right_lights": "skyhighocs:cade/aegir_right_lights.tx.json",
  "head_wave_changing_right_lights": "skyhighocs:cade/aegir_wave_changing_right_lights.tx.json",
  "head_left": "skyhighocs:cade/aegir_left.tx.json",
  "head_wave_change_left": "skyhighocs:cade/aegir_wave_change_left.tx.json",
  "head_left_lights": "skyhighocs:cade/aegir_left_lights.tx.json",
  "head_wave_change_left_lights": "skyhighocs:cade/aegir_wave_change_left_lights.tx.json",
  "head_wave_changing_left_lights": "skyhighocs:cade/aegir_wave_changing_left_lights.tx.json",
  "head_top": "skyhighocs:cade/aegir_top.tx.json",
  "head_wave_change_top": "skyhighocs:cade/aegir_wave_change_top.tx.json",
  "head_top_lights": "skyhighocs:cade/aegir_top_lights.tx.json",
  "head_wave_change_top_lights": "skyhighocs:cade/aegir_wave_change_top_lights.tx.json",
  "head_wave_changing_top_lights": "skyhighocs:cade/aegir_wave_changing_top_lights.tx.json",
  "head_bottom": "skyhighocs:cade/aegir_bottom.tx.json",
  "head_wave_change_bottom": "skyhighocs:cade/aegir_wave_change_bottom.tx.json",
  "head_bottom_lights": "skyhighocs:cade/aegir_bottom_lights.tx.json",
  "head_wave_change_bottom_lights": "skyhighocs:cade/aegir_wave_change_bottom_lights.tx.json",
  "head_wave_changing_bottom_lights": "skyhighocs:cade/aegir_wave_changing_bottom_lights.tx.json",
  "head_front": "skyhighocs:cade/aegir_front.tx.json",
  "head_wave_change_front": "skyhighocs:cade/aegir_wave_change_front.tx.json",
  "head_wave_changing_front_lights": "skyhighocs:cade/aegir_wave_changing_front_lights.tx.json",
  "transer": "skyhighocs:cade/cade_stelar_transer.tx.json",
  "transer_wave_change": "skyhighocs:cade/cade_stelar_transer_wave_change.tx.json",
  "visualizer_lights": "skyhighocs:cade/cade_stelar_visualizer_lights.tx.json",
  "visualizer_lights_wave_change": "skyhighocs:cade/cade_stelar_visualizer_lights_wave_change.tx.json",
  "transer_default": "skyhighocs:cade/cade_stelar_transer",
  "transer_default_lights": "skyhighocs:cade/cade_stelar_transer_lights",
  "shield": "skyhighocs:cade/azure_asteroid_shield",
  "shield_lights": "skyhighocs:cade/azure_asteroid_shield_lights",
  "katana": "skyhighocs:cade/azure_asteroid_katana",
  "katana_lights": "skyhighocs:cade/azure_asteroid_katana_lights",
  "scythe": "skyhighocs:cade/azure_asteroid_scythe",
  "scythe_lights": "skyhighocs:cade/azure_asteroid_scythe_lights",
  "rifle": "skyhighocs:cade/azure_asteroid_rifle",
  "rifle_lights": "skyhighocs:cade/azure_asteroid_rifle_lights",
  //"santa_hat_em": "skyhighocs:cade/azure_asteroid_santa_hat"
});

function getColor() {
  return 0x0000FF;
};

function getID() {
  return "6982b802-8dec-460a-b1fa-6f1596944e8f";
};

var santaHat;

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  stelar.addSwordAnimations(renderer, "em_wave_change.GAS_PLUME", "skyhighocs:em_wave_change_sword", "gas_plume");
  stelar.addAnimationWithData(renderer, "em_wave_change.AZURE_RIVER_AIM", "skyhighocs:em_wave_change_aim", "fiskheroes:energy_projection_timer")
  .priority = 10;
  renderer.setItemIcon("CHESTPLATE", "dragon_transer");
};

function initEffects(renderer) {
  parent.initEffects(renderer);
  maskWaveChangingLights = renderer.createEffect("fiskheroes:overlay");
  maskWaveChangingLights.texture.set(null, "mask_wave_changing_lights");
  mask = renderer.createEffect("fiskheroes:overlay");
  mask.texture.set("mask", "mask_lights");
  stelar.bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:azure_asteroid_azure_river", "rightArm", 0x0000FF, [
      { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-1.0, 9.0, -0.5], "size": [3.0, 3.0] }
  ]);
  stuff.bindFlightTrail(renderer, "skyhighocs:azure_asteroid_flight");
  //asteroidCrash
  asteroidCrash = stelar.initHandThing(renderer, "asteroid_crash", 2, 0);
  asteroidCrashPredation = stelar.initHandThing(renderer, "asteroid_crash_wave_changing", 0, 2);
  //asteroidStrike
  asteroidStrike = stelar.initHandThing(renderer, "asteroid_strike", 2, 3);
  asteroidStrikePredation = stelar.initHandThing(renderer, "asteroid_strike_wave_changing", 0, 2);
  //azureRiver
  azureRiver = stelar.initHandThing(renderer, "azure_river", 2, 3);
  azureRiverPredation = stelar.initHandThing(renderer, "azure_river_wave_changing", 0, 2);
  //gasPlume
  gasPlumeMain = renderer.createEffect("fiskheroes:shield");
  gasPlumeMain.texture.set("gas_plume");
  gasPlumeMain.anchor.set("rightArm");
  gasPlumeMain.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 12.5, 0.0);
  gasPlumeMain.large = true;
  gasPlumeBlade = renderer.createEffect("fiskheroes:shield");
  gasPlumeBlade.texture.set(null, "gas_plume_blade");
  gasPlumeBlade.anchor.set("rightArm");
  gasPlumeBlade.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 14.5, 0.0);
  gasPlumeBlade.large = true;
  gasPlumeWaveChanging = renderer.createEffect("fiskheroes:shield");
  gasPlumeWaveChanging.texture.set(null, "gas_plume_wave_changing_lights");
  gasPlumeWaveChanging.anchor.set("rightArm");
  gasPlumeWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 12.5, 0.0);
  gasPlumeWaveChanging.large = true;
  gasPlume = stelar.initHandThing(renderer, "gas_plume", 2, 0);
  gasPlumePredation = stelar.initHandThing(renderer, "gas_plume_wave_changing", 0, 2);
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
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && (entity.getInterpolatedData("skyhighocs:dyn/gas_plume_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_crash_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_strike_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/azure_river_timer") < 1) || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        head.render();
      }
      if (((entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) || entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) && (entity.getInterpolatedData("skyhighocs:dyn/gas_plume_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_crash_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/asteroid_strike_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/azure_river_timer") < 1)) {
        headWaveChanging.render();
      }
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/gas_plume_timer") > 0) {
      gasPlumeWaveChanging.render();
      gasPlumeMain.render();
      gasPlume.render();
      gasPlumePredation.render();
      if (entity.getData("skyhighocs:dyn/gas_plume") && entity.getHeldItem().isEmpty()) {
        gasPlumeBlade.render();
      };
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/asteroid_crash_timer") > 0) {
      asteroidCrash.render();
      asteroidCrashPredation.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/asteroid_strike_timer") > 0) {
      asteroidStrike.render();
      asteroidStrikePredation.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/azure_river_timer") > 0) {
      azureRiver.render();
      azureRiverPredation.render();
    };
  };
};
extend("skyhighocs:base_em_wave_change");

var stelar = implement("skyhighheroes:external/stelar");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:ace/solar_flame_base",
  "lights": "skyhighocs:ace/solar_flame_lights",
  "base_wave_change": "skyhighocs:ace/solar_flame_wave_change.tx.json",
  "lights_wave_change": "skyhighocs:ace/solar_flame_wave_change_lights.tx.json",
  "wave_changing_lights": "skyhighocs:ace/solar_flame_wave_changing_lights.tx.json",
  "helmet": "skyhighocs:ace/solar_flame_helmet.tx.json",
  "helmet_wave_changing_lights": "skyhighocs:ace/solar_flame_helmet_wave_changing_lights.tx.json",
  "mask": "skyhighocs:ace/solar_flame_mask.tx.json",
  "mask_lights": "skyhighocs:ace/solar_flame_mask_lights.tx.json",
  "mask_wave_changing_lights": "skyhighocs:ace/solar_flame_mask_wave_changing_lights.tx.json",
  "predation_wave_changing_sides_lights": "skyhighocs:ace/solar_flame_predation_wave_changing_sides_lights.tx.json",
  "predation_wave_changing_front_lights": "skyhighocs:ace/solar_flame_predation_wave_changing_front_lights.tx.json",
  "sword_blade": "skyhighocs:ace/solar_flame_sword_blade.tx.json",
  "sword": "skyhighocs:ace/solar_flame_sword.tx.json",
  "sword_wave_changing_lights": "skyhighocs:ace/solar_flame_sword_wave_changing_lights.tx.json",
  "sword_sides": "skyhighocs:ace/solar_flame_sword_sides.tx.json",
  "sword_front": "skyhighocs:ace/solar_flame_sword_front.tx.json",
  "solar_wind_sides": "skyhighocs:ace/solar_flame_solar_wind_sides.tx.json",
  "solar_wind_front": "skyhighocs:ace/solar_flame_solar_wind_front.tx.json",
  "solar_wind_front_lights": "skyhighocs:ace/solar_flame_solar_wind_front_lights.tx.json",
  "solar_blast_sides": "skyhighocs:ace/solar_flame_solar_blast_sides.tx.json",
  "solar_blast_front": "skyhighocs:ace/solar_flame_solar_blast_front.tx.json",
  "solar_blast_front_lights": "skyhighocs:ace/solar_flame_solar_blast_front_lights.tx.json",
  "solar_flare_sides": "skyhighocs:ace/solar_flame_solar_flare_sides.tx.json",
  "solar_flare_front": "skyhighocs:ace/solar_flame_solar_flare_front.tx.json",
  "solar_flare_sides_lights": "skyhighocs:ace/solar_flame_solar_flare_sides_lights.tx.json",
  "solar_flare_front_lights": "skyhighocs:ace/solar_flame_solar_flare_front_lights.tx.json",
  "head_right": "skyhighocs:ace/solar_right.tx.json",
  "head_wave_change_right": "skyhighocs:ace/solar_wave_change_right.tx.json",
  "head_wave_change_right_lights": "skyhighocs:ace/solar_wave_change_right_lights.tx.json",
  "head_right_lights": "skyhighocs:ace/solar_right_lights.tx.json",
  "head_wave_changing_right_lights": "skyhighocs:ace/solar_wave_changing_right_lights.tx.json",
  "head_left": "skyhighocs:ace/solar_left.tx.json",
  "head_wave_change_left": "skyhighocs:ace/solar_wave_change_left.tx.json",
  "head_left_lights": "skyhighocs:ace/solar_left_lights.tx.json",
  "head_wave_change_left_lights": "skyhighocs:ace/solar_wave_change_left_lights.tx.json",
  "head_wave_changing_left_lights": "skyhighocs:ace/solar_wave_changing_left_lights.tx.json",
  "head_top": "skyhighocs:ace/solar_top.tx.json",
  "head_wave_change_top": "skyhighocs:ace/solar_wave_change_top.tx.json",
  "head_top_lights": "skyhighocs:ace/solar_top_lights.tx.json",
  "head_wave_change_top_lights": "skyhighocs:ace/solar_wave_change_top_lights.tx.json",
  "head_wave_changing_top_lights": "skyhighocs:ace/solar_wave_changing_top_lights.tx.json",
  "head_bottom": "skyhighocs:ace/solar_bottom.tx.json",
  "head_wave_change_bottom": "skyhighocs:ace/solar_wave_change_bottom.tx.json",
  "head_bottom_lights": "skyhighocs:ace/solar_bottom_lights.tx.json",
  "head_wave_change_bottom_lights": "skyhighocs:ace/solar_wave_change_bottom_lights.tx.json",
  "head_wave_changing_bottom_lights": "skyhighocs:ace/solar_wave_changing_bottom_lights.tx.json",
  "head_front": "skyhighocs:ace/solar_front.tx.json",
  "head_wave_change_front": "skyhighocs:ace/solar_wave_change_front.tx.json",
  "head_wave_changing_front_lights": "skyhighocs:ace/solar_wave_changing_front_lights.tx.json",
  "transer": "skyhighocs:ace/ace_stelar_transer.tx.json",
  "transer_wave_change": "skyhighocs:ace/ace_stelar_transer_wave_change.tx.json",
  "visualizer_lights": "skyhighocs:ace/ace_stelar_visualizer_lights.tx.json",
  "visualizer_lights_wave_change": "skyhighocs:ace/ace_stelar_visualizer_lights_wave_change.tx.json",
  "transer_default": "skyhighocs:ace/ace_stelar_transer",
  "transer_default_lights": "skyhighocs:ace/ace_stelar_transer_lights",
  "shield": "skyhighocs:ace/solar_flame_shield",
  "shield_lights": "skyhighocs:ace/solar_flame_shield_lights",
  "katana": "skyhighocs:ace/solar_flame_katana",
  "katana_lights": "skyhighocs:ace/solar_flame_katana_lights",
  "scythe": "skyhighocs:ace/solar_flame_scythe",
  "scythe_lights": "skyhighocs:ace/solar_flame_scythe_lights",
  "rifle": "skyhighocs:ace/solar_flame_rifle",
  "rifle_lights": "skyhighocs:ace/solar_flame_rifle_lights",
  "santa_hat_em": "skyhighocs:ace/solar_flame_santa_hat"
});

function getColor() {
  return 0xFF0000;
};

function getID() {
  return "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0";
};

var santaHat;

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  stelar.addAnimationWithData(renderer, "stelar.SOLAR_WIND_AIM", "skyhighheroes:stelar_aim", "fiskheroes:energy_projection_timer")
  .priority = 10;
  stelar.addAnimationWithData(renderer, "stelar.SOLAR_BLAST_AIM", "skyhighheroes:stelar_aim", "fiskheroes:beam_charge")
  .priority = 10;
  renderer.setItemIcon("CHESTPLATE", "pegasus_transer");
};

function initEffects(renderer) {
  parent.initEffects(renderer);
  helmetWaveChangingLights = renderer.createEffect("fiskheroes:overlay");
  helmetWaveChangingLights.texture.set(null, "helmet_wave_changing_lights");
  helmet = renderer.createEffect("fiskheroes:overlay");
  helmet.texture.set("helmet");
  maskWaveChangingLights = renderer.createEffect("fiskheroes:overlay");
  maskWaveChangingLights.texture.set(null, "mask_wave_changing_lights");
  mask = renderer.createEffect("fiskheroes:overlay");
  mask.texture.set("mask", "mask_lights");
  stelar.bindBeam(renderer, "fiskheroes:lightning_cast", "fiskheroes:lightning_cast", "rightArm", 0xFF0000, [
    { "firstPerson": [-8.0, 4.5, -10.0], "offset": [-0.5, 9.0, 0.0], "size": [1.0, 1.0] }
  ]);
  stelar.bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:solar_flame_solar_wind", "rightArm", 0xFF0000, [
    { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [6.0, 6.0] }
  ]);
  stelar.bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:solar_flame_solar_blast", "rightArm", 0xFF0000, [
    { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-1.0, 9.0, -0.5], "size": [3.0, 3.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  stuff.bindFlightTrail(renderer, "skyhighocs:solar_flame_flight");
  //Battle card predation wave changing
  predation = stelar.initHandThing(renderer, "predation_wave_changing", 0, 2);
  //solar Flare
  solarFlare = stelar.initHandThing(renderer, "solar_flare", 2, 2);
  //Solar Blast
  solarBlast = stelar.initHandThing(renderer, "solar_blast", 2, 3);
  //solarWind
  solarWind = stelar.initHandThing(renderer, "solar_wind", 2, 3);
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
    if ((entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("fiskheroes:mask_open_timer2") > 0) || (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
      if (!parent.isChristmasSeason) {
        helmetWaveChangingLights.render();
        helmet.render();
      };
      maskWaveChangingLights.render();
      mask.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") > 0 || (entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) {
        headWaveChange.render();
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/solar_flare_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/solar_wind_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/solar_blast_timer") < 1) || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        head.render();
      }
      if (((entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) || entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1) && (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/solar_flare_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/solar_wind_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/solar_blast_timer") < 1)) {
        headWaveChanging.render();
      }
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1) {
      predation.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") > 0) {
      swordWaveChanging.render();
      swordMain.render();
      sword.render();
      if (entity.getData("skyhighheroes:dyn/sword") && entity.getHeldItem().isEmpty()) {
        swordBlade.render();
      };
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/solar_flare_timer") > 0) {
      solarFlare.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/solar_wind_timer") > 0) {
      solarWind.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/solar_blast_timer") > 0) {
      solarBlast.render();
    };
  };
};
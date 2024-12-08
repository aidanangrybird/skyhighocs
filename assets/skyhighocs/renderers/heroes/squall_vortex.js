extend("skyhighocs:base_em_wave_change");

var stelar = implement("skyhighheroes:external/stelar");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:aidan/squall_vortex_base",
  "lights": "skyhighocs:aidan/squall_vortex_lights",
  "base_wave_change": "skyhighocs:aidan/squall_vortex_wave_change.tx.json",
  "lights_wave_change": "skyhighocs:aidan/squall_vortex_wave_change_lights.tx.json",
  "wave_changing_lights": "skyhighocs:aidan/squall_vortex_wave_changing_lights.tx.json",
  "helmet": "skyhighocs:aidan/squall_vortex_helmet.tx.json",
  "helmet_lights": "skyhighocs:aidan/squall_vortex_helmet_lights.tx.json",
  "helmet_wave_changing_lights": "skyhighocs:aidan/squall_vortex_helmet_wave_changing_lights.tx.json",
  "predation_wave_changing_sides_lights": "skyhighocs:aidan/squall_vortex_predation_wave_changing_sides_lights.tx.json",
  "predation_wave_changing_front_lights": "skyhighocs:aidan/squall_vortex_predation_wave_changing_front_lights.tx.json",
  "sword_blade": "skyhighocs:aidan/squall_vortex_sword_blade.tx.json",
  "sword": "skyhighocs:aidan/squall_vortex_sword.tx.json",
  "sword_lights": "skyhighocs:aidan/squall_vortex_sword_lights.tx.json",
  "sword_wave_changing_lights": "skyhighocs:aidan/squall_vortex_sword_wave_changing_lights.tx.json",
  "sword_sides": "skyhighocs:aidan/squall_vortex_sword_sides.tx.json",
  "sword_front": "skyhighocs:aidan/squall_vortex_sword_front.tx.json",
  "derecho_sides": "skyhighocs:aidan/squall_vortex_derecho_sides.tx.json",
  "derecho_front": "skyhighocs:aidan/squall_vortex_derecho_front.tx.json",
  "hail_cannon_sides": "skyhighocs:aidan/squall_vortex_hail_cannon_sides.tx.json",
  "hail_cannon_front": "skyhighocs:aidan/squall_vortex_hail_cannon_front.tx.json",
  "lightning_sides": "skyhighocs:aidan/squall_vortex_lightning_sides.tx.json",
  "lightning_front": "skyhighocs:aidan/squall_vortex_lightning_front.tx.json",
  "lightning_sides_lights": "skyhighocs:aidan/squall_vortex_lightning_sides_lights.tx.json",
  "lightning_front_lights": "skyhighocs:aidan/squall_vortex_lightning_front_lights.tx.json",
  "head_right": "skyhighocs:aidan/jet_streak_right.tx.json",
  "head_wave_change_right": "skyhighocs:aidan/jet_streak_wave_change_right.tx.json",
  "head_wave_change_right_lights": "skyhighocs:aidan/jet_streak_wave_change_right_lights.tx.json",
  "head_right_lights": "skyhighocs:aidan/jet_streak_right_lights.tx.json",
  "head_wave_changing_right_lights": "skyhighocs:aidan/jet_streak_wave_changing_right_lights.tx.json",
  "head_left": "skyhighocs:aidan/jet_streak_left.tx.json",
  "head_wave_change_left": "skyhighocs:aidan/jet_streak_wave_change_left.tx.json",
  "head_left_lights": "skyhighocs:aidan/jet_streak_left_lights.tx.json",
  "head_wave_change_left_lights": "skyhighocs:aidan/jet_streak_wave_change_left_lights.tx.json",
  "head_wave_changing_left_lights": "skyhighocs:aidan/jet_streak_wave_changing_left_lights.tx.json",
  "head_top": "skyhighocs:aidan/jet_streak_top.tx.json",
  "head_wave_change_top": "skyhighocs:aidan/jet_streak_wave_change_top.tx.json",
  "head_top_lights": "skyhighocs:aidan/jet_streak_top_lights.tx.json",
  "head_wave_change_top_lights": "skyhighocs:aidan/jet_streak_wave_change_top_lights.tx.json",
  "head_wave_changing_top_lights": "skyhighocs:aidan/jet_streak_wave_changing_top_lights.tx.json",
  "head_bottom": "skyhighocs:aidan/jet_streak_bottom.tx.json",
  "head_wave_change_bottom": "skyhighocs:aidan/jet_streak_wave_change_bottom.tx.json",
  "head_bottom_lights": "skyhighocs:aidan/jet_streak_bottom_lights.tx.json",
  "head_wave_change_bottom_lights": "skyhighocs:aidan/jet_streak_wave_change_bottom_lights.tx.json",
  "head_wave_changing_bottom_lights": "skyhighocs:aidan/jet_streak_wave_changing_bottom_lights.tx.json",
  "head_front": "skyhighocs:aidan/jet_streak_front.tx.json",
  "head_wave_change_front": "skyhighocs:aidan/jet_streak_wave_change_front.tx.json",
  "head_wave_changing_front_lights": "skyhighocs:aidan/jet_streak_wave_changing_front_lights.tx.json",
  "transer": "skyhighocs:aidan/aidan_stelar_transer.tx.json",
  "transer_wave_change": "skyhighocs:aidan/aidan_stelar_transer_wave_change.tx.json",
  "visualizer_lights": "skyhighocs:aidan/aidan_stelar_visualizer_lights.tx.json",
  "visualizer_lights_wave_change": "skyhighocs:aidan/aidan_stelar_visualizer_lights_wave_change.tx.json",
  "transer_default": "skyhighocs:aidan/aidan_stelar_transer",
  "transer_default_lights": "skyhighocs:aidan/aidan_stelar_transer_lights",
  "shield": "skyhighocs:aidan/squall_vortex_shield",
  "shield_lights": "skyhighocs:aidan/squall_vortex_shield_lights",
  "katana": "skyhighocs:aidan/squall_vortex_katana",
  "katana_lights": "skyhighocs:aidan/squall_vortex_katana_lights",
  "scythe": "skyhighocs:aidan/squall_vortex_scythe",
  "scythe_lights": "skyhighocs:aidan/squall_vortex_scythe_lights",
  "rifle": "skyhighocs:aidan/squall_vortex_rifle",
  "rifle_lights": "skyhighocs:aidan/squall_vortex_rifle_lights"
});

function getColor() {
  return 0xFF8900;
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
};

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  stelar.addAnimationWithData(renderer, "stelar.DERECHO_AIM", "skyhighheroes:stelar_aim", "fiskheroes:energy_projection_timer")
  .priority = 10;
  renderer.setItemIcon("CHESTPLATE", "pegasus_transer");
};

function initEffects(renderer) {
  parent.initEffects(renderer);
  helmetWaveChangingLights = renderer.createEffect("fiskheroes:overlay");
  helmetWaveChangingLights.texture.set(null, "helmet_wave_changing_lights");
  helmet = renderer.createEffect("fiskheroes:overlay");
  helmet.texture.set("helmet", "helmet_lights");
  stelar.bindBeam(renderer, "fiskheroes:lightning_cast", "skyhighocs:squall_vortex_lightning", "rightArm", 0xFFFF00, [
    { "firstPerson": [-8.0, 4.5, -10.0], "offset": [-0.5, 9.0, 0.0], "size": [1.0, 1.0] }
  ]);
  stelar.bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:squall_vortex_derecho", "rightArm", 0x777777, [
    { "firstPerson": [-4.5, 4.5, -20.0], "offset": [-0.5, 14.0, 0.0], "size": [50.0, 50.0] }
  ]);
  stuff.bindFlightTrail(renderer, "skyhighocs:squall_vortex_flight");
  //Battle card predation wave changing
  predation = stelar.initHandThing(renderer, "predation_wave_changing", 0, 2);
  //Lightning
  lightning = stelar.initHandThing(renderer, "lightning", 2, 2);
  //Hail cannon
  hailCannon = stelar.initHandThing(renderer, "hail_cannon", 2, 0);
  //Derecho
  derecho = stelar.initHandThing(renderer, "derecho", 2, 0);
  //Sword
  swordMain = renderer.createEffect("fiskheroes:shield");
  swordMain.texture.set("sword", "sword_lights");
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
      helmetWaveChangingLights.render();
      helmet.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") > 0 || (entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) {
        headWaveChange.render();
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/lightning_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/derecho_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/hail_cannon_timer") < 1) || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        head.render();
      }
      if (((entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) || entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1) && (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/lightning_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/derecho_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/hail_cannon_timer") < 1)) {
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
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/lightning_timer") > 0) {
      lightning.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/derecho_timer") > 0) {
      derecho.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/hail_cannon_timer") > 0) {
      hailCannon.render();
    };
  };
};
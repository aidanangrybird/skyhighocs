extend("skyhighocs:base_em_being");

var stelar = implement("skyhighheroes:external/stelar");
var stuff = implement("skyhighheroes:external/stuff");

loadTextures({
  "base": "skyhighocs:chase/pryetak_nebula_base",
  "lights": "skyhighocs:chase/pryetak_nebula_lights",
  "base_wave_change": "skyhighocs:chase/pryetak_nebula_wave_change.tx.json",
  "lights_wave_change": "skyhighocs:chase/pryetak_nebula_wave_change_lights.tx.json",
  "wave_changing_lights": "skyhighocs:chase/pryetak_nebula_wave_changing_lights.tx.json",
  "helmet": "skyhighocs:chase/pryetak_nebula_helmet.tx.json",
  "helmet_lights": "skyhighocs:chase/pryetak_nebula_helmet_lights.tx.json",
  "helmet_wave_changing_lights": "skyhighocs:chase/pryetak_nebula_helmet_wave_changing_lights.tx.json",
  "sword_blade": "skyhighocs:chase/pryetak_nebula_sword_blade.tx.json",
  "sword": "skyhighocs:chase/pryetak_nebula_sword.tx.json",
  "sword_wave_changing_lights": "skyhighocs:chase/pryetak_nebula_sword_wave_changing_lights.tx.json",
  "sword_sides": "skyhighocs:chase/pryetak_nebula_sword_sides.tx.json",
  "sword_front": "skyhighocs:chase/pryetak_nebula_sword_front.tx.json",
  "galaxys_weight_sides": "skyhighocs:chase/pryetak_nebula_galaxys_weight_sides.tx.json",
  "galaxys_weight_front": "skyhighocs:chase/pryetak_nebula_galaxys_weight_front.tx.json",
  "galaxys_weight_front_lights": "skyhighocs:chase/pryetak_nebula_galaxys_weight_front_lights.tx.json",
  "nebula_burst_sides": "skyhighocs:chase/pryetak_nebula_nebula_burst_sides.tx.json",
  "nebula_burst_front": "skyhighocs:chase/pryetak_nebula_nebula_burst_front.tx.json",
  "nebula_burst_front_lights": "skyhighocs:chase/pryetak_nebula_nebula_burst_front_lights.tx.json",
  "voids_grasp_sides": "skyhighocs:chase/pryetak_nebula_voids_grasp_sides.tx.json",
  "voids_grasp_sides_lights": "skyhighocs:chase/pryetak_nebula_voids_grasp_sides_lights.tx.json",
  "voids_grasp_front": "skyhighocs:chase/pryetak_nebula_voids_grasp_front.tx.json",
  "voids_grasp_front_lights": "skyhighocs:chase/pryetak_nebula_voids_grasp_front_lights.tx.json",
  "predation_sides_wave_changing_lights": "skyhighocs:chase/pryetak_nebula_predation_sides_wave_changing_lights.tx.json",
  "predation_front_wave_changing_lights": "skyhighocs:chase/pryetak_nebula_predation_front_wave_changing_lights.tx.json",
  "head_right": "skyhighocs:chase/pryetak_right.tx.json",
  "head_right_wave_change": "skyhighocs:chase/pryetak_right_wave_change.tx.json",
  "head_right_wave_change_lights": "skyhighocs:chase/pryetak_right_wave_change_lights.tx.json",
  "head_right_lights": "skyhighocs:chase/pryetak_right_lights.tx.json",
  "head_right_wave_changing_lights": "skyhighocs:chase/pryetak_right_wave_changing_lights.tx.json",
  "head_left": "skyhighocs:chase/pryetak_left.tx.json",
  "head_left_wave_change": "skyhighocs:chase/pryetak_left_wave_change.tx.json",
  "head_left_lights": "skyhighocs:chase/pryetak_left_lights.tx.json",
  "head_left_wave_change_lights": "skyhighocs:chase/pryetak_left_wave_change_lights.tx.json",
  "head_left_wave_changing_lights": "skyhighocs:chase/pryetak_left_wave_changing_lights.tx.json",
  "head_top": "skyhighocs:chase/pryetak_top.tx.json",
  "head_top_wave_change": "skyhighocs:chase/pryetak_top_wave_change.tx.json",
  "head_top_lights": "skyhighocs:chase/pryetak_top_lights.tx.json",
  "head_top_wave_change_lights": "skyhighocs:chase/pryetak_top_wave_change_lights.tx.json",
  "head_top_wave_changing_lights": "skyhighocs:chase/pryetak_top_wave_changing_lights.tx.json",
  "head_bottom": "skyhighocs:chase/pryetak_bottom.tx.json",
  "head_bottom_wave_change": "skyhighocs:chase/pryetak_bottom_wave_change.tx.json",
  "head_bottom_lights": "skyhighocs:chase/pryetak_bottom_lights.tx.json",
  "head_bottom_wave_change_lights": "skyhighocs:chase/pryetak_bottom_wave_change_lights.tx.json",
  "head_bottom_wave_changing_lights": "skyhighocs:chase/pryetak_bottom_wave_changing_lights.tx.json",
  "head_front": "skyhighocs:chase/pryetak_front.tx.json",
  "head_front_wave_change": "skyhighocs:chase/pryetak_front_wave_change.tx.json",
  "head_front_wave_changing_lights": "skyhighocs:chase/pryetak_front_wave_changing_lights.tx.json",
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
  "rifle_lights": "skyhighocs:chase/pryetak_nebula_rifle_lights"
});

function getColor() {
  return 0x44FF00;
};

function getID() {
  return "4da600b8-582a-4fc3-ac2e-ada03d3e478c";
  //return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
};

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  stelar.addAnimationWithData(renderer, "stelar.VOIDS_GRASP_AIM", "skyhighheroes:stelar_aim", "skyhighocs:dyn/telekinesis_timer")
  .priority = 10;
  stelar.addAnimationWithData(renderer, "stelar.GALAXYS_WEIGHT_AIM", "skyhighheroes:stelar_aim", "skyhighocs:dyn/gravity_manip_timer")
  .priority = 10;
  stelar.addAnimationWithData(renderer, "stelar.NEBULA_BURST_AIM", "skyhighheroes:stelar_aim", "fiskheroes:beam_charge")
  .priority = 10;
  renderer.setItemIcon("CHESTPLATE", "leo_transer");
};

function initEffects(renderer) {
  parent.initEffects(renderer);
  helmetWaveChangingLights = renderer.createEffect("fiskheroes:overlay");
  helmetWaveChangingLights.texture.set(null, "helmet_wave_changing_lights");
  helmet = renderer.createEffect("fiskheroes:overlay");
  helmet.texture.set("helmet", "helmet_lights");
  stelar.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "rightArm", 0xAA00FF, [
      { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-1.0, 9.0, -0.5], "size": [3.0, 3.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  renderer.bindProperty("fiskheroes:gravity_manipulation").color.set(0x44FF00);
  stuff.bindCloud(renderer, "fiskheroes:telekinesis", "skyhighocs:pryetak_nebula_voids_grasp");
  var chain = stuff.bindCloud(renderer, "fiskheroes:telekinesis_chain", "skyhighocs:pryetak_nebula_voids_grasp");
  chain.anchor.set("rightArm");
  chain.setOffset(-0.5, 10.0, 0.0);
  chain.setFirstPerson(-4.75, 4.0, -8.5);
  stuff.bindFlightTrail(renderer, "skyhighocs:pryetak_nebula_flight");
  //Battle card predation wave changing
  //Right
  predationRightWaveChanging = renderer.createEffect("fiskheroes:shield");
  predationRightWaveChanging.texture.set(null, "predation_sides_wave_changing_lights");
  predationRightWaveChanging.anchor.set("rightArm");
  predationRightWaveChanging.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, 3.0);
  predationRightWaveChanging.large = true;
  //Left
  predationLeftWaveChanging = renderer.createEffect("fiskheroes:shield");
  predationLeftWaveChanging.texture.set(null, "predation_sides_wave_changing_lights");
  predationLeftWaveChanging.anchor.set("rightArm");
  predationLeftWaveChanging.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, -3.0);
  predationLeftWaveChanging.large = true;
  //Top
  predationTopWaveChanging = renderer.createEffect("fiskheroes:shield");
  predationTopWaveChanging.texture.set(null, "predation_sides_wave_changing_lights");
  predationTopWaveChanging.anchor.set("rightArm");
  predationTopWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5, 0.0);
  predationTopWaveChanging.large = true;
  //Bottom
  predationBottomWaveChanging = renderer.createEffect("fiskheroes:shield");
  predationBottomWaveChanging.texture.set(null, "predation_sides_wave_changing_lights");
  predationBottomWaveChanging.anchor.set("rightArm");
  predationBottomWaveChanging.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5, 0.0);
  predationBottomWaveChanging.large = true;
  //Front
  predationFrontWaveChanging = renderer.createEffect("fiskheroes:shield");
  predationFrontWaveChanging.texture.set(null, "predation_front_wave_changing_lights");
  predationFrontWaveChanging.anchor.set("rightArm");
  predationFrontWaveChanging.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5, 0.0);
  predationFrontWaveChanging.large = true;
  //Void's Grasp
  //Right
  voidsGraspRight = renderer.createEffect("fiskheroes:shield");
  voidsGraspRight.texture.set("voids_grasp_sides", "voids_grasp_sides_lights");
  voidsGraspRight.anchor.set("rightArm");
  voidsGraspRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, 3.0);
  voidsGraspRight.large = true;
  //Left
  voidsGraspLeft = renderer.createEffect("fiskheroes:shield");
  voidsGraspLeft.texture.set("voids_grasp_sides", "voids_grasp_sides_lights");
  voidsGraspLeft.anchor.set("rightArm");
  voidsGraspLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, -3.0);
  voidsGraspLeft.large = true;
  //Top
  voidsGraspTop = renderer.createEffect("fiskheroes:shield");
  voidsGraspTop.texture.set("voids_grasp_sides", "voids_grasp_sides_lights");
  voidsGraspTop.anchor.set("rightArm");
  voidsGraspTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5, 0.0);
  voidsGraspTop.large = true;
  //Bottom
  voidsGraspBottom = renderer.createEffect("fiskheroes:shield");
  voidsGraspBottom.texture.set("voids_grasp_sides", "voids_grasp_sides_lights");
  voidsGraspBottom.anchor.set("rightArm");
  voidsGraspBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5, 0.0);
  voidsGraspBottom.large = true;
  //Front
  voidsGraspFront = renderer.createEffect("fiskheroes:shield");
  voidsGraspFront.texture.set("voids_grasp_front", "voids_grasp_front_lights");
  voidsGraspFront.anchor.set("rightArm");
  voidsGraspFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5, 0.0);
  voidsGraspFront.large = true;
  //Galaxy's Weight
  //Right
  galaxysWeightRight = renderer.createEffect("fiskheroes:shield");
  galaxysWeightRight.texture.set("galaxys_weight_sides");
  galaxysWeightRight.anchor.set("rightArm");
  galaxysWeightRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, 3.0);
  galaxysWeightRight.large = true;
  //Left
  galaxysWeightLeft = renderer.createEffect("fiskheroes:shield");
  galaxysWeightLeft.texture.set("galaxys_weight_sides");
  galaxysWeightLeft.anchor.set("rightArm");
  galaxysWeightLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, -3.0);
  galaxysWeightLeft.large = true;
  //Top
  galaxysWeightTop = renderer.createEffect("fiskheroes:shield");
  galaxysWeightTop.texture.set("galaxys_weight_sides");
  galaxysWeightTop.anchor.set("rightArm");
  galaxysWeightTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5, 0.0);
  galaxysWeightTop.large = true;
  //Bottom
  galaxysWeightBottom = renderer.createEffect("fiskheroes:shield");
  galaxysWeightBottom.texture.set("galaxys_weight_sides");
  galaxysWeightBottom.anchor.set("rightArm");
  galaxysWeightBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5, 0.0);
  galaxysWeightBottom.large = true;
  //Front
  galaxysWeightFront = renderer.createEffect("fiskheroes:shield");
  galaxysWeightFront.texture.set("galaxys_weight_front", "galaxys_weight_front_lights");
  galaxysWeightFront.anchor.set("rightArm");
  galaxysWeightFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5, 0.0);
  galaxysWeightFront.large = true;
  //Nebula Burst
  //Right
  nebulaBurstRight = renderer.createEffect("fiskheroes:shield");
  nebulaBurstRight.texture.set("nebula_burst_sides");
  nebulaBurstRight.anchor.set("rightArm");
  nebulaBurstRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, 3.0);
  nebulaBurstRight.large = true;
  //Left
  nebulaBurstLeft = renderer.createEffect("fiskheroes:shield");
  nebulaBurstLeft.texture.set("nebula_burst_sides");
  nebulaBurstLeft.anchor.set("rightArm");
  nebulaBurstLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, -3.0);
  nebulaBurstLeft.large = true;
  //Top
  nebulaBurstTop = renderer.createEffect("fiskheroes:shield");
  nebulaBurstTop.texture.set("nebula_burst_sides");
  nebulaBurstTop.anchor.set("rightArm");
  nebulaBurstTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5, 0.0);
  nebulaBurstTop.large = true;
  //Bottom
  nebulaBurstBottom = renderer.createEffect("fiskheroes:shield");
  nebulaBurstBottom.texture.set("nebula_burst_sides");
  nebulaBurstBottom.anchor.set("rightArm");
  nebulaBurstBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5, 0.0);
  nebulaBurstBottom.large = true;
  //Front
  nebulaBurstFront = renderer.createEffect("fiskheroes:shield");
  nebulaBurstFront.texture.set("nebula_burst_front", "nebula_burst_front_lights");
  nebulaBurstFront.anchor.set("rightArm");
  nebulaBurstFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5, 0.0);
  nebulaBurstFront.large = true;
  //Sword
  swordMain = renderer.createEffect("fiskheroes:shield");
  swordMain.texture.set("sword");
  swordMain.anchor.set("rightArm");
  swordMain.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 14.5, 0.0);
  swordMain.large = true;
  swordBlade = renderer.createEffect("fiskheroes:shield");
  swordBlade.texture.set(null, "sword_blade");
  swordBlade.anchor.set("rightArm");
  swordBlade.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 14.5, 0.0);
  swordBlade.large = true;
  swordWaveChanging = renderer.createEffect("fiskheroes:shield");
  swordWaveChanging.texture.set(null, "sword_wave_changing_lights");
  swordWaveChanging.anchor.set("rightArm");
  swordWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 14.5, 0.0);
  swordWaveChanging.large = true;
  //Right
  swordRight = renderer.createEffect("fiskheroes:shield");
  swordRight.texture.set("sword_sides");
  swordRight.anchor.set("rightArm");
  swordRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, 3.0);
  swordRight.large = true;
  //Left
  swordLeft = renderer.createEffect("fiskheroes:shield");
  swordLeft.texture.set("sword_sides");
  swordLeft.anchor.set("rightArm");
  swordLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, -3.0);
  swordLeft.large = true;
  //Top
  swordTop = renderer.createEffect("fiskheroes:shield");
  swordTop.texture.set("sword_sides");
  swordTop.anchor.set("rightArm");
  swordTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5, 0.0);
  swordTop.large = true;
  //Bottom
  swordBottom = renderer.createEffect("fiskheroes:shield");
  swordBottom.texture.set("sword_sides");
  swordBottom.anchor.set("rightArm");
  swordBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5, 0.0);
  swordBottom.large = true;
  //Front
  swordFront = renderer.createEffect("fiskheroes:shield");
  swordFront.texture.set("sword_front");
  swordFront.anchor.set("rightArm");
  swordFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5, 0.0);
  swordFront.large = true;
  //Head
  //Right
  headRight = renderer.createEffect("fiskheroes:shield");
  headRight.texture.set("head_right", "head_right_lights");
  headRight.anchor.set("rightArm");
  headRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, 3.0);
  headRight.large = true;
  headRightWaveChange = renderer.createEffect("fiskheroes:shield");
  headRightWaveChange.texture.set("head_right_wave_change", "head_right_wave_change_lights");
  headRightWaveChange.anchor.set("rightArm");
  headRightWaveChange.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, 3.0);
  headRightWaveChange.large = true;
  headRightWaveChanging = renderer.createEffect("fiskheroes:shield");
  headRightWaveChanging.texture.set(null, "head_right_wave_changing_lights");
  headRightWaveChanging.anchor.set("rightArm");
  headRightWaveChanging.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, 3.0);
  headRightWaveChanging.large = true;
  //Left
  headLeft = renderer.createEffect("fiskheroes:shield");
  headLeft.texture.set("head_left", "head_left_lights");
  headLeft.anchor.set("rightArm");
  headLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, -3.0);
  headLeft.large = true;
  headLeftWaveChange = renderer.createEffect("fiskheroes:shield");
  headLeftWaveChange.texture.set("head_left_wave_change", "head_left_wave_change_lights");
  headLeftWaveChange.anchor.set("rightArm");
  headLeftWaveChange.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, -3.0);
  headLeftWaveChange.large = true;
  headLeftWaveChanging = renderer.createEffect("fiskheroes:shield");
  headLeftWaveChanging.texture.set(null, "head_left_wave_changing_lights");
  headLeftWaveChanging.anchor.set("rightArm");
  headLeftWaveChanging.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 8.5, -3.0);
  headLeftWaveChanging.large = true;
  //Top
  headTop = renderer.createEffect("fiskheroes:shield");
  headTop.texture.set("head_top", "head_top_lights");
  headTop.anchor.set("rightArm");
  headTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.5, 0.0);
  headTop.large = true;
  headTopWaveChange = renderer.createEffect("fiskheroes:shield");
  headTopWaveChange.texture.set("head_top_wave_change", "head_top_wave_change_lights");
  headTopWaveChange.anchor.set("rightArm");
  headTopWaveChange.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.5, 0.0);
  headTopWaveChange.large = true;
  headTopWaveChanging = renderer.createEffect("fiskheroes:shield");
  headTopWaveChanging.texture.set(null, "head_top_wave_changing_lights");
  headTopWaveChanging.anchor.set("rightArm");
  headTopWaveChanging.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 8.5, 0.0);
  headTopWaveChanging.large = true;
  //Bottom
  headBottom = renderer.createEffect("fiskheroes:shield");
  headBottom.texture.set("head_bottom", "head_bottom_lights");
  headBottom.anchor.set("rightArm");
  headBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.5, 0.0);
  headBottom.large = true;
  headBottomWaveChange = renderer.createEffect("fiskheroes:shield");
  headBottomWaveChange.texture.set("head_bottom_wave_change", "head_bottom_wave_change_lights");
  headBottomWaveChange.anchor.set("rightArm");
  headBottomWaveChange.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.5, 0.0);
  headBottomWaveChange.large = true;
  headBottomWaveChanging = renderer.createEffect("fiskheroes:shield");
  headBottomWaveChanging.texture.set(null, "head_bottom_wave_changing_lights");
  headBottomWaveChanging.anchor.set("rightArm");
  headBottomWaveChanging.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 8.5, 0.0);
  headBottomWaveChanging.large = true;
  //Front
  headFront = renderer.createEffect("fiskheroes:shield");
  headFront.texture.set("head_front", null);
  headFront.anchor.set("rightArm");
  headFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 13.5, 0.0);
  headFront.large = true;
  headFrontWaveChange = renderer.createEffect("fiskheroes:shield");
  headFrontWaveChange.texture.set("head_front_wave_change", null);
  headFrontWaveChange.anchor.set("rightArm");
  headFrontWaveChange.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 13.5, 0.0);
  headFrontWaveChange.large = true;
  headFrontWaveChanging = renderer.createEffect("fiskheroes:shield");
  headFrontWaveChanging.texture.set(null, "head_front_wave_changing_lights");
  headFrontWaveChanging.anchor.set("rightArm");
  headFrontWaveChanging.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 13.5, 0.0);
  headFrontWaveChanging.large = true;
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
  if (renderLayer == "CHESTPLATE") {
    if ((entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("fiskheroes:mask_open_timer2") > 0) || (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND")) {
      helmetWaveChangingLights.render();
      helmet.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") > 0 || (entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND")) {
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1) {
        headRightWaveChange.render();
        headLeftWaveChange.render();
        headTopWaveChange.render();
        headBottomWaveChange.render();
        headFrontWaveChange.render();
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/galaxys_weight_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/voids_grasp_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_burst_timer") < 1) || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW") {
        headRight.render();
        headLeft.render();
        headTop.render();
        headBottom.render();
        headFront.render();
      };
      if ((entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/galaxys_weight_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/voids_grasp_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_burst_timer") < 1)) {
        headRightWaveChanging.render();
        headLeftWaveChanging.render();
        headTopWaveChanging.render();
        headBottomWaveChanging.render();
        headFrontWaveChanging.render();
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1) {
        predationRightWaveChanging.render();
        predationLeftWaveChanging.render();
        predationTopWaveChanging.render();
        predationBottomWaveChanging.render();
        predationFrontWaveChanging.render();
      };
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") > 0) {
      swordWaveChanging.render();
      swordMain.render();
      swordRight.render();
      swordLeft.render();
      swordTop.render();
      swordBottom.render();
      swordFront.render();
      if (entity.getData("skyhighheroes:dyn/sword") && entity.getHeldItem().isEmpty()) {
        swordBlade.render();
      };
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/galaxys_weight_timer") > 0) {
      galaxysWeightRight.render();
      galaxysWeightLeft.render();
      galaxysWeightTop.render();
      galaxysWeightBottom.render();
      galaxysWeightFront.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/voids_grasp_timer") > 0) {
      voidsGraspRight.render();
      voidsGraspLeft.render();
      voidsGraspTop.render();
      voidsGraspBottom.render();
      voidsGraspFront.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/nebula_burst_timer") > 0) {
      nebulaBurstRight.render();
      nebulaBurstLeft.render();
      nebulaBurstTop.render();
      nebulaBurstBottom.render();
      nebulaBurstFront.render();
    };
  };
};
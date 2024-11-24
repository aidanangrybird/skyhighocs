extend("skyhighocs:base_em_wave_change");

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
  "nebula_blast_sides": "skyhighocs:chase/pryetak_nebula_nebula_blast_sides.tx.json",
  "nebula_blast_front": "skyhighocs:chase/pryetak_nebula_nebula_blast_front.tx.json",
  "nebula_blast_front_lights": "skyhighocs:chase/pryetak_nebula_nebula_blast_front_lights.tx.json",
  "nebula_burst_sides": "skyhighocs:chase/pryetak_nebula_nebula_burst_sides.tx.json",
  "nebula_burst_front": "skyhighocs:chase/pryetak_nebula_nebula_burst_front.tx.json",
  "nebula_burst_front_lights": "skyhighocs:chase/pryetak_nebula_nebula_burst_front_lights.tx.json",
  "ice_bomb_sides": "skyhighocs:chase/pryetak_nebula_ice_bomb_sides.tx.json",
  "ice_bomb_front": "skyhighocs:chase/pryetak_nebula_ice_bomb_front.tx.json",
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
};

function init(renderer) {
  parent.init(renderer);
  initEffects(renderer);
  stelar.addAnimationWithData(renderer, "stelar.NEBULA_BLAST_AIM", "skyhighheroes:stelar_aim", "fiskheroes:energy_projection_timer")
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
  stelar.bindBeam(renderer, "fiskheroes:energy_projection", "fiskheroes:energy_projection", "rightArm", 0x44FF00, [
      { "firstPerson": [-4.5, 3.75, -8.0], "offset": [-1.0, 9.0, -0.5], "size": [2.0, 2.0] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
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
  //Nebula Blast
  //Right
  nebulaBlastRight = renderer.createEffect("fiskheroes:shield");
  nebulaBlastRight.texture.set("nebula_blast_sides");
  nebulaBlastRight.anchor.set("rightArm");
  nebulaBlastRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, 3.0);
  nebulaBlastRight.large = true;
  //Left
  nebulaBlastLeft = renderer.createEffect("fiskheroes:shield");
  nebulaBlastLeft.texture.set("nebula_blast_sides");
  nebulaBlastLeft.anchor.set("rightArm");
  nebulaBlastLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, -3.0);
  nebulaBlastLeft.large = true;
  //Top
  nebulaBlastTop = renderer.createEffect("fiskheroes:shield");
  nebulaBlastTop.texture.set("nebula_blast_sides");
  nebulaBlastTop.anchor.set("rightArm");
  nebulaBlastTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5, 0.0);
  nebulaBlastTop.large = true;
  //Bottom
  nebulaBlastBottom = renderer.createEffect("fiskheroes:shield");
  nebulaBlastBottom.texture.set("nebula_blast_sides");
  nebulaBlastBottom.anchor.set("rightArm");
  nebulaBlastBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5, 0.0);
  nebulaBlastBottom.large = true;
  //Front
  nebulaBlastFront = renderer.createEffect("fiskheroes:shield");
  nebulaBlastFront.texture.set("nebula_blast_front", "nebula_blast_front_lights");
  nebulaBlastFront.anchor.set("rightArm");
  nebulaBlastFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5, 0.0);
  nebulaBlastFront.large = true;
  //Ice Bomb
  //Right
  iceBombRight = renderer.createEffect("fiskheroes:shield");
  iceBombRight.texture.set("ice_bomb_sides");
  iceBombRight.anchor.set("rightArm");
  iceBombRight.setRotation(0.0, 90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, 3.0);
  iceBombRight.large = true;
  //Left
  iceBombLeft = renderer.createEffect("fiskheroes:shield");
  iceBombLeft.texture.set("ice_bomb_sides");
  iceBombLeft.anchor.set("rightArm");
  iceBombLeft.setRotation(0.0, -90.0, 0.0).setCurve(0.0, 0.0).setOffset(1.0, 5.5, -3.0);
  iceBombLeft.large = true;
  //Top
  iceBombTop = renderer.createEffect("fiskheroes:shield");
  iceBombTop.texture.set("ice_bomb_sides");
  iceBombTop.anchor.set("rightArm");
  iceBombTop.setRotation(0.0, 0.0, 0.0).setCurve(0.0, 0.0).setOffset(4.0, 5.5, 0.0);
  iceBombTop.large = true;
  //Bottom
  iceBombBottom = renderer.createEffect("fiskheroes:shield");
  iceBombBottom.texture.set("ice_bomb_sides");
  iceBombBottom.anchor.set("rightArm");
  iceBombBottom.setRotation(0.0, 180.0, 0.0).setCurve(0.0, 0.0).setOffset(-2.0, 5.5, 0.0);
  iceBombBottom.large = true;
  //Front
  iceBombFront = renderer.createEffect("fiskheroes:shield");
  iceBombFront.texture.set("ice_bomb_front");
  iceBombFront.anchor.set("rightArm");
  iceBombFront.setRotation(0.0, 0.0, -90.0).setCurve(0.0, 0.0).setOffset(3.0, 10.5, 0.0);
  iceBombFront.large = true;
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
    if ((entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("fiskheroes:mask_open_timer2") > 0) || (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
      helmetWaveChangingLights.render();
      helmet.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") > 0 || (entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) {
        headRightWaveChange.render();
        headLeftWaveChange.render();
        headTopWaveChange.render();
        headBottomWaveChange.render();
        headFrontWaveChange.render();
      };
      if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_blast_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/ice_bomb_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_burst_timer") < 1) || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        headRight.render();
        headLeft.render();
        headTop.render();
        headBottom.render();
        headFront.render();
      };
      if (((entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") < 1 && entity.getHeldItem().isEmpty()) || entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1) && (entity.getInterpolatedData("skyhighheroes:dyn/sword_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_blast_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/ice_bomb_timer") < 1) && (entity.getInterpolatedData("skyhighocs:dyn/nebula_burst_timer") < 1)) {
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
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/nebula_blast_timer") > 0) {
      nebulaBlastRight.render();
      nebulaBlastLeft.render();
      nebulaBlastTop.render();
      nebulaBlastBottom.render();
      nebulaBlastFront.render();
    };
    if (entity.getInterpolatedData("skyhighheroes:dyn/wave_changing_timer") == 1 && entity.getInterpolatedData("skyhighocs:dyn/ice_bomb_timer") > 0) {
      iceBombRight.render();
      iceBombLeft.render();
      iceBombTop.render();
      iceBombBottom.render();
      iceBombFront.render();
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
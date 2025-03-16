//Beam setup
function bindBeam(renderer, propertyName, beam, anchor, color, entries) {
  var prop = renderer.bindProperty(propertyName).setAnchor(anchor);
  var constln = renderer.createResource("BEAM_CONSTELLATION", null);

  for (var i = 0; i < entries.length; ++i) {
    constln.bindBeam(entries[i]);
  };

  if (typeof beam === "string") {
    beam = renderer.createResource("BEAM_RENDERER", beam);
  };

  prop.setConstellation(constln);
  prop.setRenderer(beam);
  prop.color.set(color);
  return prop;
};

//

//Init
//Beams
function initLeftArmBeams(renderer, color) {
  var position = [{ "firstPerson": [4.5, 3.75, -11.4], "offset": [0.5, 12.9, 0.0], "size": [2.0, 2.0] }];
  var chargedBeam = bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:cannons_charged_beam", "leftArm", color, position);
  chargedBeam.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  chargedBeam.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsArms") == 0);
  var heatVision = bindBeam(renderer, "fiskheroes:heat_vision", "skyhighocs:cannons_heat_vision", "leftArm", color, position);
  heatVision.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
  heatVision.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsArms") == 1);
  var energyProjection = bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:cannons_energy_projection", "leftArm", color, position);
  energyProjection.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));
  energyProjection.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsArms") == 2);
};
function initRightArmBeams(renderer, color) {
  var position = [{ "firstPerson": [-4.5, 3.75, -11.4], "offset": [-0.5, 12.9, 0.0], "size": [2.0, 2.0] }];
  var chargedBeam = bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:cannons_charged_beam", "rightArm", color, position);
  chargedBeam.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  chargedBeam.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsArms") == 0);
  var heatVision = bindBeam(renderer, "fiskheroes:heat_vision", "skyhighocs:cannons_heat_vision", "rightArm", color, position);
  heatVision.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
  heatVision.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsArms") == 1);
  var energyProjection = bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:cannons_energy_projection", "rightArm", color, position);
  energyProjection.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));
  energyProjection.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsArms") == 2);
};

function initHeadBeams(renderer, color) {
  var position = [
    { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.0, -3.0, -3.9], "size": [2.0, 2.0] },
    { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.0, -3.0, -3.9], "size": [2.0, 2.0] }
  ];
  var chargedBeam = bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:cannons_charged_beam", "head", color, position);
  chargedBeam.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  chargedBeam.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsEyes") == 0);
  var heatVision = bindBeam(renderer, "fiskheroes:heat_vision", "skyhighocs:cannons_heat_vision", "head", color, position);
  heatVision.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
  heatVision.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsEyes") == 1);
  var energyProjection = bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:cannons_energy_projection", "head", color, position);
  energyProjection.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));
  energyProjection.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsEyes") == 2);
};

function initBodyBeams(renderer, color) {
  var position = [
    { "firstPerson": [-1.5, 2.5, 2.0], "offset": [-1.5, 2.5, -6.2], "size": [2.0, 2.0] },
    { "firstPerson": [1.5, 2.5, 2.0], "offset": [1.5, 2.5, -6.2], "size": [2.0, 2.0] }
  ];
  var chargedBeam = bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:cannons_charged_beam", "body", color, position);
  chargedBeam.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  chargedBeam.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsBody") == 0);
  var heatVision = bindBeam(renderer, "fiskheroes:heat_vision", "skyhighocs:cannons_heat_vision", "body", color, position);
  heatVision.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
  heatVision.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsBody") == 1);
  var energyProjection = bindBeam(renderer, "fiskheroes:energy_projection", "skyhighocs:cannons_energy_projection", "body", color, position);
  energyProjection.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));
  energyProjection.setCondition(entity => entity.getWornHelmet().nbt().getInteger("cannonsBody") == 2);
};
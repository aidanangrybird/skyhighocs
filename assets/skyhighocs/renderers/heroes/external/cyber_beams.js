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
  chargedBeam.setCondition(entity => entity.getWornHelmet().nbt().getBoolean("cannonsArms"));
};
function initRightArmBeams(renderer, color) {
  var position = [{ "firstPerson": [-4.5, 3.75, -11.4], "offset": [-0.5, 12.9, 0.0], "size": [2.0, 2.0] }];
  var chargedBeam = bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:cannons_charged_beam", "rightArm", color, position);
  chargedBeam.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  chargedBeam.setCondition(entity => entity.getWornHelmet().nbt().getBoolean("cannonsArms"));
};

function initHeadBeams(renderer, color) {
  var position = [
    { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.0, -3.0, -3.9], "size": [2.0, 2.0] },
    { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.0, -3.0, -3.9], "size": [2.0, 2.0] }
  ];
  var chargedBeam = bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:cannons_charged_beam", "head", color, position);
  chargedBeam.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  chargedBeam.setCondition(entity => entity.getWornHelmet().nbt().getBoolean("cannonsEyes"));
};

function initBodyBeams(renderer, color) {
  var position = [
    { "firstPerson": [-1.5, 2.5, 2.0], "offset": [-1.5, 2.5, -6.2], "size": [2.0, 2.0] },
    { "firstPerson": [1.5, 2.5, 2.0], "offset": [1.5, 2.5, -6.2], "size": [2.0, 2.0] }
  ];
  var chargedBeam = bindBeam(renderer, "fiskheroes:charged_beam", "skyhighocs:cannons_charged_beam", "body", color, position);
  chargedBeam.setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  chargedBeam.setCondition(entity => entity.getWornHelmet().nbt().getBoolean("cannonsBody"));
};
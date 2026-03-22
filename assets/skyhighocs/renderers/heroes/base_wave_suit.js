var stelar = implement("skyhighocs:external/stelar");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "null": "skyhighocs:null",
});

var visor_model;

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.is("DISPLAY")) {
        if (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT") {
          return "suit";
        } else {
          return "base";
        };
      };
      if (entity.getUUID() != getID()) {
        return "suit";
      } else {
        return "base";
      };
    };
  });
  renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "leftLeg", "rightLeg");
  renderer.fixHatLayer("CHESTPLATE");
  renderer.setItemIcon("CHESTPLATE", "%s");
  initEffects(renderer);
  initAnimations(renderer);
};

function initEffects(renderer) {
  var visor = renderer.createResource("MODEL", "skyhighocs:WaveSuitVisor");
  visor.texture.set(null, "visor");
  visor_model = renderer.createEffect("fiskheroes:model").setModel(visor);
  visor_model.anchor.set("head");
  visor_model.setScale(1.0);
  visor_model.setOffset(0.0, 0.0, 0.0);
  nv = renderer.bindProperty("fiskheroes:night_vision");
  nv.fogStrength = 0.0;
  nv.factor = 1.0;
  nv.firstPersonOnly = true;
  nv.setCondition(entity => true);
};

function initAnimations(renderer) {
  stelar.initWaveSuitAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  visor_model.render();
};
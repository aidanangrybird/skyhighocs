var chakra = implement("skyhighocs:external/chakra");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "null": "skyhighocs:null",
  "santa_hat": "skyhighocs:santa_hat",
  "suit_lights": "skyhighocs:the_invincible_lights",
});

var santaHat;
var date = new Date();
var isChristmasSeason = (date.getDate() < 26 && date.getDate() > 0 && date.getMonth() == 11);

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        if (!entity.getData("fiskheroes:mask_open")) {
          return "suit_mask_on"
        } else {
          return "suit_mask_off";
        };
      };
      if ((entity.getUUID() != getID() && !entity.is("DISPLAY")) || (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT")) {
        if (!entity.getData("fiskheroes:mask_open")) {
          return "suit_inactive_mask_on"
        } else {
          return "suit_inactive_mask_off";
        };
      };
      if (entity.getData("skyhighocs:dyn/chakra_suit")) {
        if (!entity.getData("fiskheroes:mask_open")) {
          return "suit_mask_on"
        } else {
          return "suit_mask_off";
        };
      } else {
        return "suit_off";
      };
    };
  });
  renderer.setLights((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        return "suit_lights";
      };
      if ((entity.getUUID() != getID() && !entity.is("DISPLAY")) || (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT")) {
        return "null";
      };
      if (entity.getData("skyhighocs:dyn/chakra_suit")) {
        return "suit_lights";
      } else {
        return "null";
      };
    };
  });
  renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "leftLeg", "rightLeg");
  renderer.fixHatLayer("CHESTPLATE");
  renderer.setItemIcon("CHESTPLATE", "%s_suit");
  initEffects(renderer);
  initAnimations(renderer);
};

function initEffects(renderer) {
  if (isChristmasSeason) {
    var santa_hat_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_model.texture.set("santa_hat");
    santaHat = renderer.createEffect("fiskheroes:model").setModel(santa_hat_model);
    santaHat.anchor.set("head");
    santaHat.setScale(1.05);
    santaHat.setOffset(0.0, -5.75, 1.25);
    santaHat.setRotation(-45.0, 0.0, 0.0);
  };
  chakra.initBeams(renderer, getColor());
  chakra.initForceField(renderer, getColor());
  chakra.initTelekinesis(renderer, getName());
  nv = renderer.bindProperty("fiskheroes:night_vision");
  nv.fogStrength = 0.0;
  nv.factor = 1.0;
  nv.firstPersonOnly = true;
  nv.setCondition(entity => entity.getUUID() == getID());
};

function initAnimations(renderer) {
  stuff.initHoloFlightAnim(renderer, "chakra.HOLOGRAM_FLIGHT", "skyhighocs:chakra_holo_flight");
  chakra.initChakraAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  if (isChristmasSeason) {
    santaHat.setScale(1.05);
    santaHat.setOffset(0.0, -5.75, 1.25);
    santaHat.setRotation(-45.0, 0.0, 0.0);
    santaHat.render();
  };
};

function getID() {
  return "";
};
function getColor() {
  return 0x00FF00;
};
function getName() {
  return "";
};
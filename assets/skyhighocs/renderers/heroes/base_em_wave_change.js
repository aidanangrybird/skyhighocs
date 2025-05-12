var stelar = implement("skyhighocs:external/stelar");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "null": "skyhighocs:null",
  "santa_hat": "skyhighocs:santa_hat",
});

var santaHat;
var santaHatEM;
var date = new Date();
var isChristmasSeason = (date.getDate() < 26 && date.getDate() > 0 && date.getMonth() == 11);

var locationBeam;
var entityLocationBeam;

function init(renderer) {
  renderer.setTexture((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        return "base";
      };
      if (entity.getUUID() != getID() || (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT")) {
        return "transer_default";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 0.5 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") > 0) {
        return "transer_wave_change";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") >= 0.5) {
        return "base_wave_change";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) {
        return "base"
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 0) {
        return "transer"
      } else {
        return "null";
      };
    };
  });
  renderer.setLights((entity, renderLayer) => {
    if (renderLayer == "CHESTPLATE") {
      if (entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW") {
        return "lights";
      };
      if (entity.getUUID() != getID() || (entity.as("DISPLAY").getDisplayType() == "FABRICATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "FABRICATOR_RESULT")) {
        return "transer_default_lights";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 0.5 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") > 0) {
        return "visualizer_lights_wave_change";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") >= 0.5) {
        return "lights_wave_change";
      };
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) {
        return "lights";
      }
      if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 0) {
        return "visualizer_lights";
      } else {
        return "null";
      };
    };
  });
  renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "leftLeg", "rightLeg");
  renderer.fixHatLayer("CHESTPLATE");
  initEffects(renderer);
  initAnimations(renderer);
};

function initEffects(renderer) {
  locationBeam = stuff.location(renderer);
  entityLocationBeam = stuff.entityLocation(renderer);
  if (isChristmasSeason) {
    var santa_hat_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_model.texture.set("santa_hat");
    santaHat = renderer.createEffect("fiskheroes:model").setModel(santa_hat_model);
    santaHat.anchor.set("head");
    santaHat.setScale(1.05);
    santaHat.setOffset(0.0, -5.75, 1.25);
    santaHat.setRotation(-45.0, 0.0, 0.0);
    var santa_hat_em_model = renderer.createResource("MODEL", "skyhighocs:SantaHat");
    santa_hat_em_model.texture.set("santa_hat_em");
    santaHatEM = renderer.createEffect("fiskheroes:model").setModel(santa_hat_em_model);
    santaHatEM.anchor.set("head");
    santaHatEM.setScale(1.05);
    santaHatEM.setOffset(0.0, -7.25, -0.25);
    santaHatEM.setRotation(-10.0, 0.0, 0.0);
  };
  stelar.initNV(renderer);
  stuff.setOpacityWithData(renderer, 0.0, 1.0, "fiskheroes:teleport_timer");
  stelar.initForceField(renderer, getColor());
  stelar.initMegaBuster(renderer, getColor(), getColor());
  stelar.initLiveries(renderer);
  wave_change_lights = renderer.createEffect("fiskheroes:overlay");
  wave_change_lights.texture.set(null, "wave_changing_lights");
  ears = renderer.createEffect("fiskheroes:ears");
  ears.anchor.set("head");
  ears.angle = 0;
  ears.inset = -0.039;
};

function initAnimations(renderer) {
  stuff.initHoloFlightAnim(renderer, "wave.HOLOGRAM_FLIGHT", "skyhighocs:stelar_holo_flight");
  stuff.emCeilingAnimation(renderer);
  stelar.initStelarAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  if (isChristmasSeason) {
    if (entity.isAlive() && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 0) {
      santaHat.setScale(1.05);
      santaHat.setOffset(0.0, -5.75, 1.25);
      santaHat.setRotation(-45.0, 0.0, 0.0);
      if (entity.getData("skyhighocs:dyn/visualizer_toggle")) {
        santaHat.setScale(1.02);
        santaHat.setOffset(0.0, -7.25, -0.25);
        santaHat.setRotation(-10.0, 0.0, 0.0);
      };
      if (!entity.getData("skyhighocs:dyn/hood_toggle") && entity.getData("skyhighocs:dyn/stelar_clothes") == 3) {
        santaHat.setOffset(0.0, -6.5, 0);
        santaHat.setRotation(0.0, 0.0, 0.0);
        santaHat.setScale(1.08);
      };
      santaHat.render();
    };
    if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1 || (entity.as("DISPLAY").getDisplayType() == "DATABASE_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "HOLOGRAM" || entity.as("DISPLAY").getDisplayType() == "ITERATOR_PREVIEW" || entity.as("DISPLAY").getDisplayType() == "DISPLAY_STAND" || entity.as("DISPLAY").getDisplayType() == "BOOK_PREVIEW")) {
      santaHatEM.render();
    };
  };
  ears.render();
  if (entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") > 0 && entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") < 1) {
    wave_change_lights.render();
  };
  var nbt = entity.getWornChestplate().nbt();
  var entities = [];
  if ((entity.getData("skyhighocs:dyn/visualizer_toggle") || entity.getInterpolatedData("skyhighocs:dyn/wave_changing_timer") == 1) && (nbt.getBoolean("hostilesOnHud") || nbt.getBoolean("friendliesOnHud") || nbt.getBoolean("playersOnHud"))) {
    entities = entity.world().getEntitiesInRangeOf(entity.pos(), nbt.getInteger("hudRange"));
  };
  if (entities.length > 0) {
    entities.forEach(scannedEntity => {
      if (scannedEntity.isAlive()) {
        if (nbt.getBoolean("hostilesOnHud") && stuff.hostileEntities.indexOf(scannedEntity.getEntityName()) > -1) {
          entityLocationBeam.render(isFirstPersonArm, entity, scannedEntity, 0x770000);
        };
        if (nbt.getBoolean("friendliesOnHud") && stuff.friendlyEntities.indexOf(scannedEntity.getEntityName()) > -1) {
          entityLocationBeam.render(isFirstPersonArm, entity, scannedEntity, 0x007700);
        };
        if (nbt.getBoolean("playersOnHud") && scannedEntity.is("PLAYER") && (!scannedEntity.getData("fiskheroes:invisible") || entity.getData("fiskheroes:penetrate_martian_invis"))) {
          var color = 0x000077;
          if (scannedEntity.isWearingFullSuit()) {
            if (scannedEntity.getWornHelmet().nbt().hasKey("hudColorSkyHigh")) {
              color = scannedEntity.getWornHelmet().nbt().getString("hudColorSkyHigh");
            };
            if (scannedEntity.getWornChestplate().nbt().hasKey("hudColorSkyHigh")) {
              color = scannedEntity.getWornChestplate().nbt().getString("hudColorSkyHigh");
            };
            if (scannedEntity.getWornLeggings().nbt().hasKey("hudColorSkyHigh")) {
              color = scannedEntity.getWornLeggings().nbt().getString("hudColorSkyHigh");
            };
            if (scannedEntity.getWornBoots().nbt().hasKey("hudColorSkyHigh")) {
              color = scannedEntity.getWornBoots().nbt().getString("hudColorSkyHigh");
            };
          };
          entityLocationBeam.render(isFirstPersonArm, entity, scannedEntity, color);
        };
      };
    });
  };
};

function getID() {
  return "";
};
function getColor() {
  return 0x00FF00;
};
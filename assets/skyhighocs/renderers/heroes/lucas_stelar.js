extend("skyhighocs:base_stelar");

loadTextures({
  "transer": "skyhighocs:lucas/lucas_stelar_transer.tx.json",
  "visualizer_lights": "skyhighocs:lucas/lucas_stelar_visualizer_lights.tx.json",
  "transer_default": "skyhighocs:lucas/lucas_stelar_transer",
  "transer_default_lights": "skyhighocs:lucas/lucas_stelar_transer_lights",
  "base": "skyhighocs:lucas/crimson_asteroid_base",
  "lights": "skyhighocs:lucas/crimson_asteroid_lights",
  "wave_changing_lights": "skyhighocs:lucas/crimson_asteroid_wave_changing_lights",
});

function getColor() {
  return 0xFF0000;
};

function getID() {
  return "c4bc5db6-3cf6-44fe-8427-304a7b211bc4";
};

function getSatellite() {
  return "dragon";
};
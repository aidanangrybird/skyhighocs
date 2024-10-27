function init(transer) {
  return {
    name: "Stargazing",
    type: 7,
    human: "Lucas Stelar",
    waveHandler: function (entity, manager) {
      if (entity.getUUID() == "c4bc5db6-3cf6-44fe-8427-304a7b211bc4" && entity.world().isUnobstructed(entity.eyePos(), entity.eyePos().add(0,1000,0)) && entity.posY() >= 105 && entity.world().getLocation(entity.pos()).biome().startsWith("Extreme") && !entity.world().isRaining() && !entity.world().isThundering()) {
        var value = Math.random();
        if (value < 0.01) {
          if (!entity.getData("skyhighheroes:dyn/calling")) {
            manager.setData(entity, "skyhighheroes:dyn/calling", true);
          };
        };
        if (entity.getData("skyhighheroes:dyn/calling_timer") == 1) {
          manager.setString(entity.getWornChestplate().nbt(), "HeroType", "skyhighocs:crimson_asteroid");
        };
      };
    },
  }
}
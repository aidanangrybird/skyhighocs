function init(transer) {
  return {
    name: "Burning man",
    type: 7,
    human: "Ace Stelar",
    waveHandler: function (entity, manager) {
      if (entity.getUUID() == "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0" && entity.world().isUnobstructed(entity.eyePos(), entity.eyePos().add(0,1000,0)) && !entity.world().isRaining() && !entity.world().isThundering() && entity.world().getLocation(entity.pos()).biome().startsWith("Desert")) {
        var value = Math.random();
        if (value < 0.01) {
          if (!entity.getData("skyhighheroes:dyn/calling")) {
            manager.setData(entity, "skyhighheroes:dyn/calling", true);
          };
        };
        if (entity.getData("skyhighheroes:dyn/calling_timer") == 1) {
          manager.setString(entity.getWornChestplate().nbt(), "HeroType", "skyhighocs:solar_flame");
        };
      };
    },
  }
}
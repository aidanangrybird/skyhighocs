function init(transer) {
  return {
    name: "Death by snow",
    type: 7,
    human: "Chase Stelar",
    waveHandler: function (entity, manager) {
      if (entity.getUUID() == "4da600b8-582a-4fc3-ac2e-ada03d3e478c" && entity.world().isUnobstructed(entity.eyePos(), entity.eyePos().add(0,1000,0)) && !entity.world().isRaining() && !entity.world().isThundering() && entity.world().getLocation(entity.pos()).biome().startsWith("Cold Taiga Hills")) {
        var value = Math.random();
        if (value < 0.01) {
          if (!entity.getData("skyhighheroes:dyn/calling")) {
            manager.setData(entity, "skyhighheroes:dyn/calling", true);
          };
        };
        if (entity.getData("skyhighheroes:dyn/calling_timer") == 1) {
          manager.setString(entity.getWornChestplate().nbt(), "HeroType", "skyhighocs:pryetak_nebula");
        };
      };
    },
  }
}
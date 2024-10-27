function init(transer) {
  return {
    name: "That one storm",
    type: 7,
    human: "Aidan Stelar",
    waveHandler: function (entity, manager) {
      if (entity.getUUID() == "a3d071d4-c912-41e1-a6b2-c0de99ea4a84" && entity.world().isUnobstructed(entity.eyePos(), entity.eyePos().add(0,1000,0)) && entity.world().isRaining() && entity.world().isThundering() && entity.world().getLocation(entity.pos()).biome().startsWith("Plains")) {
        var value = Math.random();
        if (value < 0.01) {
          if (!entity.getData("skyhighheroes:dyn/calling")) {
            manager.setData(entity, "skyhighheroes:dyn/calling", true);
          };
        };
        if (entity.getData("skyhighheroes:dyn/calling_timer") == 1) {
          manager.setString(entity.getWornChestplate().nbt(), "HeroType", "skyhighocs:squall_vortex");
        };
      };
    },
  }
}
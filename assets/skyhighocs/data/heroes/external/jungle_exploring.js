function initModule(system) {
  return {
    name: "Jungle exploration",
    type: 7,
    human: "Cade Stelar",
    selfProfile: function (hero) {
      hero.addDamageProfile("SELF", {
        "types": {
          "ELEMENT_AQUA": 1.0
        }
      });
    },
    otherProfile: function (hero) {
      hero.addDamageProfile("OTHER", {
        "types": {
          "ELEMENT_NONE": 1.0
        }
      });
    },
    waveCalling: function (entity, manager) {
      if (entity.getUUID() == "a3d071d4-c912-41e1-a6b2-c0de99ea4a84" && entity.world().isUnobstructed(entity.eyePos(), entity.eyePos().add(0,1000,0)) && !entity.world().isRaining() && !entity.world().isThundering() && (entity.world().getLocation(entity.pos()).biome().startsWith("Jungle") || entity.world().getLocation(entity.pos()).biome().startsWith("Jungle M") || entity.world().getLocation(entity.pos()).biome().startsWith("JungleEdge") || entity.world().getLocation(entity.pos()).biome().startsWith("JungleEdge M") || entity.world().getLocation(entity.pos()).biome().startsWith("JungleHills"))) {
        var value = Math.random();
        manager.setDataWithNotify(entity, "skyhighocs:dyn/calling_value", value);
        if (entity.getData("skyhighocs:dyn/calling_value") < 0.05) {
          manager.setDataWithNotify(entity, "skyhighocs:dyn/calling", true);
        };
      };
      if (entity.getData("skyhighocs:dyn/calling_timer") == 1) {
        manager.setString(entity.getWornChestplate().nbt(), "HeroType", "skyhighocs:azure_asteroid");
      };
    },
    waveHandler: function (entity, hero) {
      if (entity.getData("skyhighocs:dyn/calling_timer") > 0.3 && entity.getData("skyhighocs:dyn/calling_timer") < 0.7) {
        var nearbyPlayers = entity.world().getEntitiesInRangeOf(entity.pos(), 10);
        nearbyPlayers.forEach(other => {
          if (other.getName() != entity.getName()) {
            other.hurt(hero, "OTHER", "%1$s died by Aegir", 10.0);
          };
        });
      };
      if (entity.getData("skyhighocs:dyn/calling_timer") > 0.425 && entity.getData("skyhighocs:dyn/calling_timer") < 0.475) {
        entity.hurt(hero, "SELF", "%1$s could not handle wave changing", 1.0);
      };
    }
  }
}
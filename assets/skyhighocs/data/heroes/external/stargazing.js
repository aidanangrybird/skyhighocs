function init(transer) {
  return {
    name: "Stargazing",
    type: 7,
    human: "Lucas Stelar",
    selfProfile: function (hero) {
      hero.addDamageProfile("SELF", {
        "types": {
          "WAVE_EXPLOSION": 1.0,
          "WAVE_SHOCKWAVE": 1.0
        }
      });
    },
    otherProfile: function (hero) {
      hero.addDamageProfile("OTHER", {
        "types": {
          "WAVE_ENERGY": 1.0
        }
      });
    },
    waveCalling: function (entity, manager) {
      if (entity.getUUID() == "c4bc5db6-3cf6-44fe-8427-304a7b211bc4" && entity.world().isUnobstructed(entity.eyePos(), entity.eyePos().add(0,1000,0)) && entity.posY() >= 105 && entity.world().getLocation(entity.pos()).biome().startsWith("Extreme") && !entity.world().isRaining() && !entity.world().isThundering()) {
        var value = Math.random();
        manager.setDataWithNotify(entity, "skyhighheroes:dyn/calling_value", value);
        if (entity.getData("skyhighheroes:dyn/calling_value") < 0.1) {
          manager.setDataWithNotify(entity, "skyhighheroes:dyn/calling", true);
        };
        if (entity.getData("skyhighheroes:dyn/calling_timer") == 1) {
          manager.setString(entity.getWornChestplate().nbt(), "HeroType", "skyhighocs:crimson_asteroid");
        };
      };
    },
    waveHandler: function (entity, hero) {
      if (entity.getData("skyhighheroes:dyn/calling_timer") > 0.3 && entity.getData("skyhighheroes:dyn/calling_timer") < 0.7) {
        var nearbyPlayers = entity.world().getEntitiesInRangeOf(entity.pos(), 10);
        nearbyPlayers.forEach(other => {
          if (other.getName() != entity.getName()) {
            other.hurt(hero, "OTHER", "%1$s died by Crimson", 10.0);
          };
        });
      };
      if (entity.getData("skyhighheroes:dyn/calling_timer") > 0.425 && entity.getData("skyhighheroes:dyn/calling_timer") < 0.475) {
        entity.hurt(hero, "SELF", "%1$s could not handle wave changing", 1.0);
      };
    }
  }
}
function init(transer) {
  return {
    name: "The Void",
    type: 7,
    human: "Damien Stelar",
    selfProfile: function (hero) {
      hero.addDamageProfile("SELF", {
        "types": {
          "ELEMENT_NONE": 1.0
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
      if (entity.getUUID() == "e51532a1-19fc-4d4f-9da0-f952c4645891" && entity.world().isUnobstructed(entity.eyePos(), entity.eyePos().add(0,1000,0)) && !entity.world().isRaining() && !entity.world().isThundering() && !entity.world().isDaytime() && entity.world().getLocation(entity.pos()).biome() == "Cold Taiga") {
        var value = Math.random();
        manager.setDataWithNotify(entity, "skyhighheroes:dyn/calling_value", value);
        if (entity.getData("skyhighheroes:dyn/calling_value") < 0.05) {
          manager.setDataWithNotify(entity, "skyhighheroes:dyn/calling", true);
        };
        if (entity.getData("skyhighheroes:dyn/calling_timer") == 1) {
          manager.setString(entity.getWornChestplate().nbt(), "HeroType", "skyhighocs:abyssal_shadow");
        };
      };
    },
    waveHandler: function (entity, hero) {
      if (entity.getData("skyhighheroes:dyn/calling_timer") > 0.3 && entity.getData("skyhighheroes:dyn/calling_timer") < 0.7) {
        var nearbyPlayers = entity.world().getEntitiesInRangeOf(entity.pos(), 10);
        nearbyPlayers.forEach(other => {
          if (other.getName() != entity.getName()) {
            other.hurt(hero, "OTHER", "%1$s died by Achlys", 10.0);
          };
        });
      };
      if (entity.getData("skyhighheroes:dyn/calling_timer") > 0.425 && entity.getData("skyhighheroes:dyn/calling_timer") < 0.475) {
        entity.hurt(hero, "SELF", "%1$s could not handle wave changing", 1.0);
      };
    }
  }
}
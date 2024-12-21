function initModule(system) {
  return {
    name: "That one storm",
    type: 7,
    human: "Aidan Stelar",
    selfProfile: function (hero) {
      hero.addDamageProfile("SELF", {
        "types": {
          "ELEMENT_WIND": 1.0,
          "ELEMENT_ELEC": 1.0,
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
      if (entity.getUUID() == "a3d071d4-c912-41e1-a6b2-c0de99ea4a84" && entity.world().isUnobstructed(entity.eyePos(), entity.eyePos().add(0,1000,0)) && entity.world().isRaining() && entity.world().isThundering() && (entity.world().getLocation(entity.pos()).biome().startsWith("Plains") || entity.world().getLocation(entity.pos()).biome().startsWith("Sunflower Plains"))) {
        var value = Math.random();
        manager.setDataWithNotify(entity, "skyhighheroes:dyn/calling_value", value);
        if (entity.getData("skyhighheroes:dyn/calling_value") < 0.05) {
          manager.setDataWithNotify(entity, "skyhighheroes:dyn/calling", true);
        };
      };
      if (entity.getData("skyhighheroes:dyn/calling_timer") == 1) {
        manager.setString(entity.getWornChestplate().nbt(), "HeroType", "skyhighocs:squall_vortex");
      };
    },
    waveHandler: function (entity, hero) {
      if (entity.getData("skyhighheroes:dyn/calling_timer") > 0.3 && entity.getData("skyhighheroes:dyn/calling_timer") < 0.7) {
        var nearbyPlayers = entity.world().getEntitiesInRangeOf(entity.pos(), 10);
        nearbyPlayers.forEach(other => {
          if (other.getName() != entity.getName()) {
            other.hurt(hero, "OTHER", "%1$s died by Jet-Streak", 10.0);
          };
        });
      };
      if (entity.getData("skyhighheroes:dyn/calling_timer") > 0.425 && entity.getData("skyhighheroes:dyn/calling_timer") < 0.475) {
        entity.hurt(hero, "SELF", "%1$s could not handle wave changing", 1.0);
      };
    }
  }
}
extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:chase/apollo_head_lights",
  "body_lights": "skyhighocs:chase/apollo_body_lights",
  "left_arm_lights": "skyhighocs:chase/apollo_left_arm_lights",
  "right_arm_lights": "skyhighocs:chase/apollo_right_arm_lights",
  "left_leg_lights": "skyhighocs:chase/apollo_left_leg_lights",
  "right_leg_lights": "skyhighocs:chase/apollo_right_leg_lights",
  "head_base": "skyhighocs:chase/apollo_head_base.tx.json",
  "head_hair_base": "skyhighocs:chase/apollo_head_hair_base.tx.json",
  "body_base": "skyhighocs:chase/apollo_body_base.tx.json",
  "left_arm_base": "skyhighocs:chase/apollo_left_arm_base.tx.json",
  "right_arm_base": "skyhighocs:chase/apollo_right_arm_base.tx.json",
  "left_leg_base": "skyhighocs:chase/apollo_left_leg_base.tx.json",
  "right_leg_base": "skyhighocs:chase/apollo_right_leg_base.tx.json",
  "boots": "skyhighocs:chase/apollo_boots",
  "shorts": "skyhighocs:chase/apollo_shorts",
  "santa_hat": "skyhighocs:chase/apollo_santa_hat",
  "character_0": "skyhighocs:characters/chase/chase_character_0",
  "character_1": "skyhighocs:characters/chase/chase_character_1",
  "character_2": "skyhighocs:characters/chase/chase_character_2",
  "character_3": "skyhighocs:characters/chase/chase_character_3",
  "character_4": "skyhighocs:characters/chase/chase_character_4",
  "character_5": "skyhighocs:characters/chase/chase_character_5",
  "character_6": "skyhighocs:characters/chase/chase_character_6",
  "character_7": "skyhighocs:characters/chase/chase_character_7",
  "character_8": "skyhighocs:characters/chase/chase_character_8",
  "character_9": "skyhighocs:characters/chase/chase_character_9",
  "character_10": "skyhighocs:characters/chase/chase_character_10",
  "character_11": "skyhighocs:characters/chase/chase_character_11",
  "character_12": "skyhighocs:characters/chase/chase_character_12",
  "character_13": "skyhighocs:characters/chase/chase_character_13",
  "character_14": "skyhighocs:characters/chase/chase_character_14",
  "character_15": "skyhighocs:characters/chase/chase_character_15",
  "character_16": "skyhighocs:characters/chase/chase_character_16",
  "character_17": "skyhighocs:characters/chase/chase_character_17",
  "character_18": "skyhighocs:characters/chase/chase_character_18",
  "character_19": "skyhighocs:characters/chase/chase_character_19",
  "character_20": "skyhighocs:characters/chase/chase_character_20",
  "character_21": "skyhighocs:characters/chase/chase_character_21",
  "character_22": "skyhighocs:characters/chase/chase_character_22",
  "character_23": "skyhighocs:characters/chase/chase_character_23",
  "character_24": "skyhighocs:characters/chase/chase_character_24",
  "character_25": "skyhighocs:characters/chase/chase_character_25",
  "character_26": "skyhighocs:characters/chase/chase_character_26",
  "character_27": "skyhighocs:characters/chase/chase_character_27",
  "character_28": "skyhighocs:characters/chase/chase_character_28",
  "character_29": "skyhighocs:characters/chase/chase_character_29",
  "character_30": "skyhighocs:characters/chase/chase_character_30",
  "character_31": "skyhighocs:characters/chase/chase_character_31",
  "character_32": "skyhighocs:characters/chase/chase_character_32",
  "character_33": "skyhighocs:characters/chase/chase_character_33",
  "character_34": "skyhighocs:characters/chase/chase_character_34",
  "character_35": "skyhighocs:characters/chase/chase_character_35",
  "character_36": "skyhighocs:characters/chase/chase_character_36",
  "character_37": "skyhighocs:characters/chase/chase_character_37",
  "character_38": "skyhighocs:characters/chase/chase_character_38",
  "character_39": "skyhighocs:characters/chase/chase_character_39",
  "character_40": "skyhighocs:characters/chase/chase_character_40",
  "character_41": "skyhighocs:characters/chase/chase_character_41",
  "character_42": "skyhighocs:characters/chase/chase_character_42",
  "character_43": "skyhighocs:characters/chase/chase_character_43",
  "character_44": "skyhighocs:characters/chase/chase_character_44",
  "character_45": "skyhighocs:characters/chase/chase_character_45",
  "character_46": "skyhighocs:characters/chase/chase_character_46",
  "character_47": "skyhighocs:characters/chase/chase_character_47",
  "character_48": "skyhighocs:characters/chase/chase_character_48",
  "character_49": "skyhighocs:characters/chase/chase_character_49",
  "character_50": "skyhighocs:characters/chase/chase_character_50",
  "character_51": "skyhighocs:characters/chase/chase_character_51",
  "character_52": "skyhighocs:characters/chase/chase_character_52",
  "character_53": "skyhighocs:characters/chase/chase_character_53",
  "character_54": "skyhighocs:characters/chase/chase_character_54",
  "character_55": "skyhighocs:characters/chase/chase_character_55",
  "character_56": "skyhighocs:characters/chase/chase_character_56",
  "character_57": "skyhighocs:characters/chase/chase_character_57",
  "character_58": "skyhighocs:characters/chase/chase_character_58",
  "character_59": "skyhighocs:characters/chase/chase_character_59",
  "character_60": "skyhighocs:characters/chase/chase_character_60",
  "character_61": "skyhighocs:characters/chase/chase_character_61",
  "character_62": "skyhighocs:characters/chase/chase_character_62",
  "character_63": "skyhighocs:characters/chase/chase_character_63",
  "character_64": "skyhighocs:characters/chase/chase_character_64",
  "character_65": "skyhighocs:characters/chase/chase_character_65",
  "character_66": "skyhighocs:characters/chase/chase_character_66",
  "character_67": "skyhighocs:characters/chase/chase_character_67",
  "character_68": "skyhighocs:characters/chase/chase_character_68",
  "character_69": "skyhighocs:characters/chase/chase_character_69",
  "character_70": "skyhighocs:characters/chase/chase_character_70",
  "character_71": "skyhighocs:characters/chase/chase_character_71",
  "character_72": "skyhighocs:characters/chase/chase_character_72",
  "character_73": "skyhighocs:characters/chase/chase_character_73",
  "character_74": "skyhighocs:characters/chase/chase_character_74",
  "character_75": "skyhighocs:characters/chase/chase_character_75",
  "character_76": "skyhighocs:characters/chase/chase_character_76",
  "character_77": "skyhighocs:characters/chase/chase_character_77",
  "character_78": "skyhighocs:characters/chase/chase_character_78",
  "character_79": "skyhighocs:characters/chase/chase_character_79",
  "character_80": "skyhighocs:characters/chase/chase_character_80",
  "character_81": "skyhighocs:characters/chase/chase_character_81",
  "character_82": "skyhighocs:characters/chase/chase_character_82",
  "character_83": "skyhighocs:characters/chase/chase_character_83",
  "character_84": "skyhighocs:characters/chase/chase_character_84",
  "character_85": "skyhighocs:characters/chase/chase_character_85",
  "character_86": "skyhighocs:characters/chase/chase_character_86",
  "character_87": "skyhighocs:characters/chase/chase_character_87",
  "character_88": "skyhighocs:characters/chase/chase_character_88",
  "character_89": "skyhighocs:characters/chase/chase_character_89",
  "character_90": "skyhighocs:characters/chase/chase_character_90",
  "character_91": "skyhighocs:characters/chase/chase_character_91",
  "character_92": "skyhighocs:characters/chase/chase_character_92",
  "character_93": "skyhighocs:characters/chase/chase_character_93"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "4da600b8-582a-4fc3-ac2e-ada03d3e478c";
};
function getColor() {
  return "0x55FF00";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "apollo_shorts");
  renderer.setItemIcon("BOOTS", "apollo_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
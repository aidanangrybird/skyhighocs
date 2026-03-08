extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:aidan/aero_head_lights",
  "body_lights": "skyhighocs:aidan/aero_body_lights",
  "left_arm_lights": "skyhighocs:aidan/aero_left_arm_lights",
  "right_arm_lights": "skyhighocs:aidan/aero_right_arm_lights",
  "left_leg_lights": "skyhighocs:aidan/aero_left_leg_lights",
  "right_leg_lights": "skyhighocs:aidan/aero_right_leg_lights",
  "head_base": "skyhighocs:aidan/aero_head_base.tx.json",
  "head_hair_base": "skyhighocs:aidan/aero_head_hair_base.tx.json",
  "body_base": "skyhighocs:aidan/aero_body_base.tx.json",
  "left_arm_base": "skyhighocs:aidan/aero_left_arm_base.tx.json",
  "right_arm_base": "skyhighocs:aidan/aero_right_arm_base.tx.json",
  "left_leg_base": "skyhighocs:aidan/aero_left_leg_base.tx.json",
  "right_leg_base": "skyhighocs:aidan/aero_right_leg_base.tx.json",
  "boots": "skyhighocs:aidan/aero_boots",
  "shorts": "skyhighocs:aidan/aero_shorts",
  "santa_hat": "skyhighocs:aidan/aero_santa_hat",
  "character_0": "skyhighocs:characters/aidan/aidan_character_0",
  "character_1": "skyhighocs:characters/aidan/aidan_character_1",
  "character_2": "skyhighocs:characters/aidan/aidan_character_2",
  "character_3": "skyhighocs:characters/aidan/aidan_character_3",
  "character_4": "skyhighocs:characters/aidan/aidan_character_4",
  "character_5": "skyhighocs:characters/aidan/aidan_character_5",
  "character_6": "skyhighocs:characters/aidan/aidan_character_6",
  "character_7": "skyhighocs:characters/aidan/aidan_character_7",
  "character_8": "skyhighocs:characters/aidan/aidan_character_8",
  "character_9": "skyhighocs:characters/aidan/aidan_character_9",
  "character_10": "skyhighocs:characters/aidan/aidan_character_10",
  "character_11": "skyhighocs:characters/aidan/aidan_character_11",
  "character_12": "skyhighocs:characters/aidan/aidan_character_12",
  "character_13": "skyhighocs:characters/aidan/aidan_character_13",
  "character_14": "skyhighocs:characters/aidan/aidan_character_14",
  "character_15": "skyhighocs:characters/aidan/aidan_character_15",
  "character_16": "skyhighocs:characters/aidan/aidan_character_16",
  "character_17": "skyhighocs:characters/aidan/aidan_character_17",
  "character_18": "skyhighocs:characters/aidan/aidan_character_18",
  "character_19": "skyhighocs:characters/aidan/aidan_character_19",
  "character_20": "skyhighocs:characters/aidan/aidan_character_20",
  "character_21": "skyhighocs:characters/aidan/aidan_character_21",
  "character_22": "skyhighocs:characters/aidan/aidan_character_22",
  "character_23": "skyhighocs:characters/aidan/aidan_character_23",
  "character_24": "skyhighocs:characters/aidan/aidan_character_24",
  "character_25": "skyhighocs:characters/aidan/aidan_character_25",
  "character_26": "skyhighocs:characters/aidan/aidan_character_26",
  "character_27": "skyhighocs:characters/aidan/aidan_character_27",
  "character_28": "skyhighocs:characters/aidan/aidan_character_28",
  "character_29": "skyhighocs:characters/aidan/aidan_character_29",
  "character_30": "skyhighocs:characters/aidan/aidan_character_30",
  "character_31": "skyhighocs:characters/aidan/aidan_character_31",
  "character_32": "skyhighocs:characters/aidan/aidan_character_32",
  "character_33": "skyhighocs:characters/aidan/aidan_character_33",
  "character_34": "skyhighocs:characters/aidan/aidan_character_34",
  "character_35": "skyhighocs:characters/aidan/aidan_character_35",
  "character_36": "skyhighocs:characters/aidan/aidan_character_36",
  "character_37": "skyhighocs:characters/aidan/aidan_character_37",
  "character_38": "skyhighocs:characters/aidan/aidan_character_38",
  "character_39": "skyhighocs:characters/aidan/aidan_character_39",
  "character_40": "skyhighocs:characters/aidan/aidan_character_40",
  "character_41": "skyhighocs:characters/aidan/aidan_character_41",
  "character_42": "skyhighocs:characters/aidan/aidan_character_42",
  "character_43": "skyhighocs:characters/aidan/aidan_character_43",
  "character_44": "skyhighocs:characters/aidan/aidan_character_44",
  "character_45": "skyhighocs:characters/aidan/aidan_character_45",
  "character_46": "skyhighocs:characters/aidan/aidan_character_46",
  "character_47": "skyhighocs:characters/aidan/aidan_character_47",
  "character_48": "skyhighocs:characters/aidan/aidan_character_48",
  "character_49": "skyhighocs:characters/aidan/aidan_character_49",
  "character_50": "skyhighocs:characters/aidan/aidan_character_50",
  "character_51": "skyhighocs:characters/aidan/aidan_character_51",
  "character_52": "skyhighocs:characters/aidan/aidan_character_52",
  "character_53": "skyhighocs:characters/aidan/aidan_character_53",
  "character_54": "skyhighocs:characters/aidan/aidan_character_54",
  "character_55": "skyhighocs:characters/aidan/aidan_character_55",
  "character_56": "skyhighocs:characters/aidan/aidan_character_56",
  "character_57": "skyhighocs:characters/aidan/aidan_character_57",
  "character_58": "skyhighocs:characters/aidan/aidan_character_58",
  "character_59": "skyhighocs:characters/aidan/aidan_character_59",
  "character_60": "skyhighocs:characters/aidan/aidan_character_60",
  "character_61": "skyhighocs:characters/aidan/aidan_character_61",
  "character_62": "skyhighocs:characters/aidan/aidan_character_62",
  "character_63": "skyhighocs:characters/aidan/aidan_character_63",
  "character_64": "skyhighocs:characters/aidan/aidan_character_64",
  "character_65": "skyhighocs:characters/aidan/aidan_character_65",
  "character_66": "skyhighocs:characters/aidan/aidan_character_66",
  "character_67": "skyhighocs:characters/aidan/aidan_character_67",
  "character_68": "skyhighocs:characters/aidan/aidan_character_68",
  "character_69": "skyhighocs:characters/aidan/aidan_character_69",
  "character_70": "skyhighocs:characters/aidan/aidan_character_70",
  "character_71": "skyhighocs:characters/aidan/aidan_character_71",
  "character_72": "skyhighocs:characters/aidan/aidan_character_72",
  "character_73": "skyhighocs:characters/aidan/aidan_character_73",
  "character_74": "skyhighocs:characters/aidan/aidan_character_74",
  "character_75": "skyhighocs:characters/aidan/aidan_character_75",
  "character_76": "skyhighocs:characters/aidan/aidan_character_76",
  "character_77": "skyhighocs:characters/aidan/aidan_character_77",
  "character_78": "skyhighocs:characters/aidan/aidan_character_78",
  "character_79": "skyhighocs:characters/aidan/aidan_character_79",
  "character_80": "skyhighocs:characters/aidan/aidan_character_80",
  "character_81": "skyhighocs:characters/aidan/aidan_character_81",
  "character_82": "skyhighocs:characters/aidan/aidan_character_82",
  "character_83": "skyhighocs:characters/aidan/aidan_character_83",
  "character_84": "skyhighocs:characters/aidan/aidan_character_84",
  "character_85": "skyhighocs:characters/aidan/aidan_character_85",
  "character_86": "skyhighocs:characters/aidan/aidan_character_86",
  "character_87": "skyhighocs:characters/aidan/aidan_character_87",
  "character_88": "skyhighocs:characters/aidan/aidan_character_88",
  "character_89": "skyhighocs:characters/aidan/aidan_character_89",
  "character_90": "skyhighocs:characters/aidan/aidan_character_90",
  "character_91": "skyhighocs:characters/aidan/aidan_character_91",
  "character_92": "skyhighocs:characters/aidan/aidan_character_92",
  "character_93": "skyhighocs:characters/aidan/aidan_character_93"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "a3d071d4-c912-41e1-a6b2-c0de99ea4a84";
};
function getColor() {
  return "0xFF8900";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "aero_shorts");
  renderer.setItemIcon("BOOTS", "aero_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
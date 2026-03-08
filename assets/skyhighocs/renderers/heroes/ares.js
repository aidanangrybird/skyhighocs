extend("skyhighocs:base_astro");

var astro = implement("skyhighocs:external/astro");
var stuff = implement("skyhighocs:external/stuff");

loadTextures({
  "head_lights": "skyhighocs:ace/ares_head_lights",
  "body_lights": "skyhighocs:ace/ares_body_lights",
  "left_arm_lights": "skyhighocs:ace/ares_left_arm_lights",
  "right_arm_lights": "skyhighocs:ace/ares_right_arm_lights",
  "left_leg_lights": "skyhighocs:ace/ares_left_leg_lights",
  "right_leg_lights": "skyhighocs:ace/ares_right_leg_lights",
  "head_base": "skyhighocs:ace/ares_head_base.tx.json",
  "head_hair_base": "skyhighocs:ace/ares_head_hair_base.tx.json",
  "body_base": "skyhighocs:ace/ares_body_base.tx.json",
  "left_arm_base": "skyhighocs:ace/ares_left_arm_base.tx.json",
  "right_arm_base": "skyhighocs:ace/ares_right_arm_base.tx.json",
  "left_leg_base": "skyhighocs:ace/ares_left_leg_base.tx.json",
  "right_leg_base": "skyhighocs:ace/ares_right_leg_base.tx.json",
  "boots": "skyhighocs:ace/ares_boots",
  "shorts": "skyhighocs:ace/ares_shorts",
  "santa_hat": "skyhighocs:ace/ares_santa_hat",
  "character_0": "skyhighocs:characters/ace/ace_character_0",
  "character_1": "skyhighocs:characters/ace/ace_character_1",
  "character_2": "skyhighocs:characters/ace/ace_character_2",
  "character_3": "skyhighocs:characters/ace/ace_character_3",
  "character_4": "skyhighocs:characters/ace/ace_character_4",
  "character_5": "skyhighocs:characters/ace/ace_character_5",
  "character_6": "skyhighocs:characters/ace/ace_character_6",
  "character_7": "skyhighocs:characters/ace/ace_character_7",
  "character_8": "skyhighocs:characters/ace/ace_character_8",
  "character_9": "skyhighocs:characters/ace/ace_character_9",
  "character_10": "skyhighocs:characters/ace/ace_character_10",
  "character_11": "skyhighocs:characters/ace/ace_character_11",
  "character_12": "skyhighocs:characters/ace/ace_character_12",
  "character_13": "skyhighocs:characters/ace/ace_character_13",
  "character_14": "skyhighocs:characters/ace/ace_character_14",
  "character_15": "skyhighocs:characters/ace/ace_character_15",
  "character_16": "skyhighocs:characters/ace/ace_character_16",
  "character_17": "skyhighocs:characters/ace/ace_character_17",
  "character_18": "skyhighocs:characters/ace/ace_character_18",
  "character_19": "skyhighocs:characters/ace/ace_character_19",
  "character_20": "skyhighocs:characters/ace/ace_character_20",
  "character_21": "skyhighocs:characters/ace/ace_character_21",
  "character_22": "skyhighocs:characters/ace/ace_character_22",
  "character_23": "skyhighocs:characters/ace/ace_character_23",
  "character_24": "skyhighocs:characters/ace/ace_character_24",
  "character_25": "skyhighocs:characters/ace/ace_character_25",
  "character_26": "skyhighocs:characters/ace/ace_character_26",
  "character_27": "skyhighocs:characters/ace/ace_character_27",
  "character_28": "skyhighocs:characters/ace/ace_character_28",
  "character_29": "skyhighocs:characters/ace/ace_character_29",
  "character_30": "skyhighocs:characters/ace/ace_character_30",
  "character_31": "skyhighocs:characters/ace/ace_character_31",
  "character_32": "skyhighocs:characters/ace/ace_character_32",
  "character_33": "skyhighocs:characters/ace/ace_character_33",
  "character_34": "skyhighocs:characters/ace/ace_character_34",
  "character_35": "skyhighocs:characters/ace/ace_character_35",
  "character_36": "skyhighocs:characters/ace/ace_character_36",
  "character_37": "skyhighocs:characters/ace/ace_character_37",
  "character_38": "skyhighocs:characters/ace/ace_character_38",
  "character_39": "skyhighocs:characters/ace/ace_character_39",
  "character_40": "skyhighocs:characters/ace/ace_character_40",
  "character_41": "skyhighocs:characters/ace/ace_character_41",
  "character_42": "skyhighocs:characters/ace/ace_character_42",
  "character_43": "skyhighocs:characters/ace/ace_character_43",
  "character_44": "skyhighocs:characters/ace/ace_character_44",
  "character_45": "skyhighocs:characters/ace/ace_character_45",
  "character_46": "skyhighocs:characters/ace/ace_character_46",
  "character_47": "skyhighocs:characters/ace/ace_character_47",
  "character_48": "skyhighocs:characters/ace/ace_character_48",
  "character_49": "skyhighocs:characters/ace/ace_character_49",
  "character_50": "skyhighocs:characters/ace/ace_character_50",
  "character_51": "skyhighocs:characters/ace/ace_character_51",
  "character_52": "skyhighocs:characters/ace/ace_character_52",
  "character_53": "skyhighocs:characters/ace/ace_character_53",
  "character_54": "skyhighocs:characters/ace/ace_character_54",
  "character_55": "skyhighocs:characters/ace/ace_character_55",
  "character_56": "skyhighocs:characters/ace/ace_character_56",
  "character_57": "skyhighocs:characters/ace/ace_character_57",
  "character_58": "skyhighocs:characters/ace/ace_character_58",
  "character_59": "skyhighocs:characters/ace/ace_character_59",
  "character_60": "skyhighocs:characters/ace/ace_character_60",
  "character_61": "skyhighocs:characters/ace/ace_character_61",
  "character_62": "skyhighocs:characters/ace/ace_character_62",
  "character_63": "skyhighocs:characters/ace/ace_character_63",
  "character_64": "skyhighocs:characters/ace/ace_character_64",
  "character_65": "skyhighocs:characters/ace/ace_character_65",
  "character_66": "skyhighocs:characters/ace/ace_character_66",
  "character_67": "skyhighocs:characters/ace/ace_character_67",
  "character_68": "skyhighocs:characters/ace/ace_character_68",
  "character_69": "skyhighocs:characters/ace/ace_character_69",
  "character_70": "skyhighocs:characters/ace/ace_character_70",
  "character_71": "skyhighocs:characters/ace/ace_character_71",
  "character_72": "skyhighocs:characters/ace/ace_character_72",
  "character_73": "skyhighocs:characters/ace/ace_character_73",
  "character_74": "skyhighocs:characters/ace/ace_character_74",
  "character_75": "skyhighocs:characters/ace/ace_character_75",
  "character_76": "skyhighocs:characters/ace/ace_character_76",
  "character_77": "skyhighocs:characters/ace/ace_character_77",
  "character_78": "skyhighocs:characters/ace/ace_character_78",
  "character_79": "skyhighocs:characters/ace/ace_character_79",
  "character_80": "skyhighocs:characters/ace/ace_character_80",
  "character_81": "skyhighocs:characters/ace/ace_character_81",
  "character_82": "skyhighocs:characters/ace/ace_character_82",
  "character_83": "skyhighocs:characters/ace/ace_character_83",
  "character_84": "skyhighocs:characters/ace/ace_character_84",
  "character_85": "skyhighocs:characters/ace/ace_character_85",
  "character_86": "skyhighocs:characters/ace/ace_character_86",
  "character_87": "skyhighocs:characters/ace/ace_character_87",
  "character_88": "skyhighocs:characters/ace/ace_character_88",
  "character_89": "skyhighocs:characters/ace/ace_character_89",
  "character_90": "skyhighocs:characters/ace/ace_character_90",
  "character_91": "skyhighocs:characters/ace/ace_character_91",
  "character_92": "skyhighocs:characters/ace/ace_character_92",
  "character_93": "skyhighocs:characters/ace/ace_character_93"
});

function initEffects(renderer) {
  parent.initEffects(renderer);
};

function getID() {
  return "87fa6187-4fa6-4dc6-8742-19a2b67c4cc0";
};
function getColor() {
  return "0xFF0000";
};

function init(renderer) {
  parent.init(renderer);
  renderer.setItemIcon("LEGGINGS", "ares_shorts");
  renderer.setItemIcon("BOOTS", "ares_boots");
  initEffects(renderer);
  initAnimations(renderer);
};

function render(entity, renderLayer, isFirstPersonArm) {
  parent.render(entity, renderLayer, isFirstPersonArm);
};
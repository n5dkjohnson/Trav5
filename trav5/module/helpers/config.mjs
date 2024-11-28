export const TRAV5 = {};

TRAV5.STATUS = {
  OKAY: 0,
  HURT: 1,
  UNCONSCIOUS: 2,
  DISABLED: 3,
  DEAD: 4,
  DESTROYED: 5
};

TRAV5.HARDWARE_GENERAL = "general";
TRAV5.HARDWARE_ARMOUR = "armour";
TRAV5.HARDWARE_JUMP = "jump";

TRAV5.VEHICLES = {
  "CHASSIS": {
      "lightGround": {
          "tl": 4, "skill": "driver.wheeled", "agility": 0, "minSpaces": 1, "maxSpaces": 20,
          "cost": 750, "hull": 2, "shipping": 0.5,
          "subtypes": {
              "openFrame": {
                  "tl": 0, "agility": 1, "minSpaces": 1, "maxSpaces": 3, "cost": 750,
                  "speed": 1, "traits": "openVehicle"
              },
              "monowheel": {
                  "tl": 9, "agility": 2, "minSpaces": 1, "maxSpaces": 3, "cost": 2500,
                  "speed": 1, "traits": "openVehicle"
              },
              "railRider": {
                  "agility": -2, "cost": 400, "speed": -1
              },
              "roughTerrain": {
                  "cost": 100, "traits": "offRoader"
              },
              "tracks": {
                  "tl": 5, "skill": "driver.tracked", "cost": 750, "speed": -1, "traits": "tracked"
              }
          }
      },
      "heavyGround": {
        "tl": 4, "skill": "driver.wheeled", "agility": -2, "minSpaces": 20, "cost": 3000,
        "hull": 3, "shipping": 0.5,
        "subtypes": {
            "afv": { "tl": 5, "cost": 3000, "speed": -1, "traits": "afv offRoader" },
            "railRider": { "agility": -2, "cost": 1000, "speed": 1 },
            "roughTerrain": { "cost": 500, "traits": "offRoader" },
            "tracks": { "tl": 5, "skill": "driver.tracked", "cost": 2000, "speed": -1, "traits": "tracked" },
            "tunneller": { "tl": 7, "skill": "driver.mole", "cost": 25000, "speed": -1 }
        }
      }
  },
  "SPEED": {
      "stopped": { band: 0, max: 0 },
      "idle": { band: 1, max: 1 },
      "verySlow": { band: 2, max: 50 },
      "slow": { band: 3, max: 100 },
      "medium": { band: 4, max: 200 },
      "high": { band: 5, max: 300 },
      "fast": { band: 6, max: 500 },
      "veryFast": { band: 7, max: 800 },
      "subsonic": { band: 8, max: 1200 },
      "supersonic": { band: 9, max: 6000 },
      "hypersonic": { band: 10 }
  }
};

TRAV5.SHIP_CONFIGURATION = {
  "cluster": {
      "armour": 1.0, "cost": 2.0, "hull": 1.0, "volume": 1.0, "streamlined": "no", "armourBonus": 0
  },
  "braced": {
      "armour": 1.0, "cost": 3.0, "hull": 1.0, "volume": 1.0, "streamlined": "no", "armourBonus": 0
  },
  "planetoid": {
      "armour": 1.0, "cost": 1.0, "hull": 1.0, "volume": 1.0, "streamlined": "no", "armourBonus": 0
  },
  "unstreamlined": {
      "armour": 1.0, "cost": 5.0, "hull": 1.0, "volume": 1.0, "streamlined": "no", "armourBonus": 0
  },
  "streamlined": {
      "armour": 1.0, "cost": 8.0, "hull": 1.0, "volume": 1.0, "streamlined": "yes", "armourBonus": 0
  },
  "airframe":   {
      "armour": 1.0, "cost": 9.0, "hull": 1.0, "volume": 1.0, "streamlined": "yes", "armourBonus": 0
  },
  "lifting": {
      "armour": 1.0, "cost": 18.0, "hull": 1.0, "volume": 1.0, "streamlined": "yes", "armourBonus": 0
  }
};

TRAV5.SPACE_RANGES = {
    "adjacent": { "distance": 1, "dm": 0 },
    "close": { "distance": 10, "dm": 0 },
    "short": { "distance": 1250, "dm": 1 },
    "medium": { "distance": 10000, "dm": 0 },
    "long": { "distance": 25000, "dm": -2 },
    "verylong": { "distance": 50000, "dm": -4 },
    "distant": { "distance": 300000, "dm": -6 },
    "verydistant": { "distance": 5000000, "dm": -12 },
    "far": { "distance": 1000000000, "dm": -18 }
}

TRAV5.SPACE_MOUNTS = {
    "turret": { "multiplier": 1, "hardpoints": 1 },
    "barbette": { "multiplier": 3, "hardpoints": 1 },
    "bay.small": { "multiplier": 10, "hardpoints": 1 },
    "bay.medium": { "multiplier": 20, "hardpoints": 1 },
    "bay.large": { "multiplier": 100, "hardpoints": 5 },
    "spinal": { "multiplier": 1000, "hardpoints": 0.01 }
}

TRAV5.SPACECRAFT_ADVANCES = {
    "experimental": { "tl": -3, "tonnage": 3.00, "cost": 10.0, "modifications": -3 },
    "prototype":    { "tl": -2, "tonnage": 2.00, "cost":  5.0, "modifications": -2 },
    "early":        { "tl": -1, "tonnage": 1.00, "cost":  2.0, "modifications": -1 },
    "basic":        { "tl":  0, "tonnage": 1.00, "cost":  0.5, "modifications":  0 },
    "standard":     { "tl":  0, "tonnage": 1.00, "cost":  1.0, "modifications":  0 },
    "alternate":    { "tl":  0, "tonnage": 1.00, "cost":  1.0, "modifications":  0 },
    "improved":     { "tl":  1, "tonnage": 1.00, "cost":  1.0, "modifications":  1 },
    "generic":      { "tl":  1, "tonnage": 1.00, "cost":  0.5, "modifications":  0 },
    "modified":     { "tl":  2, "tonnage": 0.50, "cost":  1.0, "modifications":  2 },
    "advanced":     { "tl":  3, "tonnage": 0.33, "cost":  2.0, "modifications":  3 },
    "ultimate":     { "tl":  4, "tonnage": 0.25, "cost":  3.0, "modifications":  4 },
}

TRAV5.SPACECRAFT_ADVANTAGES = {
   "j-drive": {
       "decreasedFuel": { "cost": 1, "fuel": -10, "multi": true },
       "earlyJump": { "cost": 1, "multi": true },
       "energyEfficient": { "cost": 1, "power": -25, "multi": true },
       "sizeReduction": { "cost": 1, "size": -10, "multi": true },
       "stealthJump": { "cost": 2 },
       "energyInefficient": { "cost": -1, "power": +30, "multi": true },
       "lateJump": { "cost": -1 },
       "increasedSize": { "cost": -1, "size": +25 }
   },
   "m-drive": {
       "energyEfficient": { "cost": 1, "power": -25, "multi": true },
       "sizeReduction": { "cost": 1, "size": -10, "multi": true },
       "energyInefficient": { "cost": -1, "power": +30, "multi": true },
       "limitedRange": { "cost": -1 },
       "increasedSize": { "cost": -1, "multi": true },
       "orbitalRange": { "cost": -2 }
   },
   "r-drive": {
       "fuelEfficient": { "cost": 1, "fuel": -20, "multi": true },
       "fuelInefficient": { "cost": -1, "fuel": +25, "multi": true }
   },
   "power": {
       "increasedPower": { "cost": 2, "output": +10, "multi": true },
       "sizeReduction": { "cost": 1, "size": -10, "multi": true },
       "energyInefficient": { "cost": -1, "output": -25, "multi": true },
       "increasedSize": { "cost": -1, "size": +25, "multi": true }
   }
};

TRAV5.SPACECRAFT_CRITICALS = {
    "sensors": [
        { "sensorDM": -2 },
        { "sensorMax": "medium" },
        { "sensorMax": "short" },
        { "sensorMax": "close" },
        { "sensorMax": "adjacent" },
        { "sensorsDisabled": true }
    ],
    "powerPlant": [
        { "powerReduction": "10" },
        { "powerReduction": "20" },
        { "powerReduction": "70" },
        { "powerReduction": "100" },
        { "powerReduction": "100", "hull": "1" },
        { "powerReduction": "100", "hull": "1D6" }
    ],
    "fuel": [
        { "fuelLeak": "hour" },
        { "fuelLeak": "round" },
        { "lose": "1D6 * 10" },
        { "destroyed": true },
        { "destroyed": true, "hull": "1" },
        { "destroyed": true, "hull": "1D6" }
    ],
    "weapon": [ ],
    "armour": [ ],
    "hull": [ ],
    "mDrive": [ ],
    "cargo": [ ],
    "jDrive": [ ],
    "crew": [ ],
    "bridge": [ ]
}

TRAV5.getStatus = function(actor) {
  const data = actor.data.data;
  console.log(data);

};

TRAV5.TRADE = {
    "codes": {
        "Ag": {},
        "As": {},
        "Ba": {},
        "De": {},
        "Fl": {},
        "Ga": {},
        "Hi": {},
        "HT": {},
        "Ic": {},
        "In": {},
        "Lo": {},
        "LT": {},
        "Na": {},
        "Ni": {},
        "Po": {},
        "Ri": {},
        "Va": {},
        "Wa": {}
    },
    "zones": {
        "Amber": {},
        "Red": {}
    }
}

TRAV5.CHARACTERISTICS = {
  "STR": { "value": 7, "current": 7, "show": true, "default": false },
  "DEX": { "value": 7, "current": 7, "show": true, "default": false },
  "AGI": { "value": 7, "current": 7, "show": false, "default": false },
  "GRA": { "value": 7, "current": 7, "show": false, "default": false },
  "END": { "value": 7, "current": 7, "show": true, "default": false },
  "STA": { "value": 7, "current": 7, "show": false, "default": false },
  "VIG": { "value": 7, "current": 7, "show": false, "default": false },
  "INT": { "value": 7, "current": 7, "show": true, "default": false },
  "EDU": { "value": 7, "current": 7, "show": true, "default": false },
  "TRA": { "value": 7, "current": 7, "show": false, "default": false },
  "INS": { "value": 7, "current": 7, "show": false, "default": false },
  "SOC": { "value": 7, "current": 7, "show": true, "default": false },
  "CHA": { "value": 7, "current": 7, "show": false, "default": false },
  "CAS": { "value": 7, "current": 7, "show": false, "default": false },
  "STY": { "value": 7, "current": 7, "show": true, "default": false },
  "PSI": { "value": 0, "current": 0, "show": true, "default": false },
  "CUR": { "value": 7, "current": 7, "show": true, "default": false },
  "NSG": { "value": 7, "current": 7, "show": true, "default": false },
  "LCK": { "value": 7, "current": 7, "show": true, "default": false },
  "FAM": { "value": 7, "current": 7, "show": true, "default": false },
  "TER": { "value": 0, "current": 0, "show": false, "default": false },
  "WLT": { "value": 7, "current": 7, "show": false, "default": false },
  "MRL": { "value": 7, "current": 7, "show": false, "default": false },
  "RES": { "value": 7, "current": 7, "show": false, "default": false },
  "FOL": { "value": 0, "current": 0, "show": false, "default": false },
  "REP": { "value": 0, "current": 0, "show": false, "default": false }
};

TRAV5.SKILLS = {
  "actor": { "default": "INT", "background": true },
  "admin": { "default": "SOC" },
  "advocate": { "default": "EDU" },
  "animals": { "default": "INT", "specialities": {
  "anmlskill": { "default": "INT" },
  "rider": { "default": "DEX" },
  "teamster": { "default": "END" },
  "trainer": { "default": "INT"}}},
  "archeology": { "default": "EDU" },
  "artist": { "default": "DEX", "background": true },
  "astrogator": { "default": "EDU" },
  "athlete": { "default": "DEX", "background": true },
  "author": { "default": "EDU", "background": true },
  "biologics": { "default": "INT" },
  "biology": { "default": "EDU" },
  "broker": { "default": "EDU" },
  "bureaucrat": { "default": "SOC" },
  "carouse": { "default": "SOC" },
  "chef": { "default": "INT" },
  "chemistry": { "default": "EDU" },
  "command": { "default": "SOC" },
  "comms": { "default": "INT", "background": true },
  "computer": { "default": "INT", "background": true },
  "counsellor": { "default": "EDU" },
  "craftsman": { "default": "DEX" },
  "curiosity": {  },
  "dancer": { "default": "DEX" },
  "designer": { "default": "INT" },
  "diplomat": { "default": "SOC" },
  "driver": { "default": "DEX", "background": true, "specialities": {
  "drvrskill": { "default": "DEX" },
  "acv": { "default": "DEX" },
  "automotive": { "default": "DEX" },
  "drvrgrav": { "default": "DEX" },
  "legged": { "default": "DEX" },
  "mole": { "default": "DEX" },
  "tracked": { "default": "DEX" },
  "wheeled": { "default": "DEX"}}},
  "electronics": { "default": "INT" },
  "engineer": { "default": "INT", "specialities": {
  "engskill": { "default": "INT" },
  "jdrive": { "default": "INT" },
  "lifesupport": { "default": "INT" },
  "mdrive": { "default": "INT" },
  "power": { "default": "INT"}}},
  "explosives": { "default": "INT" },
  "fighter": { "default": "INT", "background": true, "specialities": {
  "fghtrskill": { "default": "DEX" },
  "battledress": { "default": "DEX" },
  "beams": { "default": "DEX" },
  "blades": { "default": "DEX" },
  "exotics": { "default": "DEX" },
  "slug": { "default": "DEX" },
  "sprays": { "default": "DEX" },
  "unarmed": { "default": "DEX"}}},
  "fleet": { "default": "INT" },
  "fluidics": { "default": "INT" },
  "flyer": { "default": "DEX", "specialities": {
  "flyrskill": { "default": "DEX" },
  "aeronautics": { "default": "DEX" },
  "flapper": { "default": "DEX" },
  "flyrgrav": { "default": "DEX" },
  "lta": { "default": "DEX" },
  "rotor": { "default": "DEX" },
  "winged": { "default": "DEX"}}},
  "forensics": { "default": "EDU" },
  "forwobs": { "default": "INT" },
  "gambler": { "default": "SOC" },
  "gravitics": { "default": "INT" },
  "gunner": { "default": "DEX", "specialities": {
  "gnnrskill": { "default": "DEX" },
  "bayweapons": { "default": "DEX" },
  "ortillery": { "default": "DEX" },
  "screens": { "default": "DEX" },
  "spines": { "default": "DEX" },
  "turrets": { "default": "DEX", "background": true}}},
  "heavyweapons": { "default": "DEX", "specialities": {
  "hwskill": { "default": "DEX" },
  "artillery": { "default": "DEX" },
  "launcher": { "default": "DEX" },
  "ordnance": { "default": "DEX" },
  "wmd": { "default": "DEX"}}},
  "highg": { "default": "DEX" },
  "history": { "default": "EDU" },
  "hostile": { "default": "INT" },
  "insight": {  },
  "jackofalltrades": { "default": "INT" },
  "language": { "default": "INT" },
  "leader": { "default": "SOC" },
  "liaison": { "default": "SOC" },
  "linguistics": { "default": "EDU" },
  "luck": {  },
  "magnetics": { "default": "INT" },
  "mechanic": { "default": "DEX", "background": true },
  "medic": { "default": "EDU" },
  "musician": { "default": "DEX" },
  "narch": { "default": "EDU" },
  "navigator": { "default": "INT" },
  "persuade": { "default": "SOC" },
  "philosophy": { "default": "EDU" },
  "photonics": { "default": "INT" },
  "physics": { "default": "EDU" },
  "pilot": { "default": "DEX", "specialities": {
  "pltskill": { "default": "DEX" },
  "smallcraft": { "default": "DEX" },
  "acs": { "default": "DEX" },
  "bcs": { "default": "DEX"}}},
  "planetology": { "default": "EDU" },
  "polymers": { "default": "INT" },
  "programmer": { "default": "INT" },
  "psionicology": { "default": "EDU" },
  "psionics": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg", "specialities": {
  "psishield": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "psiskill": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "direct": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "remote": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "self": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "awareness": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "hearing": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "perception": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "smell": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "touch": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "vision": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "eshift": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "meditation": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "move": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "oob": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "teleport": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg" },
  "thetouch": { "default": "PSI", "requires": "PSI", "trait": "psionic", "icon": "systems/mgt2e/icons/skills/psi.svg"}}},
  "psychohistory": { "default": "EDU" },
  "psychology": { "default": "EDU" },
  "query": { "default": "SOC" },
  "recon": { "default": "END" },
  "robotics": { "default": "EDU" },
  "sapper": { "default": "INT" },
  "seafarer": { "default": "DEX", "specialities": {
  "sfrrskill": { "default": "DEX" },
  "aquanautics": { "default": "DEX" },
  "boat": { "default": "DEX" },
  "sfrrgrav": { "default": "DEX" },
  "ship": { "default": "DEX" },
  "sub": { "default": "DEX"}}},
  "sensors": { "default": "INT" },
  "sophontology": { "default": "EDU" },
  "stealth": { "default": "DEX" },
  "steward": { "default": "SOC", "background": true },
  "strategy": { "default": "INT" },
  "streetwise": { "default": "INT" },
  "survey": { "default": "INT" },
  "survival": { "default": "INT" },
  "tactics": { "default": "INT" },
  "teacher": { "default": "INT" },
  "trader": { "default": "INT" },
  "vaccsuit": { "default": "DEX", "background": true },
  "zerog": { "default": "DEX" },
  "untrained": { "default": "INT", "requires": "XXX" }
};

TRAV5.EFFECT_TYPES = {
  "CHA_AUG": "chaAug",
  "CHA_DM": "chaDM",
  "CHA_BOON": "chaBoon",
  "CHA_BANE": "chaBane",
  "SKILL_AUG": "skillAug",
  "SKILL_DM": "skillDM",
  "SKILL_EXPERT": "skillExpert",
  "DM": "miscDM"
};

TRAV5.EFFECTS = {
  "chaAug": { "targets": "char", "value": true, "property": "augment", mode: CONST.ACTIVE_EFFECT_MODES.ADD },
  "chaDM": { "targets": "char", "value": true, "property": "augdm", mode: CONST.ACTIVE_EFFECT_MODES.ADD },
  "chaBoon": { "targets": "char", "value": false, mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE },
  "chaBane":  { "targets": "char", "value": false, mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE },
  "skillAug":  { "targets": "skills", "value": true, "property": "augment", mode: CONST.ACTIVE_EFFECT_MODES.ADD },
  "skillDM": { "targets": "skills", "value": true, "property": "augdm", mode: CONST.ACTIVE_EFFECT_MODES.ADD },
  "skillExpert": { "targets": "skills", "value": true, "property": "expert", mode: CONST.ACTIVE_EFFECT_MODES.UPGRADE },
  "miscDM": { "targets": "misc", "value": true, "property": "effect", mode: CONST.ACTIVE_EFFECT_MODES.ADD }
};

TRAV5.COMPUTERS = {
  "techLevel": {
    "7": { computer: 5, core: 0 },
    "8": { computer: 5, core: 0 },
    "9": { computer: 10, core: 40 },
    "10": { computer: 10, core: 50 },
    "11": { computer: 15, core: 60 },
    "12": { computer: 20, core: 70 },
    "13": { computer: 25, core: 80 },
    "14": { computer: 30, core: 90 },
    "15": { computer: 35, core: 100 }
  }
};

TRAV5.WEAPONS = {
    "energyTypes": [ "laser", "plasma", "fire", "energy" ],
    "traits": {
        "artillery": { "scale": "traveller" },
        "ap": {  "value": 1, "min": 1, "max": 99, "conflict": [ "loPen" ] },
        "auto": {  "value": 2, "min": 2, "max": 99, "conflict": [ "oneUse" ] },
        "blast": { "scale": "traveller", "value": 1, "min": 1, "max": 10000 },
        "bulky": { "scale": "traveller", "conflict": [ "veryBulky" ] },
        "chainReaction": { "scale": "spacecraft" },
        "dangerous": { "scale": "traveller", "conflict": [ "veryDangerous" ] },
        "destructive": { },
        "fire": { "scale": "traveller" },
        "ion": { "scale": "spacecraft" },
        "laserSight": { "scale": "traveller" },
        "loPen": { "value": 2, "min": 2, "max": 99, "conflict": [ "ap" ] },
        "oneUse": { "conflict": [ "auto" ] },
        "orbitalBombardment": { "scale": "spacecraft" },
        "orbitalStrike": { "scale": "spacecraft" },
        "protection": { "scale": "traveller", "value": 1, "min": 1, "max": 20 },
        "radiation": { "scale": "any" },
        "reductor": { "scale": "spacecraft" },
        "scope": { "scale": "traveller" },
        "shield": { "scale": "traveller", "value": 0, "min": 0, "max": 6 },
        "silent": { "scale": "traveller" },
        "smart": { },
        "smasher": { "scale": "traveller" },
        "stun": { "scale": "traveller" },
        "veryBulky": { "scale": "traveller", "conflict": [ "bulky" ] },
        "veryDangerous": { "scale": "traveller", "conflict": [ "dangerous" ] },
        "zeroG": { "scale": "traveller" }
    }
}

TRAV5.CREATURES = {
  "behaviours": {
    "herbivore": { "skills": [], "group": "diet" },
    "omnivore": { "skills": [], "group": "diet" },
    "carnivore": { "skills": [], "group": "diet" },
    "scavenger": { "skills": [], "group": "diet" },
    "metal": { "skills": [], "group": "diet" },
    "carrionEater": { "skills": ["recon"] },
    "chaser": { "skills": [ "athletics.dexterity", "athletics.endurance" ] },
    "eater": { "skills": [ ] },
    "filter": { "skills": [ ] },
    "gatherer": { "skills": [ "stealth" ] },
    "grazer": { "skills": [ ] },
    "hunter": { "skills": [ "survival" ] },
    "hijacker": { "skills": [ ] },
    "intimidator": { "skills": [ "persuade" ] },
    "killer": { "skills": [ "melee.natural" ] },
    "intermittent": { "skills": [ ] },
    "mindless": { "skills": [ ] },
    "pouncer": { "skills": [ "stealth", "recon", "athletic.dexterity", "athletics.strength" ] },
    "reducer": { "skills": [ ] },
    "siren": { "skills": [ "deception" ] },
    "sophont": { "skills": [ ] },
    "trapper": { "skills": [ ] }
  },
  "traits": {
    "alarm": { },
    "amphibious": {},
    "camouflaged": { "skills": [ { skill: "stealth", bonus: 2 }] },
    "diseased": {},
    "echolocation": {},
    "fastMetabolism": { "set": "initiative.base", "min": 1, "max": 6, "conflict": "slowMetabolism" },
    "flyer": { "default": 3, "choices": [ "idle", "verySlow", "slow", "medium", "high", "fast", "veryFast", "subsonic", "supersonic", "hypersonic" ]},
    "heightenedSenses": { "skills": [ { "skill": "recon", "bonus": 1 }, { "skill": "survival", "bonus": 1 }] },
    "iuVision": {},
    "psionic": { "value": 7, "characteristic": "PSI" },
    "slowMetabolism": { "set": "initiative.base", "min": -6, "max": -1, "conflict": "fastMetabolism" }
  },
  "sizes": {
    "-4": { "label": "small", "damage": "1", "minHits": 1, "maxHits": 2, "width": 0.5 },
    "-3": { "label": "small", "damage": "1D3", "minHits": 3, "maxHits": 5, "width": 0.5 },
    "-2": { "label": "small", "damage": "1D3", "minHits": 6, "maxHits": 7, "width": 0.5 },
    "-1": { "label": "small", "damage": "1D6", "minHits": 8, "maxHits": 13, "width": 1 },
    "0": { "label": "medium", "damage": "1D6", "minHits": 14, "maxHits": 28, "width": 1 },
    "1": { "label": "large", "damage": "2D6", "minHits": 29, "maxHits": 35, "width": 2 },
    "2": { "label": "large", "damage": "3D6", "minHits": 36, "maxHits": 49, "width": 2 },
    "3": { "label": "large", "damage": "4D6", "minHits": 50, "maxHits": 70, "width": 2 },
    "4": { "label": "large", "damage": "5D6", "minHits": 71, "maxHits": 90, "width": 3 },
    "5": { "label": "large", "damage": "6D6", "minHits": 91, "maxHits": 125, "width": 3 },
    "6": { "label": "large", "damage": "7D6", "minHits": 125, "maxHits": 250, "width": 4 }
  }
};
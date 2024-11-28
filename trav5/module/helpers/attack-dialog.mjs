import {rollAttack, hasTrait, getTraitValue, skillLabel} from "./dice-rolls.mjs";
import {getSkillValue} from "./dice-rolls.mjs";

export class Trav5AttackDialog extends Application {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.template = "systems/trav5/templates/attack-dialog.html";
        options.width = "auto";
        options.height = "auto";
        options.title = "Attack";

        return options;
    }

    constructor(actor, weapon) {
        super();
        this.actor = actor;
        this.weapon = weapon;

        const data = actor.system;
        this.data = data;
        this.cha = this.weapon.system.weapon.characteristic;
        this.skill = this.weapon.system.weapon.skill.split(".")[0];
        this.speciality = this.weapon.system.weapon.skill.split(".")[1];
        this.auto = 1;
        if (hasTrait(this.weapon.system.weapon.traits, "auto")) {
            this.auto = getTraitValue(this.weapon.system.weapon.traits, "auto");
        }
        this.currentAmmo = weapon.useAmmo()?this.weapon.system.weapon.ammo:0;
        this.outOfAmmo = false;
        if (weapon.useAmmo() && this.weapon.system.weapon.magazine > 0) {
            this.auto = Math.min(this.auto, this.currentAmmo);
            if (this.auto === 0) {
                this.outOfAmmo = true;
            }
        }

        // Work out what the skill bonus is.
        this.score = parseInt(getSkillValue(this.actor, this.skill, this.speciality));
        this.parryScore = this.score;
        if (data.characteristics && data.characteristics[this.cha]) {
            this.score += parseInt(data.characteristics[this.cha].dm);
        } else {
            this.cha = null;
        }

        // Work out the damage.
        this.damage = weapon.system.weapon.damage;
        this.damage = this.damage.toUpperCase().replace(/D6/, "D");
        this.damage = this.damage.replace(/ *\* *10/, "D");

        this.range = parseInt(this.weapon.system.weapon.range);
        console.log("Range: " + this.range);
        this.melee = true;
        if (this.range > 0) {
            this.melee = false;
            this.shortRange = parseInt(this.range / 4);
            this.longRange = parseInt(this.range * 2);
            this.extremeRange = parseInt(this.range * 4);
        } else {
            this.parryBonus = weapon.system.weapon.parryBonus;
            if (!this.parryBonus) {
                this.parryBonus = 0;
            }
        }

        this.options.title = this.weapon.name;
        if (this.skill) {
        }
    }

    getData() {
        return {
            "actor": this.actor,
            "data": this.data,
            "weapon": this.weapon,
            "melee": this.melee,
            "damage": this.damage,
            "range": this.range,
            "shortRange": this.shortRange,
            "longRange": this.longRange,
            "extremeRange": this.extremeRange,
            "hasAuto": this.auto > 1,
            "auto": this.auto,
            "dm": 0,
            "score": this.score,
            "cha": this.cha,
            "skill": skillLabel(this.data.skills[this.skill]),
            "speciality": (this.skill && this.skill.specialities)?skillLabel(this.data.skills[this.skill].specialities[this.speciality]):"",
            "dicetype": "normal",
            "parryBonus": this.parryBonus,
            "parryScore": this.parryScore,
            "outOfAmmo": this.outOfAmmo,
            "currentAmmo": this.currentAmmo
        }
    }

    activateListeners(html) {
        super.activateListeners(html);
        const attack = html.find("button[class='attackRoll']");
        attack.on("click", event => this.onRollClick(event, html));
        const parry = html.find("button[class='parryRoll']");
        parry.on("click", event => this.onParryClick(event, html));
    }

    async onRollClick(event, html) {
        event.preventDefault();
        console.log("onRollClick:");

        let dm = parseInt(html.find("input[class='skillDialogDM']")[0].value);
        let rollType = html.find(".skillDialogRollType")[0].value;
        let rangeDM = null;
        if (html.find(".attackDialogRange")[0]) {
            rangeDM = parseInt(html.find(".attackDialogRange")[0].value);
        }
        let autoOption = "single";
        if (html.find(".attackDialogAuto")[0]) {
            autoOption = html.find(".attackDialogAuto")[0].value;
        }
        if (this.weapon.useAmmo()) {
            if (this.outOfAmmo) {
                autoOption = "noammo";
            } else {
                let shotsFired = this.auto;
                this.weapon.system.weapon.ammo -= shotsFired;
                this.weapon.update({"system.weapon": this.weapon.system.weapon});
            }
        }

        rollAttack(this.actor, this.weapon, this.score, dm, rollType, rangeDM, autoOption);

        this.close();
    }

    async onParryClick(event, html) {
        event.preventDefault();
        console.log("onParryClick:");

        let dm = parseInt(html.find("input[class='skillDialogDM']")[0].value);
        console.log("Parry DM is equal to " + dm);
        if (this.parryBonus) {
            dm += this.parryBonus;
        }
        let rollType = html.find(".skillDialogRollType")[0].value;
        console.log("Parry DM is equal to " + dm);

        rollAttack(this.actor, this.weapon, this.parryScore, dm, rollType, null, null, true);

        this.close();
    }

    async _updateObject(event, formData) {
        console.log("_updateObject:");
    }
}

window.Trav5AttackDialog = Trav5AttackDialog;

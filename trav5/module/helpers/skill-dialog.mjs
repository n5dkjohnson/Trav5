import {rollSkill} from "./dice-rolls.mjs";
import {Trav5AddSkillDialog} from "./add-skill-dialog.mjs";

export class Trav5SkillDialog extends Application {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.template = "systems/trav5/templates/skill-dialog.html";
        options.width = "auto";
        options.height = "auto";
        options.title = "Make a roll";

        return options;
    }

    constructor(actor, skill, spec, cha, defaultDm, target) {
        super();
        this.actor = actor;
        const data = actor.system;

        this.skillId = skill;
        this.skill = null;
        this.specId = null;
        this.spec = null;
        this.value = data.skills["jackofalltrades"].value - 3;
        this.chaOnly = false;
        this.cha = cha;
        this.expert = 0;
        this.augment = 0;
        this.augdm = 0;
        this.penalty = 0;
        this.defaultDm = defaultDm?defaultDm:0;
        this.boonBane = "normal";
        this.target = 8;
        this.skillText = "";

        if (target) {
            this.target = parseInt(target);
        }

        if (cha && data.characteristics && data.characteristics[cha]) {
            this.cha = cha;
            if (!skill) {
                this.chaOnly = true;
                this.value = 0;
            }
        }
        this.data = data;
        if (skill) {
            this.skill = data.skills[skill];
            if (!this.cha) {
                this.cha = this.skill.default;
            }
            if (this.skill.expert) {
                this.expert = parseInt(this.skill.expert);
            }
            if (this.skill.augdm && parseInt(this.skill.augdm) > 0) {
                this.augdm = parseInt(this.skill.augdm);
            }
            if (this.skill.boon === "boon") {
                this.boonBane = "boon";
            } else if (this.skill.bane === "bane") {
                this.boonBane = "bane";
            }
            if (this.skill.trained) {
                this.value = this.skill.value;

                if (this.skill.augment && parseInt(this.skill.augment) > 0) {
                    this.skill.augment = parseInt(this.skill.augment);
                }
                if (spec) {
                    this.specId = spec;
                    this.spec = data.skills[skill].specialities[spec];
                    this.value = this.spec.value;
                    if (this.spec.default && !this.cha) {
                        this.cha = this.spec.default;
                    }
                    if (this.spec.expert) {
                        this.expert = parseInt(this.spec.expert);
                    }
                }
            } else {
                this.value = data.skills["jackofalltrades"].value - 3;
                if (spec && data.skills[skill].specialities[spec].expert) {
                    this.specId = spec;
                    this.spec = data.skills[skill].specialities[spec];
                    this.expert = parseInt(this.spec.expert);
                }
            }
            this.options.title = this.skill.label;
        } else if (cha) {
            this.characteristic = data.characteristics[cha];
            this.options.title = this.characteristic.label;
            this.value = this.characteristic.dm;
        }
        if (this.spec) {
            this.skillText = actor.getSkillLabel(skill + "." + spec, false);
        } else {
            this.skillText = actor.getSkillLabel(skill, false);
        }
        this.options.title = this.skillText;
        this.penalty = data.physicalDM;
    }

    getData() {
        return {
            "actor": this.actor,
            "data": this.data,
            "skill": this.skill,
            "spec": this.spec,
            "skillText": this.skillText,
            "value": this.value,
            "showCha": (this.skill && this.actor.type !== "creature"),
            "chaOnly": this.chaOnly,
            "dm": this.defaultDm,
            "dicetype": "normal",
            "physicalDM": this.penalty,
            "characteristic": this.cha,
            "target": this.target,
            "boonBane": this.boonBane,
            "showEdit": !(this.actor.parent)
        }
    }

    activateListeners(html) {
        super.activateListeners(html);
        const roll = html.find("button[class='skillRoll']");
        roll.on("click", event => this.onRollClick(event, html));

        html.find(".edit-skill").on("click", event => this.onSkillEdit(event, html));
    }

    async onRollClick(event, html) {
        event.preventDefault();

        let dm = parseInt(html.find("input[class='skillDialogDM']")[0].value);
        let cha = this.cha;
        let remember = false;
        if (html.find(".skillDialogCha")[0]) {
            cha = html.find(".skillDialogCha")[0].value;
            remember = html.find(".rememberChaCheck")[0].checked;
        }
        let rollType = html.find(".skillDialogRollType")[0].value;
        let difficulty = parseInt(html.find(".skillDialogDifficulty")[0].value);

        if (remember && this.skillId) {
            if (this.spec) {
                this.actor.system.skills[this.skillId].specialities[this.specId].default = cha;
            } else {
                this.actor.system.skills[this.skillId].default = cha;
            }
            this.actor.update({ "system.skills": this.actor.system.skills });
        } else if (this.skillId) {
            this.cha = this.actor.system.skills[this.skillId].default;
        }
        rollSkill(this.actor, this.skill, this.spec, cha, dm, rollType, difficulty);

        this.close();
    }

    async onSkillEdit(event, html) {
        event.preventDefault();
        new Trav5AddSkillDialog(this.actor, this.skillId, this.skill, this.specId, this.spec).render(true);
        this.close();
    }

    async _updateObject(event, formData) {
        console.log("_updateObject:");
    }
}

window.Trav5SkillDialog = Trav5SkillDialog;

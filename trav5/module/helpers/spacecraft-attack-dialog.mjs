import {rollSpaceAttack, hasTrait, getTraitValue} from "./dice-rolls.mjs";
import {getSkillValue} from "./dice-rolls.mjs";

export class Trav5SpacecraftAttackDialog extends Application {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.template = "systems/trav5/templates/spacecraft-attack-dialog.html";
        options.width = "auto";
        options.height = "auto";
        options.title = "Attack";

        return options;
    }

    constructor(starshipActor, gunnerActor, weaponMount, dm) {
        super();
        this.starship = starshipActor;
        this.gunner = gunnerActor;
        this.mount = weaponMount;

        if (!this.mount) {
            ui.notifications.error(game.i18n.localize("TRAV5.Error.NoWeaponMount"));
            return;
        }

        this.weaponSelect = {};
        this.weaponSelected = null;
        this.weaponItem = null;
        this.dm = isNaN(dm)?0:parseInt(dm);
        this.ranges = {};
        this.range = "medium";

        if (this.mount.type === "hardware" && this.mount.system.hardware.system === "weapon") {
            console.log(this.mount);
            let weapons = this.mount.system.hardware.weapons;
            // Could have multiple types of weapons. If so, need a select box.
            for (let w in weapons) {
                console.log(`Weapon id in mount: ${w}`);
                let wpnItem = this.starship.items.get(w);
                if (!wpnItem) {
                    ui.notifications.error(`Weapon item [${w}] does not exist`);
                    continue;
                }
                if (!this.weaponSelected) {
                    this.weaponSelected = w;
                    this.weaponItem = wpnItem;
                }
                if (weapons[w].quantity > 1) {
                    this.weaponSelect[w] = wpnItem.name + " x" + weapons[w].quantity;
                } else {
                    this.weaponSelect[w] = wpnItem.name;
                }
            }
            console.log(this.weaponSelect);
        } else {
            return;
        }
        for (let r in CONFIG.TRAV5.SPACE_RANGES ) {
            this.ranges[r] = game.i18n.localize("TRAV5.Item.SpaceRange." + r) + ` (${CONFIG.TRAV5.SPACE_RANGES[r].dm})`;
            if (r === this.weaponItem.system.weapon.spaceRange) {
                break;
            }
        }
    }

    setRanges(html) {
        let rangeSelect = html.find(".attackDialogRange");

        let text = "";
        let haveSelected = false;
        for (let r in CONFIG.TRAV5.SPACE_RANGES) {
            if (!haveSelected && r === this.weaponItem.system.weapon.spaceRange) {
                // If previous selection was a greater range, then switch to maximum range.
                this.range = r;
            }
            let selected = (this.range === r)?("selected=''"):"";
            if (selected) {
                haveSelected = true;
            }
            text += `<option value="${r}" ${selected}>${game.i18n.localize("TRAV5.Item.SpaceRange." + r)} (${CONFIG.TRAV5.SPACE_RANGES[r].dm})</option>`;
            if (r === this.weaponItem.system.weapon.spaceRange) {
                break;
            }
        }

        rangeSelect[0].innerHTML = text;
    }

    getData() {
        return {
            "starship": this.starship,
            "gunner": this.gunner,
            "weaponSelect": this.weaponSelect,
            "weaponMount": this.mount,
            "weaponSelected": this.weaponSelected,
            "weaponItem": this.weaponItem,
            "dm": this.dm,
            "ranges": this.ranges,
            "range": this.range,
            "gunnerSkillLabel": this.gunner.getSkillLabel(this.weaponItem.system.weapon.skill, true)
        }
    }

    activateListeners(html) {
        super.activateListeners(html);
        const attack = html.find("button[class='attackRoll']");
        attack.on("click", event => this.onRollClick(event, html));

        html.find(".attackDialogWeapon").click(event => this.onWeaponSelect(event, html));
        html.find(".attackDialogRange").click(event => {
            this.range = html.find(".attackDialogRange")[0].value;
        });

        this.setRanges(html);
    }

    onWeaponSelect(event, html) {
        console.log("SELECTED");

        let wpnId = $(event.currentTarget).val();

        this.weaponSelected = wpnId;
        this.weaponItem = this.starship.items.get(wpnId);
        this.setRanges(html);
    }

    async onRollClick(event, html) {
        event.preventDefault();
        console.log("onRollClick:");

        let dm = parseInt(html.find("input[class='skillDialogDM']")[0].value);
        let rollType = html.find(".skillDialogRollType")[0].value;
        let range = null;
        let rangeDM = null;
        if (html.find(".attackDialogRange")[0]) {
            range = html.find(".attackDialogRange")[0].value;
            rangeDM = parseInt(CONFIG.TRAV5.SPACE_RANGES[range].dm);
        }

        let options = {
            "dm": dm,
            "skill": 0,
            "range": range,
            "rangedm": rangeDM,
            "boon": rollType
        }
        let weapons = this.mount.system.hardware.weapons
        if (weapons[this.weaponItem.id].quantity > 1) {
            options.quantity = weapons[this.weaponItem.id].quantity;
        }

        rollSpaceAttack(this.starship, this.gunner, this.weaponItem, options);

        this.close();
    }


    async _updateObject(event, formData) {
        console.log("_updateObject:");
    }
}

window.Trav5AttackDialog = Trav5AttackDialog;

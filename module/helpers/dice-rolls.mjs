
export function rollSkill(actor, skill, speciality, cha, dm, rollType) {
    const data = actor.data.data;
    let   text = "";
    let   creatureCheck = false;
    let   untrainedCheck = false;
    let   specialityCheck = false;
    let   skillCheck = false;

    // Normal, Boon or Bane dice roll.
    let dice = "2D6";
    if (rollType === "boon") {
        dice = "3D6k2";
    } else if (rollType === "bane") {
        dice = "3D6kl2";
    }

    if (cha && data.characteristics && data.characteristics[cha]) {
        let dm = data.characteristics[cha].dm;
        dice += " + " + dm;
        text += cha;
        if (dm < 0) {
            text += " (" + dm + ")";
        } else {
            text += " (+" + dm + ")";
        }
    } else {
        creatureCheck = true;
    }

    if (skill) {
        skillCheck = true;
        let value = data.skills["jackofalltrades"].value - 3;
        if (text.length > 0) {
            text += " + ";
        }
        text += skill.label;
        if (skill.trained) {
            value = skill.value;
            if (speciality) {
                value = speciality.value;
                text += " (" + speciality.label + ")";
                specialityCheck = true;
            }
        } else {
            untrainedCheck = true;
        }
        dice += " + " + value;
        if (value < 0) {
            text += " (" + value + ")";
        } else {
            text += " (+" + value + ")";
        }
    }
    if (dm > 0) {
        dice += " +" + dm;
        text += " +" + dm;
    } else if (dm < 0) {
        dice += " " + dm;
        text += " " + dm;
    }

    if (rollType === "boon") {
        text += " <span class='boon'>[Boon]</span>";
    } else if (rollType === "bane") {
        text += " <span class='bane'>[Bane]</span>";
    }
    console.log("Thumbnail:" + actor.thumbnail);

    let checkText = "Making a skill check";

    if (creatureCheck) {
        checkText = "Creature skill check";
    } else if (specialityCheck) {
        checkText = "Specialisation check";
    } else if (skillCheck) {
        checkText = "Skill check";
    } else {
        checkText = "Characteristic check";
    }
    if (untrainedCheck) {
        checkText += " (untrained)";
    }

    text = "<span class='skillroll'>" + text + "</span>";
    text = "<div><img class='skillcheck-thumb' src='" + actor.thumbnail + "'/>" +
        checkText + "<br/>" + text + "</div>";

    let roll = new Roll(dice, actor.getRollData()).evaluate({async: false});
    if (roll) {
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({actor: actor}),
            flavor: text,
            rollMode: game.settings.get("core", "rollMode")
        });
    }
}
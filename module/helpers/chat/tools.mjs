import {hasTrait, getTraitValue} from "../dice-rolls.mjs";

export const Tools = {};

Tools.upp = function(chatData, args) {
    let text = `<div class="tools">`;

    let extra = 0;

    if (args.length > 0) {
        extra = Math.max(0, parseInt(args.shift()));
    }
    text += `<h3>UPP ${(extra>0)?" (with "+extra+" extra rolls)":""}</h3>`;

    let rolls = [];

    for (let i=0; i < 6; i++) {
        const roll = new Roll("2d6").evaluate({async: false});
        rolls[i] = roll.total;
    }
    while (extra-- > 0) {
        const roll = new Roll("2d6").evaluate({async: false});
        let value = roll.total;
        let lowest = 0;
        for (let i=0; i < 6; i++) {
            if (rolls[i] < rolls[lowest]) {
                lowest = i;
            }
        }
        if (rolls[lowest] < value) {
            rolls[lowest] = value;
        }
    }

    for (let i=0; i < 6; i++) {
        text += `<span class="skill-roll">${rolls[i]}</span> `;
    }
    text += `</div>`;

    chatData.content = text;
    ChatMessage.create(chatData);
};

Tools.message = function(chatData, message) {
    chatData.content = message;
    ChatMessage.create(chatData);
}

Tools.applyDamageToCha= function(damage, actorData, cha) {
    if (damage > 0) {
        let dmg = Math.min(damage, actorData.characteristics[cha].current);
        actorData.damage[cha].value += dmg;
        console.log("Applied " + dmg + " to " + cha);

        return damage - dmg;
    }
    return 0;
}

// Apply damage to an actor. Needs to calculate armour.
Tools.applyDamageTo = function(damage, ap, tl, options, traits, actor, token) {
    let text = "";

    if (!options) {
        options = "";
    }
    if (!damage) {
        damage = 0;
    }
    if (!ap) {
        ap = 0;
    }
    if (!tl) {
        tl = 0;
    }
    if (!actor) {
        return;
    }

    console.log(`applyDamageTo: ${damage} AP ${ap} TL ${tl} (${options})`);

    let isLaser = options.indexOf("laser") > -1;
    let isPlasma = options.indexOf("plasma") > -1;
    let isEnergy = options.indexOf("energy") > -1;
    let isPsi = options.indexOf("psi") > -1;
    let isRanged = true;

    let data = actor.data.data;

    let armour = data.armour.protection;
    if (isLaser && data.armour.laser > armour) {
        armour = data.armour.laser;
    } else if (isPlasma && data.armour.plasma > armour) {
        armour = data.armour.plasma;
    } else if (isEnergy && data.armour.energy > armour) {
        armour = data.armour.energy;
    } else if (isPsi && data.armour.psi > armour) {
        armour = data.armour.psi;
    }
    if (hasTrait(traits, "lo-pen")) {
        let lopen = getTraitValue(traits, "lo-pen");
        if (lopen > 1) {
            armour *= lopen;
        }
    }
    if (data.armour.archaic && isRanged && tl > data.armour.tl) {
        // Archaic armour gets halved.
        armour = parseInt(Math.round(armour / 2));
    }
    armour = Math.max(0, armour - ap);
    let actualDamage = Math.max(0, damage - armour);

    console.log("DAMAGE: " + actualDamage);
    if (actor.type === "traveller") {
        // Travellers don't have hits, n
        let remaining = actualDamage;
        // Damage always comes off END first.
        if (data.damage.END.value < data.characteristics.END.value) {
            remaining = Tools.applyDamageToCha(remaining, data, "END");
        }
        // Now select either STR or DEX. Select the lowest as long as it doesn't take
        // the characteristic to zero.
        if (remaining > 0) {
            let str = data.characteristics.STR.current;
            if (str <= data.characteristics.DEX.current && str > remaining) {
                remaining = Tools.applyDamageToCha(remaining, data, "STR");
                remaining = Tools.applyDamageToCha(remaining, data, "DEX");
            } else {
                remaining = Tools.applyDamageToCha(remaining, data, "DEX");
                remaining = Tools.applyDamageToCha(remaining, data, "STR");
            }
        }
        actor.update({"data.damage": data.damage});
        return;
    } else {
        console.log("HITS: " + data.hits.value);
        data.hits.value = Math.max(0 - data.hits.max, data.hits.value - actualDamage);
    }

    actor.update({"data.hits": data.hits});

    let name = actor.data.name;
    let maxHits = data.hits.max;
    if (actualDamage >= (2 * maxHits) / 3) {
        text += "Ouch! "
    } else if (actualDamage >= maxHits / 3) {
        text += "Ouch. ";
    }
    text += `${name} took ${actualDamage} hits. `;
    if (actualDamage < damage * 0.1) {
        text += "Nearly all of it was stopped by armour. ";
    } else if (actualDamage < damage * 0.25) {
        text += "Most of it was stopped by armour. ";
    } else if (actualDamage < damage * 0.67) {
        text += "Some of it was stopped by armour.";
    } else if (actualDamage < damage) {
        text += "Most of it got through.";
    }
    if (token) {
        console.log("Apply effects to token");
        if (data.hits.value <= 0) {
            token.toggleEffect("systems/mgt2/icons/effects/wounded.svg", { "overlay": false, "active": false });
            token.toggleEffect("systems/mgt2/icons/effects/dead.svg", { "overlay": true, "active": true });
        } else if (data.hits.value <= maxHits * 0.1) {
            token.toggleEffect("systems/mgt2/icons/effects/wounded.svg", { "overlay": false, "active": false });
            token.toggleEffect("systems/mgt2/icons/effects/unconscious.svg", { "overlay": true, "active": true });
        } else if (data.hits.value <= maxHits * 0.5) {
            token.toggleEffect("systems/mgt2/icons/effects/wounded.svg", { "overlay": false, "active": true });
        } else {
            token.toggleEffect("systems/mgt2/icons/effects/wounded.svg", { "overlay": false, "active": false });
            token.toggleEffect("systems/mgt2/icons/effects/wounded.svg", { "overlay": true, "active": false });
        }
    }

    let chatData = {
        user: game.user.id,
        speaker: ChatMessage.getSpeaker(),
        content: text
    }
    ChatMessage.create(chatData, {});

}

// Called from a button press in damage output in the chat.
Tools.applyDamage = function(damage, ap, tl, options, traits) {
    console.log("Tools.applyDamage:");
    const user = game.users.current;

    const targets = user.targets;
    for (let target of targets.values()) {
        Tools.applyDamageTo(damage, ap, tl, options, traits, target.actor, target);
    }
}

// Called from a chat command.
Tools.damage = function(chatData, args) {
    let text=`<div class="tools">`;

    console.log("damage:");

    console.log("chatData:");
    console.log(chatData);
    console.log("game:");
    console.log(game);

    const user = game.users.current;
    console.log("User name: " + user.name);

    const targets = user.targets;
    console.log(targets);


    if (args.length < 1) {
        ui.notifications.error("You must at least specify the amount of damage");
        return;
    }
    let damage = parseInt(args.shift());
    let ap = 0;
    let tl = 0;
    let options = "";
    let traits = "";

    if (!isNaN(args[0])) {
        ap = parseInt(args.shift());
    }

    if (targets.size == 0) {
        ui.notifications.error("No tokens are targeted");
        return;
    }

    for (let target of targets.values()) {
        let name = target.data.name;

        let linked = target.data.actorLink;
        let type = target.data.document._actor.data.type;

        Tools.applyDamageTo(damage, ap, tl, options, traits, target.actor, target);
    }
};

Tools.showSkills = function(chatData) {
    const user = game.users.current;
    const selected = canvas.tokens.controlled;

    console.log(selected);

    if (selected.length === 0) {
        ui.notifications.error("You need to select a token");
        return;
    } else if (selected.length > 1) {
        ui.notifications.error("You must have only one token selected");
        return;
    }

    let token = selected[0];
    let name = token.data.name;
    console.log(name);

    let text = `<h1>${name}</h1>`;

    let actorId = token.data.actorId;
    let actor = game.actors.get(actorId);
    if (!actor) {
        ui.notifications.error("Unable to find actor " + actorId);
        return;
    }
    let skills = actor.data.data.skills;

    console.log(skills);

    for (let skill in skills) {
        text += `${skills[skill].label}<br/>`;
//        text += `${skill.label}<br/>`;
    }

    this.message(chatData, text);



}
/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {
    return loadTemplates([
        // Actor partials.
        "systems/trav5/templates/actor/parts/actor-items.html",
        "systems/trav5/templates/actor/parts/actor-combat.html",
        "systems/trav5/templates/actor/parts/actor-status.html",
        "systems/trav5/templates/actor/parts/actor-effects.html",
        "systems/trav5/templates/actor/parts/actor-skills.html",
        "systems/trav5/templates/actor/parts/actor-weapons.html",
        "systems/trav5/templates/actor/parts/actor-terms.html",
        "systems/trav5/templates/actor/parts/actor-settings.html",
        "systems/trav5/templates/actor/parts/actor-starship-bays.html",
        "systems/trav5/templates/actor/parts/actor-starship-crew.html",
        "systems/trav5/templates/item/parts/item-general.html",
        "systems/trav5/templates/item/parts/item-techLevel.html"
    ]);
};

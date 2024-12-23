# Release Notes

## Known Issues

* Behaviour drop down on Creature character sheet immediately closes after opening unless mouse button
  is held down.
* Career terms aren't always added in the correct order.


## v0.11.0 (Beta)

* Definition of Computers on spacecraft has changed from a simple selectable value to using a Hardware component.
* A 'study notes' section has been added to the XP dialog for each skill.
* It is now possible to delete skills from a character sheet (but not a token).
* Skills marked as deleted from an actor package will now be deleted when package is applied to target actor.
* Spacecraft hardware can now be activated and deactivated. Backend support for damaged hardware now added as well.
* Spacecraft now have a drop down menu to add some basic core hardware options.
* Increased default size of description field for items.
* Added Software item type. This can be added to spacecraft, but currently has no effect.
* Increased maximum TL of items to 25. Hardware TL limited to TL of spacecraft it is installed on.

## v0.10.7 (Beta)

* Added new traits for weapons: Dangerous, Shield, Protection, Smasher, Artillery, Silent, Fire etc
* Added new traits for spacecraft weapons: Ion, Chain Reaction, Orbital Strike etc
* Add support for Protection type for weapons, so it counts as armour.
* Add support for Dangerous and Very Dangerous weapons in attack rolls.
* Reduce what can be seen on an NPC sheet if permissions are Limited.
* Fix CSS bug where Macros were not showing icon or name field.
* Display and set technology modifiers for some spacecraft equipment. They currently have no effect though.
* Backend rewrites to how attacks are implemented, to handle different scales and tidy up the code.
* Added new spacecraft damage dialog, for attacks on spacecraft.
* Set criticals on a spacecraft when it is damaged. They are displayed on the sheet, but currently have no effect.


## v0.10.6 (Beta)

* Fix issue with random cargo tonnage roller not working on v12.
* Prevent an 'empty' modifier from being added to the Purchase and Sale modifier list on cargo items.


## v0.10.5 (Beta)

* Allow characteristics to be rolled from the character sheet.
* Fix some bugs around how career terms are added to character sheets.
* System settings for how chat messages about character updates are broadcast.
* Allow characteristics to be locked to reduce chance of unwanted changes.
* First draft of character sheet for vehicles.
* Update to spacecraft to allow vehicles and other spacecraft to dock with them.
* Track and set initiative for spacecraft.
* Add special actions for ship roles, including make pilot, tactics and leadership.
* Fix bug where v12 changes broke relationship items.
* Packages now correctly set and report species, height and weight fields.
* Can now drag crew members from a spacecraft or vehicle to a scene.

## v0.10.4 (Beta)

* Fix bug with specialities and expert systems
* Change implementation of rules so expert system always gives +1 if you are trained

## v0.10.3 (Beta)

* Fixed application of damage in Foundry v12.
* Fixed display of actor and item descriptions in Foundry v12.
* Updated system configuration to include v12 as supported.

## Reccent

* Allow actors to be dragged out of starships onto the scene.
* When dragging hardware, crew roles or career terms between actors, always use a copy rather than a move.
* Spacecraft dragged onto a spacecraft are put into the docking bay.

## v0.10.2 (Beta)

* Better use of space in armour box for spacecraft.
* Fixed precision bug in display of item costs on character sheets.
* Added profession and species information to passenger cards.
* Prevent roles and weapons from being deleted if in use.
* Fixed bug where creatures weren't being given skills.

## v0.10.1 (Beta)

Started adding support for spacecraft shooting at things. This is currently in alpha.
Damage applied by spacecraft attacks may be inconsistent depending on how it is applied
(dragged to sheet compared to applied to a token, or based on type of actor target).

* Weapon attack option has been added to crew roles.
* Crew role skill check can now specify difficulty of a task, and the characteristic to use.
* Bugs fixed around display of skill labels.
* Bug which prevented spacecraft from being updated if a computer wasn't set fixed.
* Backend reworking of how skills are calculated.
* Fixed bugs with display of the NPC ID card.
* Fixed bug with skill icon.
* Magazine and ammo only displayed for ranged weapons.


## v0.10.0 (Beta)

### Breaking Changes

The changes made to Creatures in 0.9.2 have been replicated to Items. Weapon traits now display
as options in a select box, rather than being a free text field. This requires enforcing the
format being used. This is good, because if it was wrong before a trait would just be ignored.
Conversion is done on migration, trying to preserve any existing weapon traits. We try to be
as generous as we can in interpretation, but only support the core weapon traits.

### Changes

* Moved list of skills and characteristics from template.json to code. This is needed as part
  of migrating to v12. Skills are copied into an actor when one is created.
* Skill names now have some i18n support.
* Weapons and armour now use UX design from Creatures, hardcoding the list of traits and damage
  types and providing a selectable list of options.
* The Cargo sheet now uses the new UX design for trade bonuses.
* Career terms can now specify what dice to roll for random career length, rather than assuming 3D6.
* Fix bug where a stunned NPC would always take stun damage after being stunned once.
* Updates to data structure references in HTML for better v12 support.
* Added initial support for computer systems on spacecraft.
* Changed to using 'cargo' item type to calculate cargo hold on spacecraft, rather than just
  assuming it is all remaining volume.
* Added icons for fuel tanks and cargo hold.
* Adding a template to an actor now outputs the results.
* Added tokens for Lab Ship and Empress Marava.

## v0.9.2 (Beta)

### Breaking Changes

The character sheet for creatures has had radical changes. Behaviours and Traits are now managed rather than
being treated as simple text fields. This means only supported behaviours and traits can be set, however,
they now automatically apply modifiers and provide skill hints based on what is chosen. An attempt is
made to convert from the old format to the new format, but some behaviours and traits may be lost.

### Changes

* Quietly squash warnings about adding careers and associates to NPCs when adding a package
* Handle boon/bane flag correctly on skills which default to boon or bane
* Auto resize starship tokens based on tonnage
* Modification to what players can see on NPCs sheet based on permissions.
* NPCs now have a 'cash' attribute, just like Travellers.
* Skills which have an internal bonus set are now highlighted.

## v0.9.1 (Beta)

* Changed in-built compendium names to use consistent 'MgT2e Base' prefix
* Added validation to make sure dropped items were legal for an actor type.
* Updated docs for better descriptions of actors.

## v0.9.0 (Beta)

Major release. First public release.


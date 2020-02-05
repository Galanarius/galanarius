# changes

## Build version

master 1.0

## DA

## DI

Fixed command not found logic for commands with parameters.

Implemented gather command and its failsafes.

Added new conditional statements to respond to incorrectly entered commands.

## Overall

Finished Planet and Planetoid implementation, and succesfully tested map generation with varying sized galaxies.

Added an alias to resource converter to actions.js

Reworked the resource gathering equations to avoid generating negative numbers.

Updated TODO.md with completed goals and new intermediary goals before react implementation (aka added more stuff I can do over the weekend without trying to learn more of the new frameworks).

Implemented new ID override system for map generation.

Reworked the map coordinate generation system.

Began implementation of move functions for players and npcs, as well as map referencing functions.

Began rework of map system to allow storage of child IDs to make map referencing better optimized.

Added empty constructors for the object type of variables in the constructors of the map system to better define their type in case of errors.

Removed planet `capacity`, meant to be the maximum number of buildings allowed on the planet in leu of buildings all being built at nodes.

Added an Array of Planetoids to the Planet objects.

Began to convert all generation functions to promise functions by starting with the map.Galaxy class.

Began to implement arrow functions to replace all functions to reflect ES6 standards.

Changed all var declerations in Galaxy to let declerations to better reflect their scopes.

Changed all functions in map to be asynchronous to avoid compound data errors.

Changed planetoid and planet generation to fix a bug which would only generate 1 instead of a randomly generated amount.

Finished rework of map system adding child IDs for planets and planetoids to allow for searching commands to be implemented.

Patched a bug causing map generation to crash when run due to a referencing error to planet size.

Generated 4 different examples of map generation, of sizes 10, 20, 50, and 100.

Continued implementation of former getItem funciton in map.js, now getDest.

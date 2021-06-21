# SnakeGame

A javascript-only snake game which requires only an HTML insertion point to run (document body by default.)

## How to run the app

1. Fork/clone the github repo OR make a new html document with generic boilerplate and copy/paste script from index.js at the bottom.
2. Open with something like 'Live Server' OR copy the absolute path of the html file and paste into your browser. The app should be running now.

## Features

1. very customizable base settings, refer to index.js for comments about what things do. Code is very modular and changing one thing usually doesn't break any of the other systems on accident.
- Ex. Although the game in base version does not allow for even column/row setting, if you turn that off by changing 1 line of code, the game will mostly work as expected.
- Ex. Although the game utilizes localStorage, the game's full functionality can be explored completely without it for users who have it disabled.
2. a user can customize their running version of the game with some settings such as size, number of columns/rows, and resetting or completely removing the localStorage data used in the app.
3. a user can see a list of stats kept track of which displays their current settings as well.
4. no refresh required for any of the user customization options to take place.

### How to play the game
1. wasd or arrow keys control your movement. As soon as you press one of them the game will start.
2. if you die, pressing wasd or arrow keys again will start another game.

### How to see stats/menu
1. Press n to see your stats. Press m to see the menu.

### How to update your settings
1. Once you have the menu visible, adjust the two numbers 'size' and 'layout' and the 'fastmode' checkbox to your liking.
2. Press the 'save' button and you should see your settings reflected in the game's layout, size, and pace.

### How to reset all settings or clear out all data the game keeps track of
1. Once you have the menu visible, there should be two buttons at the bottom. Reset All Data resets all the settings to default.
2. Clear Storage removes all of the game's data from localStorage. If you start another game or update your settings again, it will recreate the data.
- To remove the data without recreating it, make sure that pressing the Clear Storage button is the last thing you do before leaving the page.

## Future features
- Significant refactoring so that code customization is a lot easier.
- Additional menu options like darkmode or slim mode where all text is removed.

## Dependencies
- No dependencies.
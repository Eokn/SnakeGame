//set up initial variables, check if previous settings exist.
let numSquaresPerSide = 7;
let sizeOfGame = 300;
let speed = 250;
let storageSupported = typeof(Storage) !== undefined;
let storageActive = localStorage.getItem('snakeGame_numSquares') !== null;
if (storageSupported && storageActive){
    numSquaresPerSide = Number(localStorage.getItem('snakeGame_numSquares'));
    sizeOfGame = Number(localStorage.getItem('snakeGame_size'));
    speed = Number(localStorage.getItem('snakeGame_speed'));
} else if (storageSupported){
    localStorage.setItem('snakeGame_numSquares','7');
    localStorage.setItem('snakeGame_size','300');
    localStorage.setItem('snakeGame_speed', '250');
    localStorage.setItem('snakeGame_losses','0');
    localStorage.setItem('snakeGame_wins','0');
    storageActive = true;
}


//current goals - fix the game collapsing problem. make the form work, make reset settings work.

const snakeGame = document.createElement('div');
snakeGame.id = 'snakeGame';
//change the line under here if you'd like to place the game somewhere other than the document body.
document.body.appendChild(snakeGame);
const title = document.createElement('h1');
title.innerText = 'Snake Game';
title.style.color = 'red';
title.style.textAlign = 'center';
title.style.fontSize = '30px';
title.style.margin = '0';
snakeGame.appendChild(title);
const instructions = document.createElement('p');
instructions.innerText = 'Press wasd or arrow keys to begin.';
instructions.style.textAlign = 'center';
instructions.style.margin = '0';
snakeGame.appendChild(instructions);
const game = document.createElement('div');
game.style.margin = 'auto';
game.style.padding = '0';
game.style.display = 'flex';
game.style.flexFlow = 'row wrap';
game.style.borderBottom = '1px solid black';
game.style.borderLeft = '1px solid black';
snakeGame.appendChild(game);
//All of the previous I think is fine left untouched. Below here is where the functions will start, whose job it will be to take in numSquaresPerSize and SizeOfGame, delete all previous children of game, and return a new one.
//  Gets rid of all the children of game.

const updateGameSizes = () => {
    document.querySelectorAll('#snakeGame div *').forEach((x) => x.remove());
    game.style.width = `${(Math.floor(sizeOfGame/numSquaresPerSide)*numSquaresPerSide)+numSquaresPerSide}px`;
    for (let i = 1; i <= numSquaresPerSide; i++){
        for (let j = 1; j <= numSquaresPerSide; j++){
            const gameBlock = document.createElement('div');
            gameBlock.style.borderTop = '1px solid black';
            gameBlock.style.borderRight = '1px solid black';
            
            gameBlock.style.width = `${Math.floor(sizeOfGame/numSquaresPerSide)}px`;
            gameBlock.style.height = `${Math.floor(sizeOfGame/numSquaresPerSide)}px`;
            gameBlock.style.margin = '0px';
            gameBlock.style.padding = '0px';
            gameBlock.style.display = 'inline-block';
            gameBlock.id = `${(i-1)*numSquaresPerSide + j}`;
            game.appendChild(gameBlock);
        }
    }
    snakeGame.style.margin = `0 calc((100% - ${sizeOfGame+40+numSquaresPerSide}px)/2)`;
}

const options = document.createElement('div');
options.style.textAlign = 'center';
options.style.margin = '5px';
options.innerText = 'Press n for stats and m for the menu.'
//the menu / stats bar will appear on the left/right of the snakeGame and the options element will tell a user how to activate them.
const menu = document.createElement('section');
const squareAmntAdjust = document.createElement('div')//label for deciding how many squares per row/column. ?x?
const sizeAdjust = document.createElement('div')//label for adjusting size of game manually.
const darkMode = document.createElement('div')//A checkbox. Redo some colors to be (!darkMode) ? normal : darkModeColor.
const updateSettings = document.createElement('button')//A button which sends all the new settings to their places, including local storage.
snakeGame.appendChild(menu);
menu.style.backgroundColor = `lightgray`;
const menuTitle = document.createElement('h2');
menuTitle.innerText = 'Menu';
menuTitle.style.textAlign = 'center';
menuTitle.style.color = 'red';
menuTitle.style.margin = '0';
menu.appendChild(menuTitle);
menu.style.position = 'absolute';
menu.style.padding = '2px';

menu.style.top = '8px';
menu.style.display = 'none';
menu.style.border = '2px solid black';
menu.style.borderRadius = '3px';
menu.style.flexFlow = 'column';

const menuForm = document.createElement('form');
menuForm.id = 'menuForm';
menuForm.style.margin = '5px 2px';
menuForm.style.padding = '2px';
menuForm.style.border = '1px solid black';
menuForm.style.borderRadius = '2px';
menuForm.style.display = 'flex';
menuForm.style.flexFlow = 'column';

let sizeOptionLabel = document.createElement('label');
sizeOptionLabel.innerText = 'Size: ';
sizeOptionLabel.style.display = 'block';
sizeOptionLabel.style.margin = '4px 0px';
let sizeOption = document.createElement('input');
sizeOptionLabel.appendChild(sizeOption);
sizeOption.type = 'number';
sizeOption.size = '5';
sizeOption.id = 'sizeOption';
sizeOption.step = '50';
sizeOption.min = '100';
sizeOption.max = '1000';
menuForm.appendChild(sizeOptionLabel);
let numSquaresOptionLabel = document.createElement('label');
numSquaresOptionLabel.innerText = 'Layout: ';
let numSquaresOption = document.createElement('input');
numSquaresOptionLabel.appendChild(numSquaresOption);
numSquaresOption.type = 'number';
numSquaresOption.size = '5';
numSquaresOption.min = '3';
numSquaresOption.max = '15';
numSquaresOption.step = '2';
numSquaresOption.id = 'numSquaresOption';
menuForm.appendChild(numSquaresOptionLabel);
let fastOptionLabel = document.createElement('label');
fastOptionLabel.innerText = 'Fastmode';
fastOptionLabel.style.display = 'block';
fastOptionLabel.style.margin = '4px 0px';
let fastOption = document.createElement('input');
fastOptionLabel.appendChild(fastOption);
fastOption.type = 'checkbox';
fastOption.id = 'fastOption';
menuForm.appendChild(fastOptionLabel);

menu.appendChild(menuForm);
//...applies changes from the menu.
const applyChanges = () => {
    numSquaresPerSide = Number(numSquaresOption.value);
    sizeOfGame = Number(sizeOption.value);
    fastOption.checked ? speed = 250 : speed = 500;
    localStorage.setItem('snakeGame_numSquares',`${numSquaresPerSide}`);
    localStorage.setItem('snakeGame_size',`${sizeOfGame}`);
    localStorage.setItem('snakeGame_speed', `${speed}`);
    if(!storageActive){
        localStorage.setItem('snakeGame_losses','0');
        localStorage.setItem('snakeGame_wins','0');
        storageActive = true;
    }
}

let menuFormButton = document.createElement('button');
menuFormButton.type = 'submit';
menuFormButton.id = 'menuFormButton';
menuFormButton.innerText = 'Save';
menuFormButton.style.margin = '4px';
menuFormButton.style.padding = '2px';
menuForm.appendChild(menuFormButton);//on submit, apply changes to variables and remake the game.
menuForm.addEventListener('submit', (e) => {
    e.preventDefault();
    applyChanges();
    updateFullGame();
}
);
let menuResetButton = document.createElement('button');
menuResetButton.type = 'submit';
menuResetButton.innerText = 'Reset All Data';
menuResetButton.style.margin = '8px 2px';
menuResetButton.style.padding = '4px';

menu.appendChild(menuResetButton);//button to reset all variables to 'factory settings'
menuResetButton.onclick = (e) => {
    e.preventDefault();
    storageActive = true;
    localStorage.setItem('snakeGame_numSquares','7');
    localStorage.setItem('snakeGame_size','300');
    localStorage.setItem('snakeGame_speed', '250');
    localStorage.setItem('snakeGame_losses','0');
    localStorage.setItem('snakeGame_wins','0');
    numSquaresPerSide = 7;
    sizeOfGame = 300;
    speed = 250;
    updateFullGame();
}


let menuClearAllButton = document.createElement('button');
menuClearAllButton.type = 'submit';
menuClearAllButton.innerText = 'Clear Storage';
menuClearAllButton.style.margin = '0px 2px';
menuClearAllButton.style.padding = '4px';
menu.appendChild(menuClearAllButton);//button to wipe localStorage of all data from the app.
menuClearAllButton.onclick = (e) => {
    e.preventDefault();
    Object.keys(localStorage).filter(x => x.search(/snakeGame_/) !== -1).forEach(x => localStorage.removeItem(x));
    storageActive = false;
    updateFullGame();
}

const stats = document.createElement('section');
stats.id = 'snakeGameStats';
stats.style.backgroundColor = `lightgray`;
const statsTitle = document.createElement('h2');
statsTitle.innerText = 'Stats';
statsTitle.style.textAlign = 'center';
statsTitle.style.color = 'red';
statsTitle.style.margin = '0';
stats.appendChild(statsTitle);
stats.style.position = 'absolute';
stats.style.top = '8px';
stats.style.display = 'none';
stats.style.border = '2px solid black';
stats.style.borderRadius = '3px';
stats.style.padding = '2px';
const statsList = document.createElement('ul');
statsList.style.margin = '0';
statsList.style.padding = '0';
statsList.style.listStyleType = 'none';
stats.appendChild(statsList);
snakeGame.appendChild(stats);

//1st, filter the localstorage object and look for just snakegame_blank stuff. Then create a list element for each of them, named after them, with their corresponding value. If storage is disabled, display N/A.
    const statsWins = document.createElement('li');
    statsList.appendChild(statsWins);
    const statsDeaths = document.createElement('li');
    statsList.appendChild(statsDeaths);
    const statsSpeed = document.createElement('li');
    statsList.appendChild(statsSpeed);
    const statsGameSize = document.createElement('li');
    statsList.appendChild(statsGameSize);
    const statsTrueGameSize = document.createElement('li');
    statsList.appendChild(statsTrueGameSize);
    const statsLayout = document.createElement('li');
    statsList.appendChild(statsLayout);
    document.querySelectorAll('#snakeGame section ul li').forEach(x => {x.style.borderTop = '1px solid black';x.style.paddingTop = '3px'});
//The updateStats function refreshes the stats values.
    const updateStats = () => {
    statsWins.innerText = `Wins: ${storageActive ? localStorage.getItem('snakeGame_wins') : 'N/A'}`;
    statsDeaths.innerText = `Deaths: ${storageActive ? localStorage.getItem('snakeGame_losses') : 'N/A'}`;
    statsSpeed.innerText = `Speed: ${storageActive ? localStorage.getItem('snakeGame_speed') == 250 ? 'Fast' : 'Normal' : 'N/A'}`;
    statsGameSize.innerText = `Size of game: ${sizeOfGame}px`;
    statsTrueGameSize.innerText = `True size of game: ${document.getElementById('snakeGame').getBoundingClientRect().width}x${document.getElementById('snakeGame').getBoundingClientRect().height}`;
    statsLayout.innerText = `Layout: ${numSquaresPerSide}x${numSquaresPerSide}`;
    menu.style.left = `calc(50% + ${(sizeOfGame+40+numSquaresPerSide)/2}px)`;
    stats.style.right = `calc(50% + ${(sizeOfGame+40+numSquaresPerSide)/2}px)`;
    sizeOption.value = sizeOfGame;
    numSquaresOption.value = numSquaresPerSide;
    fastOption.checked = speed == 250;

}


snakeGame.appendChild(options);
snakeGame.style.boxSizing = 'border-box';
snakeGame.style.padding = '0 10px'
snakeGame.style.border = '2px solid black';
snakeGame.style.boxShadow = '1px 1px 2px 1px';
snakeGame.style.backgroundColor = 'lightgray';

//updateGameMechanics is where most of the actual game logic is stored. It start off setting the middle div of the game to black and initializing the wasd/arrowkey controls.
const updateGameMechanics = () => {
    document.querySelector(`#snakeGame div :nth-child(${Math.floor((numSquaresPerSide**2 +1)/2)})`).style.backgroundColor = 'black';
let lastKeyPressed;
document.onkeydown = (e) => {
    switch(e.key){
        case 'a':
        case 'ArrowLeft':
            lastKeyPressed = -1;
            startGame();
            break;
        case 'w':
        case 'ArrowUp':
            lastKeyPressed = -numSquaresPerSide;
            startGame();
            break;
        case 'd':
        case 'ArrowRight':
            lastKeyPressed = 1;
            startGame();
            break;
        case 's':
        case 'ArrowDown':
            lastKeyPressed = numSquaresPerSide;
            startGame();
            break;
        case 'm':
            menu.style.display == 'none' ? menu.style.display = 'flex' : menu.style.display = 'none';
            break;
        case 'n':
            stats.style.display == 'none' ? stats.style.display = 'block' : stats.style.display = 'none';
            break;
        case ' ':
            ready = false;
            break;
        default:
            break;
    }
};
let lost = true;
let half = false;
//on gameOver it clears the interval, resets the speed modifier, clears the squares, re-initializes the snake and growSquare and refreshes the stats.
let gameOver = () => {
    clearInterval(ongoing);
    ongoing = undefined;
    if (half === true){speed = speed*2;half = false;};
    for(let i = 1; i <= numSquaresPerSide**2;i++){
        document.getElementById(`${i}`).style.backgroundColor = '';
        
    }
    document.getElementById(`${Math.floor((numSquaresPerSide**2 +1)/2)}`).style.backgroundColor = 'black';
    snake = [[Math.floor((numSquaresPerSide**2 +1)/2),[]]];
    updateArrNonSnake();
    growSquare();
    instructions.innerText = `${lost == true ? 'Game Over! wasd or arrow keys to play again.' : 'You won! Play again?'}`;
    lost == true ? localStorage.setItem('snakeGame_losses', Number(localStorage.snakeGame_losses)+1) : localStorage.snakeGame_wins = Number(localStorage.snakeGame_wins) + 1;
    updateStats();
    lost = true;
    
}
//several key variables and mechanics are initialized here. the nonsnake, snake and growsquare are important in deciding if the snake lives, dies, or grows.
let arrayOfNonSnake = [];
let snake = [[Math.floor((numSquaresPerSide**2 +1)/2),[]]];
let updateArrNonSnake = () => {
    const newNonSnake = []
    for (let i = 1; i < (numSquaresPerSide**2 +1); i++){
    document.getElementById(`${i}`).style.backgroundColor == 'black' ? '' : newNonSnake.push(i);
    arrayOfNonSnake = newNonSnake;
}
}
updateArrNonSnake();
let growSquare = () => document.getElementById(`${arrayOfNonSnake[Math.floor(Math.random() * (numSquaresPerSide**2 - snake.length))]}`).style.backgroundColor = 'green';
growSquare();
//updateSquares is the big one. It combines most of the previously established logic to decide what happens next on board.
let updateSquares = () => {
    let addBlock = false;
    let addedBlock = false;
    let shifted;
    let i = 0;
    
    while ( i < snake.length){
    document.getElementById(`${snake[i][0]}`).style.backgroundColor = '';
    snake[i][1].push(lastKeyPressed);
    if(i == 0){
        snake[0][0] % numSquaresPerSide == 1 && lastKeyPressed == -1 ? gameOver() :
        snake[0][0] % numSquaresPerSide == 0 && lastKeyPressed == 1 ? gameOver() :
        snake[0][0] + lastKeyPressed > (numSquaresPerSide**2) ? gameOver() :
        snake[0][0] + lastKeyPressed < 0 ? gameOver() :
        (snake.length == 2 && snake[0][0] + lastKeyPressed == snake[1][0]) ? gameOver() :
        snake.map(block => snake.indexOf(block) == 0 ? 9999: block[0]+block[1][0]).indexOf(snake[0][0] + lastKeyPressed) != -1 ? gameOver() :
        document.getElementById(`${snake[0][0] + lastKeyPressed}`).style.backgroundColor == 'green' ? addBlock = true:
        '';
        
    }
    if (ongoing == undefined){break;}
    snake[i][0]+= snake[i][1][0];
    shifted = snake[i][1].shift();

    
            i++;
}   
    if(addBlock){
                addBlock = false;
                addedBlock = true;
                snake[snake.length] = [snake[snake.length-1][0]-shifted, [shifted, ...snake[snake.length-1][1]]];
            }
    
    for(let i = 0; i < snake.length;i++){
        document.getElementById(`${snake[i][0]}`).style.backgroundColor = 'black';
    }

    if(snake.length == numSquaresPerSide**2){
        lost = false;
        gameOver();
        return;
    }
    
    updateArrNonSnake();
    if (addedBlock){
        growSquare();
        // Check if 'halved' yet or not and if snake is proper length. if both conditions good, undo current currentGame and ongoing and set up a new currentGame() with a halved rate.
        if (snake.length == numSquaresPerSide && half == false){
            clearInterval(ongoing);
            ongoing = undefined;
            speed = speed/2;
            currentGame();
            half = true;
        }
    }
}
let ongoing;
//An interval is set to repeatedly call updateSquares depending on the speed.
let currentGame = () => ongoing = setInterval(updateSquares, speed);
let startGame = () => { 
if(ongoing == undefined){
        currentGame();
    }
}
}
const updateFullGame = () => {
    updateGameSizes();
    updateGameMechanics();
    updateStats();
}
updateFullGame();

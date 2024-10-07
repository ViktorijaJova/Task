import * as PIXI from 'pixi.js';
import BetButton from './components/BetButton'; // Adjust the path as necessary

// Create a new PIXI application
const app = new PIXI.Application({
    width: window.innerWidth, // Set to full window width
    height: window.innerHeight, // Set to full window height
    backgroundColor: 0x1099bb, // Optional: change the background color
});


document.getElementById('app')?.appendChild(app.view as HTMLCanvasElement);

const betAmounts = [5, 10, 20, 50, 100]; // Example bet amounts
const buttonWidth = 200; // Desired button width
const buttonHeight = 50; // Desired button height
const listWidth = 200; // Desired list width
const listHeight = 200; // Desired list height

const betButton = new BetButton({
    bets: betAmounts,
    buttonWidth: buttonWidth,
    buttonHeight: buttonHeight,
    listWidth: listWidth,
    listHeight: listHeight,
});

// Log the created BetButton instance

// Add the BetButton to the application stage
app.stage.addChild(betButton);

// Center the BetButton in the middle of the application
betButton.x = (app.renderer.width - betButton.width) / 2;
betButton.y = (app.renderer.height - betButton.height) / 2;

// Optional: Adjust the BetButton position on window resize
window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    betButton.x = (app.renderer.width - betButton.width) / 2;
    betButton.y = (app.renderer.height - betButton.height) / 2;
});

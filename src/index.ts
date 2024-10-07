import * as PIXI from 'pixi.js';
import SlotMachine from './components/SlotMachine';

const reelConfigs = [
  { symbols: [1, 2, 3, 4, 5], speed: 100 },
  { symbols: [1, 2, 3, 4, 5], speed: 100 },
  { symbols: [1, 2, 3, 4, 5], speed: 100 },
];

// Create a new PIXI application
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
});

// Append the Pixi canvas to the HTML document
document.getElementById('app')?.appendChild(app.view as HTMLCanvasElement);

// Create the SlotMachine instance and pass the PIXI app
const slotMachine = new SlotMachine(reelConfigs, app);

// Create the spin button
const spinButton = document.createElement('button');
spinButton.textContent = 'Spin Reels';
spinButton.style.position = 'absolute';
spinButton.style.top = '20px';
spinButton.style.left = '20px';
document.body.appendChild(spinButton);

// Add click event to the spin button
spinButton.onclick = async () => {
  console.log('Button clicked! Spinning the reels...');
  await slotMachine.spinReels(5000); // Spin for 5 seconds, then stop
};

// Optional: Adjust the button position on window resize
window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

import * as PIXI from 'pixi.js';
import SlotMachine from './components/SlotMachine';

const reelConfigs = [
  { symbols: [1, 2, 3, 4,5], speed: 10 }, // Reduced speed for smoother spinning
  { symbols: [1, 2, 3, 4,5], speed: 10 },
  { symbols: [1, 2, 3, 4,5], speed: 10 },
  { symbols: [1, 2, 3, 4,5], speed: 10 },
];

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x333333,
});

document.getElementById('app')?.appendChild(app.view as HTMLCanvasElement);

const slotMachine = new SlotMachine(reelConfigs, app);

const spinButton = document.createElement('button');
spinButton.textContent = 'Spin the Wheel';
spinButton.style.position = 'absolute';
spinButton.style.top = '70%';
spinButton.style.left = '50%';
spinButton.style.transform = 'translate(-50%, -50%)';
spinButton.style.width = '200px';
spinButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
spinButton.style.background = 'red';
spinButton.style.color = 'white';
spinButton.style.fontWeight = 'bold';
spinButton.style.padding = '12px 24px';
spinButton.style.borderRadius = '50px';
spinButton.style.border = '2px solid #c53030';
spinButton.style.transition = 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
spinButton.style.cursor = 'pointer';
document.body.appendChild(spinButton);

// Trigger the spin
spinButton.onclick = async () => {
  await slotMachine.spinReels(3000); // Spin for 3 seconds
};

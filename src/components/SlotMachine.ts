import * as PIXI from 'pixi.js';
import Reel from './Reel';

interface ReelConfig {
    symbols: number[];
    speed: number;
}

class SlotMachine {
    private reels: Reel[] = [];
    private app: PIXI.Application;

    constructor(reelConfigs: ReelConfig[], app: PIXI.Application) {
        this.app = app;

        const reelSpacing = 20; // Space between reels
        const totalWidth = reelConfigs.length * (120 + reelSpacing) - reelSpacing; // Adjust total width based on the number of reels

        // Calculate starting position to center the slot machine
        const startX = (this.app.renderer.width - totalWidth) / 2;
        const startY = (this.app.renderer.height - 250) / 2; // Adjust this value for vertical centering

        reelConfigs.forEach((config, index) => {
            const reel = new Reel(config.symbols, config.speed);
            this.reels.push(reel);
            // Position each reel in a row
            reel.getGraphics().x = startX + index * (120 + reelSpacing); // Adjust the x position
            reel.getGraphics().y = startY; // Center vertically
            this.app.stage.addChild(reel.getGraphics());
        });
    }

    public async spinReels(duration: number): Promise<void> {
        console.log('Reels are starting to spin...');
        const spinPromises = this.reels.map((reel) => reel.startSpin());

        // Stop the reels after the specified duration
        setTimeout(() => {
            console.log('Time to stop the reels after specified duration...');
            this.stopReelsOnRandomSymbol();
        }, duration);

        // Ensure the function waits for the reels to stop before resolving
        await Promise.all(spinPromises);
    }

    private stopReelsOnRandomSymbol(): void {
        console.log('Stopping all reels on random symbols...');
        const visibleSymbols: number[][] = []; // Ensure this is a 2D array

        this.reels.forEach((reel, index) => {
            setTimeout(() => {
                console.log(`Stopping reel ${index + 1}...`);
                reel.stopSpinOnRandomSymbol(); // Stop each reel on a random symbol
                visibleSymbols.push(reel.getCurrentVisibleSymbols()); // Collect the visible symbols
            }, index * 300); // Reduced delay to 300 milliseconds between reels
        });

        // Check for a win condition after all reels have stopped
        setTimeout(() => {
            if (this.checkWinCondition(visibleSymbols)) {
            } else {
            }
        }, this.reels.length * 300 + 100);
        setTimeout(() => {
          if (this.checkWinCondition(visibleSymbols)) {
              this.displayVictoryScreen(); // Display the victory screen
          } else {
              console.log('No win this time!');
          }
      }, this.reels.length * 300 + 100); // Wait until all reels have stopped // Wait until all reels have stopped
    }

    private checkWinCondition(visibleSymbols: number[][]): boolean {
      console.log("Visible Symbols:", visibleSymbols); // Log visible symbols for debugging
  
      // Check for winning condition in each column
      for (let colIndex = 0; colIndex < visibleSymbols[0].length; colIndex++) {
          const columnSymbols = visibleSymbols.map(row => row[colIndex]); // Get symbols for the current column
  
          // Check if all symbols in this column are the same
          const isWinningColumn = new Set(columnSymbols).size === 1;
  
          if (isWinningColumn) {
              console.log(`Win detected in column ${colIndex + 1}: ${columnSymbols}`); // Log winning column
              return true; // Win condition met
          }
      }
  
      return false; // No win condition met
  }
  private displayVictoryScreen(): void {
    const victoryBanner = new PIXI.Text('You Won!', {
        fontFamily: 'Arial',
        fontSize: 64,
        fill: '#ffffff', // White color
        stroke: '#ffd700', // Gold border
        strokeThickness: 5,
        align: 'center',
    });

    // Center the banner on the screen
    victoryBanner.x = (this.app.renderer.width - victoryBanner.width) / 2;
    victoryBanner.y = (this.app.renderer.height - victoryBanner.height) / 2;

    // Add banner to the stage
    this.app.stage.addChild(victoryBanner);

    // Optional: animate the banner (fade out)
    const fadeOut = () => {
        victoryBanner.alpha -= 0.01;
        if (victoryBanner.alpha > 0) {
            requestAnimationFrame(fadeOut);
        } else {
            this.app.stage.removeChild(victoryBanner); // Remove the banner after fading out
            this.resetReels(); // Reset the reels after fading out the banner
        }
    };
    fadeOut(); // Start fade-out animation
}

// Method to reset all reels
private resetReels(): void {
    this.reels.forEach(reel => {
        reel.reset(); // Call the reset method on each reel
    });
}


  
  
  
}

export default SlotMachine;

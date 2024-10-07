import * as PIXI from 'pixi.js';

interface ReelConfig {
  symbols: number[];
  speed: number;
}

class Reel {
  private symbols: number[];
  private speed: number;
  private currentIndex: number = 0;
  private spinning: boolean = false;
  private container: PIXI.Container;

  constructor(symbols: number[], speed: number) {
    this.symbols = symbols;
    this.speed = speed;
    this.container = new PIXI.Container();
    this.draw(); // Initial drawing
  }

  public startSpin(): Promise<void> {
    this.spinning = true;
    console.log('Reel started spinning:', this.symbols);

    return new Promise((resolve) => {
      const spin = () => {
        if (this.spinning) {
          this.currentIndex = (this.currentIndex + 1) % this.symbols.length;
          this.draw();
          setTimeout(spin, this.speed); // Spin again after the given speed
        } else {
          console.log('Reel stopped spinning at index:', this.currentIndex);
          resolve(); // Exit the promise loop when stopped
        }
      };
      spin(); // Begin spinning
    });
  }

  public stopSpinOnRandomSymbol(): void {
    console.log('Stopping reel on random symbol...');
    this.spinning = false; // Stop the spinning loop
    this.currentIndex = Math.floor(Math.random() * this.symbols.length); // Random stop
    this.draw(); // Redraw with the final stopped symbol
  }

  private draw(): void {
    this.container.removeChildren(); // Clear previous symbols

    // Display 3 symbols at a time in a vertical layout
    for (let i = 0; i < 3; i++) {
      const symbolIndex = (this.currentIndex + i) % this.symbols.length;
      const symbol = this.symbols[symbolIndex];

      const symbolText = new PIXI.Text(symbol.toString(), {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 0xffffff,
      });

      // Position the symbol vertically within the column
      symbolText.y = i * 50; // Space the symbols vertically
      this.container.addChild(symbolText);
    }
  }

  public getGraphics(): PIXI.Container {
    return this.container;
  }
}

class SlotMachine {
  private reels: Reel[] = [];
  private app: PIXI.Application;

  constructor(reelConfigs: ReelConfig[], app: PIXI.Application) {
    this.app = app;

    reelConfigs.forEach((config, index) => {
      const reel = new Reel(config.symbols, config.speed);
      this.reels.push(reel);
      // Position each reel as a column
      reel.getGraphics().x = index * 120;
      this.app.stage.addChild(reel.getGraphics());
    });
  }

  public async spinReels(duration: number): Promise<void> {
    console.log('Reels are starting to spin...');
    const spinPromises = this.reels.map((reel) => reel.startSpin());
    await Promise.all(spinPromises);

    // Stop the reels after the specified duration
    setTimeout(() => {
      console.log('Time to stop the reels after 5 seconds...');
      this.stopReelsOnRandomSymbol();
    }, duration);
  }

  private stopReelsOnRandomSymbol(): void {
    console.log('Stopping all reels on random symbols...');
    this.reels.forEach((reel, index) => {
      setTimeout(() => {
        console.log(`Stopping reel ${index + 1}...`);
        reel.stopSpinOnRandomSymbol(); // Stop each reel on a random symbol
      }, index * 1000); // Stagger the stop for each reel by 1 second
    });
  }
}

export default SlotMachine;

import * as PIXI from 'pixi.js';

class Reel {
    private symbols: number[];
    private speed: number;
    private spinning: boolean = false;
    private container: PIXI.Container;
    private symbolsContainer: PIXI.Container;
    private background: PIXI.Graphics;
    private symbolHeight: number = 60;
    private visibleSymbolsCount: number = 3;
    private currentIndex: number = 0;
    private offsetY: number = 40;
    private spinCount: number = 0;

    constructor(symbols: number[], speed: number) {
        this.symbols = symbols;
        this.speed = speed;

        this.container = new PIXI.Container();
        this.symbolsContainer = new PIXI.Container();

        this.background = new PIXI.Graphics();
        this.drawBackground();
        this.container.addChild(this.background);
        this.container.addChild(this.symbolsContainer);

        this.container.x = 50;
        this.container.y = 50;

        this.drawSymbols();
    }

    private drawBackground(): void {
        const borderColor = 0xFFD700;
        const backgroundColor = 0x333333;

        this.background.beginFill(backgroundColor);
        this.background.lineStyle(4, borderColor);
        this.background.drawRoundedRect(0, 0, 120, (this.visibleSymbolsCount * this.symbolHeight) + (this.offsetY * 2), 10);
        this.background.endFill();
    }

    public startSpin(): Promise<void> {
      this.spinning = true;
  
      // Add blur filter during spin
      this.symbolsContainer.filters = [new PIXI.filters.BlurFilter(5)]; // Adjust blur strength
  
      return new Promise((resolve) => {
          const spin = () => {
              if (this.spinning) {
                  this.symbolsContainer.y += this.speed;
  
                  if (this.symbolsContainer.y >= this.symbolHeight) {
                      this.symbolsContainer.y -= this.symbolHeight;
                      this.currentIndex = (this.currentIndex + 1) % this.symbols.length;
                  }
  
                  requestAnimationFrame(spin);
              } else {
                  this.symbolsContainer.filters = null; // Remove blur when stopping
                  this.symbolsContainer.y = 0; // Align symbols
                  resolve();
              }
          };
          spin();
      });
  }
  

    public stopSpinOnRandomSymbol(): void {
        this.spinning = false;
        this.spinCount++;

        const newVisibleSymbols = this.getRandomVisibleSymbols();
        for (let i = 0; i < this.visibleSymbolsCount; i++) {
            this.symbols[i] = newVisibleSymbols[i];
        }

        this.drawSymbols();
    }

    private getRandomVisibleSymbols(): number[] {
        const randomSymbols: number[] = [];
        for (let i = 0; i < this.visibleSymbolsCount; i++) {
            const randomIndex = Math.floor(Math.random() * this.symbols.length);
            randomSymbols.push(this.symbols[randomIndex]);
        }
        return randomSymbols;
    }

    private drawSymbols(): void {
        this.symbolsContainer.removeChildren();

        const colors: { [key: number]: string } = {
            1: '#f56565',
            2: '#ecc94b',
            3: '#d53f8c',
            4: '#3182ce',
            5: '#00ff00',
        };

        for (let i = 0; i < this.visibleSymbolsCount; i++) {
            const symbol = this.symbols[i];
            const symbolText = new PIXI.Text(symbol.toString(), {
                fontFamily: 'Arial',
                fontSize: 36,
                fill: colors[symbol],
                stroke: '#000000',
                strokeThickness: 3,
            });

            symbolText.y = i * this.symbolHeight + this.offsetY;
            symbolText.anchor.set(0.5, 0.5);
            symbolText.x = 60;

            this.symbolsContainer.addChild(symbolText);
        }

        const visibleSymbols = this.getCurrentVisibleSymbols();
        const isWinningCombination = new Set(visibleSymbols).size === 1;

        if (isWinningCombination) {
            this.symbolsContainer.children.forEach((child) => {
                const symbolText = child as PIXI.Text; 
                this.animateWinningSymbol(symbolText);
            });
        }
    }

    public getGraphics(): PIXI.Container {
        return this.container;
    }

    public getCurrentVisibleSymbols(): number[] {
        return this.symbols.slice(0, this.visibleSymbolsCount);
    }

    public reset(): void {
        this.currentIndex = 0; // Reset to the starting index
        this.symbols = this.getRandomVisibleSymbols(); // Set to random visible symbols
        this.drawSymbols(); // Redraw the symbols
    }

    private animateWinningSymbol(symbolText: PIXI.Text): void {
        const originalScale = symbolText.scale.x;
        const targetScale = 1.5; 
        const duration = 500; 

        const animate = (elapsed: number) => {
            const progress = Math.min(elapsed / duration, 1);
            const scale = originalScale + (targetScale - originalScale) * progress;

            if (progress < 1) {
                requestAnimationFrame(() => animate(elapsed + 16));
            } else {
                const reverseAnimate = (reverseElapsed: number) => {
                    const reverseProgress = Math.min(reverseElapsed / duration, 1);
                    const reverseScale = targetScale - (targetScale - originalScale) * reverseProgress;

                    if (reverseProgress < 1) {
                        requestAnimationFrame(() => reverseAnimate(reverseElapsed + 16));
                    }
                };
                reverseAnimate(0);
            }
        };
        requestAnimationFrame(() => animate(0));
    }

}

export default Reel;

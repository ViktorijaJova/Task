import * as PIXI from 'pixi.js';

interface ReelConfig {
  symbols: number[];
}

class Reel {
  private symbols: number[];
  private graphics: PIXI.Graphics;

  constructor(symbols: number[]) {
    this.symbols = symbols;
    this.graphics = new PIXI.Graphics();
    this.draw(); // Draw the initial state of the reel
  }

  private draw(): void {
    this.graphics.clear(); // Clear previous drawings
    const symbolHeight = 100; // Height for each symbol rectangle

    // Draw each symbol in the reel
    this.symbols.forEach((symbol, index) => {
      // Draw the symbol rectangle
      this.graphics.beginFill(0xffffff);
      this.graphics.drawRect(0, index * symbolHeight, 100, symbolHeight); // Draw a rectangle for the symbol
      this.graphics.endFill();

      // Optionally draw the symbol number inside the rectangle
      const text = new PIXI.Text(symbol.toString(), {
        fontSize: 24,
        fill: 0x000000,
        align: 'center',
      });
      text.x = 10; // Adjust the x position of the text
      text.y = index * symbolHeight + 35; // Center the text vertically in the rectangle
      this.graphics.addChild(text); // Add the text to the graphics
    });
  }

  public getGraphics(): PIXI.Graphics {
    return this.graphics;
  }
}

export default Reel;

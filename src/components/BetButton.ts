import * as PIXI from "pixi.js";

interface BetButtonProps {
  bets: number[]; 
  buttonWidth: number; 
  buttonHeight: number; 
  listWidth: number; 
  listHeight: number; 
}

 export default class BetButton extends PIXI.Container {
  private betText: PIXI.Text; 
  public currentBet: number; 
  private bets: number[]; 
  private betList!: PIXI.Container; 
  private listVisible: boolean; 

  constructor(props: BetButtonProps) {
    super();
    this.bets = props.bets;
    this.currentBet = this.bets[0]; 
    this.listVisible = false;

    const background = new PIXI.Graphics();
    background.beginFill(0x3b82f6); 
    background.lineStyle(2, 0x000000, 1); 
    background.drawRoundedRect(0, 0, props.buttonWidth, props.buttonHeight, 20); 
    background.endFill();
    this.addChild(background);
    
    const glowFilter = new PIXI.filters.BlurFilter();
    glowFilter.blur = 5; 
    background.filters = [glowFilter];

    this.betText = new PIXI.Text(`Bet: $${this.currentBet}`, {
      fill: "#ffffff",
      fontSize: this.calculateFontSize(props.buttonWidth), 
      fontWeight: "bold", 
      fontFamily: "Arial", 
    });

    this.betText.x = (props.buttonWidth - this.betText.width) / 2;
    this.betText.y = (props.buttonHeight - this.betText.height) / 2;
    this.addChild(this.betText);
    this.createAdjustmentButtons(props);
    this.createBetList(props);
    this.position.set(props.buttonWidth / 2, props.buttonHeight / 2);
    this.interactive = true;
    this.on("pointerdown", (event) => {
      event.stopPropagation(); 
      this.toggleBetList();
    });

    document.addEventListener("click", this.onDocumentClick.bind(this));
  }

  private calculateFontSize(availableWidth: number): number {
    const baseFontSize = 24; 
    const text = `Bet: $${this.currentBet}`;
    let fontSize = baseFontSize;

    const testText = new PIXI.Text(text, {
      fontSize: fontSize,
      fontWeight: "bold",
      fontFamily: "Arial",
    });

    while (testText.width > availableWidth && fontSize > 10) {
      fontSize -= 1; 
      testText.style.fontSize = fontSize;
    }

    return fontSize;
  }

  public getCurrentBet() {
    return this.currentBet;
  }

  public isListVisible() {
    return this.listVisible;
  }

  private onDocumentClick(event: MouseEvent) {
    const mouseX = event.clientX; 
    const mouseY = event.clientY; 
    const isInsideButton = this.getBounds().contains(mouseX, mouseY);

    if (!isInsideButton) {
      this.closeBetList();
    }
  }

  private closeBetList() {
    this.listVisible = false; 
    this.betList.visible = false; 
  }

  private createAdjustmentButtons(props: BetButtonProps) {
    const buttonContainer = new PIXI.Container();

    const minusButton = new PIXI.Text("-", {
      fill: "#ffffff",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Arial",
    });
    minusButton.x = 10; 
    minusButton.y = (props.buttonHeight - minusButton.height) / 2;
    minusButton.interactive = true;
    minusButton.on("pointerdown", (event) => {
      event.stopPropagation(); 
      this.decreaseBet();
    });
    buttonContainer.addChild(minusButton);

    const plusButton = new PIXI.Text("+", {
      fill: "#ffffff",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Arial",
    });
    plusButton.x = props.buttonWidth - plusButton.width - 10; 
    plusButton.y = (props.buttonHeight - plusButton.height) / 2;
    plusButton.interactive = true; 
    plusButton.on("pointerdown", (event) => {
      event.stopPropagation(); 
      this.increaseBet();
    });
    buttonContainer.addChild(plusButton);

    buttonContainer.y = 0; 
    this.addChild(buttonContainer);
  }

  private createBetList(props: BetButtonProps) {
    this.betList = new PIXI.Container();
    this.betList.visible = false; 

    const listBackground = new PIXI.Graphics();
    listBackground.beginFill(0x3b82f6); 
    listBackground.drawRoundedRect(0, 0, props.listWidth, props.listHeight, 10); 
    listBackground.endFill();
    this.betList.addChild(listBackground);

    const itemHeight = 30;
    const paddingLeft = 10; 
    this.bets.forEach((bet, index) => {
      const betItem = new PIXI.Text(`Bet: $${bet}`, {
        fill: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Arial",
      });
      betItem.y = index * itemHeight;
      betItem.x = paddingLeft; 
      betItem.interactive = true;

      betItem.on("pointerdown", (event) => {
        event.stopPropagation();
        this.selectBet(bet, betItem);
      });
      this.betList.addChild(betItem);
    });

    this.betList.y = props.buttonHeight + 5;
    this.addChild(this.betList);
  }

  private toggleBetList() {
    this.listVisible = !this.listVisible;
    this.betList.visible = this.listVisible;
  }

  private selectBet(bet: number, betItem: PIXI.Text) {
    this.currentBet = bet;
    this.betText.text = `Bet: $${this.currentBet}`;
    this.betText.style.fontSize = this.calculateFontSize(200); 
    this.betText.x = (this.width - this.betText.width) / 2; 

    this.betList.children.forEach((item) => {
      if (item instanceof PIXI.Text) {
        item.style.fill = "#ADD8E6";
      }
    });
    betItem.style.fill = "#ffffff"; 
    this.listVisible = false;
    this.betList.visible = false;
  }

  public increaseBet() {
    const currentIndex = this.bets.indexOf(this.currentBet);
    if (currentIndex < this.bets.length - 1) {
      this.currentBet = this.bets[currentIndex + 1];
      this.betText.text = `Bet: $${this.currentBet}`;
      this.betText.style.fontSize = this.calculateFontSize(200); 
      this.betText.x = (this.width - this.betText.width) / 2; 
    }
  }

  public decreaseBet() {
    const currentIndex = this.bets.indexOf(this.currentBet);
    if (currentIndex > 0) {
      this.currentBet = this.bets[currentIndex - 1];
      this.betText.text = `Bet: $${this.currentBet}`;
      this.betText.style.fontSize = this.calculateFontSize(200); 
      this.betText.x = (this.width - this.betText.width) / 2; 
    }
  }
}

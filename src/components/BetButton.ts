import * as PIXI from "pixi.js";

// Define the BetButtonProps interface
interface BetButtonProps {
  bets: number[]; // Array of bet amounts
  buttonWidth: number; // Width of the button
  buttonHeight: number; // Height of the button
  listWidth: number; // Width of the list
  listHeight: number; // Height of the list
}

 export default class BetButton extends PIXI.Container {
  private betText: PIXI.Text; // Text to display the current bet
  public currentBet: number; // Current bet amount
  private bets: number[]; // Available bets
  private betList!: PIXI.Container; // Container for bet list
  private listVisible: boolean; // Track visibility of the bet list

  constructor(props: BetButtonProps) {
    super();
    this.bets = props.bets;
    this.currentBet = this.bets[0]; // Set initial bet to the first one
    this.listVisible = false; // Initially, the list is hidden

    // Create a stylized background for the button using Tailwind blue color
    const background = new PIXI.Graphics();
    background.beginFill(0x3b82f6); // Tailwind blue-500
    background.lineStyle(2, 0x000000, 1); // Black border
    background.drawRoundedRect(0, 0, props.buttonWidth, props.buttonHeight, 20); // Rounded corners with increased radius
    background.endFill();
    this.addChild(background);
    
    // Add a glow effect (shadow)
    const glowFilter = new PIXI.filters.BlurFilter();
    glowFilter.blur = 5; // Set the blur amount
    background.filters = [glowFilter]; // Apply the glow effect

    // Create the bet text with adjustable font size
    this.betText = new PIXI.Text(`Bet: $${this.currentBet}`, {
      fill: "#ffffff",
      fontSize: this.calculateFontSize(props.buttonWidth), // Dynamically calculate font size
      fontWeight: "bold", // Make text bold
      fontFamily: "Arial", // Change font family as needed
    });

    // Center the text in the button
    this.betText.x = (props.buttonWidth - this.betText.width) / 2;
    this.betText.y = (props.buttonHeight - this.betText.height) / 2;

    // Add the text to the button
    this.addChild(this.betText);

    // Create plus and minus buttons
    this.createAdjustmentButtons(props);

    // Create the bet list
    this.createBetList(props);

    // Center the button in the parent container
    this.position.set(props.buttonWidth / 2, props.buttonHeight / 2);

    // Add event listener to toggle bet list visibility
    this.interactive = true;
    this.on("pointerdown", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up
      this.toggleBetList();
    });

    // Add a click listener to the document to close the dropdown when clicking outside
    document.addEventListener("click", this.onDocumentClick.bind(this));
  }

  // Calculate the font size dynamically based on available width
  private calculateFontSize(availableWidth: number): number {
    const baseFontSize = 24; // Base font size
    const text = `Bet: $${this.currentBet}`;
    let fontSize = baseFontSize;

    const testText = new PIXI.Text(text, {
      fontSize: fontSize,
      fontWeight: "bold",
      fontFamily: "Arial",
    });

    // Decrease font size until it fits within the available width
    while (testText.width > availableWidth && fontSize > 10) {
      fontSize -= 1; // Decrease font size
      testText.style.fontSize = fontSize;
    }

    return fontSize;
  }

  // Getter for currentBet for testability
  public getCurrentBet() {
    return this.currentBet;
  }

  // Getter for bet list visibility
  public isListVisible() {
    return this.listVisible;
  }

  private onDocumentClick(event: MouseEvent) {
    const mouseX = event.clientX; // Get mouse X position
    const mouseY = event.clientY; // Get mouse Y position

    const isInsideButton = this.getBounds().contains(mouseX, mouseY);

    if (!isInsideButton) {
      this.closeBetList();
    }
  }

  private closeBetList() {
    this.listVisible = false; // Update visibility state
    this.betList.visible = false; // Hide the dropdown
  }

  private createAdjustmentButtons(props: BetButtonProps) {
    const buttonContainer = new PIXI.Container();

    const minusButton = new PIXI.Text("-", {
      fill: "#ffffff",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Arial",
    });
    minusButton.x = 10; // Position on the left
    minusButton.y = (props.buttonHeight - minusButton.height) / 2;
    minusButton.interactive = true; // Set interaction
    minusButton.on("pointerdown", (event) => {
      event.stopPropagation(); // Prevent opening the dropdown
      this.decreaseBet();
    });
    buttonContainer.addChild(minusButton);

    const plusButton = new PIXI.Text("+", {
      fill: "#ffffff",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Arial",
    });
    plusButton.x = props.buttonWidth - plusButton.width - 10; // Position on the right
    plusButton.y = (props.buttonHeight - plusButton.height) / 2;
    plusButton.interactive = true; // Set interaction
    plusButton.on("pointerdown", (event) => {
      event.stopPropagation(); // Prevent opening the dropdown
      this.increaseBet();
    });
    buttonContainer.addChild(plusButton);

    buttonContainer.y = 0; // Align vertically
    this.addChild(buttonContainer);
  }

  private createBetList(props: BetButtonProps) {
    this.betList = new PIXI.Container();
    this.betList.visible = false; // Start hidden

    const listBackground = new PIXI.Graphics();
    listBackground.beginFill(0x3b82f6); // Tailwind blue-500 for the list background
    listBackground.drawRoundedRect(0, 0, props.listWidth, props.listHeight, 10); // Rounded corners
    listBackground.endFill();
    this.betList.addChild(listBackground);

    const itemHeight = 30;
    const paddingLeft = 10; // Padding for the bet items
    this.bets.forEach((bet, index) => {
      const betItem = new PIXI.Text(`Bet: $${bet}`, {
        fill: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Arial",
      });
      betItem.y = index * itemHeight;
      betItem.x = paddingLeft; // Set padding from the left
      betItem.interactive = true;

      betItem.on("pointerdown", (event) => {
        event.stopPropagation();
        this.selectBet(bet, betItem);
      });
      this.betList.addChild(betItem);
    });

    this.betList.y = props.buttonHeight + 5; // Position below the button
    this.addChild(this.betList);
  }

  private toggleBetList() {
    this.listVisible = !this.listVisible;
    this.betList.visible = this.listVisible;
  }

  private selectBet(bet: number, betItem: PIXI.Text) {
    this.currentBet = bet;
    this.betText.text = `Bet: $${this.currentBet}`;
    this.betText.style.fontSize = this.calculateFontSize(200); // Recalculate font size based on width
    this.betText.x = (this.width - this.betText.width) / 2; // Center text after font size change

    this.betList.children.forEach((item) => {
      if (item instanceof PIXI.Text) {
        item.style.fill = "#ADD8E6"; // Change unselected items color
      }
    });
    betItem.style.fill = "#ffffff"; // Highlight the selected item
    this.listVisible = false;
    this.betList.visible = false;
  }

  public increaseBet() {
    const currentIndex = this.bets.indexOf(this.currentBet);
    if (currentIndex < this.bets.length - 1) {
      this.currentBet = this.bets[currentIndex + 1];
      this.betText.text = `Bet: $${this.currentBet}`;
      this.betText.style.fontSize = this.calculateFontSize(200); // Recalculate font size
      this.betText.x = (this.width - this.betText.width) / 2; // Center text after font size change
    }
  }

  public decreaseBet() {
    const currentIndex = this.bets.indexOf(this.currentBet);
    if (currentIndex > 0) {
      this.currentBet = this.bets[currentIndex - 1];
      this.betText.text = `Bet: $${this.currentBet}`;
      this.betText.style.fontSize = this.calculateFontSize(200); // Recalculate font size
      this.betText.x = (this.width - this.betText.width) / 2; // Center text after font size change
    }
  }
}

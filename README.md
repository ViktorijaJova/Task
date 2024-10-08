Bet Button Component
This project contains a Bet Button component built using PIXI.js, designed for creating interactive and visually appealing user interfaces in web applications. The component allows users to select different bet amounts and provides a dropdown to choose from available bets.

Overview of reel.ts and slotmachine.ts
reel.ts
The reel.ts file defines the Reel class, which is responsible for managing the individual reels of the slot machine. Key functionalities include:

Symbol Management: Each reel randomly displays symbols, ensuring no symbol appears consecutively.
Spin Logic: Handles the logic for spinning the reel and stopping at random positions.
Rendering: Manages the visual representation of the symbols on the reel.
slotmachine.ts
The slotmachine.ts file contains the SlotMachine class, which encapsulates the entire slot machine's logic and state. Key responsibilities include:

Game State Management: Maintains the current state of the game, including bet amounts and win conditions.
Reel Coordination: Interacts with multiple Reel instances to spin them simultaneously and determine the outcome of each spin.
Victory Screen Handling: Manages the display of victory screens and updates based on the results of spins.

Getting Started
Follow the steps below to set up and run the project locally.

Prerequisites
Make sure you have Node.js installed on your machine. You can verify this by running:

bash
Copy code
node -v
npm -v
Technologies Used
TypeScript: A superset of JavaScript that compiles to plain JavaScript, providing optional static typing.
Webpack: A module bundler that helps in packaging your code and assets for deployment.
PIXI.js: A powerful 2D rendering engine that makes it easy to create interactive graphics in web applications.
Installing Packages
Install the necessary packages:

bash
Copy code
npm install
Running the Project
To start the project, run the following command:

bash
Copy code
npm run start
The development server will start, and you can view the Bet Button component in your browser at http://localhost:9000.


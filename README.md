# Merge Fruit Game

## Overview
Merge Fruit Game is a fun and interactive game where you merge identical fruits to create bigger ones! Click on an empty cell to place the next fruit. When two identical fruits are adjacent, they merge into the next tier fruit. The game continues until the grid is full.

## Features
- Simple, intuitive gameplay
- Smooth animations for fruit falling and merging
- Dynamic grid updates and merging visuals
- Score tracking

## Setup Instructions
To set up and run the game locally, follow these steps:
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Marc1190/MergeFruit.git
   cd MergeFruit
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Open the `index.html` file in your web browser to play the game.

### Requirements
- Ensure you have **Node.js** installed on your machine for running tests and managing dependencies. You can download it [here](https://nodejs.org/).

## Testing
To run the tests for the game:
1. Install the dependencies if not already installed:
   ```bash
   npm install
   ```
   
2. Run the tests using:
   ```bash
   npm test
   ```
   This will execute all unit tests for the game, including logic for fruit merging, gravity application, and score calculation.

## Files
- `index.html`: The main HTML structure of the game.
- `style.css`: Contains the styles and animations for the game.
- `script.js`: Contains the game logic, including fruit placement, gravity, and merging.

## How to Play
1. Launch the game by opening `index.html` in your web browser.
2. Click on an empty cell to place the next fruit.
3. Watch as identical fruits merge to create bigger fruits.
4. The game ends when the grid is full and no more moves are possible.
5. Your score is continuously updated based on successful merges.

## Dependencies
The game requires **Node.js** for running tests and managing dependencies. It uses **Jest** for testing the game logic. Run `npm install` to install all necessary dependencies.

## Contribution
Feel free to fork the repository and submit pull requests. We welcome contributions that improve the gameplay, add features, or fix bugs.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
Special thanks to the contributors and players who provided feedback for improving the game.

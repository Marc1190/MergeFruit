// Constants and variables
const fruits = ['cherry', 'strawberry', 'grape', 'orange', 'apple', 'pear', 'pineapple'];
const boardSize = 7; // Grid size
let gameBoard = [];
let score = 0;
let nextFruit = randomFruit();

// Initialize the game
document.addEventListener("DOMContentLoaded", initGame);

function initGame() {
  gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
  score = 0;
  updateScoreDisplay();
  createBoard();
  displayNextFruit();
}

function createBoard() {
  const boardElement = document.getElementById('game-board');
  boardElement.innerHTML = '';

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', () => handleCellClick(row, col));
      boardElement.appendChild(cell);
    }
  }
}

function handleCellClick(row, col) {
  if (gameBoard[row][col]) return;

  placeFruit(row, col);
  applyGravity(() => {
    mergeFruits(checkIfGameOver);
  });
}

function placeFruit(row, col) {
  const fruit = nextFruit;
  nextFruit = randomFruit();
  gameBoard[row][col] = fruit;
  updateCell(row, col, fruit, true);
  displayNextFruit();
}

function updateCell(row, col, fruit, animate = false) {
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  cell.className = fruit ? `grid-cell fruit ${fruit}` : 'grid-cell';
  if (animate) cell.classList.add('fall');
}

function displayNextFruit() {
  const nextFruitElement = document.getElementById('next-fruit');
  nextFruitElement.className = '';
  nextFruitElement.classList.add(nextFruit);
}

function applyGravity(callback) {
  for (let col = 0; col < boardSize; col++) {
    let emptyRow = boardSize - 1;
    for (let row = boardSize - 1; row >= 0; row--) {
      if (gameBoard[row][col]) {
        gameBoard[emptyRow][col] = gameBoard[row][col];
        if (row !== emptyRow) {
          updateCell(emptyRow, col, gameBoard[emptyRow][col], true);
          gameBoard[row][col] = null;
          updateCell(row, col, null);
        }
        emptyRow--;
      }
    }
    while (emptyRow >= 0) {
      gameBoard[emptyRow--][col] = null; // Clear remaining cells
    }
  }
  setTimeout(callback, 300);
}

function mergeFruits(callback) {
  let merged = false;
  for (let row = boardSize - 1; row >= 0; row--) {
    for (let col = 0; col < boardSize; col++) {
      if (gameBoard[row][col]) {
        const currentFruit = gameBoard[row][col];

        // Merge with right
        if (col < boardSize - 1 && gameBoard[row][col + 1] === currentFruit) {
          mergeFruit(row, col, row, col + 1, () => applyGravity(checkIfGameOver));
          merged = true;
        }

        // Merge with down
        if (row < boardSize - 1 && gameBoard[row + 1][col] === currentFruit) {
          mergeFruit(row, col, row + 1, col, () => applyGravity(checkIfGameOver));
          merged = true;
        }
      }
    }
  }

  if (merged) {
    setTimeout(() => {
      applyGravity(() => mergeFruits(callback));
    }, 300);
  } else {
    callback();
  }
}

function mergeFruit(row1, col1, row2, col2, postMergeCallback) {
  const newFruitIndex = fruits.indexOf(gameBoard[row2][col2]) + 1;
  if (newFruitIndex < fruits.length) {
    const newFruit = fruits[newFruitIndex];
    gameBoard[row2][col2] = newFruit; // Update merging fruit
    updateCell(row2, col2, newFruit, true); // Visual update
    setTimeout(() => {
      gameBoard[row1][col1] = null; // Clear the merged cell
      updateCell(row1, col1, null);
      score += (newFruitIndex + 1) * 10;
      updateScoreDisplay();
      if (postMergeCallback) {
        postMergeCallback();
      }
    }, 500); // Ensure the delay matches transition duration
  }
}

function checkIfGameOver() {
  if (isGameOver()) {
    setTimeout(() => alert(`Game Over! Your score: ${score}`), 500);
  }
}

function randomFruit() {
  const possibleFruits = ['grape', 'cherry', 'strawberry', 'orange'];
  return possibleFruits[Math.floor(Math.random() * possibleFruits.length)];
}

function updateScoreDisplay() {
  document.getElementById('score').innerText = score;
}

function isGameOver() {
  return gameBoard.flat().every(cell => cell !== null);
}

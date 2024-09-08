class MergeGame {
  constructor(boardSize = 7, randomFruitPool = 4) {
    this.fruits = ['cherry', 'strawberry', 'grape', 'orange', 'apple', 'pear', 'pineapple'];
    this.boardSize = boardSize;
    this.randomFruitPool = randomFruitPool;
    this.gameBoard = [];
    this.score = 0;
    this.nextFruit = this.randomFruit();

    if (typeof document !== 'undefined') {
      document.addEventListener("DOMContentLoaded", () => this.initGame());
    }
  }

  initGame() {
    this.gameBoard = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(null));
    this.score = 0;
    this.updateScoreDisplay();
    this.createBoard();
    this.displayNextFruit();
  }

  createBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', () => this.handleCellClick(row, col));
        boardElement.appendChild(cell);
      }
    }
  }

  handleCellClick(row, col) {
    if (this.gameBoard[row][col]) return;

    this.placeFruit(row, col);
    this.applyGravity(() => {
      this.mergeFruits(() => this.checkIfGameOver());
    });
  }

  placeFruit(row, col) {
    const fruit = this.nextFruit;
    this.nextFruit = this.randomFruit();
    this.gameBoard[row][col] = fruit;
    this.updateCell(row, col, fruit, true);
    this.displayNextFruit();
  }

  updateCell(row, col, fruit, animate = false) {
    if (typeof document !== 'undefined') {
      const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      cell.className = fruit ? `grid-cell fruit ${fruit}` : 'grid-cell';
      if (animate) cell.classList.add('fall');
    }
  }

  displayNextFruit() {
    if (typeof document !== 'undefined') {
      const nextFruitElement = document.getElementById('next-fruit');
      nextFruitElement.className = '';
      nextFruitElement.classList.add(this.nextFruit);
    }
  }

  applyGravity(callback) {
    for (let col = 0; col < this.boardSize; col++) {
      let emptyRow = this.boardSize - 1;
      for (let row = this.boardSize - 1; row >= 0; row--) {
        if (this.gameBoard[row][col]) {
          this.gameBoard[emptyRow][col] = this.gameBoard[row][col];
          if (row !== emptyRow) {
            this.updateCell(emptyRow, col, this.gameBoard[emptyRow][col], true);
            this.gameBoard[row][col] = null;
            this.updateCell(row, col, null);
          }
          emptyRow--;
        }
      }
      while (emptyRow >= 0) {
        this.gameBoard[emptyRow--][col] = null;
      }
    }
    if (typeof setTimeout !== 'undefined') {
      setTimeout(callback, 300);
    } else {
      callback();
    }
  }

  mergeFruits(callback) {
    let merged = false;
    for (let row = this.boardSize - 1; row >= 0; row--) {
      for (let col = 0; col < this.boardSize; col++) {
        if (this.gameBoard[row][col]) {
          const currentFruit = this.gameBoard[row][col].trim().toLowerCase(); // Ensure consistent format

          // Merge with right
          if (col < this.boardSize - 1 && this.gameBoard[row][col + 1] && 
              this.gameBoard[row][col + 1].trim().toLowerCase() === currentFruit) {
            this.mergeFruit(row, col, row, col + 1);
            merged = true;
            continue;  // Skip downward merge if right merge happens
          }

          // Merge with down (only if no rightward merge occurred)
          if (row < this.boardSize - 1 && this.gameBoard[row + 1][col] &&
              this.gameBoard[row + 1][col].trim().toLowerCase() === currentFruit) {
            this.mergeFruit(row, col, row + 1, col);
            merged = true;
          }
        }
      }
    }

    if (merged) {
      if (typeof setTimeout !== 'undefined') {
        setTimeout(() => {
          this.applyGravity(() => this.mergeFruits(callback));
        }, 300);
      } else {
        this.applyGravity(() => this.mergeFruits(callback));
      }
    } else {
      callback();
    }
  }

  mergeFruit(row1, col1, row2, col2) {
    const fruit1 = this.gameBoard[row1][col1].trim().toLowerCase();
    const fruit2 = this.gameBoard[row2][col2].trim().toLowerCase();
    
    if (fruit1 !== fruit2) {
      return; // Do not merge if fruits are different
    }
    
    const newFruitIndex = this.fruits.indexOf(fruit1) + 1;
    if (newFruitIndex < this.fruits.length) {
      const newFruit = this.fruits[newFruitIndex];
      this.gameBoard[row2][col2] = newFruit;
      this.updateCell(row2, col2, newFruit, true);
      this.gameBoard[row1][col1] = null;
      this.updateCell(row1, col1, null);
      this.score += (newFruitIndex + 1) * 10;
      this.updateScoreDisplay();
    }
  }

  checkIfGameOver() {
    if (this.isGameOver()) {
      if (typeof alert !== 'undefined') {
        setTimeout(() => alert(`Game Over! Your score: ${this.score}`), 500);
      }
    }
  }

  randomFruit() {
    return this.fruits.slice(0, this.randomFruitPool)[Math.floor(Math.random() * this.randomFruitPool)];
  }

  updateScoreDisplay() {
    if (typeof document !== 'undefined') {
      document.getElementById('score').innerText = this.score;
    }
  }

  isGameOver() {
    return this.gameBoard.every(row => row.every(cell => cell !== null));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new MergeGame();  // Assuming your class is called MergeGame
  game.initGame();               // Initialize the game once the DOM is ready
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MergeGame
  };
}

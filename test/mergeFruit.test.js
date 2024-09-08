const { MergeGame } = require('../script.js'); // Import the MergeGame class

describe('MergeFruit Game Functions', () => {
  let game;
  
  // Mock the DOM elements and functions
  const originalGetElementById = document.getElementById;
  global.document.getElementById = jest.fn((id) => {
    if (id === 'score') {
      return { innerText: '' }; // Mock the score element
    }
    if (id === 'game-board') {
      return { 
        innerHTML: '',
        appendChild: jest.fn(),
      };
    }
    if (id === 'next-fruit') {
      return {
        className: '', // Mock className property
        classList: {
          add: jest.fn(),  // Mock classList.add function
          remove: jest.fn() // Mock classList.remove function if needed
        },
      };
    }
    return originalGetElementById.call(document, id);
  });

  global.document.querySelector = jest.fn((selector) => {
    // Mock querySelector to return an object with className and classList for grid cells
    if (selector.includes('[data-row=') && selector.includes('[data-col=')) {
      return {
        className: '',
        classList: {
          add: jest.fn(),
        },
      };
    }
    
    return null; // Return null if no matching element
  });

  beforeEach(() => {
    // Initialize the game class before each test
    game = new MergeGame();
    game.initGame();  // Set up the game board and other properties
  });

  test('should manipulate DOM and mock mock is working', () => {
    document.body.innerHTML = '<div id="test">Hello</div>';
    const element = document.getElementById('test');
    expect(element.innerHTML).toBe('Hello');
    const score = document.getElementById('score');
    expect(score.innerText).toBe('');
  });

  test('mergeFruits should merge two fruits correctly', () => {
    game.gameBoard[0][0] = 'cherry';
    game.gameBoard[0][1] = 'cherry';

    game.mergeFruits(() => {}); // Call mergeFruits and pass an empty callback
    
    expect(game.gameBoard[0][1]).toBe('strawberry');
    expect(game.gameBoard[0][0]).toBeNull();
    expect(game.score).toBe(20); // (1 + 1) * 10 for merging cherries
  });

  test('mergeFruits should not merge if fruits are different', () => {
    game.gameBoard[0][0] = 'cherry';
    game.gameBoard[0][1] = 'strawberry';
    
    game.mergeFruits(() => {}); // Call mergeFruits and pass an empty callback
    
    expect(game.gameBoard[0][0]).toBe('cherry');
    expect(game.gameBoard[0][1]).toBe('strawberry');
    expect(game.score).toBe(0);  // Score should remain unchanged
  });

  test('mergeFruits should not merge if new fruit would be beyond the highest level', () => {
    game.gameBoard[0][0] = 'pineapple';
    game.gameBoard[0][1] = 'pineapple';

    game.mergeFruits(() => {}); // Call mergeFruits and pass an empty callback
    
    expect(game.gameBoard[0][0]).toBe('pineapple');
    expect(game.gameBoard[0][1]).toBe('pineapple');
    expect(game.score).toBe(0);
  });

  test('randomFruit should return a valid fruit', () => {
    const validFruits = game.fruits.slice(0, 4); // Only the first 4 fruits are used in randomFruit
    const result = game.randomFruit();
    expect(validFruits).toContain(result);
  });

  test('isGameOver should return true when board is full', () => {
    game.gameBoard = game.gameBoard.map(row => row.fill('cherry'));
    expect(game.isGameOver()).toBe(true);
  });

  test('isGameOver should return false when board is not full', () => {
    game.gameBoard[0][0] = 'cherry';
    expect(game.isGameOver()).toBe(false);
  });
});

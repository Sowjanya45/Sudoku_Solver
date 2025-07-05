import { SudokuUtil } from "./SudokuUtil.js";
import { Util } from "./Util.js";

export class Sudoku {
  constructor(sudoku) {
    this.sudoku = sudoku ? sudoku : createPuzzle();
    this.solvedSudoku = [];
    this.isValidSudoku = false;
    this.isSolved = false;
  }

  get puzzle() {
    return this.sudoku;
  }

  get solvedPuzzle() {
    return this.solvedSudoku;
  }

  validate() {
    return isValidSolution(this.sudoku);
  }

  isSolvable() {
    this.isValidSudoku = isValidPuzzle(this.sudoku);
    if (this.isValidSudoku) {
      Util.copyGrid(this.sudoku, this.solvedSudoku);
      return solve(this.solvedSudoku);
    } else {
      return false;
    }
  }
}

function isValidPuzzle(grid) {
  return SudokuUtil.isValidPuzzle(grid);
}

function isValidSolution(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) return false;
    }
  }
  return SudokuUtil.isValidPuzzle(grid);
}

function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let possibleNumber = 1; possibleNumber <= 9; possibleNumber++) {
          if (SudokuUtil.isValidPlace(grid, row, col, possibleNumber)) {
            grid[row][col] = possibleNumber;
            if (solve(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function createPuzzle() {
  const puzzle = getRandomSudoku();
  if (solve(puzzle)) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (Math.random() > 0.3) puzzle[i][j] = 0;
      }
    }
  }
  return puzzle;
}

function getRandomSudoku() {
  const randomSudoku = Array.from({ length: 9 }, () => Array(9).fill(0));

  for (let i = 0; i < 8; i++) {
    let number = Math.floor(Math.random() * 8) + 1;
    while (!SudokuUtil.isValidPlace(randomSudoku, 0, i, number)) {
      number = Math.floor(Math.random() * 8) + 1;
    }
    randomSudoku[0][i] = number;
  }

  return randomSudoku;
}

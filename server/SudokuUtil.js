import { Util } from "./Util.js";

const SudokuUtil = {
  isValidPuzzle: function (grid) {
    for (let i = 0; i < 9; i++) {
      if (!isValidRow(grid, i)) return false;
      if (!isValidCol(grid, i)) return false;
    }
    return isValidBox(grid);
  },

  isValidPlace: function (grid, row, column, number) {
    for (let i = 0; i < 9; i++) {
      if (grid[i][column] === number || grid[row][i] === number) return false;
    }

    const localBoxRow = row - (row % 3);
    const localBoxCol = column - (column % 3);
    for (let i = localBoxRow; i < localBoxRow + 3; i++) {
      for (let j = localBoxCol; j < localBoxCol + 3; j++) {
        if (grid[i][j] === number) return false;
      }
    }

    return true;
  },
};

function isValidRow(grid, row) {
  const set = new Set();
  for (let i = 0; i < 9; i++) {
    const num = grid[row][i];
    if (num < 0 || num > 9) return false;
    if (num !== 0 && set.has(num)) return false;
    set.add(num);
  }
  return true;
}

function isValidCol(grid, col) {
  const set = new Set();
  for (let i = 0; i < 9; i++) {
    const num = grid[i][col];
    if (num < 0 || num > 9) return false;
    if (num !== 0 && set.has(num)) return false;
    set.add(num);
  }
  return true;
}

function isValidBox(grid) {
  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      const set = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const num = grid[row + i][col + j];
          if (num < 0 || num > 9) return false;
          if (num !== 0 && set.has(num)) return false;
          set.add(num);
        }
      }
    }
  }
  return true;
}

export { SudokuUtil };

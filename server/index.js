import express from "express";
import cors from "cors";
import { Sudoku } from "./Sudoku.js";
import { Util } from "./Util.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/puzzle", (req, res) => {
  const sudoku = new Sudoku();
  const puzzle = sudoku.puzzle;
  res.status(200).send({ game: puzzle });
});

app.post("/solve", (req, res) => {
  let puzzle = [];
  Util.copyGrid(req.body.board, puzzle);
  const sudoku = new Sudoku(puzzle);
  const solution = sudoku.isSolvable();
  let solvedSudoku;
  let status;

  if (solution) {
    solvedSudoku = sudoku.solvedPuzzle;
    status = true;
  } else {
    solvedSudoku = req.body.board;
    status = false;
  }

  res.status(200).send({ solution: solvedSudoku, status });
});

app.post("/validate", (req, res) => {
  let puzzle = [];
  Util.copyGrid(req.body.board, puzzle);
  const sudoku = new Sudoku(puzzle);
  const status = sudoku.validate();
  res.status(200).send({ status });
});

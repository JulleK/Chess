import fs from "fs";
const filename = "chessGame.log";

import { Chess } from "chess.js";
const chess = new Chess();

// remove/clean up the content of the game file
fs.writeFileSync(filename, "", (err) => {
  if (err) {
    console.error(err);
  }
});

while (!chess.isGameOver()) {
  // do a random move
  const moves = chess.moves();
  const takeMoves = [];
  const winMoves = [];

  for (let i = 0; i < moves.length; i++) {
    if (moves[i].indexOf("++") !== -1) {
      winMoves.push(moves[i]);
    }
  }

  for (let i = 0; i < moves.length; i++) {
    if (moves[i].indexOf("x") !== -1) {
      takeMoves.push(moves[i]);
    }
  }
  let move;
  if (winMoves.length !== 0) {
    move = winMoves[Math.floor(Math.random() * winMoves.length)];
  } else if (takeMoves.length !== 0) {
    move = takeMoves[Math.floor(Math.random() * takeMoves.length)];
  } else {
  }

  move = moves[Math.floor(Math.random() * moves.length)];

  chess.move(move);

  // add ascii board into file after every move
  fs.appendFileSync("chessGame.txt", `${chess.ascii()}\n\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

console.log(`written game to ${filename}`);

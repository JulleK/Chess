import fs from "fs";
const filename = "chessGame.txt";

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
  const move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);

  // add ascii board into file after every move
  fs.appendFileSync("chessGame.txt", `${chess.ascii()}\n\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

console.log(`written game to ${filename}`);

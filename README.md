# General Info
Chess game in React and Node.js with socket.io

When a user joins a game, he is assigned to a room. 

If he is the first player in the room, he is given white pieces, if he is the second one he is given black.

every room has a separate chess game object (from chess.js)

When a player makes a move, the chess position is emitted to both players in the room. 

if the move is illegal, the position doesn't change, yet it is still emitted to the players in the room.

libraries:
- chessboard.jsx - display a chess board in React
- chess.js - chess logic, keep track of chess games in the backend

## Setup

To run this project install it locally

then install react dependecies using npm, then run the development server:

```
$ cd app
$ npm install
$ npm run dev
```

---

you also need to install server dependecies, then run the server in another terminal

make sure you have Node.js installed

```
$ cd server
$ npm install
$ node index.js
```

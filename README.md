# General Info
Chess game in React and Node.js with socket.io

When a user joins a game, he is assigned to a room. 

If he is the first player in the room, he is given white pieces, if he is the second one he is given black.

Every room has a separate chess game instance (from chess.js)

When a player makes a move, the chess position is emitted to both players in the room. 

If the move is illegal, the position doesn't change, yet it is still emitted to the players in the room.

## Structure
- `/app` directory contains the react app. it displays the chessboard when a game starts.
for the chess logic and move validation it calls the websocket server
- `/socketServer` directory provides the websocket and chess logic, when a game is started.
it moves players into seperate chess rooms, each having their own chess.js game.
- `/server` express server that handles signup and login requests. it communicates with MongoDB.

## Libraries
- chessboard.jsx - display a chess board in React (minimum chess logic)
- chess.js - chess logic, keep track of chess games in the backend
- socket.io - server and client side library to provide websocket communication
- TailwindCSS - library for inline styles
- Express.js - node server, handles server routing 
- react-router-dom - handles frontend routing in react

## Setup

To run this project install it locally

then install react dependecies using npm, then run the development server:

```
$ cd app
$ npm install
$ npm run dev
```

---

you also need to install websocket server dependecies, then run the websocket server in another terminal

make sure you have Node.js installed

```
$ cd socketServer
$ npm install
$ node index.js
```

---

install the server, then run it in yet another terminal

```
$ cd server
$ npm install
$ node index.js
```

---

install MongoDB and run it in another terminal

```
$ mongod
```
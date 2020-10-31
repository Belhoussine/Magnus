# Chess-AI-Engine
- This is a web application that creates a chess game and then lets the user play against an intelligent engine.
![Chess Engine] (./chess.png)
- Lots of game theory and A.I research were behind the implementation of the engine, namely the Minimax Algorithm, Alpha-beta pruning, and chess opening / end-game theory.

## 1. Chess Game:
- [x] Create board and pieces
- [x] Move pieces on the chess board
- [x] Only allow legal moves
- [ ] Allow pre-moves
- [x] Castle & Capture en-passant
- [x] Log PGN (Portable Game Notation)
- [x] Show captured pieces
- [x] Calculate score difference

## 2. Intelligent Agent:
- [x] Get all possible moves (search space)
- [x] Implement MiniMax Algorithm to a certain depth:
    - [x] Implement piece value concept (Point system)
    - [x] Implement board placement concept (Piece positioning)
    - [ ] Implement temporal importance (Opening vs End-game)
    - [x] Explore search space recursively
- [x] Optimize algorithm: Alpha-beta pruning
- [x] Make engine play best move on the board
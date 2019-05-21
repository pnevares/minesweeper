import React from "react";
import "./GameStatus.css";

export default function GameStatus({ gameOver, revealsRemaining }) {
  return (
    <h3>
      {!gameOver &&
        revealsRemaining > 0 &&
        `${revealsRemaining} squares remaining`}
      {gameOver && revealsRemaining === 0 && "You win! 😀"}
      {gameOver && revealsRemaining > 0 && "You lose. Try again!"}
    </h3>
  );
}

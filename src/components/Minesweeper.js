import React, { Component } from "react";
import Board from "./Board";
import "./Minesweeper.css";

export default class Minesweeper extends Component {
  state = {
    boardSettings: {
      gameId: 0,
      height: 8,
      width: 8
    }
  };
  onButtonClick = (height, width) => {
    const { gameId } = this.state.boardSettings;
    const boardSettings = { gameId: gameId + 1, height, width };
    this.setState({ boardSettings });
  };
  render() {
    const { gameId, height, width } = this.state.boardSettings;
    return (
      <div>
        <h1>Minesweeper</h1>
        <main>
          New game:
          <button onClick={() => this.onButtonClick(8, 8)}>Easy</button>
          <button onClick={() => this.onButtonClick(16, 16)}>Medium</button>
          <button onClick={() => this.onButtonClick(24, 24)}>Hard</button>
        </main>
        <Board gameId={gameId} height={height} width={width} />
      </div>
    );
  }
}

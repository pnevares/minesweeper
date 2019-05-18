import React, { Component } from "react";
import Board from "./Board";

export default class Minesweeper extends Component {
  state = {
    boardSettings: {
      height: 8,
      width: 8
    }
  };
  onButtonClick = (height, width) => {
    const boardSettings = { height, width };
    this.setState({ boardSettings });
  };
  render() {
    const { height, width } = this.state.boardSettings;
    return (
      <div>
        <h1>Minesweeper</h1>
        <main>
          New game:
          <button onClick={() => this.onButtonClick(8, 8)}>Easy</button>
          <button onClick={() => this.onButtonClick(16, 16)}>Medium</button>
          <button onClick={() => this.onButtonClick(24, 24)}>Hard</button>
        </main>
        <Board height={height} width={width} />
      </div>
    );
  }
}

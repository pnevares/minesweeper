import React, { Component } from "react";
import Board from "./Board";

export default class Minesweeper extends Component {
  state = {
    boardSettings: {
      height: 10,
      width: 10
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
          <button onClick={() => this.onButtonClick(10, 10)}>Easy</button>
          <button onClick={() => this.onButtonClick(20, 20)}>Medium</button>
          <button onClick={() => this.onButtonClick(30, 60)}>Hard</button>
        </main>
        <Board height={height} width={width} />
      </div>
    );
  }
}

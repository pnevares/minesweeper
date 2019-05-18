import React, { Component } from "react";

export default class Board extends Component {
  state = { squares: [], revealsRemaining: null };
  onClick = (row, column) => {
    const { revealsRemaining } = this.state;
    const squares = [...this.state.squares];
    if (squares[row][column].revealed) {
      return;
    }

    if (squares[row][column].value !== "💣") {
      squares[row][column].value = "🅿️";
    }

    squares[row][column].revealed = true;
    this.setState({ squares, revealsRemaining: revealsRemaining - 1 });
  };
  componentDidMount() {
    this.randomizeBoard();
  }
  componentDidUpdate({ height: oldHeight, width: oldWidth }) {
    const { height, width } = this.props;
    const { revealsRemaining } = this.state;
    if (height !== oldHeight || width !== oldWidth) {
      return this.randomizeBoard();
    }
    if (revealsRemaining === 0) {
      console.log("you win");
    }
  }
  randomizeBoard() {
    const { height, width } = this.props;

    const squares = Array(height)
      .fill(null)
      .map(() =>
        Array(width)
          .fill(null)
          .map(() => ({ revealed: false, value: null }))
      );
    const bombsToPlace = Math.floor(0.15 * height * width);
    for (let i = 0; i < bombsToPlace; i++) {
      const randomRow = Math.floor(Math.random() * height);
      const randomColumn = Math.floor(Math.random() * width);
      squares[randomRow][randomColumn].value = "💣";
    }
    const revealsRemaining = height * width - bombsToPlace;
    this.setState({ squares, revealsRemaining });
  }
  renderSquares() {
    return (
      <ul>
        {this.state.squares.map((row, rowIndex) => {
          return (
            <li key={rowIndex}>
              {row.map((square, columnIndex) => {
                return (
                  <span
                    key={`${rowIndex}.${columnIndex}`}
                    onClick={() => this.onClick(rowIndex, columnIndex)}
                  >
                    {square.revealed ? square.value : "◻️"}
                  </span>
                );
              })}
            </li>
          );
        })}
      </ul>
    );
  }
  render() {
    return <div>{this.renderSquares()}</div>;
  }
}

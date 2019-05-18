import React, { Component } from "react";
import "./board.css";

export default class Board extends Component {
  state = { squares: [], revealsRemaining: null };
  onClick = (row, column) => {
    const { revealsRemaining } = this.state;
    const squares = [...this.state.squares];

    if (squares[row][column].revealed) {
      return;
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
          .map(() => ({ revealed: false, value: 0 }))
      );
    const bombs = Math.floor(0.15 * height * width);
    let bombsPlaced = 0;
    while (bombsPlaced < bombs) {
      const randomRow = Math.floor(Math.random() * height);
      const randomColumn = Math.floor(Math.random() * width);
      if (squares[randomRow][randomColumn].value === "💣") {
        continue;
      }

      squares[randomRow][randomColumn].value = "💣";
      bombsPlaced += 1;

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const neighborX = randomColumn + x;
          const neighborY = randomRow + y;
          if (
            neighborX >= 0 &&
            neighborX < width &&
            neighborY >= 0 &&
            neighborY < height &&
            squares[neighborY][neighborX].value !== "💣"
          ) {
            squares[neighborY][neighborX].value += 1;
          }
        }
      }
    }
    const revealsRemaining = height * width - bombsPlaced;
    this.setState({ squares, revealsRemaining });
  }
  renderSquares() {
    return (
      <ul>
        {this.state.squares.map((row, rowIndex) => {
          return row.map((square, columnIndex) => {
            return (
              <li
                key={`${rowIndex}.${columnIndex}`}
                onClick={() => this.onClick(rowIndex, columnIndex)}
              >
                {square.revealed ? square.value : "\u00A0"}
              </li>
            );
          });
        })}
      </ul>
    );
  }
  render() {
    return <div>{this.renderSquares()}</div>;
  }
}

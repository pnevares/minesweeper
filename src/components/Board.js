import React, { Component } from "react";

export default class Board extends Component {
  state = { squares: [] };
  onClick = (row, column) => {
    const squares = [...this.state.squares];
    squares[row][column] = "💣";
    this.setState({ squares });
  };
  componentDidMount() {
    this.randomizeBoard();
  }
  componentDidUpdate({ height: oldHeight, width: oldWidth }) {
    const { height, width } = this.props;
    if (height !== oldHeight || width !== oldWidth) {
      this.randomizeBoard();
    }
  }
  randomizeBoard() {
    const { height, width } = this.props;

    const squares = Array(height)
      .fill(null)
      .map(() => Array(width).fill("◻️"));

    const bombsToPlace = Math.floor(0.15 * height * width);
    for (let i = 0; i < bombsToPlace; i++) {
      const randomRow = Math.floor(Math.random() * height);
      const randomColumn = Math.floor(Math.random() * width);
      squares[randomRow][randomColumn] = "💣";
    }

    this.setState({ squares });
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
                    {square}
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

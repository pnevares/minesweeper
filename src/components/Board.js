import React, { Component } from "react";
import GameStatus from "./GameStatus";
import Square from "./Square";
import "./Board.css";

export default class Board extends Component {
  state = { gameOver: false, revealsRemaining: null, squares: [] };
  onClick = (event, row, column) => {
    if (event.ctrlKey) {
      return this.onContextMenu(event, row, column);
    }

    const { gameOver, revealsRemaining, squares } = this.state;

    if (gameOver) return;

    if (squares[row][column].revealed || squares[row][column].flagged) return;

    if (squares[row][column].value === "💣") {
      const newSquares = [...squares];
      newSquares[row][column].revealed = true;
      return this.setState({ gameOver: true, squares: newSquares });
    }

    const {
      squares: newSquares,
      revealCount
    } = this.revealSelfAndEmptyNeighbors([...squares], row, column);
    const newRevealsRemaining = revealsRemaining - revealCount;
    const newGameOver = newRevealsRemaining === 0;

    this.setState({
      gameOver: newGameOver,
      revealsRemaining: newRevealsRemaining,
      squares: newSquares
    });
  };
  onContextMenu = (event, row, column) => {
    event.preventDefault();

    if (this.state.gameOver) return;

    const squares = [...this.state.squares];

    if (squares[row][column].revealed) return;

    const { flagged } = squares[row][column];
    squares[row][column].flagged = !flagged;

    this.setState({ squares });
  };
  componentDidMount() {
    this.randomizeBoard();
  }
  componentDidUpdate({ gameId: oldGameId }) {
    const { gameId } = this.props;
    if (gameId !== oldGameId) {
      return this.randomizeBoard();
    }
  }
  randomizeBoard() {
    const { height, width } = this.props;

    const squares = Array(height)
      .fill(null)
      .map(() =>
        Array(width)
          .fill(null)
          .map(() => ({ flagged: false, revealed: false, value: 0 }))
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
    this.setState({ squares, revealsRemaining, gameOver: false });
  }
  revealSelfAndEmptyNeighbors(squares, row, column, revealCount = 0) {
    const isEmptySquare = squares[row][column].value === 0;
    squares[row][column].revealed = true;
    revealCount += 1;
    if (isEmptySquare) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const neighborX = column + x;
          const neighborY = row + y;
          if (
            neighborX >= 0 &&
            neighborX < this.props.width &&
            neighborY >= 0 &&
            neighborY < this.props.height &&
            squares[neighborY][neighborX].value !== "💣" &&
            !squares[neighborY][neighborX].revealed &&
            !squares[neighborY][neighborX].flagged
          ) {
            const result = this.revealSelfAndEmptyNeighbors(
              squares,
              neighborY,
              neighborX,
              revealCount
            );
            squares = result.squares;
            revealCount = result.revealCount;
          }
        }
      }
    }
    return { squares, revealCount };
  }
  render() {
    const { width } = this.props;
    const { gameOver, revealsRemaining, squares } = this.state;
    return (
      <main>
        <GameStatus gameOver={gameOver} revealsRemaining={revealsRemaining} />
        <ul className={`width-${width}`}>
          {squares.map((row, rowIndex) => {
            return row.map((square, columnIndex) => {
              return (
                <Square
                  key={`${rowIndex}.${columnIndex}`}
                  onClick={event => this.onClick(event, rowIndex, columnIndex)}
                  onContextMenu={event =>
                    this.onContextMenu(event, rowIndex, columnIndex)
                  }
                  square={square}
                />
              );
            });
          })}
        </ul>
      </main>
    );
  }
}

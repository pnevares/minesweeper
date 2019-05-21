import React from "react";
import "./Square.css";

export default function Square({ onClick, onContextMenu, square }) {
  return (
    <li
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`value-${square.value} ${square.revealed ? "revealed" : ""}`}
    >
      {square.revealed && square.value !== 0
        ? square.value
        : square.flagged
        ? "🚩"
        : "\u00A0"}
    </li>
  );
}

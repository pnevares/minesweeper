import React from "react";
import "./Square.css";

export interface Props {
  onClick: (event: any) => void;
  onContextMenu: (event: any) => void;
  square: {
    isBomb: boolean;
    flagged: boolean;
    revealed: boolean;
    value: number;
  };
}

export default function Square({ onClick, onContextMenu, square }: Props) {
  return (
    <li
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`value-${square.value} ${square.revealed ? "revealed" : ""}`}
    >
      {square.revealed && square.isBomb
        ? "💣"
        : square.revealed && square.value !== 0
        ? square.value
        : square.flagged
        ? "🚩"
        : "\u00A0"}
    </li>
  );
}

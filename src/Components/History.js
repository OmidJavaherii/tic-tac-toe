import React from "react";

export default function History({ history, jumpTo }) {
  return (
    <div className="w-full max-w-sm mt-3">
      <h2 className="text-lg font-semibold mb-2">Moving History:</h2>
      <ul className="space-y-2">
        {history.map((move , index) => (
          <li key={index}>
            <button className="btn w-full text-left" onClick={() => jumpTo(index)}>
              {move.player} : Row {move.row + 1}، Column {move.col + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

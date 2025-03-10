import React from "react";

interface HistoryProps {
  history: {
    board: (string | null)[];
    position?: string;
    player?: string;
    row?: number;
    col?: number;
  }[];
  jumpTo: (index: number) => void;
}

export default function History({ history, jumpTo }: HistoryProps) {
  return (
    <div className="w-full max-w-sm mt-3 history">
      <h2 className="text-lg font-semibold mb-2">Moving History:</h2>
      <ul className="space-y-2">
        {history.map((move , index) => (
          <li key={index}>
            <button className="btn w-full text-left btn-li-history" onClick={() => jumpTo(index)}>
              Player {move.player} : Row {move.row !== undefined ? move.row + 1 : ''}, Column {move.col !== undefined ? move.col + 1 : ''}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";

export default function WinnerModal({ winner, onReset }) {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-0">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-2xl font-bold text-gray-800">
          {winner === "Draw" ? "It's Draw!" : `Winner: ${winner} 🎉`}
        </h2>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={onReset}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

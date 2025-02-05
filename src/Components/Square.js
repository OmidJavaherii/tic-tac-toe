import React from "react";

export default function Square({ value, onClick }) {
  return (
    <button
      className="w-12 h-12 sm:w-24 sm:h-24 text-3xl font-bold flex items-center justify-center 
      border border-gray-400 rounded-xl bg-gray-100 hover:bg-gray-300 transition-shadow shadow-xl"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

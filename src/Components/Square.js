import React from "react";

export default function Square({ value, onClick }) {
    return (
        <button
          className="w-20 h-20 sm:w-24 sm:h-24 text-2xl sm:text-3xl font-bold flex items-center justify-center 
          border border-gray-400 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          onClick={onClick}
        >
          {value}
        </button>
    );
}

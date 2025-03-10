import React, { Dispatch } from "react";

type Action = { type: "UNDO" | "REDO" | "RESET" };

export default function Controls({ dispatch }: { dispatch: Dispatch<Action> }) {
  return (
    <div className="flex space-x-2 mt-4">
      <button className="btn btn-nav transition duration-300 bg-red-500 hover:bg-red-600" onClick={() => dispatch({ type: "UNDO" })}>Undo</button>
      <button className="btn btn-nav transition duration-300 bg-red-500 hover:bg-red-600" onClick={() => dispatch({ type: "REDO" })}>Redo</button>
      <button className="btn btn-nav transition duration-300 bg-red-500 hover:bg-red-600" onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}

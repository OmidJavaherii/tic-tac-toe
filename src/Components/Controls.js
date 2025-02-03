import React from "react";

export default function Controls({ dispatch }) {
    return (
        <div className="flex space-x-2 mt-4">
          <button className="btn" onClick={() => dispatch({ type: "UNDO" })}>Undo</button>
          <button className="btn" onClick={() => dispatch({ type: "REDO" })}>Redo</button>
          <button className="btn" onClick={() => dispatch({ type: "RESET" })}>Reset</button>
        </div>
    );
}

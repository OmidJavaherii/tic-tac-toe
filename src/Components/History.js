import React from "react";

export default function History({ history, jumpTo }) {
    return (
        <ul className="mt-4 w-full max-w-sm">
          {history.map((_, index) => (
            <li key={index} className="flex justify-center">
              <button className="btn w-full" onClick={() => jumpTo(index)}>Move {index + 1}</button>
            </li>
          ))}
        </ul>
    );
}

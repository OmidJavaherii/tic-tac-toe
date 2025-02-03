import React from "react";

export function saveToStorage(state) {
    localStorage.setItem("tic-tac-toe", JSON.stringify(state));
}

export function loadFromStorage() {
    const data = localStorage.getItem("tic-tac-toe");
    return data ? JSON.parse(data) : null;
}

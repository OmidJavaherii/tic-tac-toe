import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Game from "./Components/PlayModes/GameMode";
import ThemeProvider from "./Components/Theme/ThemeProvider";
import './styles.css'

export default function App() {
  const [gameMode, setGameMode] = useState("twoPlayer");

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home setGameMode={setGameMode} />} />
          <Route path="/game" element={<Game gameMode={gameMode} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
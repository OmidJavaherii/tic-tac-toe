import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Game from "./Components/PlayModes/GameMode";
import ThemeProvider from "./Components/Theme/ThemeProvider";
import './styles.css'

export default function App() {
  const [gameMode, setGameMode] = useState("twoPlayer");

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  
  useEffect(() => {
    const checkInstallation = () => {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      setIsInstalled(isStandalone || window.navigator.standalone);
    };

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    });

    window.addEventListener("appinstalled", () => {
      console.log("PWA installed");
      setIsInstalled(true);
    });

    checkInstallation();
    return () => {
      window.removeEventListener("beforeinstallprompt", () => { });
      window.removeEventListener("appinstalled", () => { });
    };
  }, []);


  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home setGameMode={setGameMode} deferredPrompt={deferredPrompt} isInstalled={isInstalled} />} />
          <Route path="/game" element={<Game gameMode={gameMode} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
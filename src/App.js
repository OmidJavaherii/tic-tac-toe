import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Game from "./Components/PlayModes/GameMode";
import ThemeProvider from "./Components/Theme/ThemeProvider";
import './styles.css'

export default function App() {
  const [gameMode, setGameMode] = useState("twoPlayer");
  const [difficulty , setDifficulty] = useState("hard")

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstallation = () => {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      setIsInstalled(isStandalone || window.navigator.standalone);
    };

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      sessionStorage.setItem("pwaInstallPrompt", true);
      setTimeout(() => window.dispatchEvent(new Event("deferredPromptReady")), 100)
    };

    const handleAppInstalled = () => {
      console.log("PWA Has Installed");
      setIsInstalled(true);
      sessionStorage.removeItem("pwaInstallPrompt");
      setTimeout(() => window.dispatchEvent(new Event("pwaInstalled")), 100);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    checkInstallation();

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);


  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home setGameMode={setGameMode} setDifficulty={setDifficulty} deferredPrompt={deferredPrompt} isInstalled={isInstalled} />} />
          <Route path="/game" element={<Game gameMode={gameMode} difficulty={difficulty} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
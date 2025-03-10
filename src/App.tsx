import { useState, useEffect, JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import Home from "./Components/Home/Home";
import Game from "./Components/PlayModes/GameMode";
import ThemeProvider from "./Components/Theme/ThemeProvider";
// Define types for the BeforeInstallPromptEvent
import { BeforeInstallPromptEvent } from "./types/pwa";


export default function App(): JSX.Element {
  const [gameMode, setGameMode] = useState<"twoPlayer" | "singlePlayer">(
    "twoPlayer"
  );
  const [difficulty, setDifficulty] = useState<"easy" | "hard">("hard");

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const checkInstallation = (): void => {
      try {
        const isStandalone = window.matchMedia(
          "(display-mode: standalone)"
        ).matches;
        setIsInstalled(isStandalone);
      } catch (error) {
        console.error("Error checking installation status:", error);
        setIsInstalled(false);
      }
    };

    const handleBeforeInstallPrompt = (
      event: BeforeInstallPromptEvent
    ): void => {
      event.preventDefault();
      setDeferredPrompt(event);
      sessionStorage.setItem("pwaInstallPrompt", "true");
      setTimeout(
        () => window.dispatchEvent(new Event("deferredPromptReady")),
        100
      );
    };

    const handleAppInstalled = (): void => {
      console.log("PWA Has Installed");
      setIsInstalled(true);
      sessionStorage.removeItem("pwaInstallPrompt");
      setTimeout(() => window.dispatchEvent(new Event("pwaInstalled")), 100);
    };

    const init = async () => {
      try {
        window.addEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt as EventListener
        );
        window.addEventListener("appinstalled", handleAppInstalled);
        checkInstallation();
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    init();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setGameMode={setGameMode}
                setDifficulty={setDifficulty}
                deferredPrompt={deferredPrompt}
                isInstalled={isInstalled}
              />
            }
          />
          <Route
            path="/game"
            element={<Game gameMode={gameMode} difficulty={difficulty} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

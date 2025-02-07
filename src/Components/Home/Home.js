import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Theme/ThemeProvider";

export default function Home({ setGameMode, deferredPrompt }) {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;

    const [installable, setInstallable] = useState(!!deferredPrompt);

    useEffect(() => {
        window.history.replaceState(null, "", "/");
        const handlePromptReady = () => setInstallable(true);
        const handlePwaInstalled = () => setInstallable(false);

        window.addEventListener("deferredPromptReady", handlePromptReady);
        window.addEventListener("pwaInstalled", handlePwaInstalled);

        return () => {
            window.removeEventListener("deferredPromptReady", handlePromptReady);
            window.removeEventListener("pwaInstalled", handlePwaInstalled);
        };
    }, []);

    const installPWA = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choice) => {
                if (choice.outcome === "accepted") {
                    setInstallable(false);
                }
            });
        }
    };

    const startGame = (mode) => {
        setGameMode(mode);
        setTimeout(() => navigate("/game"), 100);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-white p-6">
            <img className='h-32 mb-12' src="./Logo.png" alt="Logo" />
            <button onClick={() => startGame("twoPlayer")} className="btn px-6 py-3 mb-4 text-xl font-semibold bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300 ">👥 Two Players</button>
            <button onClick={() => startGame("singlePlayer")} className="btn px-6 py-3 mb-4 text-xl font-semibold bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300">🤖 Single Player</button>
            <button onClick={toggleTheme} className="btn py-3 mb-4 rounded-lg transition duration-300">
                {theme === "dark" ? "☀️" : "🌙"}
            </button>
            {!isInstalled && installable && !isIOS && (
                <button onClick={installPWA} className="btn py-3 mb-4 bg-green-500 hover:bg-green-700">
                    📲 Install PWA
                </button>
            )}
            {isIOS && !isInStandaloneMode && (
                <p className="text-gray-700 text-sm text-center mt-4">
                    برای نصب PWA ّFor iPhone ،click on <strong>Share</strong> and select <strong>Add to Home Screen</strong>to install... 📲
                </p>
            )}
        </div>
    );
}
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Theme/ThemeProvider";

export default function Home({ setGameMode, setDifficulty, deferredPrompt, isInstalled }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
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

    const startGame = (mode, difficulty) => {
        setGameMode(mode);
        setDifficulty(difficulty)
        setTimeout(() => navigate("/game"), 100);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-white p-6">
            <img className='h-32 mb-12' src="./Logo.png" alt="Logo" />
            <button onClick={() => startGame("twoPlayer", "easy")} className="btn px-6 py-3 mb-4 text-xl font-semibold bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300 ">👥 Two Players</button>
            <button onClick={() => setShowModal(true)} className="btn px-6 py-3 mb-4 text-xl font-semibold bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300">🤖 Single Player</button>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
                    <div className="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg w-80 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">🔧 choose your Level</h2>
                        <button onClick={() => startGame("singlePlayer", "easy")} className="w-full btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                            Easy
                        </button>
                        <button onClick={() => startGame("singlePlayer", "hard")} className="btn w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">
                            Hard
                        </button>
                        <button onClick={() => setShowModal(false)} className="btn w-full bg-[#3c3c51] hover:bg-[#444] text-white font-bold py-2 px-4 rounded mt-2">
                            ❌ Close ❌
                        </button>
                    </div>
                </div>
            )}
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
                    Install PWA ّFor iPhone please click on <strong>Share</strong> and select <strong>Add to Home Screen</strong> to install... 📲
                </p>
            )}
        </div>
    );
}
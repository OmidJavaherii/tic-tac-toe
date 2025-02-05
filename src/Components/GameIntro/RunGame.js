import React, { useState } from 'react';
import Board from '../Board';

const GameIntro = () => {
    const [startGame, setStartGame] = useState(false);

    const handleStart = () => {
        setStartGame(true);
    };

    if (startGame) {
        return (
            <Board />
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-6">
            <img className='h-32 mb-12' src="./Logo.png" alt="Logo" />
            <button
                className="px-6 py-3 text-xl font-semibold bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300"
                onClick={handleStart}
            >
                Run Game
            </button>
        </div>
    );
};

export default GameIntro;

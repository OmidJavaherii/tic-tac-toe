import React, { useState } from 'react';
import Board from '../Board';
import './RunGame.css'

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
        <div className="container">
        <img className='h-32 mb-12' src="./Logo.png" alt="Logo" />
            <button className="button" onClick={handleStart}>Rum Game</button>
        </div>
    );
};

export default GameIntro;

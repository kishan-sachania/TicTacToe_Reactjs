// src/TicTacToe.js

import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [playerNames, setPlayerNames] = useState({ X: '', O: '' });
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && !winner) {
      alert("Game Started!");
    }
  }, [gameStarted, winner]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = player;
    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      const winningPlayer = player;
      setWinner(winningPlayer);
      setHistory([...history, `${playerNames[winningPlayer]} (Player ${winningPlayer}) wins!`]);
    } else if (newBoard.every(cell => cell)) {
      setWinner('Draw');
      setHistory([...history, "It's a draw!"]);
    } else {
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return lines.some(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
  };

  const handleNameChange = (player) => (event) => {
    if (!gameStarted) {
      setPlayerNames({
        ...playerNames,
        [player]: event.target.value
      });
    }
  };

  const startGame = () => {
    if (playerNames.X && playerNames.O) {
      setGameStarted(true);
    } else {
      alert("Please enter names for both players.");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  const newGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
    setHistory([]);
    setPlayerNames({ X: '', O: '' });
    setGameStarted(false);
  };

  const renderSquare = (index) => (
    <button
      className="square"
      onClick={() => handleClick(index)}
      key={index}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="game">
      <div className="player-names">
        <input
          type="text"
          placeholder="Player X Name"
          value={playerNames.X}
          onChange={handleNameChange('X')}
          disabled={gameStarted}
        />
        <input
          type="text"
          placeholder="Player O Name"
          value={playerNames.O}
          onChange={handleNameChange('O')}
          disabled={gameStarted}
        />
        {!gameStarted && <button className="start-button" onClick={startGame}>Start Game</button>}
      </div>
      <div className="board">
        {[0, 1, 2].map(row => (
          <div className="board-row" key={row}>
            {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <div className="info">
        {winner ? (
          <p>{winner === 'Draw' ? "It's a Draw!" : `${playerNames[winner]} (Player ${winner}) Wins!`}</p>
        ) : (
          <p>Next Player: {playerNames[player] || `Player ${player}`}</p>
        )}
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
        <button className="new-game-button" onClick={newGame}>New Game</button>
      </div>
      <div className="history">
        <h3>Game History</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicTacToe;

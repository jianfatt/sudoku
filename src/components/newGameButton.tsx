import React from 'react';
import { getRandomPuzzle } from '../puzzle';

interface Cell {
  value: string;
  readOnly: boolean;
}

interface NewGameButtonProps {
    setCells: (cells : Cell[]) => void;
    setPuzzle: (puzzles: number[][]) => void;
    puzzle: number[][];
}

const handleNewGame = ({setCells, setPuzzle, puzzle}: NewGameButtonProps) => {
    const newPuzzle = getRandomPuzzle(puzzle);
    setPuzzle(newPuzzle) 
    const newCells = newPuzzle.flat().map((num) => ({
      value: num === 0 ? '' : num.toString(),
      readOnly: num !== 0,
    }));
    setCells(newCells);
};

const newGameButton : React.FC<NewGameButtonProps> = (props) => {
  return (
    <button className="new-game-button" onClick={() => handleNewGame(props)}>
      New Game
    </button>
  );
}

export default newGameButton;
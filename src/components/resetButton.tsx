import React from 'react';

interface Cell {
  value: string;
  readOnly: boolean;
}

interface ResetButtonProps {
    setCells: (cells : Cell[]) => void;
    setDuplicatedCells: (duplicates: [number, number][]) => void;
    puzzle: number[][];
}

const handleReset = ({setCells, setDuplicatedCells, puzzle}: ResetButtonProps) : void => {
    const resetCells = puzzle.flat().map((num) => ({
        value: num === 0 ? '' : num.toString(),
        readOnly: num !== 0,
    }));
    setCells(resetCells);
    setDuplicatedCells([]);
};

const resetButton : React.FC<ResetButtonProps> = (props) => {
    return (
        <button onClick={() => handleReset(props)}>Reset</button>
    );
}

export default resetButton;
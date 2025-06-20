import { useState } from 'react';
import { getRandomPuzzle } from './puzzle';
import './App.css';

const App = () => {
  const [puzzle, setPuzzle] = useState(getRandomPuzzle());

  const [cells, setCells] = useState(
    puzzle.flat().map((num) => ({
      value: num === 0 ? '' : num.toString(),
      readOnly: num !== 0,
    }))
  );

  const [duplicatedCells, setDuplicatedCells] = useState<[number, number][]>([]);

  const handleChange = (index:number, newValue:string) => {
    if (!/^[1-9]?$/.test(newValue)) return;

    setCells((prev) =>
      prev.map((cell, i) =>
        i === index ? { ...cell, value: newValue } : cell
      )
    );
  };

  const handleNewGame = () => {
    const newPuzzle = getRandomPuzzle(puzzle);
    setPuzzle(newPuzzle) 
    const newCells = newPuzzle.flat().map((num) => ({
      value: num === 0 ? '' : num.toString(),
      readOnly: num !== 0,
    }));
    setCells(newCells);
  };

  const handleReset = () => {
    const resetCells = puzzle.flat().map((num) => ({
      value: num === 0 ? '' : num.toString(),
      readOnly: num !== 0,
    }));
    setCells(resetCells);
    setDuplicatedCells([]);
  };

  const handleCheck = () => {
    const foundDuplicates: [number, number][] = [];
    
    const board = cells.map(e => e.value);
    
    const rows = Array.from({length: 9}, () => new Set<string>());
    const cols = Array.from({length: 9}, () => new Set<string>());
    const squares = Array.from({length: 9}, () => new Set<string>());
    
    for (let i = 0; i < 81; i++) {
      const value = board[i];
      if (value === '') continue;
      
      const row = Math.floor(i / 9);
      const col = i % 9;
      const square = Math.floor(row / 3) * 3 + Math.floor(col / 3);
      
      if (rows[row].has(value)) {
        for (let j = 0; j < 9; j++) {
          if (cells[row * 9 + j].value === value) {
            foundDuplicates.push([row, j]);
          }
        }
      }
      if (cols[col].has(value)) {
        for (let j = 0; j < 9; j++) {
          if (cells[j * 9 + col].value === value) {
            foundDuplicates.push([j, col]);
          }
        }
      }
      if (squares[square].has(value)) {
        const squareRow = Math.floor(square / 3) * 3;
        const squareCol = (square % 3) * 3;
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            if (cells[(squareRow + r) * 9 + (squareCol + c)].value === value) {
              foundDuplicates.push([squareRow + r, squareCol + c]);
            }
          }
        }
      }
      
      rows[row].add(value);
      cols[col].add(value);
      squares[square].add(value);

      const uniqueDuplicates = Array.from(
        new Set(foundDuplicates.map(([r, c]) => `${r},${c}`))
      ).map(str => str.split(',').map(Number) as [number, number]);

      setDuplicatedCells(uniqueDuplicates);
    }    
  };

  return (
    <div className="app">
      <h1>Mini Sudoku Game</h1>
      <div className="sudoku-grid">
        {cells.map((e, index) => {
          const row = Math.floor(index / 9);
          const col = index % 9;

          const isDuplicatedCell = duplicatedCells.some(
            ([r, c]) => r === row && c === col
          );

          return (
            <input
              key={index}
              className="cell"
              type="text"
              maxLength={1}
              value={e.value}
              readOnly={e.readOnly}
              style={{
                backgroundColor: e.readOnly ? '#eee' : 'white',
                fontWeight: e.readOnly ? 'bold' : 'normal',
                border: isDuplicatedCell ? '2px solid red' : '',
              }}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          );
        })}
      </div>
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleCheck}>Check</button>
    </div>
  );
};

export default App;
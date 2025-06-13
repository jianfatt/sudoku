import { useState } from 'react';
import { getRandomPuzzle } from './puzzle';
import './App.css';

const App = () => {
  const puzzle = getRandomPuzzle();

  const [cells, setCells] = useState(
    puzzle.flat().map((num) => ({
      value: num === 0 ? '' : num.toString(),
      readOnly: num !== 0,
    }))
  );

  const handleChange = (index, newValue) => {
    if (!/^[1-9]?$/.test(newValue)) return;

    setCells((prev) =>
      prev.map((cell, i) =>
        i === index ? { ...cell, value: newValue } : cell
      )
    );
  };

  return (
    <div className="app">
      <h1>Mini Sudoku Game</h1>
      <div className="sudoku-grid">
        {cells.map((e, index) =>
          <input
              key= {index}
              className="cell"
              type="text"
              maxLength={1}
              value={e.value}
              readOnly={e.readOnly}
              style={{
                backgroundColor: e.readOnly ? '#eee' : 'white',
                fontWeight: e.readOnly ? 'bold' : 'normal',
              }}
              onChange={(e) => handleChange(index, e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
import { useState } from 'react';
import { getRandomPuzzle } from './puzzle';
import CheckButton from './components/checkButton';
import ResetButton from './components/resetButton';
import NewGameButton from './components/newGameButton';
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
      <NewGameButton setCells={setCells} setPuzzle={setPuzzle} puzzle={puzzle}/>
      <ResetButton setCells={setCells} setDuplicatedCells={setDuplicatedCells} puzzle={puzzle}/>
      <CheckButton cells={cells} setDuplicatedCells={setDuplicatedCells}/>
    </div>
  );
};

export default App;
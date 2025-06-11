import './App.css';

const App = () => {
  const grid = Array(81);

  return (
    <div className="app">
      <h1>Mini Sudoku Game</h1>
      <div className="sudoku-grid">
        {[...grid].map((e, index) =>
          <input
              key= {index}
              className="cell"
              type="text"
              maxLength={1} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
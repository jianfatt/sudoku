import React from 'react';

interface Cell {
  value: string;
  readOnly: boolean;
}

interface CheckButtonProps {
  cells: Cell[];
  setDuplicatedCells: (duplicates: [number, number][]) => void;
}
  
const handleCheck = ({ cells, setDuplicatedCells }: CheckButtonProps) : void => {
    
    const foundDuplicates: number[][] = [];
    
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

      
    }

    const uniqueDuplicates = Array.from(
      new Set(foundDuplicates.map(([r, c]) => `${r},${c}`))
    ).map(str => str.split(',').map(Number) as [number, number]);

    setDuplicatedCells(uniqueDuplicates);
  };

  const CheckButton : React.FC<CheckButtonProps> = (props) => {
    return (
      <button
        className="check-button"
        onClick={() => handleCheck(props)}
      >
        Check
      </button>
    );
  }

  export default CheckButton;
import React from "react";
import Cell from "./Cell";

interface GridProps {
  size: number;
  grid: boolean[][];
  onCellClick: (x: number, y: number) => void;
}

const Grid: React.FC<GridProps> = ({ size, grid, onCellClick }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        gap: "1px",
        minWidth: "20vw",
        minHeight: "50vh",
        backgroundColor: '#ececec',
        border: "1px solid #D3D3D3",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            isActive={cell} // Value of cell is a boolean
            handleClick={() => onCellClick(rowIndex, colIndex)}  // Coordinates (rowIndex, colIndex) are passed back to App
          />
        ))
      )}
    </div>
  );
};

export default Grid;

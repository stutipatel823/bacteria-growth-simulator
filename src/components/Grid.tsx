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
        // minWidth: "fit-content",
        // minHeight: "fit-content",
        minWidth: "20vw",
        minHeight: "50vh",
        // maxWidth: "50vh",
        // maxHeight: "50vh",
        // maxWidth: "100vw",
        // maxHeight: "100vh",
        // background: "#d3ccc5",
        backgroundColor: '#ececec',
        // background: "#C8C8C8",
        // backgroundColor: "white",
        // border: "1px solid #dee2e6",
        border: "1px solid #D3D3D3",

        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        borderRadius: "5px",
        padding: "10px",
        // position: 'absolute',
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

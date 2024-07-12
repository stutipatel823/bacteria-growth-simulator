import React from "react";

export interface CellProps {
  isActive: boolean;
  handleClick?: () => void;
}

const Cell: React.FC<CellProps> = ({ isActive = false, handleClick }) => {
  // const backgroundColor = isActive ? '#1ccafc' : '';
  const backgroundColor = isActive ? '#37e2a9' : '';
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #b6b7b9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        backgroundColor,
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
    </div>
  );
};

export default Cell;

import React from "react";

interface ButtonProps {
  title: string;
  color: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ color, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        height: '50px',
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "white",
        border: `1px solid ${color}`,
        borderRadius: "5px",
        cursor: "pointer",
        position: "relative",
        boxShadow: `0 5px 10px ${color}`,
      }}
    >
      {title}
    </button>
  );
};

export default Button;

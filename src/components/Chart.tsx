import React from "react";

interface ChartProps {
  growthData: Array<{ timestamp: number; totalActiveCells: number }>;
  type: string;
}

const Chart: React.FC<ChartProps> = ({ growthData, type }) => {
  const svgHeight = 233;
  const svgWidth = 495;
  const barWidth = svgWidth / (growthData.length);

  let maxActive = 0;
  for (const data of growthData) {
    if (data.totalActiveCells > maxActive) {
      maxActive = data.totalActiveCells;
    }
  }

  return (
    <div style={{ width: "100%", height: "80%", position: "relative", border: "0px solid red" }}>
      <svg width="100%" height="100%">
        <rect
          x={0}
          y={0}
          width={svgWidth}
          height={svgHeight}
          fill="#ececec"
          stroke="#D3D3D3"
          strokeWidth="2"
        />

        {type === "line" ? (
          <polyline
            points={growthData.map((data, index) => {
              const x = index * (barWidth + 2);
              const y = svgHeight - (data.totalActiveCells * (svgHeight / maxActive));
              return `${x},${y}`;
            }).join(" ")}
            fill="none"
            stroke="#63dbb3"
            strokeWidth="2"
          />
        ) : (
          growthData.map((data, index) => (
            <rect
              key={index}
              x={index * (barWidth + 2)}
              y={svgHeight - (data.totalActiveCells * (svgHeight / maxActive))}
              width={barWidth}
              height={(data.totalActiveCells) * (svgHeight / maxActive)}
              fill="#63dbb3"
            />
          ))
        )}

        <text x={svgWidth / 2 - 20} y={svgHeight - 2}>Time (sec)</text>
        <text x={0} y={svgHeight / 2 - 20} transform={`rotate(-90, 40, ${svgHeight / 2})`}>Active Cells</text>
      </svg>
    </div>
  );
};

export default Chart;

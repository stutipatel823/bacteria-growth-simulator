import React, { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Button from "./components/Button";
import "./App.css";
import Chart from "./components/Chart";

const App = () => {
  const [size, setSize] = useState<number>(20); // State for grid size

  const [selectedSpeed, setSelectedSpeed] = useState<number>(1000);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [grid, setGrid] = useState<boolean[][]>(initializeGrid(size));
  const [activeCells, setActiveCells] = useState<{ r: number; c: number }[]>(
    []
  );
  const [growthData, setGrowthData] = useState<
    Array<{ timestamp: number; totalActiveCells: number }>
  >([]);

  function initializeGrid(size: number): boolean[][] {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => false)
    );
  }
  const handleCellClick = (r: number, c: number) => {
    const newGrid = grid.map((cell) => cell);
    newGrid[r][c] = !newGrid[r][c];
    setGrid(newGrid);

    const updatedActiveCells: Array<{ r: number; c: number }> = [];
    newGrid.map((row, rowIndex) => {
      row.map((cell, colIndex) => {
        if (cell) {
          updatedActiveCells.push({ r: rowIndex, c: colIndex });
        }
      });
    });
    setActiveCells(updatedActiveCells);
  };

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const intervalId = setInterval(() => {
      bacteriaDivision();
    }, selectedSpeed);

    return () => clearInterval(intervalId);
  }, [isPlaying, selectedSpeed, grid, activeCells]);

  const handleRestartClick = () => {
    setGrid(initializeGrid(size));
    setActiveCells([]);
    setIsPlaying(false);
    setGrowthData([]);
  };
  const handleSizeChange = (newSize: number) => {
    const maxSize = 100; // Maximum size limit
    if (newSize > maxSize) {
      newSize = maxSize; // Cap newSize to maxSize
    }
    setSize(newSize);
    setGrid(initializeGrid(newSize));
    setActiveCells([]);
    setIsPlaying(false);
  };
  const bacteriaDivision = () => {
    const newActiveCells: Array<{ r: number; c: number }> = [];

    activeCells.forEach((cell) => {
      const { r, c } = cell;

      const neighbors = [
        { newX: r + 1, newY: c }, // north
        { newX: r - 1, newY: c }, // south
        { newX: r, newY: c + 1 }, // east
        { newX: r, newY: c - 1 }, // west
      ];

      // let continueSpread = true;

      neighbors.forEach(({ newX, newY }) => {
        if (
          // continueSpread &&
          newX >= 0 &&
          newX < size &&
          newY >= 0 &&
          newY < size &&
          !grid[newX][newY]
        ) {
          grid[newX][newY] = true;
          newActiveCells.push({ r: newX, c: newY });
          // continueSpread = false;
        }
      });
    });

    // Check if all cells are true
    let allCellsTrue = true;
    let activeCount = 0;
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (!cell) {
          allCellsTrue = false;
          return;
        } else {
          activeCount++;
        }
      });
    });
    if (allCellsTrue) {
      setIsPlaying(false); // Update isPlaying state if all cells are true
      return; // end the simulator (stop spreading)
    }

    setGrid(grid);
    // setActiveCells(activeCells.concat(newActiveCells));
    setActiveCells(newActiveCells);

    setGrowthData((prevGrowthData) => {
      return prevGrowthData.concat({
        timestamp: Date.now(),
        totalActiveCells: activeCount,
      });
    });
    console.log("activeCell", activeCells);
  };

  return (
    <div className="main-container">
      <div className="header">Bacteria Spread Simulator</div>
      <div className="sidebar">
        <h3>Controls</h3>
        <div className="settings-container">
          <div className="setting-item">
            <p>Speed:</p>
            <select
              onChange={(event) =>
                setSelectedSpeed(parseInt(event.target.value))
              }
            >
              <option value="1000">1 sec</option>
              <option value="2000">2 sec</option>
              <option value="3000">3 sec</option>
              <option value="4000">4 sec</option>
              <option value="5000">5 sec</option>
            </select>
          </div>
          <div className="setting-item">
            <p>Grid Size:</p>
            <input
              type="number"
              placeholder="Enter Size"
              value={size}
              onChange={(event) =>
                handleSizeChange(parseInt(event.target.value))
              }
            />
          </div>
          <div className="setting-item">
            <Button
              color={isPlaying ? "#febd3e" : "#20bc8c"}
              title={isPlaying ? "PAUSE" : "PLAY"}
              onClick={handlePlayPauseClick}
            />
          </div>
          <div className="setting-item">
            <Button
              color="#f54d5f"
              title="RESTART"
              onClick={handleRestartClick}
            />
          </div>
        </div>
      </div>
      <div className="container-grid">
        <h3>Simulation</h3>
        <Grid size={size} grid={grid} onCellClick={handleCellClick} />
      </div>
      <div className="container-chart">
        <h3>Growth Data</h3>
        <Chart growthData={growthData} type="bar" />
      </div>
      <div className="container-chart-2">
        <h3>Growth Data</h3>
        <Chart growthData={growthData} type="line" />
      </div>
    </div>
  );
};

export default App;

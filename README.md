# Bacteria Spread Simulator

Bacteria Spread Simulator is a React and TypeScript-based application that showcases the bacteria spreading process. This simulation is based on the contamination process, such that when an active cell encounters an inactive neighboring cell, it contaminates the neighboring cell. This contamination occurs over a period of time, and hence the growth rate is shown on the two graphs to the right as the bacteria spread.

## Features

- **Interactive Grid:** Users can click on the cells to activate or deactive the cells.
- **Control/Settings:** Users can change the speed of bacterial spread process, alter the size of grid, and play/pause/restart the simulation.
- **Visualization:**  Users can see real-time updates and visualizations of the bacteria spread on the provided bar and line charts.

## Setup Instructions

1. Install Node.js and npm package
2. Clone the repository
    
    ```bash
    git clone https://github.com/your-username/bacteria-spread-simulator.git
    ```
    
3. change directory to the cloned folder
    
    ```bash
    cd bacteria-spread-simulator
    ```
    
4. Install npm and start the application. 
    
    ```bash
    npm install
    npm start
    ```
    
    This should open up your default web browser with the simulation.
    

## Project Structure

- **components**
    - **Button.tsx:** A reusable button component used for play/pause and restart actions.
    - **Cell.tsx:** A component representing a single cell in the grid.
    - **Grid.tsx:** A component representing the entire grid.
    - **Chart.tsx:** A component for displaying growth data in chart form.
- **App.tsx:** The main application component containing the state and logic for the simulation.
- **App.css:** Styling for the application.

## Assumptions

- Grid size is limited to 100x100 size to ensure performance and usability.
- Grid begins with no active cells. Thus, users can add/remove as they prefer.
- Bacteria spreads in all directions of the compass as long as the neighbour cell is inactive. Reason being, research indicates that bacteria can either divide through binary fission or contaminate surrounding cells. For this simulation, I chose to depict the spread of bacteria through contamination.

## Performance Analysis

The performance of the application is assessed based on its ability to handle different grid sizes and simulation speeds. Key performance metrics include:

- **Render Time:** The time taken to render the grid and update the UI after each simulation step.
- **Memory Usage:** The amount of memory required by the application, especially when handling large grids.
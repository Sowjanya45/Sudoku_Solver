import React, { useEffect, useState } from "react";

function Interface({ handleInterface, status }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="interface">
      {/* Toggle Button: top-left */}
      <button
        className="mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle Light/Dark Mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <h1 className="app-title">Sudoku Solver</h1>

      <div className="info-interface">
        <input readOnly value={status}></input>
      </div>

      <div className="action-interface">
        <button className="btn" onClick={() => handleInterface("create")}>
          Create
        </button>
        <button className="btn" onClick={() => handleInterface("validate")}>
          Validate
        </button>
        <button className="btn" onClick={() => handleInterface("solve")}>
          Solve
        </button>
        <button className="btn" onClick={() => handleInterface("clear")}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default Interface;

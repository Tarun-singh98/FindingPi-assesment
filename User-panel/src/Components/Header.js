import React from "react";
import "./Header.css";


export default function Header({
    handleRestore,
    seachText,
    handleSearchChange,
  }) {
    return (
      <div>
        <div className="header">
          <h2 className="header-title">User Panel</h2>
  
          <div>
            <button
              type="button"
              className="restore-button"
              onClick={handleRestore}
            >
              Restore
            </button>
          </div>
        </div>
        <div className="input-bar">
          <input
            placeholder="Search by Employee name"
            name="search"
            className="search-bar"
            value={seachText}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </div>
      </div>
    );
  }
  
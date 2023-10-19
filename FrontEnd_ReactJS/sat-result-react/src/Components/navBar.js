import React from 'react';
import './navBar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Insert Data</a>
        </li>
        <li>
          <a href="/delete-data">Delete Records</a>
        </li>
        <li>
          <a href="/get-rank">Getting Rank</a>
        </li>
        <li>
          <a href="/update-score">Updating Score</a>
        </li>
        <li>
          <a href="/view-data">View Data</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

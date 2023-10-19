import React, { useState } from 'react';
import "./updatingScore.css";

function UpdateScore() {
  const [name, setName] = useState('');
  const [satScore, setSatScore] = useState('');
  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSatScoreChange = (event) => {
    setSatScore(event.target.value);
  };

  const handleUpdateScore = () => {

    if (!name || !satScore) {
      alert('Please fill in both Name and SAT Score fields.');
      return;
    }

   
    fetch(`http://localhost:8082/api/sat-results/update-score/${name}?satScore=${satScore}`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(data => {
            if (!response.ok) {
              alert('Student data not found in the database.');
            } else {
              window.location.href = '/view-data';
            }
          }).catch(error => {
            alert('Student data not found in the database.');
            console.error('Error parsing response:', error);
          });
        }
         else {
          console.error('Error updating score.');
        }
      })
      .catch((error) => {
        console.error('Error updating score:', error);
      });
  };

  return (
    <div>
      <h1 style={{marginLeft:'30%'}}>Update SAT Score</h1>
      <div style={{marginLeft:'30%', width:'30%'}}>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div style={{marginLeft:'30%', width:'30%'}}>
        <label>SAT Score:</label>
        <input type="number" value={satScore} onChange={handleSatScoreChange} />
      </div>
      <button style={{marginLeft:'30%'}} onClick={handleUpdateScore}>Update Score</button>
    </div>
  );
}

export default UpdateScore;

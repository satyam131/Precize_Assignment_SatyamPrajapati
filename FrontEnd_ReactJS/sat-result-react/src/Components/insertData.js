import React, { useState } from 'react';
import "./insertData.css";


function InsertData() {
  const [satResult, setSatResult] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    pincode: '',
    satScore: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSatResult({
      ...satResult,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !satResult.name ||
      !satResult.address ||
      !satResult.city ||
      !satResult.country ||
      !satResult.pincode ||
      !satResult.satScore
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/api/sat-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(satResult),
      });

      if (response.ok) {

        alert('Data inserted successfully.');

        setSatResult({
          name: '',
          address: '',
          city: '',
          country: '',
          pincode: '',
          satScore: 0,
        });

      } else {
        alert('Error inserting data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div className='submitData'>

      <h1 className='insertHeadName'>Insert SAT Result</h1>
      <form onSubmit={handleSubmit} className='insertFormHome'>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={satResult.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={satResult.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={satResult.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={satResult.country}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={satResult.pincode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>SAT Score:</label>
          <input
            type="number"
            name="satScore"
            value={satResult.satScore}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InsertData;

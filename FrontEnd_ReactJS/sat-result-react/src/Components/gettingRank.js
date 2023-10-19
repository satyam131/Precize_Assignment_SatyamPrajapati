import React, { useState } from 'react';
import "./gettingRank.css";

function GetRank() {
    const [name, setName] = useState('');
    const [rank, setRank] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const fetchRank = () => {
        setLoading(true);
        fetch(`http://localhost:8082/api/sat-results/rank/${name}`)
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok');
            })
            .then((data) => {
                setRank(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching rank:', error);
                setRank('Rank not found');
                setLoading(false);
            });
    };

    return (
        <div className='gettingRank-container'>
            <h1>Get Rank</h1>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={handleNameChange} />
                <button onClick={fetchRank}>Get Rank</button>
            </div>
            {loading ? (
                <p>Loading rank...</p>
            ) : (
                <p>{rank}</p>
            )}
        </div>
    );
}

export default GetRank;

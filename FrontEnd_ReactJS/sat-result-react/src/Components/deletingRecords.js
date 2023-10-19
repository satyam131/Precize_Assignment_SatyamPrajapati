import React, { useState } from 'react';


function DeleteRecord() {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        setErrorMessage('');
    };

    const handleDeleteRecord = () => {
        fetch(`http://localhost:8082/api/sat-results/delete/${name}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = '/view-data';
                } else {
                    alert("Student Not Found");
                    console.error('Error deleting record.');
                }
            })
            .then((data) => {
                if (data) {
                    setErrorMessage(data);
                }
            })
            .catch((error) => {
                console.error('Error deleting record:', error);
            });
    };

    const divStyle = {
        width: '40%',
        marginLeft: '30%',
    };

    return (
        <div >
            <div >
                <h1 style={{ marginLeft: '30%' }}>Delete Record</h1>
                <div style={divStyle}>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={handleNameChange} />
                </div>
                <button onClick={handleDeleteRecord} style={{ marginLeft: '30%' }}>Delete Record</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </div>
    );
}

export default DeleteRecord;

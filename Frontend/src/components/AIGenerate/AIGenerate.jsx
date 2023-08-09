import React, { useState } from 'react';

const AIGenerate = () => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const apiResponse = await fetch('http://127.0.0.1:5000/api/AIGenerate', {
        method: 'POST', // Use POST method
      });
  
      if (!apiResponse.ok) {
        throw new Error('Request failed');
      }
  
      const data = await apiResponse.json();
      setExercises(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data from the API.');
    }
    setIsLoading(false);
  };
  

  return (
    <div>
      <div className='programs-header'>
        <h1 className='Header'>Or let AI generate it for you</h1>
      </div>
      <button onClick={handleButtonClick}>Generate AI</button>
      {isLoading && <p>Loading...</p>} {/* Display loading message if isLoading is true */}
      {error && <p>Error: {error}</p>}
      {exercises.length > 0 && (
        <div>
          <h2>Generated Exercises:</h2>
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIGenerate;

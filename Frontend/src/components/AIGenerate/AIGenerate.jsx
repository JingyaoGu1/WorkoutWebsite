import React, { useState } from 'react';
import './AIGenerate.css'; // Import your CSS file for styling

const AIGenerate = () => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner');

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const apiResponse = await fetch('http://127.0.0.1:5000/api/AIGenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age,
          height,
          weight,
          experienceLevel,
        }),
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
    <div className="aigenerate-container">
      <div className="programs-header">
        <h1 className="header">Or let AI generate it for you</h1>
      </div>
      <div className="input-container">
        <label className="input-label">Age:</label>
        <input
          type="number"
          className="input-field"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label className="input-label">Height:</label>
        <input
          type="number"
          className="input-field"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label className="input-label">Weight:</label>
        <input
          type="number"
          className="input-field"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label className="input-label">Experience Level:</label>
        <select
          className="select-field"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <button className="generate-button" onClick={handleButtonClick}>
        Generate AI
      </button>
      {isLoading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {exercises.length > 0 && (
        <div className="generated-exercises">
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

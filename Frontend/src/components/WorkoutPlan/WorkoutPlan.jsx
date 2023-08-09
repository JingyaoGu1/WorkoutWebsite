import React, { useState } from 'react';
import './WorkoutPlan.css'

const WorkoutPlan = () => {
    const [equipmentType, setEquipmentType] = useState('All');
    const [difficultyLevel, setDifficultyLevel] = useState('All');
    const [bodyPart, setBodyPart] = useState('All');
    const [workoutPlan, setWorkoutPlan] = useState(null);
  
    const handleEquipmentTypeChange = (event) => {
      setEquipmentType(event.target.value);
    };

    const handleBodyPartChange = (event) => {
      setBodyPart(event.target.value);
    };
  
    const handleDifficultyLevelChange = (event) => {
      setDifficultyLevel(event.target.value);
    };
  
    const searchWorkoutPlan = () => {
      const requestData = {
        equipment_type: equipmentType,
        difficulty_level: difficultyLevel,
        body_part: bodyPart
      };
  
      fetch('http://127.0.0.1:5000/api/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setWorkoutPlan(JSON.parse(data));
        })
        .catch((error) => {
          console.error('Error:', error);
          setWorkoutPlan(null);
        });
    };
  
    return (
      <div>
        <div className='programs-header'>
        <h1 className='Header'>
          Or search it yourself
          </h1>
        </div>
        <form className="search-form">
          {/* Equipment Type */}
        <label className='dropdown' for="equipment_type">Equipment Type:</label>
          <select className='dropdown' id="equipment_type" value={equipmentType} onChange={handleEquipmentTypeChange}>
          <option value="All">All</option>
          <option value="Bands">Bands</option>
          <option value="Barbell">Barbell</option>
          <option value="Kettlebells">Kettlebells</option>
          <option value="Dumbbell">Dumbbell</option>
          <option value="Cable">Cable</option>
          <option value="Machine">Machine</option>
          <option value="Body Only">Body Only</option>
          <option value="Medicine Ball">Medicine Ball</option>
          <option value="Exercise Ball">Exercise Ball</option>
          <option value="Foam Roll Ball">Foam Roll</option>
          <option value="E-Z Curl Bar Ball">E-Z Curl Bar</option>
          <option value="Other Ball">Other Ball</option>
          {/* Body Type */}
          </select>
          <label className='dropdown' for="body_part">Body Type:</label>
          <select className='dropdown' id="body_part" value={bodyPart} onChange={handleBodyPartChange}>
          <option value="All">All</option>
          <option value="Abdominals">Abdominals</option>
          <option value="Adductors">Adductors</option>
          <option value="Abductors">Abductors</option>
          <option value="Biceps">Biceps</option>
          <option value="Calves">Calves</option>
          <option value="Chest">Chest</option>
          <option value="Forearms">Forearms</option>
          <option value="Glutes">Glutes</option>
          <option value="Hamstrings">Hamstrings</option>
          <option value="Lats">Lats</option>
          <option value="Lower Back">Lower Back</option>
          <option value="Middle Back">Middle Back</option>
          <option value="Traps">Traps</option>
          <option value="Neck">Neck</option>
          <option value="Quadriceps">Quadriceps</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Triceps">Triceps</option>
            {/* Add more options as needed */}
          </select>
          <label className='dropdown' htmlFor="difficultyLevel">Difficulty Level:</label>
          <select className='dropdown' id="difficultyLevel" value={difficultyLevel} onChange={handleDifficultyLevelChange}>
          <option value="All">All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
            {/* Add more options as needed */}
          </select>
          <button className="search-button" type="button" onClick={searchWorkoutPlan}>
            Search
          </button>
        </form>
        {workoutPlan && (
          <div className="workout-plan">
            <h2>Workouts based on your search</h2>
            {/* Render the workout plan data here */}
            {/* <pre>{JSON.stringify(workoutPlan, null, 2)}</pre> */}
            <table className="workout-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Type</th>
                <th>Body Part</th>
                <th>Equipment</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {workoutPlan.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.Title}</td>
                  <td>{exercise.Desc}</td>
                  <td>{exercise.Type}</td>
                  <td>{exercise.BodyPart}</td>
                  <td>{exercise.Equipment}</td>
                  <td>{exercise.Level}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    );
  };
  
  export default WorkoutPlan;
  
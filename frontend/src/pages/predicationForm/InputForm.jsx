import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import WecomeBackground from '../images/LabBackground.jpeg'
import './InputForm.css';

function InputForm({ setResults }) {
  const [formData, setFormData] = useState({
    name: 'Roy',
    nationalid: '20011470980',
    email: 'Roy@gmail.com',
    sex: '1',
    age: '36',
    date:'2023-04-16',
    height: '9',
    weight: '75',
    currentSmoker: '1',
    cigsPerDay: '10',
    BPMeds: '0',
    prevalentStroke: '0',
    prevalentHyp: '1',
    diabetes: '0',
    totChol: '220',
    sysBP: '100',
    diaBP: '90',
    BMI: '28',
    heartRate: '80',
    glucose: '120',

  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // If 'Current Smoker' is 'No', disable 'Cigarettes Per Day' field
    if (name === 'currentSmoker' && value === '0') {
      setFormData(prevState => ({
        ...prevState,
        cigsPerDay: '' // Reset 'Cigarettes Per Day' to empty string
      }));
    }

    // Calculate BMI
    if (name === 'height' || name === 'weight' || name === 'feet' || name === 'inches') {
      const feet = parseFloat(formData.feet) || 0; // Convert feet to number, defaulting to 0 if empty
      const inches = parseFloat(formData.inches) || 0; // Convert inches to number, defaulting to 0 if empty
      const heightInMeters = (feet * 12 + inches) * 0.0254; // Convert feet and inches to meters
      const weightInKg = parseFloat(formData.weight); // Weight in kilograms
      const bmi = weightInKg / (heightInMeters * heightInMeters); // BMI calculation
      setFormData(prevState => ({
        ...prevState,
        BMI: isNaN(bmi) ? '' : bmi.toFixed(2) // Round BMI to two decimal places if it's a number
      }));
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // First, make the prediction request
      const predictionRes = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResults(predictionRes.data);
  
      // Extract prediction results
      const { risk_level_percentage, result, stress_level } = predictionRes.data;
  
      // Add prediction results to formData
      const dataToSend = {
        ...formData,
        risk_level_percentage,
        result,
        stress_level
      };
  
      // Save form input data along with prediction results
    await axios.post('http://127.0.0.1:4000/patient-details', dataToSend);
    
    await axios.post('http://127.0.0.1:4000/increment-prediction-count');
  
      // Navigate to result page
      navigate('/result');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== '');
    setIsFormComplete(isComplete);
  }, [formData]);

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(${WecomeBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    
  };

  return (
<div className="input-form-container" style={backgroundImageStyle}>
  <Card className='predction-form-card' style={{ maxHeight: '85vh', overflowY: 'auto' }} >
    <h2 className='form-heding'>Fill the Patient Informations </h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="input-form">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
            </div>

            <div className="form-group">
              <label>National ID:</label>
              <input type="text" name="nationalid" value={formData.nationalid} onChange={handleChange} className="form-control" required />
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
            </div>

            <div className="form-group">
              <label>Sex:</label>
              <select name="sex" value={formData.sex} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select Sex</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Age:</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" min="0" required />
            </div>

            <div className="form-group">
               <label>Date:</label>
               <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
            </div>

            <div className="form-group">
                <label>Height (Feet):</label>
                <input type="number" name="feet" value={formData.feet} onChange={handleChange} className="form-control" min="0" required />
              </div>
              <div className="form-group">
                <label>Height (Inches):</label>
                <input type="number" name="inches" value={formData.inches} onChange={handleChange} className="form-control" min="0" max="11" required />
              </div>

              <div className="form-group">
                <label>Weight (kg):</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="form-control" min="0" required />
             </div>

            <div className="form-group">
              <label>Current Smoker:</label>
              <select name="currentSmoker" value={formData.currentSmoker} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cigarettes Per Day:</label>
              <input type="number" name="cigsPerDay" value={formData.cigsPerDay} onChange={handleChange} className="form-control" min="0" required />
            </div>

            <div className="form-group">
              <label>BPMeds:</label>
              <select name="BPMeds" value={formData.BPMeds} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prevalent Stroke:</label>
              <select name="prevalentStroke" value={formData.prevalentStroke} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="input-form">
            <div className="form-group">
              <label>Prevalent Hyp:</label>
              <select name="prevalentHyp" value={formData.prevalentHyp} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Diabetes:</label>
              <select name="diabetes" value={formData.diabetes} onChange={handleChange} className="form-control" required>
                <option value="" disabled>Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Total Cholesterol (mg/dL):</label>
              <input type="number" name="totChol" value={formData.totChol} onChange={handleChange} className="form-control" min="0" required />
            </div>

            <div className="form-group">
              <label>Systolic BP (mmHg):</label>
              <input type="number" name="sysBP" value={formData.sysBP} onChange={handleChange} className="form-control" min="0" required />
            </div>

            <div className="form-group">
              <label>Diastolic BP (mmHg):</label>
              <input type="number" name="diaBP" value={formData.diaBP} onChange={handleChange} className="form-control" min="0" required />
            </div>

            <div className="form-group">
              <label>BMI:</label>
              <input type="text" name="BMI" value={formData.BMI} onChange={handleChange} className="form-control" required />
           </div>

            <div className="form-group">
              <label>Heart Rate (bpm):</label>
              <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} className="form-control" min="0" required />
            </div>

            <div className="form-group">
              <label>Glucose (mg/dL):</label>
              <input type="number" name="glucose" value={formData.glucose} onChange={handleChange} className="form-control" min="0" required />
            </div>

            <button type="submit" className="btn btn-secondary">
              {isLoading ? 'Loading...' : 'Predict'}
            </button>
          </form>
        </div>
      </div>
    </Card>
    </div>
   
  );
}

export default InputForm;



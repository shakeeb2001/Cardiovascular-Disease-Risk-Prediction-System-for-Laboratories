import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './InputForm.css';

function InputForm({ setResults }) {
  const [formData, setFormData] = useState({
    name: 'shakeeb',
    nationalid: '20011470987',
    email: 'ahamed@gmail.com',
    sex: '1',
    age: '34',
    height: '180',
    weight: '80',
    currentSmoker: '1',
    cigsPerDay: '15',
    BPMeds: '0',
    prevalentStroke: '0',
    prevalentHyp: '0',
    diabetes: '0',
    totChol: '230',
    sysBP: '110',
    diaBP: '88',
    BMI: '24',
    heartRate: '90',
    glucose: '110'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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

  return (
    <div className="input-form-container">
  
      <h2 className='text-left'>Prediction Form</h2>
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
              <label>Height (cm):</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} className="form-control" min="0" required />
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
              <input type="number" name="BMI" value={formData.BMI} onChange={handleChange} className="form-control" min="0" required />
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
    </div>
  );
}

export default InputForm;



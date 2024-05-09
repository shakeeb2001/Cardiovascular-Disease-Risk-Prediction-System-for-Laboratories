// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Col, Form, Button, Card } from 'react-bootstrap';
// import './credit_info.css';


// const CreditPredictionForm = ({ setResults }) => {
    
//     const [formData, setFormData] = useState({
//         Name: '',
//         nic:'',
//         tin:'',
//         Email: '',
//         Gender: '',
//         Reality: '',
//         Property_Type: [], // Updated to an array for checkboxes
//         wkphone: '',
//         phoneNumber: '',
//         Age_Category: '',
//         Work_Time_Category: '',
//         Occupation: '',
//         ChldNo: '',
//         Income_Category: '',
//         Family_Size: '',
//         House_Type: '',
//         Education_Type: '',
//         Marital_Status: '',
//     });

//     const navigate = useNavigate();
    

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         let newValue;
//         if (type === 'checkbox') {
//             // If checkbox, update Property_Type array based on checked status
//             newValue = checked
//                 ? [...formData.Property_Type, value] // Add value to array if checked
//                 : formData.Property_Type.filter((item) => item !== value); // Remove value if unchecked
//         } else {
//             newValue = value;
//         }
//         setFormData({ ...formData, [name]: newValue });
//     };
    

//     const handleSubmit = async (e) => {
//         e.preventDefault();

        
        

//         // Mapping object for transforming form data values
//       const mappings = {
//     Age_Category: {
//         gp_Age_category_lowest: 'Age 18-25',
//         gp_Age_category_low: 'Age 26-35',
//         gp_Age_category_medium: 'Age 36-55',
//         gp_Age_category_high: 'Age 56-65',
//         gp_Age_category_highest: 'Age 66+',
//     },
//     Property_Type: {
//         Car:'Car',
//         Land: 'Land',
//         Building: 'Building',

//     },
//     Work_Time_Category: {
//         gp_worktm_category_lowest: '0-8 years of work experience',
//         gp_worktm_category_low: '9-16 years of work experience',
//         gp_worktm_category_medium: '17-24 years of work experience',
//         gp_worktm_category_high: '25-32 years of work experience',
//         gp_worktm_category_highest: '33-40 years of work experience',
//     },
//     Occupation: {
//         occyp_Laborwk: 'Labor',
//         occyp_hightecwk: 'Businessman',
//         occyp_officewk: 'Office Worker',
//     },
//     ChldNo: {
//         ChldNo_0: 'None',
//         ChldNo_1: 'Only one child',
//         ChldNo_2More: 'Two or more children',
//     },
//     Income_Category: {
//         gp_inc_category_low: '$20,000 to $70,000',
//         gp_inc_category_medium: '$71,000 to $130,000',
//         gp_inc_category_high: '$131,000 to $200,000+',
//     },
//     Family_Size: {
//         famsizegp_1: 'Single-member family',
//         famsizegp_2: 'Two members in the family',
//         famsizegp_3more: 'Three or more members in the family',
//     },
//     House_Type: {
//        ' houtp_House apartment': 'House / Apartment',
//         'houtp_Co_op apartment': 'Co-op Apartment',
//         'houtp_Municipal apartment': 'Municipal Apartment',
//         'houtp_Office apartment': 'Office Apartment',
//         'houtp_Rented apartment': 'Rented Apartment',
//         'houtp_With parents': 'With Parents',
//     },
//     Education_Type: {
//         'edutp_Higher education': 'Higher Education',
//         'edutp_Incomplete higher': 'Incomplete Higher',
//         'edutp_Lower secondary': 'None',
//         'edutp_Secondary / secondary special': 'Secondary / Secondary Special',
//     },
//     Marital_Status: {
//         'famtp_Civil marriage': 'Civil Marriage',
//         famtp_Married: 'Married',
//         famtp_Separated: 'Separated',
//         'famtp_Single / not married': 'Single / Not Married',
//         famtp_Widow: 'Widow',
//     },
// };




//             // Transform the form data before sending
//             const transformedData = { ...formData };
//             Object.keys(mappings).forEach((key) => {
//                 if (transformedData[key]) {
//                     transformedData[key] = mappings[key][transformedData[key]];
//                 }
//             });

//             const fileInput = document.getElementById('fileInput');
//             formData.append('file', fileInput.files[0]);

//         try {
//             // Send image file to localhost:4000/customer-data
//             await axios.post('http://127.0.0.1:4000/customer-data', transformedData,{
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             // Perform prediction
//             const predictionRes = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log(predictionRes.data);
//             setResults(predictionRes.data.scaled_prediction);

//             navigate('/result');

//         } catch (error) {
//             console.error('Error:', error.response ? error.response.data : error.message);
//         }
//     };

    
//     return (
//         <Container fluid className='prediction-from'>
//             <Col md={6}>
//                 <Card className='form-card'>
//                     <h2 className='prediction-title'> Application Form</h2>
//                     <br />
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group>
//                             <Form.Label>Name:</Form.Label>
                            
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 name="Name"
//                                 value={formData.Name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>NIC:</Form.Label>
                            
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your NIC"
//                                 name="nic"
//                                 value={formData.nic}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>TIN:</Form.Label>
                            
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your TIN Number"
//                                 name="tin"
//                                 value={formData.tin}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Email:</Form.Label>
                            
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 name="Email"
//                                 value={formData.Email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Gender:</Form.Label>
                            
//                             <Form.Control as="select" name="Gender" value={formData.Gender} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="1">Male</option>
//                                 <option value="0">Female</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Properties:</Form.Label>
                            
//                             <Form.Control as="select" name="Reality" value={formData.Reality} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="1">Yes</option>
//                                 <option value="0">No</option>
//                             </Form.Control>
//                         </Form.Group>
//                         {/* New Property Type field with checkboxes */}
//                         {/* New Property Type field with checkboxes */}
//                         <Form.Group>
//                             <Form.Label>Property Type:</Form.Label>
                            
//                             <Form.Check
//                                 inline
//                                 type="checkbox"
//                                 label="Car"
//                                 name="Property_Type"
//                                 value={formData.Property_Type="Car"}
//                                 onChange={handleChange}
                                
//                             />
//                             <Form.Check
//                                 inline
//                                 type="checkbox"
//                                 label="Land"
//                                 name="Property_Type"
//                                 value={formData.Property_Type="Land"}
//                                 onChange={handleChange}
                                
//                             />
//                             <Form.Check
//                                 inline
//                                 type="checkbox"
//                                 label="Building"
//                                 name="Property_Type"
//                                 value={formData.Property_Type="Building"}
//                                 onChange={handleChange}
                                
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Phone</Form.Label>
//                             <Form.Control as="select" name="wkphone" value={formData.wkphone} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="1">Yes</option>
//                                 <option value="0">No</option>
//                             </Form.Control>
//                         </Form.Group>
//                         {formData.wkphone === '1' && (
//                             <Form.Group>
                            
                                
//                                 <Form.Control
//                                 type="text"
//                                 placeholder="Enter phone number"
//                                 name="phoneNumber"
//                                 value={formData.phoneNumber}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             </Form.Group>
//                         )}
//                         <Form.Group >
//                             <Form.Label>Age Category:</Form.Label>
//                             <Form.Control as="select" name="Age_Category" value={formData.Age_Category} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="gp_Age_category_lowest">Age 18-25</option>
//                                 <option value="gp_Age_category_low">Age 26-35</option>
//                                 <option value="gp_Age_category_medium">Age 36-55</option>
//                                 <option value="gp_Age_category_high">Age 56-65</option>
//                                 <option value="gp_Age_category_highest">Age 66+</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Work Time Category:</Form.Label>
//                             <Form.Control as="select" name="Work_Time_Category" value={formData.Work_Time_Category} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="gp_worktm_category_lowest"> 0-8 years of work experience</option>
//                                 <option value="gp_worktm_category_low">9-16 years of work experience</option>
//                                 <option value="gp_worktm_category_medium">17-24 years of work experience</option>
//                                 <option value="gp_worktm_category_high">25-32 years of work experience</option>
//                                 <option value="gp_worktm_category_highest">33-40 years of work experience</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Occupation:</Form.Label>
//                             <Form.Control as="select" name="Occupation" value={formData.Occupation} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="occyp_Laborwk">Labor</option>
//                                 <option value="occyp_hightecwk">Businessman</option>
//                                 <option value="occyp_officewk">Office Worker</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Children Number:</Form.Label>
//                             <Form.Control as="select" name="ChldNo" value={formData.ChldNo} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="ChldNo_0">None</option>
//                                 <option value="ChldNo_1">Only one child</option>
//                                 <option value="ChldNo_2More">Two or more children</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Income Category:</Form.Label>
//                             <Form.Control as="select" name="Income_Category" value={formData.Income_Category} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>  
//                                 <option value="gp_inc_category_low">$20,000 to $70,000</option>
//                                 <option value="gp_inc_category_medium">$71,000 to $130,000</option>
//                                 <option value="gp_inc_category_high">$131,000 to $200,000+</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Family Size:</Form.Label>
//                             <Form.Control as="select" name="Family_Size" value={formData.Family_Size} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="famsizegp_1">Single-member family</option>
//                                 <option value="famsizegp_2">Two members in the family</option>
//                                 <option value="famsizegp_3more">Three or more members in the family</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Accommodation Type:</Form.Label>
//                             <Form.Control as="select" name="House_Type" value={formData.House_Type} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="houtp_House / apartment">House / Apartment</option>
//                                 <option value="houtp_Co-op apartment">Co-op Apartment</option>
//                                 <option value="houtp_Municipal apartment">Municipal Apartment</option>
//                                 <option value="houtp_Office apartment">Office Apartment</option>
//                                 <option value="houtp_Rented apartment">Rented Apartment</option>
//                                 <option value="houtp_With parents">With Parents</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group >
//                             <Form.Label>Education Type:</Form.Label>
//                             <Form.Control as="select" name="Education_Type" value={formData.Education_Type} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="edutp_Higher education">Higher Education</option>
//                                 <option value="edutp_Incomplete higher">Incomplete Higher</option>
//                                 <option value="edutp_Lower secondary"> None</option>
//                                 <option value="edutp_Secondary / secondary special">Secondary / Secondary Special</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Marital Status:</Form.Label>
//                             <Form.Control as="select" name="Marital_Status" value={formData.Marital_Status} onChange={handleChange} required>
//                                 <option value="" disabled>Select</option>
//                                 <option value="famtp_Civil marriage">Civil Marriage</option>
//                                 <option value="famtp_Married">Married</option>
//                                 <option value="famtp_Separated">Separated</option>
//                                 <option value="famtp_Single / not married">Single / Not Married</option>
//                                 <option value="famtp_Widow">Widow</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <br />
//                         <Form.Group>
//                             <Form.Label>Upload Image:</Form.Label>
//                             <Form.Control type="file" id="fileInput"/>
//                         </Form.Group>
//                         <Button className='prediction-button' variant='none' type="submit" block>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             </Col>
//         </Container>
//     );
// };

// export default CreditPredictionForm;



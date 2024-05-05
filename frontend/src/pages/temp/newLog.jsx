// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
// import './newLog.css';

// const CreditPredictionForm = ({ setResults }) => {
//     const [formData, setFormData] = useState({
//         Gender: '0',
//         Reality: '0',
//         wkphone: '1',
//         Age_Category: 'gp_Age_category_lowest',
//         Work_Time_Category: 'gp_worktm_category_lowest',
//         Occupation: 'occyp_Laborwk',
//         ChldNo: 'ChldNo_0',
//         Income_Category: 'gp_inc_category_low',
//         Family_Size: 'famsizegp_1',
//         House_Type: 'houtp_House / apartment',
//         Education_Type: 'edutp_Higher education',
//         Marital_Status: 'famtp_Civil marriage'
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log(res.data);
//             setResults(res.data.scaled_prediction);
//             navigate('/result', { scaled_prediction: res.data.scaled_prediction });
//         } catch (error) {
//             console.error('Error:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <Container fluid className='prediction-from'>
//             <Row>
//                 <Col md={6}>
//                  <Card className='form-card'>
//                 <h1 className='prediction-title'>Prediction Form</h1>
//                 <br />
//                  <Form onSubmit={handleSubmit}>
//                         {/* Gender, Reality, Work Phone */}
//                         <Row>
//                             <Col md={4}>
//                                 <Form.Group controlId="Gender">
//                                     <Form.Label>Gender:</Form.Label>
//                                     <Form.Control  as="select" name="Gender" value={formData.Gender} onChange={handleChange}>
//                                         <option value="1">Male</option>
//                                         <option value="0">Female</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group controlId="Reality">
//                                     <Form.Label>Reality:</Form.Label>
//                                     <Form.Control as="select" name="Reality" value={formData.Reality} onChange={handleChange}>
//                                         <option value="1">Yes</option>
//                                         <option value="0">No</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group controlId="wkphone">
//                                     <Form.Label>Work Phone:</Form.Label>
//                                     <Form.Control as="select" name="wkphone" value={formData.wkphone} onChange={handleChange}>
//                                         <option value="1">Yes</option>
//                                         <option value="0">No</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                         </Row>

//                         {/* Age Category, Work Time Category, Occupation */}
//                         <Row>
//                             <Col md={4}>
//                                 <Form.Group controlId="Age_Category">
//                                     <Form.Label>Age Category:</Form.Label>
//                                     <Form.Control as="select" name="Age_Category" value={formData.Age_Category} onChange={handleChange}>
//                                         <option value="gp_Age_category_lowest">Lowest</option>
//                                         <option value="gp_Age_category_low">Low</option>
//                                         <option value="gp_Age_category_medium">Medium</option>
//                                         <option value="gp_Age_category_high">High</option>
//                                         <option value="gp_Age_category_highest">Highest</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group controlId="Work_Time_Category">
//                                     <Form.Label>Work Time Category:</Form.Label>
//                                     <Form.Control as="select" name="Work_Time_Category" value={formData.Work_Time_Category} onChange={handleChange}>
//                                         <option value="gp_worktm_category_lowest">Lowest</option>
//                                         <option value="gp_worktm_category_low">Low</option>
//                                         <option value="gp_worktm_category_medium">Medium</option>
//                                         <option value="gp_worktm_category_high">High</option>
//                                         <option value="gp_worktm_category_highest">Highest</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group controlId="Occupation">
//                                     <Form.Label>Occupation:</Form.Label>
//                                     <Form.Control as="select" name="Occupation" value={formData.Occupation} onChange={handleChange}>
//                                         <option value="occyp_Laborwk">Labor Work</option>
//                                         <option value="occyp_hightecwk">High Tech Work</option>
//                                         <option value="occyp_officewk">Office Work</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                         </Row>

//                         {/* Children Number, Income Category, Family Size */}
//                         <Row>
//                             <Col md={4}>
//                                 <Form.Group controlId="ChldNo">
//                                     <Form.Label>Children Number:</Form.Label>
//                                     <Form.Control as="select" name="ChldNo" value={formData.ChldNo} onChange={handleChange}>
//                                         <option value="ChldNo_0">0</option>
//                                         <option value="ChldNo_1">1</option>
//                                         <option value="ChldNo_2More">2 or more</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group controlId="Income_Category">
//                                     <Form.Label>Income Category:</Form.Label>
//                                     <Form.Control as="select" name="Income_Category" value={formData.Income_Category} onChange={handleChange}>
//                                         <option value="gp_inc_category_low">Low</option>
//                                         <option value="gp_inc_category_medium">Medium</option>
//                                         <option value="gp_inc_category_high">High</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group controlId="Family_Size">
//                                     <Form.Label>Family Size:</Form.Label>
//                                     <Form.Control as="select" name="Family_Size" value={formData.Family_Size} onChange={handleChange}>
//                                         <option value="famsizegp_1">1</option>
//                                         <option value="famsizegp_2">2</option>
//                                         <option value="famsizegp_3more">3 or more</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                         </Row>

//                         {/* House Type, Education Type, Marital Status */}
//                         <Row>
//                             <Col md={4}>
//                                 <Form.Group controlId="House_Type">
//                                     <Form.Label>House Type:</Form.Label>
//                                     <Form.Control as="select" name="House_Type" value={formData.House_Type} onChange={handleChange}>
//                                         <option value="houtp_House / apartment">House / Apartment</option>
//                                         <option value="houtp_Co-op apartment">Co-op Apartment</option>
//                                         <option value="houtp_Municipal apartment">Municipal Apartment</option>
//                                         <option value="houtp_Office apartment">Office Apartment</option>
//                                         <option value="houtp_Rented apartment">Rented Apartment</option>
//                                         <option value="houtp_With parents">With Parents</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group controlId="Education_Type">
//                                     <Form.Label>Education Type:</Form.Label>
//                                     <Form.Control as="select" name="Education_Type" value={formData.Education_Type} onChange={handleChange}>
//                                         <option value="edutp_Higher education">Higher Education</option>
//                                         <option value="edutp_Incomplete higher">Incomplete Higher</option>
//                                         <option value="edutp_Lower secondary">Lower Secondary</option>
//                                         <option value="edutp_Secondary / secondary special">Secondary / Secondary Special</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group controlId="Marital_Status">
//                                     <Form.Label>Marital Status:</Form.Label>
//                                     <Form.Control as="select" name="Marital_Status" value={formData.Marital_Status} onChange={handleChange}>
//                                         <option value="famtp_Civil marriage">Civil Marriage</option>
//                                         <option value="famtp_Married">Married</option>
//                                         <option value="famtp_Separated">Separated</option>
//                                         <option value="famtp_Single / not married">Single / Not Married</option>
//                                         <option value="famtp_Widow">Widow</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                             </Col>
//                         </Row>

//                         <Button className='prediction-button' variant='none' type="submit" block>
//                             Predict
//                         </Button>
//                     </Form>
//                  </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default CreditPredictionForm;


import React from 'react';
import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import './PDFViewerPage.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    color: 'rgb(13, 113, 86)',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'center'
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.5,
  },
  red: {
    backgroundColor: 'red',
    color: 'white',
  },
  yellow: {
    backgroundColor: 'yellow',
    color: 'black',
  },
  green: {
    backgroundColor: 'green',
    color: 'white',
  },
});

function PDFViewerPage({ selectedPatient }) {
  const getRiskColor = (riskLevel) => {
    if (riskLevel > 75) return styles.red;
    if (riskLevel > 50) return styles.yellow;
    return styles.green;
  };

  const getStressColor = (stressLevel) => {
    if (stressLevel === 'high') return styles.red;
    return null;
  };

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>
              C A R D I O C A R E <Text style={{ ...styles.title, color: 'red' }}>+</Text>
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Patient Report</Text>
            <br />
            <br />
            <Text style={styles.text}>{`Name: ${selectedPatient.name}`}</Text>
            <Text style={styles.text}>{`National ID: ${selectedPatient.nationalid}`}</Text>
            <Text style={styles.text}>{`Email: ${selectedPatient.email}`}</Text>
            <Text style={styles.text}>{`Sex: ${selectedPatient.sex === '1' ? 'Male' : 'Female'}`}</Text>
            <Text style={styles.text}>{`Age: ${selectedPatient.age}`}</Text>
            <Text style={styles.text}>{`Height: ${selectedPatient.height}`}</Text>
            <Text style={styles.text}>{`Weight: ${selectedPatient.weight}`}</Text>
            <Text style={styles.text}>{`Current Smoker: ${selectedPatient.currentSmoker === '1' ? 'Yes' : 'No'}`}</Text>
            <Text style={styles.text}>{`Cigarettes Per Day: ${selectedPatient.cigsPerDay}`}</Text>
            <Text style={styles.text}>{`BPMeds: ${selectedPatient.BPMeds === '1' ? 'Yes' : 'No'}`}</Text>
            <Text style={styles.text}>{`Prevalent Stroke: ${selectedPatient.prevalentStroke === '1' ? 'Yes' : 'No'}`}</Text>
            <Text style={styles.text}>{`Prevalent Hyp: ${selectedPatient.prevalentHyp === '1' ? 'Yes' : 'No'}`}</Text>
            <Text style={styles.text}>{`Diabetes: ${selectedPatient.diabetes === '1' ? 'Yes' : 'No'}`}</Text>
            <Text style={styles.text}>{`Total Cholesterol: ${selectedPatient.totChol}`}</Text>
            <Text style={styles.text}>{`Systolic BP: ${selectedPatient.sysBP}`}</Text>
            <Text style={styles.text}>{`Diastolic BP: ${selectedPatient.diaBP}`}</Text>
            <Text style={styles.text}>{`BMI: ${selectedPatient.BMI}`}</Text>
            <Text style={styles.text}>{`Heart Rate: ${selectedPatient.heartRate}`}</Text>
            <Text style={styles.text}>{`Glucose: ${selectedPatient.glucose}`}</Text>
            <Text style={[styles.text, getRiskColor(selectedPatient.risk_level_percentage)]}>{`Risk Level Percentage: ${selectedPatient.risk_level_percentage}`}</Text>
            <Text style={styles.text}>{`Result: ${selectedPatient.result}`}</Text>
            <Text style={[styles.text, getStressColor(selectedPatient.stress_level)]}>{`Stress Level: ${selectedPatient.stress_level}`}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default PDFViewerPage;




{/* <Text style={styles.text}>{`Name: ${selectedPatient.name}`}</Text>
<br />
<Text style={styles.text}>{`National ID: ${selectedPatient.nationalid}`}</Text> */}
import React from 'react';
import { PDFViewer, Document, Page, View, Text } from '@react-pdf/renderer';

function PDFViewerPage({ selectedPatient }) {
  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <Document>
          <Page>
            <View>
              <Text>{`Name: ${selectedPatient.name}`}</Text>
              <Text>{`National ID: ${selectedPatient.nationalid}`}</Text>
              <Text>{`Email: ${selectedPatient.email}`}</Text>
              <Text>{`Sex: ${selectedPatient.sex === '1' ? 'Male' : 'Female'}`}</Text>
              <Text>{`Age: ${selectedPatient.age}`}</Text>
              <Text>{`Height: ${selectedPatient.height}`}</Text>
              <Text>{`Weight: ${selectedPatient.weight}`}</Text>
              <Text>{`Current Smoker: ${selectedPatient.currentSmoker === '1' ? 'Yes' : 'No'}`}</Text>
              <Text>{`Cigarettes Per Day: ${selectedPatient.cigsPerDay}`}</Text>
              <Text>{`BPMeds: ${selectedPatient.BPMeds === '1' ? 'Yes' : 'No'}`}</Text>
              <Text>{`Prevalent Stroke: ${selectedPatient.prevalentStroke === '1' ? 'Yes' : 'No'}`}</Text>
              <Text>{`Prevalent Hyp: ${selectedPatient.prevalentHyp === '1' ? 'Yes' : 'No'}`}</Text>
              <Text>{`Diabetes: ${selectedPatient.diabetes === '1' ? 'Yes' : 'No'}`}</Text>
              <Text>{`Total Cholesterol: ${selectedPatient.totChol}`}</Text>
              <Text>{`Systolic BP: ${selectedPatient.sysBP}`}</Text>
              <Text>{`Diastolic BP: ${selectedPatient.diaBP}`}</Text>
              <Text>{`BMI: ${selectedPatient.BMI}`}</Text>
              <Text>{`Heart Rate: ${selectedPatient.heartRate}`}</Text>
              <Text>{`Glucose: ${selectedPatient.glucose}`}</Text>
              <Text>{`Risk Level Percentage: ${selectedPatient.risk_level_percentage}`}</Text>
              <Text>{`Result: ${selectedPatient.result}`}</Text>
              <Text>{`Stress Level: ${selectedPatient.stress_level}`}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default PDFViewerPage;

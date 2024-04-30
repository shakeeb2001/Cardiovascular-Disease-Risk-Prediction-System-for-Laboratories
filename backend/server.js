const express = require('express');
const admin = require("firebase-admin");
const cors = require('cors');
const credential = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register route
app.post('/register', async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        // Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        // Save additional user data to Firestore
        await db.collection('labAssistants').doc(username).set({
            name,
            email,
            username,
            uid: userRecord.uid,
        });

        res.status(200).json({ message: 'Registration successful' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

// Login route

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Retrieve user data from Firestore using the username
        const userSnapshot = await db.collection('labAssistants').doc(username).get();

        if (!userSnapshot.exists) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const userData = userSnapshot.data();

        // Compare plaintext password
        if (password !== userData.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});


// Add a route to fetch the count of reports
// Add this route to your Express server
app.get('/patient-count', async (req, res) => {
    try {
      const patientsSnapshot = await db.collection('patients').get();
      const count = patientsSnapshot.size;
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error fetching patient count:', error);
      res.status(500).json({ message: 'Failed to fetch patient count' });
    }
  });
  


app.post('/patient-details', async (req, res) => {
    try {
      // Assuming you have a patients collection in your Firestore
      await db.collection('patients').add(req.body);
      res.status(200).json({ message: 'Patient details saved successfully' });
      console.log('saved');
    } catch (error) {
      console.error('Error saving patient details:', error);
      res.status(500).json({ message: 'Failed to save patient details' });
    }
  });

  // Fetch all patient details route
app.get('/all-patient-details', async (req, res) => {
    try {
        const patientsSnapshot = await db.collection('patients').get();
        const patients = [];
        patientsSnapshot.forEach(doc => {
            patients.push(doc.data());
        });
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patient details:', error);
        res.status(500).json({ message: 'Failed to fetch patient details' });
    }
});

app.delete('/patients/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Delete the patient with the given ID
        await db.collection('patients').doc(id).delete();

        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ message: 'Failed to delete patient' });
    }
});






const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

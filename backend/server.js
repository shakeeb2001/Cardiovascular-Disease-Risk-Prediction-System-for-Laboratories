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

app.post('/patient-details', async (req, res) => {
    try {
      // Assuming you have a patients collection in your Firestore
      await db.collection('patients').add(req.body);
      res.status(200).json({ message: 'Patient details saved successfully' });
    } catch (error) {
      console.error('Error saving patient details:', error);
      res.status(500).json({ message: 'Failed to save patient details' });
    }
  });



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

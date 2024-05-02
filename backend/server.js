const express = require('express');
const admin = require("firebase-admin");
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const credential = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/register', upload.single('profilePic'), async (req, res) => {
    try {
        const { name, mobileNumber, address, email, username, password, userRole } = req.body;
        const profilePic = req.file;

        // If profilePic is uploaded, store the URL, otherwise, set it to null
        let profilePicUrl = null;
        if (profilePic) {
            profilePicUrl = `/uploads/${profilePic.filename}`;
        }

        // Save user profile data to Firestore
        await db.collection(userRole === 'assistant' ? 'labAssistants' : 'labManagers').doc(username).set({
            name,
            mobileNumber,
            address,
            email,
            username,
            password,
            userRole,
            profilePicUrl
        });

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});


app.get('/register/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Check if the user exists in labAssistants collection
        let userData = await db.collection('labAssistants').doc(username).get();

        // If user doesn't exist in labAssistants, check in labManagers collection
        if (!userData.exists) {
            userData = await db.collection('labManagers').doc(username).get();
        }

        if (!userData.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Retrieve user data
        const userDataObject = userData.data();

        res.status(200).json({
            name: userDataObject.name,
            mobileNumber: userDataObject.mobileNumber,
            address: userDataObject.address,
            email: userDataObject.email,
            username: userDataObject.username,
            userRole: userDataObject.userRole,
            profilePicUrl: userDataObject.profilePicUrl
        });
        
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a route to fetch all user profiles
app.get('/user-profiles', async (req, res) => {
    try {
        // Retrieve all user profiles from Firestore
        const assistantsSnapshot = await db.collection('labAssistants').get();
        const managersSnapshot = await db.collection('labManagers').get();

        // Combine user profiles from both collections
        const assistants = assistantsSnapshot.docs.map(doc => doc.data());
        const managers = managersSnapshot.docs.map(doc => doc.data());
        const userProfiles = [...assistants, ...managers];

        res.status(200).json(userProfiles);
    } catch (error) {
        console.error('Error fetching user profiles:', error);
        res.status(500).json({ message: 'Failed to fetch user profiles' });
    }
});

// Update user profile route
app.put('/user-profiles/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const updatedUserData = req.body;
  
      // Update user profile in Firestore
      const collectionName = updatedUserData.userRole === 'assistant' ? 'labAssistants' : 'labManagers';
      await db.collection(collectionName).doc(username).set(updatedUserData);
  
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  });
  
  
  // Delete user profile route
  app.delete('/user-profiles/:username', async (req, res) => {
    try {
      const { username } = req.params;
  
      // Delete user profile from Firestore
      await db.collection('labAssistants').doc(username).delete();
      await db.collection('labManagers').doc(username).delete();
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  });
  



app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Retrieve user data from Firestore using the username from both collections
        const assistantSnapshot = await db.collection('labAssistants').doc(username).get();
        const managerSnapshot = await db.collection('labManagers').doc(username).get();

        let userData = null;
        let userRole = null;

        // Check if user exists in assistants collection
        if (assistantSnapshot.exists) {
            userData = assistantSnapshot.data();
            userRole = 'assistant';
        }
        // Check if user exists in managers collection
        else if (managerSnapshot.exists) {
            userData = managerSnapshot.data();
            userRole = 'manager';
        }
        // If user does not exist in any collection, return invalid credentials
        else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare plaintext password
        if (password !== userData.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', userRole });

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

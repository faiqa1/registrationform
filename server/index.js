// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');
// const User = require('./model'); // Import the User model

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Setup Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // MongoDB connection
// mongoose.connect('mongodb+srv://faiqa:root1234@cluster0.azcvkh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


// // Signup route
// app.post('/signup', upload.single('profileImage'), async (req, res) => {
//   try {
//     const newUser = new User({
//       email: req.body.email,
//       password: req.body.password,
//       profileImage: req.file.path,
//     });
//     await newUser.save();
//     res.status(200).send('User signed up successfully!');
//   } catch (error) {
//     res.status(500).send('Error signing up user');
//   }
// });

// // Serve profile images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const User = require('./model'); // Import the User model

const app = express();
app.use(cors());
app.use(express.json());

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// MongoDB connection
mongoose.connect('mongodb+srv://faiqa:root1234@cluster0.azcvkh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


// Signup route
app.post('/signup', upload.single('profileImage'), async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      profileImage: req.file.path,
    });
    await newUser.save();
    res.status(200).send('User signed up successfully!');
  } catch (error) {
    res.status(500).send('Error signing up user');
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).send({ success: true });
    } else {
      res.status(401).send({ success: false });
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Serve profile images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

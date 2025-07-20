const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));

// Main route to serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

// Form submit route
app.post('/submit', upload.fields([
  { name: 'palm_img', maxCount: 1 },
  { name: 'aura_img', maxCount: 1 },
  { name: 'face_img', maxCount: 1 }
]), (req, res) => {
  // Access text fields
  const { name, nic, dob, birth_time, birth_place, astro_type } = req.body;

  // Access uploaded files
  const palmImage = req.files['palm_img']?.[0];
  const auraImage = req.files['aura_img']?.[0];
  const faceImage = req.files['face_img']?.[0];

  // For demo: print data
  console.log({ name, nic, dob, birth_time, birth_place, astro_type });
  console.log({ palmImage, auraImage, faceImage });

  res.send('Data received! Backend route connected successfully.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/birth-report', (req, res) => {
  const { name, dob, tob, pob, gender } = req.body;
  res.json({
    name, dob, tob, pob, gender,
    luckyNumbers: [3, 5, 8],
    element: 'Earth',
    advice: 'සාර්ථකත්වයට උපරිම උත්සාහයෙන් ක්‍රියා කරන්න.'
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));

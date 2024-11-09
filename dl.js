const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;  // Use the environment port for Render

// Enable CORS
app.use(cors());

// Define a route to download the JSON file
app.get('/download', async (req, res) => {
  const url = 'https://raw.githubusercontent.com/Infin8Phy6/questions/main/questions.json';  // Replace with your actual URL
  const filePath = path.join(__dirname, 'questions.json');  // Save file in the same directory

  try {
    // Fetch the JSON file from the URL
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    // Write the content to a file on the server
    fs.writeFileSync(filePath, response.data);

    // Send a success response with the file path
    res.status(200).send({
      message: 'File downloaded and saved successfully!',
      filePath: filePath
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send({ message: 'Error downloading file' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

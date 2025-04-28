const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getMetadata } = require('./dbClients');
const { generateApiCode } = require('./codeGenerator');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to connect to DB and get metadata
app.post('/api/connect', async (req, res) => {
  const connectionInfo = req.body;
  try {
    const metadata = await getMetadata(connectionInfo);
    res.json(metadata);
  } catch (error) {
    console.error('Error getting metadata:', error);
    res.status(500).json({ error: 'Error connecting to database or fetching metadata' });
  }
});

// Endpoint to generate REST API code
app.post('/api/generate', (req, res) => {
  const selectedObjects = req.body;
  try {
    const code = generateApiCode(selectedObjects);
    res.json({ code });
  } catch (error) {
    console.error('Error generating code:', error);
    res.status(500).json({ error: 'Error generating API code' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

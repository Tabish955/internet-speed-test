const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static('public'));

// API endpoint to perform the speed test
app.get('/speedtest', (req, res) => {
  // Run Speedtest CLI to fetch internet speed data
  exec('speedtest --format=json', (error, stdout, stderr) => {
    if (error) {
      console.error('Speed Test Error:', error.message);
      return res.status(500).json({ error: 'Error testing speed. Please try again.' });
    }

    try {
      const result = JSON.parse(stdout);
      res.json({
        download: (result.download.bandwidth / 125000).toFixed(2), // Convert to Mbps
        upload: (result.upload.bandwidth / 125000).toFixed(2), // Convert to Mbps
        ping: result.ping.latency.toFixed(2), // Ping in ms
      });
    } catch (parseError) {
      console.error('Parse Error:', parseError.message);
      res.status(500).json({ error: 'Error parsing speed test results.' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
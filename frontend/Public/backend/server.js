const express = require('express');
const speedTest = require('speedtest-net');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/speedtest', async (req, res) => {
  try {
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true });
    res.json({
      download: (result.download.bandwidth / 125000).toFixed(2),
      upload: (result.upload.bandwidth / 125000).toFixed(2),
      ping: result.ping.latency.toFixed(2)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Speed test failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

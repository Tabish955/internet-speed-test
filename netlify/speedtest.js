const speedTest = require('speedtest-net');

exports.handler = async function(event, context) {
  try {
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true });

    const download = (result.download.bandwidth * 8 / 1e6).toFixed(2);
    const upload   = (result.upload.bandwidth   * 8 / 1e6).toFixed(2);
    const ping     =  result.ping.latency.toFixed(2);

    return {
      statusCode: 200,
      body: JSON.stringify({ download, upload, ping })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Speed test failed' })
    };
  }
};

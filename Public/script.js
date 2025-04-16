document.getElementById('startTest').addEventListener('click', async () => {
  const statusElement = document.getElementById('status');
  const downloadElement = document.getElementById('download');
  const uploadElement = document.getElementById('upload');
  const pingElement = document.getElementById('ping');
  const speedElement = document.getElementById('speed');
  const needleElement = document.getElementById('needle');

  // Reset UI
  statusElement.textContent = 'Testing... Please wait!';
  downloadElement.textContent = '--';
  uploadElement.textContent = '--';
  pingElement.textContent = '--';
  speedElement.textContent = '0';
  needleElement.style.transform = 'rotate(0deg)';

  try {
    // Fetch speed test results
    const response = await fetch('/speedtest');
    const data = await response.json();

    // Extract results
    const downloadSpeed = parseFloat(data.download);
    const uploadSpeed = parseFloat(data.upload);
    const ping = parseFloat(data.ping);

    // Update digital display
    downloadElement.textContent = downloadSpeed;
    uploadElement.textContent = uploadSpeed;
    pingElement.textContent = ping;
    speedElement.textContent = downloadSpeed;

    // Rotate the needle
    const maxSpeed = 1000; // Max scale for needle
    const rotation = Math.min(downloadSpeed, maxSpeed) * 0.18; // Scale the rotation
    needleElement.style.transform = `rotate(${rotation}deg)`;

    statusElement.textContent = 'Test Complete!';
  } catch (error) {
    console.error('Error:', error.message);
    statusElement.textContent = 'Error testing speed. Please try again.';
  }
});
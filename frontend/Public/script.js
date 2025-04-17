document.getElementById('startTest').addEventListener('click', async () => {
  const status = document.getElementById('status');
  const download = document.getElementById('download');
  const upload   = document.getElementById('upload');
  const ping     = document.getElementById('ping');
  const speed    = document.getElementById('speed');
  const needle   = document.getElementById('needle');

  status.textContent   = 'Testing... Please wait!';
  download.textContent = '--';
  upload.textContent   = '--';
  ping.textContent     = '--';
  speed.textContent    = '0';
  needle.style.transform = 'rotate(0deg)';

  try {
    const res = await fetch('/speedtest');
    const data = await res.json();

    const d = parseFloat(data.download);
    const u = parseFloat(data.upload);
    const p = parseFloat(data.ping);

    download.textContent = d + ' Mbps';
    upload.textContent   = u + ' Mbps';
    ping.textContent     = p + ' ms';
    speed.textContent    = d;

    const rotation = Math.min(d, 1000) * 0.18;
    needle.style.transform = `rotate(${rotation}deg)`;

    status.textContent = 'Test Complete!';
  } catch {
    status.textContent = 'Error testing speed. Please try again.';
  }
});

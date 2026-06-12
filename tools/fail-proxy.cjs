// tools/fail-proxy.cjs
// Simple HTTP server to simulate backend failures and latency for testing (CommonJS)
const http = require('http');

const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/appointments') {
    console.log('Received /appointments, returning 500');
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'simulated failure' }));
  }

  if (req.method === 'POST' && req.url === '/appointments/slow') {
    console.log('Received /appointments/slow, delaying response 10s');
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, note: 'delayed 10s' }));
      }, 10000);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, () => {
  console.log(`fail-proxy listening on http://localhost:${PORT}`);
});

const http = require('http');

const URL = 'http://localhost:5173/';
const TOTAL_USERS = 2500;
const CONCURRENCY = 200;

async function runTest() {
  console.log(`Starting Load Test Simulation for ${TOTAL_USERS} users...`);
  console.log(`Target URL: ${URL}`);
  console.log(`Concurrency Level: ${CONCURRENCY}\n`);

  const startTime = Date.now();
  let completed = 0;
  let successful = 0;
  let failed = 0;
  const latencies = [];

  const queue = Array.from({ length: TOTAL_USERS }, (_, i) => i);

  async function worker() {
    while (queue.length > 0) {
      if (queue.length === 0) break;
      const id = queue.shift();
      if (id === undefined) break;

      const reqStart = Date.now();
      await new Promise((resolve) => {
        const req = http.get(URL, (res) => {
          const latency = Date.now() - reqStart;
          latencies.push(latency);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            successful++;
          } else {
            failed++;
          }
          res.resume();
          resolve();
        });
        req.on('error', (err) => {
          failed++;
          resolve();
        });
        req.end();
      });

      completed++;
      if (completed % 250 === 0) {
        console.log(`Progress: ${completed}/${TOTAL_USERS} requests completed...`);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  const totalTime = (Date.now() - startTime) / 1000;
  const avgLatency = latencies.length ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0;
  latencies.sort((a, b) => a - b);
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;

  const resultText = `
=======================================
         LOAD TEST RUN RESULTS         
=======================================
Total Simulated Users    : ${TOTAL_USERS}
Successful Requests      : ${successful}
Failed Requests          : ${failed}
Total Time Taken         : ${totalTime.toFixed(2)} seconds
Throughput               : ${(TOTAL_USERS / totalTime).toFixed(2)} req/sec
Average Response Time    : ${avgLatency.toFixed(2)} ms
95th Percentile Latency  : ${p95.toFixed(2)} ms
99th Percentile Latency  : ${p99.toFixed(2)} ms
=======================================
`;

  console.log(resultText);
  require('fs').writeFileSync('load_test_results.txt', resultText, 'utf8');
}

runTest().catch(console.error);

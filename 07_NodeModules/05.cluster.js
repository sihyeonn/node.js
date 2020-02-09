const http = require('http');
const cluster = require('cluster');

const cpus = require('os').cpus();
const cpuLen = cpus.length;

if (cluster.isMaster) {
  for (let i = 0; i < cpuLen; ++i) {
    cluster.fork();
    cluster.on('exit', (worker, code, signal) => { 
      console.log(worker.process.pid);
      cluster.fork(); /* demon */ });
  }
} else {
  http.createServer((req, res) => {
    console.log(`${process.pid} is started!`);
    res.end(`${process.pid} responses.`);
  }).listen(3000);
  console.log(process.pid);
}

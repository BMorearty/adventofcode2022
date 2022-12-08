import process from 'process';
import readline from 'readline';
import fs from 'fs';

function readLines(line, close) {
  const filename = process.argv[2];
  const stream = fs.createReadStream(filename, 'utf8');
  const rl = readline.createInterface(stream);
  rl.on('line', line);
  rl.on('close', close);
}

async function run() {
  return new Promise(resolve => {
    function line(line) {
      
    }

    function close() {
      resolve();
    }

    readLines(line, close);
  });
}

await run();

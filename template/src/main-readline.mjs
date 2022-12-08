import process from 'process';
import readline from 'readline';
import fs from 'fs';

async function run() {
  const filename = process.argv[2];
  const stream = fs.createReadStream(filename, 'utf8');
  const rl = readline.createInterface(stream);
  for await (const line of rl) {
    console.log(line);
  }
}

await run();

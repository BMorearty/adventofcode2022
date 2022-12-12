import process from 'process';
import fs from 'fs';

function process(s) {
  const r = /([-\d, ]+).*?\s.*?/i;
  const m = r.exec(s);
  return {
    numgroup: m[1].split(/-, /).map(n => +n),
    singlenum: +m[2],
  }
}

async function run() {
  const filename = process.argv[2];
  const contents = fs.readFileSync(filename, 'utf8');

  // If items are one per line, change \n\n to \n
  const items = contents.split('\n\n').map(item => process(item));

  for (const item of items) {
    
  }
}

await run();

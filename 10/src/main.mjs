import process from 'process';
import readline from 'readline';
import fs from 'fs';

async function run() {
  const filename = process.argv[2];
  const stream = fs.createReadStream(filename, 'utf8');
  const rl = readline.createInterface(stream);

  let cycle = 1;
  let x = 1;
  let sigstr = 0;

  function strength() {
    if ((cycle - 20) % 40 === 0) {
      return cycle * x;
    }
    return 0;
  }
  
  function drawPixel() {
    let per40 = cycle % 40;
    if (per40 >= x && per40 <= x + 2) {
      process.stdout.write('#');
    } else {
      process.stdout.write(' ');
    }
    if (per40 === 0) {
      process.stdout.write('\n');
    }
  }

  for await (const line of rl) {
    if (line === 'noop') {
      sigstr += strength();
      drawPixel();
      cycle++;
      continue;
    }
    let val = +(line.match(/^addx (.+)$/)[1]);
    for (let i = 0; i < 2; i++) {
      sigstr += strength();
      drawPixel();
      cycle++;
    }
    x += val;
  }
  console.log(`Part 1: ${sigstr}`);
}

await run();

import process from 'process';
import readline from 'readline';
import fs from 'fs';

async function run(part, numKnots) {
  const filename = process.argv[2];
  const stream = fs.createReadStream(filename, 'utf8');
  const rl = readline.createInterface(stream);
  let knots = [];
  for (let i = 0; i < numKnots; i++) {
    knots[i] = {x:0,y:0};
  }
  let tailCovered = {};
  tailCovered[JSON.stringify(knots[numKnots - 1])] = true;

  function adjust() {
    for (let i = 1; i < knots.length; i++) {
      let xdist = knots[i-1].x - knots[i].x;
      let ydist = knots[i-1].y - knots[i].y;
      if (Math.abs(xdist) <= 1 && Math.abs(ydist) <= 1) {
        continue;
      }
      const max = Math.max(Math.abs(xdist), Math.abs(ydist));
      const min = Math.min(Math.abs(xdist), Math.abs(ydist));
      if (max === 2 && min === 1) {
        knots[i].x += Math.sign(xdist);
        knots[i].y += Math.sign(ydist);
      } else {
        if (Math.abs(xdist) >= 2) {
          knots[i].x += Math.sign(xdist);
        }
        if (Math.abs(ydist) >= 2) {
          knots[i].y += Math.sign(ydist);
        }
      }
    }
    tailCovered[JSON.stringify(knots[numKnots - 1])] = true;
  }

  for await (const line of rl) {
    let match = line.match(/^(.) (\d+)$/);
    let dir = match[1];
    let times = +match[2];
    for (let time = 0; time < times; time++) {
      switch (dir) {
        case 'R':
          knots[0].x++;
          break;
        case 'L':
          knots[0].x--;
          break;
        case 'U':
          knots[0].y--;
          break;
        case 'D':
          knots[0].y++;
          break;
      }
      adjust();
    }
  }

  console.log(`Part ${part}: ${Object.keys(tailCovered).length}`)
}

await run(1, 2);
await run(2, 10);

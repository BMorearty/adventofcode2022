import process from 'process';
import fs from 'fs';

const filename = process.argv[2];
const contents = fs.readFileSync(filename, 'utf8');
let lines = contents.split('\n');
const crateNumsRegex = /^( +\d)+$/;
let crateNums = lines.find((line) => crateNumsRegex.exec(line));
let crateCount = parseInt(/(\d+)\s*$/.exec(crateNums)[1])

function solve(move) {
  let crates = Array.from(Array(crateCount), () => []);

  // Fill the crates
  for (const line of lines) {
    if (crateNumsRegex.exec(line)) {
      break;
    }
    let matches = line.matchAll(/\[[A-Z]]/g);
    for (const match of matches) {
      const crate = match.index / 4;
      crates[crate].unshift(match[0][1]);
    }
  }

  // Reorder the items
  let moving = false;
  for (const line of lines) {
    if (line === '') {
      continue;
    }
    if (crateNumsRegex.exec(line)) {
      moving = true;
      continue;
    }
    if (!moving) {
      continue;
    }
    const match = line.match(/^move (\d+) from (\d+) to (\d+)$/);
    if (!match) {
      console.log(`Error, line did not match: ${line}`);
      process.exit(1);
    }

    const num = parseInt(match[1]);
    const from = parseInt(match[2]) - 1;
    const to = parseInt(match[3]) - 1;
    move(crates, num, from, to);
  }

  for (const crate of crates) {
    process.stdout.write(crate[crate.length - 1])
  }
  console.log();
}

function move1(crates, num, from, to) {
  for (let i = 0; i < num; i++) {
    crates[to].push(crates[from].pop());
  }
}

function move2(crates, num, from, to) {
  const items = crates[from].splice(crates[from].length - num, num);
  crates[to].push(...items);
}

solve(move1);
solve(move2);

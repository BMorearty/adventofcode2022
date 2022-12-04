import process from 'process';
import fs from 'fs';

const filename = process.argv[2];
const contents = fs.readFileSync(filename, 'utf8');
let lines = contents.split('\n').filter(line => line.length > 0);

part1(lines);
part2(lines);

function part1(lines) {
  let result = 0;
  for (const line of lines) {
  }
  console.log(`Part 1: ${result}`);
}

function part2(lines) {
  let result = 0;
  for (const line of lines) {
  }
  console.log(`Part 2: ${result}`);
}

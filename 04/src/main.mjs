import process from 'process';
import fs from 'fs';

const filename = process.argv[2];
const contents = fs.readFileSync(filename, 'utf8');
let lines = contents.split('\n').filter(line => line.length > 0);
lines = lines
  .map(line => line.split(','))
  .map(side => side.map(part => part.split('-').map(Number)));

part1(lines);
part2(lines);

function part1(lines) {
  let result = 0;
  for (const line of lines) {
    if (includes(line[0], line[1]) || includes(line[1], line[0])) {
      result++;
    }
  }
  console.log(`Part 1: ${result}`);
}

function includes(outside, inside) {
  return outside[0] <= inside[0] && outside[1] >= inside[1];
}

function part2(lines) {
  let result = 0;
  for (const line of lines) {
    if (overlap(line)) {
      result++;
    }
  }
  console.log(`Part 2: ${result}`);
}

function overlap(line) {
  return between(line[0][1], line[1][0], line[1][1]) ||
    between(line[1][1], line[0][0], line[0][1]);
}

function between(a, left, right) {
  return a >= left && a <= right;
}

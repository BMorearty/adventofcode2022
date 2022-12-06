import process from 'process';
import fs from 'fs';

const filename = process.argv[2];
const contents = fs.readFileSync(filename, 'utf8');

solve(contents, 4);
solve(contents, 14);

function solve(contents, n) {
  let result = "";
  let index = 0;
  for (const ch of contents) {
    if (ch === '\n') {
      break;
    }
    result += ch;
    if (result.length < n) {
      index++;
      continue;
    }
    let failed = false;
    for (let i = 0; i < result.length; i++) {
      if (result.indexOf(result[i], i+1) !== -1) {
        failed = true;
        break;
      }
    }
    if (!failed) {
      console.log(`Solution: ${index + 1}`);
      return;
    }
    result = result.substring(1);
    index++;
  }
}

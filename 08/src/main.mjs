import process from 'process';
import readline from 'readline';
import fs from 'fs';

function visible(forest) {
  let count = 0;
  for (let row in forest) {
    row = Number(row);
    for (let col in forest[row]) {
      col = Number(col);
      const tree = forest[row][col];
      let top = true, bottom = true, left = true, right = true;
      for (let i = 0; i < row; i++) {
        if (forest[i][col] >= tree) {
          top = false;
          break;
        }
      }
      for (let i = row + 1; i < forest.length; i++) {
        if (forest[i][col] >= tree) {
          bottom = false;
          break;
        }
      }
      for (let j = 0; j < col; j++) {
        if (forest[row][j] >= tree) {
          left = false;
          break;
        }
      }
      for (let j = col + 1; j < forest[row].length; j++) {
        if (forest[row][j] >= tree) {
          right = false;
          break;
        }
      }
      if (top || bottom || left || right) {
        count++;
      }
    }
  }
  return count;
}

function highest(forest) {
  let highestScore = 0;
  for (let row in forest) {
    row = Number(row);
    for (let col in forest[row]) {
      col = Number(col);
      const tree = forest[row][col];
      let up = 0, down = 0, left = 0, right = 0;
      for (let i = row - 1; i >= 0; i--) {
        const other = forest[i][col];
        up++;
        if (other >= tree) {
          break;
        }
      }
      for (let i = row + 1; i < forest.length; i++) {
        const other = forest[i][col];
        down++;
        if (other >= tree) {
          break;
        }
      }
      for (let j = col - 1; j >= 0; j--) {
        const other = forest[row][j];
        left++;
        if (other >= tree) {
          break;
        }
      }
      for (let j = col + 1; j < forest[row].length; j++) {
        const other = forest[row][j];
        right++;
        if (other >= tree) {
          break;
        }
      }
      const score = up * down * left * right;
      highestScore = Math.max(highestScore, score);
    }
  }
  return highestScore;
}

async function run() {
  let forest = [];
  const filename = process.argv[2];
  const stream = fs.createReadStream(filename, 'utf8');
  const rl = readline.createInterface(stream);
  for await (const line of rl) {
    const trees = [...line].map(tree => Number(tree));
    forest.push(trees);
  }

  console.log(`Part 1: ${visible(forest)}`);
  console.log(`Part 2: ${highest(forest)}`);
}

await run();

import process from "process";
import fs from "fs";

async function run(part, div, times) {
  const filename = process.argv[2];
  const c = fs.readFileSync(filename, 'utf8');
  const monkeys = c.split('\n\n');
  const m = monkeys.map(monkey => {
    const regex = /.+?: ([\d, ]+?)\s+.+?([+*]) ([0-9]+|old)\s+.+?(\d+)\s+.+?(\d+)\s+.+?(\d+)/im;
    const match = monkey.match(regex);
    return {
      items: match[1].split(', ').map(s => BigInt(s)),
      op: [match[2], match[3] === "old" ? match[3] : BigInt(match[3])],
      test: BigInt(match[4]),
      true: +match[5],
      false: +match[6],
      inspected: 0,
    }
  });

  // I didn't figure this part out. Got it from
  // https://github.com/nthistle/advent-of-code/blob/master/2022/day11/day11.py
  let n = 1n;
  for (let mo of m) {
    n *= mo.test;
  }

  for (let i = 0; i < times; i++) {
    for (let mo of m) {
      while (mo.items.length) {
        let worry = mo.items.shift();
        if (mo.op[0] === '*') {
          if (mo.op[1] === 'old') {
            worry *= worry;
          } else {
            worry *= mo.op[1];
          }
        } else {
          worry += mo.op[1]
        }
        if (part === 1) {
          worry = worry / div;
        } else {
          worry = worry % n;
        }
        let to = (worry % mo.test === 0n) ? mo.true : mo.false;
        m[to].items.push(worry);
        mo.inspected++;
      }
    }
  }

  m.sort((a,b) => b.inspected - a.inspected);
  console.log(`Part ${part}: ${m[0].inspected * m[1].inspected}`)
}

await run(1, 3n, 20);
await run(2, 1n, 10000);

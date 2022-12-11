let big = [
  {
    items: [91n, 58n, 52n, 69n, 95n, 54n],
    op: ['*', 13n],
    test: 7n,
    true: 1,
    false: 5,
    inspected: 0,
  },
  {
    items: [80n, 80n, 97n, 84n],
    op: ['*', 'old'],
    test: 3n,
    true: 3,
    false: 5,
    inspected: 0,
  },
  {
    items: [86n, 92n, 71n],
    op: ['+', 7n],
    test: 2n,
    true: 0,
    false: 4,
    inspected: 0,
  },
  {
    items: [96n, 90n, 99n, 76n, 79n, 85n, 98n, 61n],
    op: ['+', 4n],
    test: 11n,
    true: 7,
    false: 6,
    inspected: 0,
  },
  {
    items: [60n, 83n, 68n, 64n, 73n],
    op: ['*', 19n],
    test: 17n,
    true: 1,
    false: 0,
    inspected: 0,
  },
  {
    items: [96n, 52n, 52n, 94n, 76n, 51n, 57n],
    op: ['+', 3n],
    test: 5n,
    true: 7,
    false: 3,
    inspected: 0,
  },
  {
    items: [75n],
    op: ['+', 5n],
    test: 13n,
    true: 4,
    false: 2,
    inspected: 0,
  },
  {
    items: [83n, 75n],
    op: ['+', 1n],
    test: 19n,
    true: 2,
    false: 6,
    inspected: 0,
  }
];

// small
let small = [
  {
    items: [79n, 98n],
    op: ['*', 19n],
    test: 23n,
    true: 2,
    false: 3,
    inspected: 0,
  },
  {
    items: [54n, 65n, 75n, 74n],
    op: ['+', 6n],
    test: 19n,
    true: 2,
    false: 0,
    inspected: 0,
  },
  {
    items: [79n, 60n, 97n],
    op: ['*', 'old'],
    test: 13n,
    true: 1,
    false: 3,
    inspected: 0,
  },
  {
    items: [74n],
    op: ['+', 3n],
    test: 17n,
    true: 0,
    false: 1,
    inspected: 0,
  },
];

async function run(part, div, times) {
  // Clone it so part 1 doesn't corrupt part 2
  let m = [...big];

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

import process from 'process';
import fs from 'fs';

const filename = process.argv[2];
const contents = fs.readFileSync(filename, 'utf8');
let lines = contents.split('\n').filter(line => line.length > 0);

class Dir {
  name;
  parent;
  size = 0;
  subdirs = [];
  files = {};

  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }

  allDirs() {
    const parent = this;
    return {
      *[Symbol.iterator]() {
        yield parent;
        for (const child of parent.subdirs) {
          yield *child.allDirs();
        }
      }
    }
  }

  addSubdir(name) {
    this.subdirs.push(new Dir(name, this));
  }

  addFile(name, size) {
    size = Number(size);
    this.files[name] = size;
    this.size += size;
    let parent = this;
    while ((parent = parent.parent) !== undefined) {
      parent.size += size;
    }
  }

  cdSubdir(name) {
    return this.subdirs.find(child => child.name === name);
  }

  cdParent() {
    return this.parent;
  }
}

const run = (function() {
  let root = new Dir('/');
  let curr;
  let ls = false;

  function cd(newDir) {
    if (newDir === '/') {
      curr = root;
    } else if (newDir === '..') {
      curr = curr.cdParent();
    } else {
      curr = curr.cdSubdir(newDir);
    }
    return curr;
  }

  function part1(dir, sum, level) {
    if (dir.size <= 100000) {
      sum += dir.size;
    }

    for (const subdir of dir.subdirs) {
      sum = part1(subdir, sum, level + 1);
    }

    return sum;
  }

  function part2(dir, remaining, smallestSoFar) {
    for (const subdir of dir.allDirs()) {
      if (!smallestSoFar || (subdir.size >= remaining && subdir.size < smallestSoFar.size)) {
        smallestSoFar = subdir;
      }
    }

    return smallestSoFar;
  }

  return function(lines) {
    for (const line of lines) {
      if (line === '') {
        continue;
      }

      if (ls) {
        if (line.startsWith('$ ')) {
          ls = false;
        } else {
          let match = line.match(/^(\d+) ([a-z.]+)$/);
          if (match) {
            curr.addFile(match[2], match[1]);
            continue;
          }
          match = line.match(/^dir ([a-z.]+)/);
          if (match) {
            curr.addSubdir(match[1]);
            continue;
          }
          continue;
        }
      }

      let match = line.match(/^\$ cd (\/|[a-z]+|\.\.)$/);
      if (match) {
        curr = cd(match[1]);
        continue;
      }

      if (line === '$ ls') {
        ls = true;
      }
    }

    const result = part1(root, 0);
    console.log(`Part 1: ${result}`);

    const DISK_SIZE = 70000000;
    const REQUIRED = 30000000;
    const remaining = DISK_SIZE - root.size;
    const needed = REQUIRED - remaining;
    const dir = part2(root, needed);
    console.log(`Part 2: ${dir.size}`)
  }
})();

run(lines);

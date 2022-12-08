export default class UnionFind {
  parentOf = {};

  // Add a as its own group
  add(a) {
    this.parentOf[a] = a;
  }

  // Put a and b in the same group. With path compression.
  union(a, b) {
    const { root: rootA, distance: distanceA } = this.#findDistance(a);
    const { root: rootB, distance: distanceB } = this.#findDistance(b);
    if (rootA === rootB) {
      return;
    }

    let shorter = a;
    let shortRoot = rootA;
    let longRoot = rootB;
    if (distanceA > distanceB) {
      shorter = b;
      shortRoot = rootB;
      longRoot = rootA;
    }

    do {
      const parent = this.parentOf[shorter];
      this.parentOf[shorter] = longRoot;
      shorter = parent;
    } while (shorter !== shortRoot);
  }

  // Get an element's root.
  find(a) {
    return this.#findDistance(a).root;
  }

  // Get an element's root and the distance to it.
  #findDistance(a) {
    let distance = 0;
    let prev = a;
    let parent = this.parentOf[a];
    while (parent && parent !== prev) {
      prev = parent;
      parent = this.parentOf[parent];
      distance++;
    }
    return { root: parent, distance };
  }
}

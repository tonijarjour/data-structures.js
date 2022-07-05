// Group items and combine groups efficiently

export default class UnionFind {
  #size;
  #sz;
  #id;
  #numComponents;

  constructor(size) {
    if (!size || size <= 0) throw Error("size must greater than 0");
    this.#size = this.#numComponents = size;
    this.#sz = [];
    this.#id = [];

    for (let i = 0; i < size; ++i) {
      this.#id[i] = i;
      this.#sz[i] = 1;
    }
  }

  find(p) {
    let root = p;
    while (root !== this.#id[root]) root = this.#id[root];

    while (p !== root) {
      let next = this.#id[p];
      this.#id[p] = root;
      p = next;
    }

    return root;
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  componentSize(p) {
    return this.#sz[this.find(p)];
  }

  size() {
    return this.#size;
  }

  components() {
    return this.#numComponents;
  }

  unify(p, q) {
    let pRoot = this.find(p);
    let qRoot = this.find(q);

    if (pRoot === qRoot) return;

    if (this.#sz[pRoot] < this.#sz[qRoot]) {
      this.#sz[qRoot] += this.#sz[pRoot];
      this.#id[pRoot] = qRoot;
    } else {
      this.#sz[pRoot] += this.#sz[qRoot];
      this.#id[qRoot] = pRoot;
    }

    --this.#numComponents;
  }
}

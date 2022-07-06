export default class IndexedPQueue {
  #child;
  #parent;
  #positions;
  #keys;
  #values;
  #size;

  constructor() {
    this.#keys = [];
    this.#positions = [];
    this.#values = [];
    this.#child = [1];
    this.#parent = [0];
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  contains(ki) {
    return this.#positions[ki];
  }

  peek() {
    return this.#values[this.#keys[0]];
  }

  valueOf(ki) {
    return this.#values[ki];
  }

  shift() {
    return this.remove(this.#keys[0]);
  }

  insert(ki, value) {
    if (this.contains(ki)) throw Error("index exists");

    this.#parent.push(Math.floor((this.#parent.length - 1) / 2));
    this.#child.push(this.#child.length * 2 + 1);

    this.#keys.push(ki);
    this.#positions[ki] = this.#size;
    this.#values[ki] = value;

    ++this.#size;

    this.#bubbleUp(this.#size - 1);
  }

  remove(ki) {
    const index = this.#positions[ki];

    this.#swap(index, this.#size - 1);

    this.#positions[ki] = undefined;
    this.#keys.splice(this.#size - 1, 1);

    --this.#size;

    this.#bubbleDown(index);
    this.#bubbleUp(index);

    let val = this.#values[ki];
    this.#values[ki] = undefined;

    return val;
  }

  update(ki, value) {
    const i = this.#positions[ki];

    let oldVal = this.#values[ki];
    this.#values[ki] = value;

    this.#bubbleDown(i);
    this.#bubbleUp(i);

    return oldVal;
  }

  #swap(i, j) {
    this.#positions[this.#keys[j]] = i;
    this.#positions[this.#keys[i]] = j;

    let tmp = this.#keys[i];

    this.#keys[i] = this.#keys[j];
    this.#keys[j] = tmp;
  }

  #bubbleUp(i) {
    while (true) {
      let current = this.#keys[i];
      let parent = this.#keys[this.#parent[i]];

      if (!parent || current >= parent) return;

      this.#swap(i, this.#parent[i]);
      i = this.#parent[i];
    }
  }

  #bubbleDown(i) {
    while (true) {
      let childIndex = this.#minChild(i);

      let current = this.#keys[i];
      let child = this.#keys[childIndex];

      if (!child || current <= child) return;

      this.#swap(i, childIndex);
      i = childIndex;
    }
  }

  #minChild(i) {
    if (!this.#keys[this.#child[i]])
      if (!this.#keys[this.#child[i] + 1]) return this.#child[i];
      else return this.#child + 1;

    let left = this.#keys[this.#child[i]];
    let right = this.#keys[this.#child[i] + 1];

    return right < left ? this.#child[i] + 1 : this.#child[i];
  }
}

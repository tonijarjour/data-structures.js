export default class IndexedPQueue {
  #child;
  #parent;
  #positions;
  #keys;
  #values;

  constructor() {
    this.#keys = [];
    this.#positions = [];
    this.#values = [];
    this.#child = [1];
    this.#parent = [0];
  }

  size() {
    return this.#values.length;
  }

  isEmpty() {
    return this.#values.length === 0;
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
    this.#positions[ki] = this.size();
    this.#values[ki] = value;

    this.#bubbleUp(this.size() - 1);
  }

  remove(ki) {
    const index = this.#positions[ki];

    this.#swap(index, this.size() - 1);

    this.#bubbleDown(index);
    this.#bubbleUp(index);

    this.#positions.splice(ki, 1);
    this.#keys.splice(this.size() - 1, 1);

    return this.#values.splice(ki, 1)[0];
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

      if (current >= parent) return;

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

      this.#swap(i, this.#child[childIndex]);
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

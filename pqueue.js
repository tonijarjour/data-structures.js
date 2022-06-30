export default class PQueue {
  #size;
  #list;

  constructor() {
    this.#list = [];
    this.#size = 0;
  }

  #bubbleUp() {
    let step = this.#size - 1;
    let parent = step % 2 === 0 ? step / 2 - 1 : Math.floor(step / 2);

    while (this.#list[parent].priority > this.#list[step].priority) {
      let held = this.#list[parent];
      this.#list[parent] = this.#list[step];
      this.#list[step] = held;

      if (parent === 0) break;

      step = parent;
      parent = step % 2 === 0 ? step / 2 - 1 : Math.floor(step / 2);
    }
  }

  #bubbleDown() {
    let step = 0;

    let nextOdd = step * 2 + 1;
    let nextEven = step * 2 + 2;

    let oddLess;
    let evenLess;

    const sizeCheck = (nextVal) => {
      if (nextVal < this.#size) {
        return this.#list[nextVal].priority < this.#list[step].priority;
      } else {
        return false;
      }
    };

    oddLess = sizeCheck(nextOdd);
    evenLess = sizeCheck(nextEven);

    while (oddLess || evenLess) {
      let held;
      let treeDelta;

      if (!this.#list[nextEven]) {
        held = this.#list[nextOdd];
        treeDelta = nextOdd;
      } else if (
        this.#list[nextOdd].priority <= this.#list[nextEven].priority
      ) {
        held = this.#list[nextOdd];
        treeDelta = nextOdd;
      } else {
        held = this.#list[nextEven];
        treeDelta = nextEven;
      }

      this.#list[treeDelta] = this.#list[step];
      this.#list[step] = held;

      step = treeDelta;

      nextOdd = step * 2 + 1;
      nextEven = step * 2 + 2;

      oddLess = sizeCheck(nextOdd);
      evenLess = sizeCheck(nextEven);
    }
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#list = [];
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  enqueue(element) {
    ++this.#size;
    this.#list.push(element);
    if (this.#size > 1) this.#bubbleUp();
  }

  dequeue() {
    if (this.#size === 0) throw Error("empty queue");
    --this.#size;
    this.#list[0] = this.#list[this.#size];
    this.#list.pop();
    if (this.#size > 1) this.#bubbleDown();
  }

  peek() {
    if (this.#size === 0) throw Error("empty queue");
    return this.#list[0].value;
  }

  [Symbol.iterator]() {
    return this.#list[Symbol.iterator]();
  }
}

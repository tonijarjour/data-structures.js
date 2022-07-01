import SinglyLinkedList from "./singly-linked-list.js";

export default class Queue {
  #list;

  constructor() {
    this.#list = new SinglyLinkedList();
  }

  size() {
    return this.#list.size();
  }

  isEmpty() {
    return this.#list.size() === 0;
  }

  peek() {
    if (this.isEmpty()) throw Error("empty queue");
    return this.#list.read(0);
  }

  enqueue(value) {
    this.#list.append(value);
  }

  dequeue() {
    return this.#list.remove(0);
  }

  [Symbol.iterator]() {
    return this.#list[Symbol.iterator]();
  }
}

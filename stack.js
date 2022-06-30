import SinglyLinkedList from "./singly-linked-list.js";

export default class Stack {
  #list;

  constructor() {
    this.#list = new SinglyLinkedList();
  }

  size() {
    return this.#list.size();
  }

  push(value) {
    this.#list.append(value);
  }

  isEmpty() {
    return this.#list.size() === 0;
  }

  pop() {
    if (this.isEmpty()) throw Error("empty stack");
    return this.#list.remove(this.#list.size() - 1);
  }

  peek() {
    if (this.isEmpty()) throw Error("empty stack");
    return this.#list.read(this.#list.size() - 1);
  }
}

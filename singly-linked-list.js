class ListElement {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

export default class SinglyLinkedList {
  #size;
  #head;
  #tail;

  constructor() {
    this.#size = 0;
    this.#head = undefined;
    this.#tail = undefined;
  }

  #getListElement(index) {
    if (index < 0 || index >= this.#size) return undefined;
    if (index === this.#size - 1) return this.#tail;

    let currentElement = this.#head;

    for (let step = 0; step < index; ++step) {
      currentElement = currentElement.next;
    }

    return currentElement;
  }

  #insertAfter(element, value) {
    const newListElement = new ListElement(value, element.next);

    if (!element.next) this.#tail = newListElement;
    element.next = newListElement;

    ++this.#size;
  }

  size() {
    return this.#size;
  }

  clear() {
    let currentElement = this.#head;

    for (let step = 0; step < this.#size; ++step) {
      let deleteElement = currentElement;
      currentElement = currentElement.next;
      deleteElement.value = deleteElement.next = undefined;
    }

    this.#head = this.#tail = undefined;
    this.#size = 0;
  }

  isEmpty() {
    return this.#size === 0;
  }

  append(value) {
    if (this.isEmpty()) {
      this.#head = this.#tail = new ListElement(value, undefined);
      this.#size = 1;
      return;
    }

    this.#insertAfter(this.#tail, value);
  }

  prepend(value) {
    if (this.isEmpty()) return this.append(value);

    let movedHead = this.#head;
    this.#head = new ListElement(value, movedHead);

    ++this.#size;
  }

  find(value) {
    let currentElement = this.#head;

    for (let step = 0; step < this.#size; ++step) {
      if (currentElement.value === value) return step;
      currentElement = currentElement.next;
    }

    return -1;
  }

  read(index) {
    return this.#getListElement(index)?.value;
  }

  insert(index, value) {
    if (index < 0 || index > this.#size) return false;

    if (index === 0) {
      this.prepend(value);
      return true;
    } else if (index === this.#size - 1) {
      this.append(value);
      return true;
    }

    this.#insertAfter(this.#getListElement(index - 1), value);

    return true;
  }

  remove(index) {
    if (index === 0) {
      let deleteElement = this.#head;

      if (this.#size === 1) this.#head = this.#tail = undefined;
      else this.#head = this.#head.next;

      let held = deleteElement.value;
      deleteElement.value = deleteElement.next = undefined;

      --this.#size;

      return held;
    }

    let previousElement = this.#getListElement(index - 1);
    if (!previousElement || !previousElement.next) return undefined;
    if (!previousElement.next.next) this.#tail = previousElement;

    let deleteElement = previousElement.next;

    previousElement.next = previousElement.next.next;

    deleteElement.value = deleteElement.next = undefined;

    --this.#size;
  }

  *[Symbol.iterator]() {
    for (let current = this.#head; current; current = current.next) {
      yield current.value;
    }
  }
}

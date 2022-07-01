class ListElement {
  constructor(value, prev, next) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export default class DoublyLinkedList {
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

    let currentElement;

    if (index < Math.floor(this.#size / 2)) {
      currentElement = this.#head;
      for (let step = 0; step < index; ++step) {
        currentElement = currentElement.next;
      }
    } else {
      currentElement = this.#tail;
      for (let step = this.#size - 1; step > index; --step) {
        currentElement = currentElement.prev;
      }
    }

    return currentElement;
  }

  #insertBefore(element, value) {
    const newListElement = new ListElement(value, element.prev, element);

    if (element.prev) element.prev.next = newListElement;
    else this.#head = newListElement;

    element.prev = newListElement;

    ++this.#size;
  }

  #insertAfter(element, value) {
    const newListElement = new ListElement(value, element, element.next);

    if (element.next) element.next.prev = newListElement;
    else this.#tail = newListElement;

    element.next = newListElement;

    ++this.#size;
  }

  size() {
    return this.#size;
  }

  clear() {
    let currentElement = this.#head;

    for (let step = 0; step < this.#size; ++step) {
      if (currentElement.prev) currentElement.prev.next = undefined;
      currentElement.value = currentElement.prev = undefined;
      currentElement = currentElement.next;
    }

    this.#head = this.#tail = undefined;
    this.#size = 0;
  }

  isEmpty() {
    return this.#size === 0;
  }

  append(value) {
    if (this.isEmpty()) {
      this.#head = this.#tail = new ListElement(value, undefined, undefined);
      this.#size = 1;
      return;
    }

    this.#insertAfter(this.#tail, value);
  }

  prepend(value) {
    if (this.isEmpty()) return this.append(value);

    this.#insertBefore(this.#head, value);
  }

  headFind(value) {
    let currentElement = this.#head;

    for (let step = 0; step < this.#size; ++step) {
      if (currentElement.value === value) return step;
      currentElement = currentElement.next;
    }

    return -1;
  }

  tailFind(value) {
    let currentElement = this.#tail;

    for (let step = this.#size - 1; step >= 0; --step) {
      if (currentElement.value === value) return step;
      currentElement = currentElement.prev;
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
    }
    if (index === this.#size) {
      this.append(value);
      return true;
    }

    this.#insertBefore(this.#getListElement(index), value);

    return true;
  }

  remove(index) {
    const element = this.#getListElement(index);
    if (!element) return undefined;

    if (element.prev) element.prev.next = element.next;
    else {
      this.#head = element.next;
      this.#head.prev = undefined;
    }

    if (element.next) element.next.prev = element.prev;
    else {
      this.#tail = element.prev;
      this.#tail.next = undefined;
    }

    --this.#size;

    return element.v;
  }

  *[Symbol.iterator]() {
    for (let current = this.#head; current; current = current.next) {
      yield current.value;
    }
  }

  *reverse() {
    for (let current = this.#tail; current; current = current.prev) {
      yield current.value;
    }
  }
}

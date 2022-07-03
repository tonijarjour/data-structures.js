import Queue from "./queue.js";

class Element {
  left;
  right;

  constructor(value) {
    this.value = value;
  }
}

export default class BinarySearchTree {
  #size;
  #root;

  constructor() {
    this.#size = 0;
  }

  isEmpty() {
    return this.#size === 0;
  }

  size() {
    return this.#size;
  }

  insert(value) {
    if (!value) return false;

    if (this.#size === 0) {
      this.#root = new Element(value);
      this.#root.balanceFactor = 0;
      return (this.#size = 1);
    }

    const newElement = new Element(value);
    let currentElement = this.#root;

    while (true) {
      if (currentElement.value === value) return false;

      if (value < currentElement.value) {
        if (!currentElement.left) {
          currentElement.left = newElement;
          break;
        } else {
          currentElement = currentElement.left;
        }
      } else if (value > currentElement.value) {
        if (!currentElement.right) {
          currentElement.right = newElement;
          break;
        } else {
          currentElement = currentElement.right;
        }
      }
    }

    ++this.#size;
  }

  remove(value) {
    if (!value) return false;

    if (this.#root.value === value) {
      if (this.#size === 1) {
        this.#root = undefined;
        return (this.#size = 0);
      } else if (!(this.#root.left && this.#root.right)) {
        this.#root = this.#root.left ? this.#root.left : this.#root.right;
        return --this.#size;
      }
    }

    let current = this.#root;
    let previous;

    while (value < current.value || value > current.value) {
      previous = current;
      if (value < current.value) current = current.left;
      if (value > current.value) current = current.right;
    }

    let side;
    if (previous) side = previous.left === current ? -1 : 1;

    // leaf
    if (!current.left && !current.right) {
      if (side === -1) {
        previous.left = undefined;
      } else if (side === 1) {
        previous.right = undefined;
      }
      current.value = undefined;
    }

    // one way
    if (!(current.left && current.right)) {
      if (side === -1) {
        if (current.left) {
          previous.left = current.left;
        } else {
          previous.left = current.right;
        }
      } else {
        if (current.left) {
          previous.right = current.left;
        } else {
          previous.right = current.right;
        }
      }
      current.left = current.right = undefined;
    }

    // full branch
    if (current.left && current.right) {
      let replace = current.right;
      previous = undefined;

      while (replace.left) {
        previous = replace;
        replace = replace.left;
      }

      current.value = replace.value;

      if (!previous) {
        current.right = replace.right;
      } else {
        previous.left = replace.right;
      }

      replace.right = replace.value = undefined;
    }
    --this.#size;
  }

  preOrder(element = this.#root) {
    console.log(element.value);
    if (element.left) this.preOrder(element.left);
    if (element.right) this.preOrder(element.right);
  }

  inOrder(element = this.#root) {
    if (element.left) this.inOrder(element.left);
    console.log(element.value);
    if (element.right) this.inOrder(element.right);
  }

  postOrder(element = this.#root) {
    if (element.left) this.postOrder(element.left);
    if (element.right) this.postOrder(element.right);
    console.log(element.value);
  }

  levelOrder(element = this.#root) {
    let bfs = new Queue();
    bfs.enqueue(element);

    while (bfs.size() !== 0) {
      let currentElement = bfs.dequeue();

      console.log(currentElement.value);

      if (currentElement.left) bfs.enqueue(currentElement.left);
      if (currentElement.right) bfs.enqueue(currentElement.right);
    }
  }
}

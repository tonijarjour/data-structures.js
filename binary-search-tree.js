import Queue from "./queue.js";

class TreeElement {
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
    this.#root = undefined;
  }

  isEmpty() {
    return this.#size === 0;
  }

  size() {
    return this.#size;
  }

  contains(value, origin = this.#root) {
    if (!origin) return false;

    let currentElement = origin;

    if (value === currentElement.value) return true;

    while (currentElement.left || currentElement.right) {
      currentElement =
        value < currentElement.value
          ? currentElement.left
          : currentElement.right;

      if (value === currentElement.value) return true;

      if (!currentElement.left && value < currentElement.value) return false;
      if (!currentElement.right && value > currentElement.value) return false;
    }
    return false;
  }

  add(value) {
    const newTreeElement = new TreeElement(value);

    if (this.#size === 0) {
      this.#root = newTreeElement;
      return (this.#size = 1);
    }

    let currentElement = this.#root;

    while (true) {
      if (value === currentElement.value) return;

      if (!currentElement.left && value < currentElement.value) {
        currentElement.left = newTreeElement;
        return ++this.#size;
      } else if (!currentElement.right && value > currentElement.value) {
        currentElement.right = newTreeElement;
        return ++this.#size;
      }

      if (value > currentElement.value) currentElement = currentElement.right;
      else if (value < currentElement.value)
        currentElement = currentElement.left;
    }
  }

  #find(value) {
    let returnObject = { remove: null, previous: null, direction: null };
    if (this.#root.value === value) {
      returnObject.remove = this.#root;
      return returnObject;
    }
    let currentElement = this.#root;
    let previousElement;

    while (currentElement.left || currentElement.right) {
      returnObject.previous = currentElement;
      if (currentElement.left && currentElement.left.value === value) {
        returnObject.remove = currentElement.left;
        returnObject.direction = -1;
        return returnObject;
      } else if (currentElement.right && currentElement.right.value === value) {
        returnObject.remove = currentElement.right;
        returnObject.direction = 1;
        return returnObject;
      }

      previousElement = currentElement;
      [currentElement, returnObject.direction] =
        value < currentElement.value
          ? [currentElement.left, -1]
          : [currentElement.right, 1];
    }

    if (currentElement.value === value) {
      returnObject.remove = currentElement;
      returnObject.previous = previousElement;
      return returnObject;
    }

    throw Error("not found");
  }

  remove(value) {
    if (this.#size === 0) {
      throw Error("empty tree");
    }
    if (this.#size === 1) {
      if (this.#root.value === value) {
        this.#root = undefined;
        return (this.#size = 0);
      } else {
        throw Error("not found");
      }
    }

    let { remove, previous, direction } = this.#find(value);

    // leaf
    if (!remove.left && !remove.right) {
      if (direction === -1) {
        previous.left = remove.value = undefined;
      }
      if (direction === 1) {
        previous.right = remove.value = undefined;
      }
    }

    // one way branch
    if (!(remove.left && remove.right)) {
      if (direction === -1) {
        if (remove.left) {
          previous.left = remove.left;
          remove.value = remove.left = undefined;
        } else {
          previous.left = remove.right;
          remove.value = remove.right = undefined;
        }
      }
      if (direction === 1) {
        if (remove.left) {
          previous.right = remove.left;
          remove.value = remove.left = undefined;
        } else {
          previous.right = remove.right;
          remove.value = remove.right = undefined;
        }
      }
    }

    // full branch
    if (remove.left && remove.right) {
      let replace = remove.right;
      previous = undefined;

      while (replace.left) {
        previous = replace;
        replace = replace.left;
      }

      remove.value = replace.value;

      if (!previous) {
        remove.right = replace.right;
      } else {
        previous.left = replace.right;
      }

      replace.value = replace.right = undefined;
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

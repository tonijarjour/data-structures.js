class TreeElement {
  constructor(left, right, value) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export default class BinarySearchTree {
  #size;
  root;

  constructor() {
    this.#size = 0;
    this.root = undefined;
  }

  isEmpty() {
    return this.#size === 0;
  }

  size() {
    return this.#size;
  }

  add(value) {
    const newTreeElement = new TreeElement(undefined, undefined, value);

    if (this.#size === 0) {
      this.root = newTreeElement;
      return (this.#size = 1);
    }

    let currentElement = this.root;

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
    if (this.root.value === value) {
      returnObject.remove = this.root;
      return returnObject;
    }
    let currentElement = this.root;
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
      if (this.root.value === value) {
        this.root = undefined;
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
}

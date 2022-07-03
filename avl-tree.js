class Element {
  value;
  left;
  right;
  balanceFactor;
  height;

  constructor(value) {
    this.value = value;
    this.height = 0;
  }
}
export default class AvlTree {
  #root;
  #size;

  constructor() {
    this.#size = 0;
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

  balance() {}

  update() {}

  rotateLeft(element) {
    right = element.right;
    element.right = right.left;
    right.left = element;
    return right;
  }

  rotateRight(element) {
    left = element.left;
    element.left = left.right;
    left.right = element;
    return left;
  }

  leftleft(element) {
    return this.rotateRight(element);
  }

  leftright(element) {
    return this.rotateRight(this.rotateLeft(element));
  }

  rightright(element) {
    return this.rotateLeft(element);
  }

  rightleft(element) {
    return this.rotateLeft(this.rotateRight(element));
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
    let queue = [];
    queue.push(element);

    while (queue.length !== 0) {
      let currentElement = queue.shift();

      console.log(currentElement.value);

      if (currentElement.left) queue.push(currentElement.left);
      if (currentElement.right) queue.push(currentElement.right);
    }
  }
}

let tree = new AvlTree();

tree.insert(500);
tree.insert(400);
tree.insert(600);
tree.insert(350);
tree.insert(450);
tree.insert(550);
tree.insert(650);

tree.levelOrder();

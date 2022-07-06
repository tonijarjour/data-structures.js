class Element {
  value;
  left;
  right;
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

  contains(value, element = this.#root) {
    if (this.#size === 0) return false;
    if (element.value === value) return true;

    let left = element.left ? this.contains(value, element.left) : false;
    let right = element.right ? this.contains(value, element.right) : false;

    return left || right;
  }

  insert(value) {
    if (!value) return false;

    if (!this.contains(value)) {
      this.#root = this.#insertHelper(value, this.#root);
      return ++this.#size;
    }

    return false;
  }

  #insertHelper(value, element) {
    if (!element) return new Element(value);

    if (value < element.value)
      element.left = this.#insertHelper(value, element.left);
    if (value > element.value)
      element.right = this.#insertHelper(value, element.right);

    return this.#balance(element, this.#update(element));
  }

  remove(value) {
    if (!value) return false;

    if (this.contains(value)) {
      this.#root = this.#removeHelper(value, this.#root);
      return --this.#size;
    }

    return false;
  }

  #removeHelper(value, element) {
    if (value < element.value)
      element.left = this.#removeHelper(value, element.left);
    else if (value > element.value)
      element.right = this.#removeHelper(value, element.right);
    else {
      if (!element.left) return element.right;
      else if (!element.right) return element.left;
      else {
        // full branch
        if (element.left.height > element.right.height) {
          let replace = element.left;
          while (replace.right) replace = replace.right;

          element.value = replace.value;

          element.left = this.#removeHelper(replace.value, element.left);
        } else {
          let replace = element.right;
          while (replace.left) replace = replace.left;

          element.value = replace.value;

          element.right = this.#removeHelper(replace.value, element.right);
        }
      }
    }

    return this.#balance(element, this.#update(element));
  }

  #update(element) {
    let lh = -1;
    let rh = -1;

    if (element.left) lh = element.left.height;
    if (element.right) rh = element.right.height;

    element.height = 1 + Math.max(lh, rh);

    return rh - lh;
  }

  #balance(element, bf) {
    if (bf === -2) {
      if (element.left.left) {
        return this.#leftLeftRotate(element);
      } else {
        return this.#leftRightRotate(element);
      }
    }
    if (bf === 2) {
      if (element.right.right) {
        return this.#rightRightRotate(element);
      } else {
        return this.#rightLeftRotate(element);
      }
    }
    return element;
  }

  #rightRotate(element) {
    let left = element.left;
    element.left = left.right;
    left.right = element;

    this.#update(element);
    this.#update(left);

    return left;
  }

  #leftRotate(element) {
    let right = element.right;
    element.right = right.left;
    right.left = element;

    this.#update(element);
    this.#update(right);

    return right;
  }

  #leftLeftRotate(element) {
    return this.#rightRotate(element);
  }

  #leftRightRotate(element) {
    element.left = this.#leftRotate(element.left);
    return rightRotate(element);
  }

  #rightRightRotate(element) {
    return this.#leftRotate(element);
  }

  #rightLeftRotate(element) {
    element.right = rightRotate(element.right);
    return this.#leftRotate(element);
  }

  preOrder(element = this.#root) {
    process.stdout.write(`${element.value} `);
    if (element.left) this.preOrder(element.left);
    if (element.right) this.preOrder(element.right);
  }

  inOrder(element = this.#root) {
    if (element.left) this.inOrder(element.left);
    process.stdout.write(`${element.value} `);
    if (element.right) this.inOrder(element.right);
  }

  postOrder(element = this.#root) {
    if (element.left) this.postOrder(element.left);
    if (element.right) this.postOrder(element.right);
    process.stdout.write(`${element.value} `);
  }

  levelOrder(element = this.#root) {
    let level = 1;
    let step = 0;
    let queue = [];
    queue.push(element);

    while (queue.length !== 0) {
      let current = queue.shift();

      ++step;
      if (step === level) {
        console.log();
        level *= 2;
      }

      process.stdout.write(`${current.value} `);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
}

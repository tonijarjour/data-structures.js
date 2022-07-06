const hash = (key) => {
  return key;
};

class Element {
  value;
  key;
  hash;

  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.hash = hash(key);
  }
}

export default class SeperateChainingHashMap {
  #size;
  #capacity;
  #loadFactor;
  #list;

  constructor(capacity = 4, loadFactor = 0.75) {
    this.#capacity = capacity;
    this.#loadFactor = loadFactor;
    this.#size = 0;
    this.#list = [];
  }

  size() {
    return this.#size;
  }

  #normalizeHash(hash) {
    return (hash & 0x7fffffff) % this.#capacity;
  }

  find(key) {
    let keyIndex = this.#normalizeHash(hash(key));

    if (this.#list[keyIndex]) {
      return this.#findHelper(keyIndex, key);
    }
  }

  #findHelper(keyIndex, key) {
    return this.#list[keyIndex].find((e) => e.key === key);
  }

  remove(key) {
    const keyIndex = this.find(key)?.hash;

    if (this.#list[keyIndex]) {
      for (let index = 0; index < this.#list[keyIndex].length; ++index) {
        if (this.#list[keyIndex][index].key === key) {
          return this.#list[keyIndex].splice(index, 1);
        }
      }
    }
    --this.#size;
  }

  insert(key, value) {
    let keyCheck = this.find(key);
    if (keyCheck) {
      keyCheck.value = value;
      return;
    }

    if (++this.#size >= Math.floor(this.#loadFactor * this.#capacity)) {
      this.#resizeMap();
    }

    let newEntry = new Element(key, value);
    let entryKey = this.#normalizeHash(newEntry.hash);

    if (!this.#list[entryKey]) this.#list[entryKey] = [];

    this.#list[entryKey].push(newEntry);
  }

  #resizeMap() {
    this.#capacity *= 2;

    let newList = [];

    for (let bucket of this.#list) {
      if (bucket) {
        for (let entry of bucket) {
          let entryIndex = this.#normalizeHash(entry.hash);
          if (!newList[entryIndex]) newList[entryIndex] = [];
          newList[entryIndex].push(entry);
        }
      }
    }
    this.#list = newList;
  }
}

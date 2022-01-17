class Node {
  #value = null;
  #next = null;

  constructor(value, next = null) {
    this.#value = value;
    this.#next  = next;
  }

  get next() {
    return this.#next;
  }

  set next(next) {
    this.#next = next;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }
}

class Iterator {
  #currentNode;
  #hasNext;

  constructor(node) {
    this.#currentNode = node;
    this.#hasNext = !!node;
  }

  get hasNext() { 
    return this.#hasNext;
  }
  
  next() {
    if (!this.#currentNode) return null;
    
    const currentValue = this.#currentNode.value;
    this.#currentNode = this.#currentNode.next;
    this.#hasNext = !!this.#currentNode;
    
    return currentValue;
  }
}

class List {
  #head = null;
  #tail = null;
  #size = null;

  constructor(head) {
    this.#size = 0;

    this.#initialize(head);
  }

  #initialize(head) {
    this.#head = head;

    let node = head;
    while(node) {
      this.#size++;

      if (!node.next) {
        this.#tail = node;
        break;
      }

      node = node.next;
    }
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  get size() {
    return this.#size;
  }

  generateIterator() {
    return new Iterator(this.#head);
  }

  prepend(node) {
    const temp = this.#head;
    this.#head = node;
    
    if (temp) {
      this.#head.next = temp;
    } else {
      this.#tail = this.#head;
    }
    
    this.#size += 1;
  }

  append(node) {
    if (!this.#head) {
      this.prepend(node);
      return
    }
    
    this.#size += 1;
    if (this.#tail) this.#tail.next = node;
    this.#tail = node;
  }

  remove(index) {
    if (this.#size === 0) return;
    if (index > this.#size - 1) return;
    
    let targetNode = null;
    let previousNode = null;
 
    if (index === 0) {
      targetNode = this.#head;
      this.#head = targetNode.next;
    } else {
      previousNode = this.find(index - 1);
      targetNode = previousNode.next;
      previousNode.next = targetNode.next;
    }
      
    if (this.#tail === targetNode) {
      this.#tail = previousNode;
    }
    
    this.#size -= 1;
  }

  find(index) {
    let currentNode = this.#head;
    for (let i = 1; i <= index; i++) {
      if (currentNode.next === null) return null;
      
      currentNode = currentNode.next
    }
    
    return currentNode;
  } 
}

module.exports = {
  Node,
  List
}

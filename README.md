# linked-list
Implementation of linked list data structure in JavaScript

## Getting Started

create a new List instance with linked nodes. (see [constructor spec](https://github.com/travisliu/linked-list/blob/eb08466e8b1208d7d91e843d8829adf75c9741c0/spec.js#L10) for more)

``` javascript
const { Node, List } = require('./index.js'); 

let node = new Node(3);
node = new Node(2, node);
node = new Node(1, node);

const list = new List(node);
console.log(list.head.value); // 1
console.log(list.tail.value); // 3
``` 

### find

finds a node by index (see [find spec](https://github.com/travisliu/linked-list/blob/eb08466e8b1208d7d91e843d8829adf75c9741c0/spec.js#L35) for more)

``` javascript
const list = new List(node);
const foundNode = list.find(1);
console.log(foundNode.value); // 2
```

### prepend

adds a node at the beginning of link (see [prepend spec](https://github.com/travisliu/linked-list/blob/eb08466e8b1208d7d91e843d8829adf75c9741c0/spec.js#L63) for more)

``` javascript
const list = new List(node);

list.prepend(new Node(9));
console.log(list.head.value); // 9
```

### append

adds a node at the end of link (see [append spec](https://github.com/travisliu/linked-list/blob/eb08466e8b1208d7d91e843d8829adf75c9741c0/spec.js#L101) for more)

``` javascript
const list = new List(node);

list.append(new Node(9));
console.log(list.tail.value); // 9
```

### remove

deletes a node from link (see [remove spec](https://github.com/travisliu/linked-list/blob/eb08466e8b1208d7d91e843d8829adf75c9741c0/spec.js#L139) for more)

``` javascript
const list = new List(node);

list.remove(0);
console.log(list.head.value); // 2
```

### generateIterator

creates an iterator for traversing through all of nodes (see [generateIterator spec](https://github.com/travisliu/linked-list/blob/eb08466e8b1208d7d91e843d8829adf75c9741c0/spec.js#L207) for more)

``` javascript
const list = new List(node);
const iterator = list.generateIterator();

while(iterator.hasNext) {
  console.log(iterator.next());
}
// 1
// 2
// 3
```

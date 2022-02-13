const { Node, List } = require('./index.js');

describe('List', () => {
  subject(() => new List($headNode))

  def('headNode', () => null)
  def('head', () => $subject.head)
  def('tail', () => $subject.tail)

  describe('.constructor', () => {
    def('headNode', () => createNodeBySize($nodeAmount))

    context('when head node is null', () => {
      def('nodeAmount', () => 0)

      its('size', () => is.expected.toBe(0))
      its('tail', () => is.expected.toBeNull())
    })

    context('when head node is alone', () => {
      def('nodeAmount', () => 1)

      its('size', () => is.expected.toBe($nodeAmount))
      its('tail', () => is.expected.toBe($head))
    })

    context('when head node has 3 nodes linked', () => {
      def('nodeAmount', () => 3)

      its('size', () => is.expected.toBe($nodeAmount))
      it(() => is.expected.toHaveProperty('tail.value', $nodeAmount))
    })
  })

  describe('.find', () => {
    def('headNode', () => createNodeBySize(6))

    context('when index is pointed to head', () => {
      def('index', () => 0)

      it('returns the head node', () => {
        expect($subject.find($index)).toBe($head);
      })
    })

    context('when index is pointed to tail', () => {
      def('index', () => 5)

      it('returns the tail node', () => {
        expect($subject.find($index)).toBe($tail);
      })
    })

    context('when index is pointed to middle node', () => {
      def('index', () => 3)

      it('returns the node be pointed with index', () => {
        expect($subject.find($index).value).toBe($index + 1);
      })
    })
  })

  describe('.prepend', () => {
    def('newNode', () => new Node(9))

    beforeEach(() => {
      $subject.prepend($newNode);
    })

    context('when head node is null', () => {
      def('headNode', () => null)

      its('size', () => is.expected.toBe(1))
      it(() => is.expected.toHaveProperty('head', $newNode))
      it(() => is.expected.toHaveProperty('tail', $newNode))
    })

    context('when head node is alone', () => {
      def('headNode', () => createNodeBySize(1))

      its('size', () => is.expected.toBe(2))
      it(() => is.expected.toHaveProperty('head', $newNode))
 
      it('retains the original tail', () => {
        expect($tail.value).toBe(1);
      })
    })

    context('when head node has 3 nodes linked', () => {
      def('headNode', () => createNodeBySize(3))

      its('size', () => is.expected.toBe(4))
      it(() => is.expected.toHaveProperty('head', $newNode))

      it('retains the original tail', () => {
        expect($tail.value).toBe(3);
      })
    })
  })

  describe('.append', () => {
    def('newNode', () => new Node(9))

    beforeEach(() => {
      $subject.append($newNode);
    })

    context('when head node is null', () => {
      def('headNode', () => null)

      its('size', () => is.expected.toBe(1))
      its('head', () => is.expected.toBe($newNode))
      its('tail', () => is.expected.toBe($newNode))
    })

    context('when head node is alone', () => {
      def('headNode', () => createNodeBySize(1))

      its('size', () => is.expected.toBe(2))
      its('tail', () => is.expected.toBe($newNode))

      it('retains the original head', () => {
        expect($head.value).toBe(1);
      })
    })

    context('when head node has 3 nodes linked', () => {
      def('headNode', () => createNodeBySize(3))

      its('size', () => is.expected.toBe(4))
      its('tail', () => is.expected.toBe($newNode))
      
      it('retains the original head', () => {
        expect($head.value).toBe(1);
      })
    })
  })

  describe('.remove', () => {
    context('when head node is alone', () => {
      def('headNode', () => createNodeBySize(1))

      beforeEach(() => {
        $subject.remove(0);
      })

      its('size', () => is.expected.toBe(0))
      its('head', () => is.expected.toBeNull())
      its('tail', () => is.expected.toBeNull())
    })

    context('when head node has 6 nodes linked', () => {
      def('headNode', () => createNodeBySize(6))

      beforeEach(() => {
        $subject.remove($index);
      })

      context('and index is pointed to the head node', () => {
        def('index', () => 0)

        its('size', () => is.expected.toBe(5))

        it('assigns second node as new head node', () => {
          expect($head.value).toBe(2);
        })

        it('retains the original tail', () => {
          expect($tail.value).toBe(6);
        })
      })

      context('and index is pointed the middle node', () => {
        def('index', () => 3)

        its('size', () => is.expected.toBe(5))

        it('replaces with next node', () => {
          expect($subject.find($index).value).toBe($index + 2);
        })

        it('retains the original head', () => {
          expect($head.value).toBe(1);
        })

        it('retains the original tail', () => {
          expect($tail.value).toBe(6);
        })
      })

      context('and index is pointed the tail node', () => {
        def('index', () => 5)

        its('size', () => is.expected.toBe(5))

        it('replaces tail with previous node', () => {
          expect($tail.value).toBe($index);
        })

        it('retains the original head', () => {
          expect($head.value).toBe(1);
        })
      })
    })
  })

  describe('.generateIterator', () => {
    def('iterator', () => $subject.generateIterator())

    context('when head node is empty', () => {
      def('headNode', () => createNodeBySize(0))

      it('returns a iterator can not be moved to next', () => {
        expect($iterator.hasNext).toBeFalsy();
        expect($iterator.next()).toBeNull();
      })
    })

    context('when head node is alone', () => {
      def('headNode', () => createNodeBySize(1))

      it('returns a iterator can be moved to next only once', () => {
        expect($iterator.hasNext).toBeTruthy();
        expect($iterator.next()).toBe(1);
        expect($iterator.hasNext).toBeFalsy();
        expect($iterator.next()).toBeNull();
      })
    })

    context('when head node has 3 nodes linked', () => {
      def('headNode', () => createNodeBySize(3))

      it('returns a iterator can be moved to next 3 times', () => {
        expect($iterator.hasNext).toBeTruthy();
        expect($iterator.next()).toBe(1);
        expect($iterator.hasNext).toBeTruthy();
        expect($iterator.next()).toBe(2);
        expect($iterator.hasNext).toBeTruthy();
        expect($iterator.next()).toBe(3);
        expect($iterator.hasNext).toBeFalsy();
        expect($iterator.next()).toBeNull();
      })
    })
  })
})

const createNodeBySize = size => {
  let headNode = null;
  let previousNode = null;

  for (let i = 1; i <= size; i++) {
    const currentNode = new Node(i);

    if (headNode == null) { 
      headNode = currentNode;
    } else {
      previousNode.next = currentNode;
    }

    previousNode = currentNode;
  }

  return headNode;
}

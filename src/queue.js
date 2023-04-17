const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  #queueStart = null;

  getUnderlyingList() {
    return this.#queueStart;
  }

  enqueue(value) {
    const newNode = new ListNode(value);
    if (this.#queueStart) {
      let currentNode = this.#queueStart;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = newNode;
    } else {
      this.#queueStart = newNode;
    }
  }

  dequeue() {
    if (this.#queueStart) {
      const firstValue = this.#queueStart.value;
      this.#queueStart = this.#queueStart.next;
      return firstValue;
    }
  }
}

module.exports = {
  Queue
};

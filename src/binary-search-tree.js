const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  #root = null;

  root() {
    return this.#root;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.#root) {
      const foundNode = this.#tryFindNode(newNode.data, this.#root);
      if (foundNode.isParent) {
        if (foundNode.canAddDataToLeft) {
          foundNode.node.left = newNode;
        } else {
          foundNode.node.right = newNode;
        }

      }
    } else {
      this.#root = newNode;
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    const foundNode = this.#tryFindNode(data, this.#root);
    if (!foundNode.isParent) {
      return foundNode.node;
    }

    return null;
  }

  //Searches for node with specified data. If node not found returns its supposed parent node
  #tryFindNode(data, parentNode) {
    let foundNodeData;
    if (data === parentNode.data) {
      foundNodeData = { node: parentNode, isParent: false };
    } else if (data < parentNode.data) {
      foundNodeData = parentNode.left ? this.#tryFindNode(data, parentNode.left) : { node: parentNode, isParent: true, canAddDataToLeft: true };
    } else {
      foundNodeData = parentNode.right ? this.#tryFindNode(data, parentNode.right) : { node: parentNode, isParent: true, canAddDataToLeft: false };
    }

    return foundNodeData;
  }

  remove(data) {
    const removeNode = (data, currentNode) => {
      let nodeToReturn = currentNode;
      if (data === currentNode.data) {
        if (!currentNode.left && !currentNode.right) {
          nodeToReturn = null;
        } else if (!currentNode.left) {
          nodeToReturn = currentNode.right;
        } else if (!currentNode.right) {
          nodeToReturn = currentNode.left;
        } else {
          const rightMinData = this.#findLeftmostNode(currentNode.right).data;
          currentNode.data = rightMinData;
          currentNode.right = removeNode(rightMinData, currentNode.right);
        }
      } else if (data < currentNode.data && currentNode.left) {
        currentNode.left = removeNode(data, currentNode.left);
      } else if (currentNode.right) {
        currentNode.right = removeNode(data, currentNode.right);
      }

      return nodeToReturn;
    };

    this.#root = removeNode(data, this.#root);
  }

  min() {
    return this.#findLeftmostNode(this.#root).data;
  }

  #findLeftmostNode(parentNode) {
    return parentNode.left ? this.#findLeftmostNode(parentNode.left) : parentNode;
  }

  max() {
    const findRightmostNode = parentNode => {
      return parentNode.right ? findRightmostNode(parentNode.right) : parentNode;
    }

    return findRightmostNode(this.#root).data;
  }
}

module.exports = {
  BinarySearchTree
};
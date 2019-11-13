function BinarySearchTree() {

  // Constructor of node
  function Node(key){
    this.key = key;
    this.right = null;
    this.left = null;
  }

  // Property of tree
  this.root = null;

  // Insert a new element into tree
  // For users
  BinarySearchTree.prototype.insert = function(key) {
    // Build a new node
    var newNode = new Node(key);

    if (this.root == null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  // For insert method
  BinarySearchTree.prototype.insertNode = function(node, newNode){
    if(newNode.key < node.key){
      // if left node is null, then assign newNode to left of node
      if(node.left == null){
        node.left = newNode;
      }else{
        // Recursive
        this.insertNode(node.left, newNode);
      }
    }else{
      // if right node is null, then assign newNode to right of node
      if(node.right == null){
        node.right = newNode;
      }else{
        // Recursive
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Pre-order
  // for Users
  // handler is the function for key
  BinarySearchTree.prototype.preOrderTraversal = function(handler) {
    this.preOrderTraversalNode(this.root, handler);
  }

  BinarySearchTree.prototype.preOrderTraversalNode = function(node, handler) {
    if (node != null){
      // Process the current node
      handler(node.key);
      // Process left
      this.preOrderTraversalNode(node.left, handler);
      // Process right
      this.preOrderTraversalNode(node.right, handler);
    }
  }

  // Inorder travesal
  // for Users
  BinarySearchTree.prototype.inOrderTraversal = function(handler) {
    this.inOrderTraversalNode(this.root, handler);
  }

  BinarySearchTree.prototype.inOrderTraversalNode = function(node, handler) {
    if (node != null){
      // Process left
      this.inOrderTraversalNode(node.left, handler);
      // Process the current node
      handler(node.key);
      // Process right
      this.inOrderTraversalNode(node.right, handler);
    }
  }

  // Post-order travesal
  // for Users
  BinarySearchTree.prototype.postOrderTraversal = function(handler) {
    this.postOrderTraversalNode(this.root, handler);
  }

  BinarySearchTree.prototype.postOrderTraversalNode = function(node, handler) {
    if (node != null){
      // Process left
      this.postOrderTraversalNode(node.left, handler);
      // Process right
      this.postOrderTraversalNode(node.right, handler);
      // Process the current node
      handler(node.key);
    }
  }

  BinarySearchTree.prototype.max = function(){
    var node = this.root;
    while (node.right != null){
      node = node.right;
    }
    return node.key;
  }

  BinarySearchTree.prototype.min = function(){
    var node = this.root;
    while (node.left != null){
      node = node.left;
    }
    return node.key;
  }

  // if key exists, return true
  // if not, return false
  BinarySearchTree.prototype.search = function(key) {
    var node = this.root;
    while (node != null) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        return true;
      }
    }
    return false;
  }

  BinarySearchTree.prototype.remove = function(key) {
    // save the information
    var current = this.root;
    var parent = null;
    var isLeftChild = true;

    while (current.key != key){
      parent = current;
      if (key < current.key){
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }
      // cannot find the key
      if (current == null){
        return false;
      }
    }

    // now, we find the key we want to remove
    // situation 1, no child node
    if (current.left == null & current.right == null){
      if (current == this.root) {
        this.root = null;
      } else if (isLeftChild){
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    // situation 2, only has one child
    else if (current.right == null){
      if (current == this.root) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (current.left == null){
      if (current == this.root){
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }

    else {
      // 找到后继节点
      var succssor = this.getSuccessor(current);

      if (current == this.root){
        this.root = succssor;
      } else if (isLeftChild) {
        parent.left = succssor;
      } else {
        parent.right = succssor;
      }

      succssor.left = current.left;
    }

  }

  // 查找后继节点
  BinarySearchTree.prototype.getSuccessor = function(delNode) {
    var successor = delNode;
    var current = delNode.right;
    var successorParent =  delNode;

    while (current != null) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }

    if (successor != delNode.right) {
      successorParent.left = successor.right;
      successor.right = delNode.right;
    }
    return successor;
  }






}

var bst = new BinarySearchTree();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(25);
bst.insert(6);

// testing traversal
var resultString = '';
bst.preOrderTraversal(function (key){
  resultString += key + ' ';
});
console.log(resultString);

var resultString = '';
bst.inOrderTraversal(function (key){
  resultString += key + ' ';
});
console.log(resultString);

var resultString = '';
bst.postOrderTraversal(function (key){
  resultString += key + ' ';
});
console.log(resultString);

console.log(bst.min());
console.log(bst.max());

console.log(bst.search(25));
console.log(bst.search(4));
console.log(bst.search(24));


bst.remove(9);
bst.remove(7);
bst.remove(15);

var resultString = '';
bst.postOrderTraversal(function (key){
  resultString += key + ' ';
});
console.log(resultString);
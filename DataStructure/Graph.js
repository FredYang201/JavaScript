// Define a dictionary object for storing edges of graph
function  Dictionary() {
  this.items = {};

  // adding key value pairs
  Dictionary.prototype.set = function (key, value) {
    this.items[key] = value;
  }

  // determining whether has key
  Dictionary.prototype.has = function (key) {
    return this.items.hasOwnProperty(key);
  }

  // deleting key
  Dictionary.prototype.remove = function (key) {
    if (!this.has(key)) {
      return false;
    } else {
      delete this.items[key];
      return true
    }
  }

  // getting the value of key
  Dictionary.prototype.get = function (key) {
    return this.has(key) ? this.items[key] : undefined;
  }

  // getting all keys
  Dictionary.prototype.keys = function () {
    return Object.keys(this.items);

  }

  // getting all values
  Dictionary.prototype.values = function () {
    return Object.values(this.items);
  }

  // getting the length of dictionary
  Dictionary.prototype.size = function () {
    return this.items.length;
  }

  // clear all elements
  Dictionary.prototype.clear = function () {
    this.items = {};
  }

  // show all of information
  Dictionary.prototype.show = function () {
    result = '';
    for (prop in this.items) {
      result += prop + ': ' + this.items[prop] + ', ';
    }
    return result
  }
}

// Define a queue for breath-fisrt searching of graph
function Queue() {
  this.items = [];

  // 1. Add an element to queue;
  Queue.prototype.enqueue = function(element) {
    this.items.push(element);
  }

  // 2. Remove the first element in queue;
  Queue.prototype.dequeue = function() {
    return this.items.shift();
  }

  // 3. Take out an element from queue;
  Queue.prototype.front = function() {
    return this.items[0];
  }

  // 4. Determine whether the queue is empty;
  Queue.prototype.isEmpty = function() {
    return this.items.length == 0;
  }

  // 5. Get the number of elements in queue;
  Queue.prototype.size = function() {
    return this.items.length;
  }

  // 6. toString method
  Queue.prototype.toString = function() {
    let len = this.items.length;
    let string = '';
    for (let i = 0; i < len; i++) {
      string += this.items[i] + ' ';
    }
    return string;
  }
}


function Graph() {
  // all the vertexes and edges
  this.vertexes = [];
  this.edges = new Dictionary();

  // adding vertexes
  Graph.prototype.adVertex = function (v) {
    this.vertexes.push(v);
    this.edges.set(v, []);
  }

  // adding an edge between vertex1 and vertex2
  Graph.prototype.adEdge = function (v1, v2) {
    this.edges.get(v1).push(v2);
    // Undirected Graph
    this.edges.get(v2).push(v1);
  }

  // initialize the color of vertexes for search
  Graph.prototype.intializeColor = function() {
    var colors = {};
    for (var i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = 'white';
    }
    return colors;
  }

  // breath-first searching given the first vertex
  Graph.prototype.bfs = function(initVertex, handler) {
    var colors = this.intializeColor();

    var queue = new Queue();
    queue.enqueue(initVertex);

    while (!queue.isEmpty()) {
      // getting a vertex from queue
      var v = queue.dequeue();
      // adding vertexes next to v to queue
      var vList = this.edges.get(v);
      // change status of v into being visited
      colors[v] = 'gray';
      for (var i = 0; i < vList.length; i++) {
        var e = vList[i];
        if (colors[e] == 'white') {
          // change status of v into being visited
          colors[e] = 'gray';
          queue.enqueue(e);
        }
      }
      handler(v);
      // change color of vertex v to black represents v has been searched
      colors[v] = 'black';
    }
  }

  // Depth-first search
  Graph.prototype.dfs = function(initVertex, handler) {
    var colors = this.intializeColor();
    this.dfsVisit(initVertex, colors, handler);
  }

  // Recursive method for Depth-first search
  Graph.prototype.dfsVisit = function(v, colors, handler) {
    colors[v] = 'gray';
    handler(v);
    var vList = this.edges.get(v);
    for (var i = 0; i < vList.length; i++) {
      var e = vList[i];
      if (colors[e] == 'white') {
        this.dfsVisit(e, colors, handler);
      }
    }
    colors[v] = 'black';
  }

  Graph.prototype.toString = function () {
    var resultString = '';
    for (var i = 0; i < this.vertexes.length; i++) {
      resultString += this.vertexes[i] + '->';
      var vEdges = this.edges.get(this.vertexes[i]);
      for (var j = 0; j < vEdges.length; j++) {
        resultString += vEdges[j] + ' ';
      }
      resultString += '\n';
    }
    return resultString;
  }

}

var g = new Graph();
var myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
// adding vertexes
for (var i = 0; i < myVertexes.length; i++){
  g.adVertex(myVertexes[i]);
}

// adding edges
g.adEdge('A', 'B');
g.adEdge('A', 'C');
g.adEdge('A', 'D');
g.adEdge('C', 'D');
g.adEdge('C', 'G');
g.adEdge('G', 'D');
g.adEdge('D', 'H');
g.adEdge('B', 'E');
g.adEdge('B', 'F');
g.adEdge('E', 'I');

console.log(g.toString());

var result = '';
g.bfs(g.vertexes[0], function(v){
  result += v +' ';
});
console.log(result);

var result = '';
console.log(g.vertexes[0]);
g.dfs(g.vertexes[0], function(v){
  result += v +' ';
});
console.log(result);
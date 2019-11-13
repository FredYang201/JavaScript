// Define an array to store elements
function ArrayList() {
  // Storage
  this.array = [];

  // adding new elements
  ArrayList.prototype.insert = function (item) {
    this.array.push(item);
  }

  ArrayList.prototype.swap = function(index1, index2) {
    var temp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = temp;
  }

  // bubble sort
  ArrayList.prototype.bubbleSort = function () {
    var len = this.array.length;
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - i - 1; j++) {
        if (this.array[j] > this.array[j + 1]) {
          this.swap(j, j+1);
        }
      }
    }
  }

  // bubble sort improvement
  ArrayList.prototype.bubbleSort = function () {
    var len = this.array.length;
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - i - 1; j++) {
        if (this.array[j] > this.array[j + 1]) {
          this.swap(j, j+1);
        }
      }
    }
  }

  // select sort
  ArrayList.prototype.selectionSort = function () {
    var len = this.array.length;
    for (var i = 0; i < len - 1; i++) {
      var min = i;
      for (var j = i + 1; j < len; j++) {
        if (this.array[min] > this.array[j]) {
          min = j;
        }
      }
      if (min != i) {
        this.swap(min, i);
      }
    }
  }

  // insert sort
  ArrayList.prototype.insertionSort = function () {
    var len = this.array.length;
    for (var i = 1; i < len; i++) {
      var value = this.array[i];
      var j = i;
      while ( this.array[j - 1] > value && j > 0) {
        this.array[j] = this.array[j - 1];
        j--;
      }
      this.array[j] = value;
    }
  }

  ArrayList.prototype.greedySort = function (){
    var len = this.array.length;
    for (var i = 1; i< len;) {
      if ( i < 1 || this.array[i] > this.array[i - 1] ) {
        i++;
      } else {
        this.swap(i - 1, i);
        i--;
      }
    }
  }

  ArrayList.prototype.greedySortImproved = function (){
    var len = this.array.length;
    for (var i = 1; i< len; i++) {
      for (var k = i; k > 0 && this.array[k - 1] > this.array[k]; k--){
        this.swap(k - 1, k);
      }
    }
  }

  // shell sort
  ArrayList.prototype.shellSort = function () {
    var len = this.array.length;
    var gap = Math.floor(len / 2);
    while (gap >= 1) {
      for (var i = gap; i < len; i++) {
        var temp = this.array[i];
        var j = i;
        while (this.array[j - gap] > temp && j > gap - 1) {
          this.array[j] = this.array[j - gap];
          j = j - gap;
        }
        this.array[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
  }

  // quick sort
  // select pivot value
  ArrayList.prototype.median = function (left, right) {
    var center = Math.floor((left + right) / 2);
    if (this.array[left] > this.array[center]) {
      this.swap(left, center);
    }
    if (this.array[center] > this.array[right]) {
      this.swap(center, right);
    }
    if (this.array[left] > this.array[center]) {
      this.swap(left, center);
    }
    this.swap(center, right - 1);
    // console.log(this.array[left], this.array[center], this.array[right - 1]);
    // console.log(this.array[right - 1]);
    // console.log(this.toString());
    return this.array[right - 1];
  }

  ArrayList.prototype.quickSort = function() {
    this.quick(0, this.array.length - 1);
  }

  ArrayList.prototype.quick = function (left, right) {
    if (left >= right) return;
    var pivot = this.median(left, right);
    var i = left;
    var j = right - 1;
    if (i == j) return;
    while (true) {
      while (this.array[++i] < pivot && i < j) {}
      while (this.array[--j] > pivot && i < j) {}
      if (i < j){
        this.swap(i, j);
      } else {
        break
      }
    }
    this.swap(i, right - 1);
    this.quick(left, i-1);
    this.quick(i + 1, right);
  }
  // show the array
  ArrayList.prototype.toString = function () {
    return this.array.join('-');
  }
}

var list = new ArrayList();
list.insert(66);
list.insert(33)
list.insert(88);
list.insert(12);
list.insert(87);
list.insert(100);
list.insert(5);
list.insert(566);
list.insert(23);
console.log(list.toString());
// list.bubbleSort();
// console.log(list.toString());

// list.selectionSort();
// console.log(list.toString());

// list.insertionSort();
// console.log(list.toString());
//
// list.shellSort();
// console.log(list.toString());

// list.quickSort();
// console.log(list.toString());

// list.greedySort();
// console.log(list.toString());

list.greedySortImproved();
console.log(list.toString());


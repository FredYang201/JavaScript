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
  Dictionary.prototype.toString = function () {
    var resultString = '';
    for (prop in this.items) {
      resultString += prop + ': ' + this.items[prop] + ', ';
    }
    return  resultString
  }
}


var dict = new Dictionary();

dict.set('name', 'Bob');
dict.set('age', 15);
dict.set('gender', 'male');
dict.set('salary', 12000);

console.log(dict.toString());



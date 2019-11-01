// Define a set object
function Set () {
    // Due to the element uniqueness, use the object for the container of elements
    this.items = {}

    Set.prototype.add = function (value) {
        if (this.hasValue(value)){
            return false;
        }
        this.items[value] = value;
        return true;
    }

    Set.prototype.remove = function (value) {
        if (!this.hasValue(value)) {
            return false;
        }
        delete this.items[value];
        return true;
    }

    Set.prototype.clear = function () {
        this.items = {};
    }

    Set.prototype.size = function () {
        return Object.keys(this.items).length;
    }

    // Get all of elements in set
    Set.prototype.values = function () {
        return Object.keys(this.items);
    }

    // Determine whether set has a specific value
    Set.prototype.hasValue = function (value) {
        return this.items.hasOwnProperty(value);
    }

    Set.prototype.subset = function (otherSet) {
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.hasValue(values[i])) {
                return false;
            }
        }
        return true;
    }

    Set.prototype.union = function (otherSet) {
        let unionSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }
        values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }
        return unionSet;
    }

    Set.prototype.intersect = function (otherSet) {
        let intersectSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (otherSet.hasValue(values[i])){
                intersectSet.add(values[i]);
            }
        }
        return intersectSet;
    }

    Set.prototype.subtract = function (otherSet) {
        let subtractSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.hasValue(values[i])){
                subtractSet.add(values[i]);
            }
        }
        return subtractSet;
    }
}


let set = new Set();
console.log(set.add(1));
console.log(set.add(3));
console.log(set.add(2));

console.log(set.remove(1));
console.log(set.remove(1));

console.log(set.size());
set.clear();
console.log(set.size());

let setA = new Set();
console.log(setA.add(1));
console.log(setA.add(3));
console.log(setA.add(2));

let setB = new Set();
console.log(setB.add(4));
console.log(setB.add(3));
console.log(setB.add(5));

let newSet = setA.union(setB);
console.log(newSet.values());

let intersectSet = setA.intersect(setB);
console.log(intersectSet.values());

let subtractSet = setA.subtract(setB);
console.log(subtractSet.values());

let subsetSet = setA.subset(setB);
console.log(subsetSet);
let setC = new Set();
console.log(setC.add(3));
let subset = setC.subset(setB);
console.log(subset);

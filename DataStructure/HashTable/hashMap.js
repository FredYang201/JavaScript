// Define a hash function to get the index
function hashFunc(string, size) {
    // Define a hashCode variable
    let hashCode = 0;
    // Huo Na algorithm to update hashCode
    for(let i = 0; i < string.length; i++) {
        hashCode = 37 * hashCode + string.charCodeAt(i);
    }
    // Transfer the large hashCode to small index
    let index = hashCode % size;
    return index;
}

function HashTable () {
    // To store the element
    this.storage = [];
    // To calculate the load factor, record the number of elements
    this.count = 0;
    // the length of storage, usually a prime number
    this.limit = 7;

    HashTable.prototype.hashFunc = function (string, size) {
        // Define a hashCode variable
        let hashCode = 0;
        // Huo Na algorithm to update hashCode
        for(let i = 0; i < string.length; i++) {
            hashCode = 37 * hashCode + string.charCodeAt(i);
        }
        // Transfer the large hashCode to small index
        let index = hashCode % size;
        return index;
    }

    // key is the number to generate the index
    // value is the element
    HashTable.prototype.put = function (key, value) {
        let index = hashFunc(key, this.limit);
        let bucket = this.storage[index];
        // Determine whether the bucket is empty
        if (bucket == null) {
            // Define a array to store the element at specific index;
            bucket = [];
            this.storage[index] = bucket;
        }
        // Determine whether is the revising data
        // Then revise the new element to old one
        for(let i = 0; i < bucket.length; i++){
            let tuple = bucket[i];
            if (tuple[0] == key) {
                tuple[1] = value;
                return ;
            }
        }
        // Add a new data
        bucket.push([key, value]);
        this.count += 1;
        // Expand the space
        if (this.count > this.limit * 0.75) {
            this.resize(this.limit * 2);
        }
    }

    // Get the number according to the key
    HashTable.prototype.get = function (key) {
        let index = hashFunc(key, this.limit);
        let bucket = this.storage[index];
        // Determine whether the bucket is empty
        if (bucket == null) {
            // Mean that this key has no value
            return null;
        }
        // Search the element corresponding key
        for(let i = 0; i < bucket.length; i++){
            let tuple = bucket[i];
            if (tuple[0] == key) {
                // tuple is the value
                return tuple[1];
            }
        }
        // Don' t find the key
        return null;
    }

    // remove all of number according to the key
    HashTable.prototype.remove = function (key) {
        let index = hashFunc(key, this.limit);
        let bucket = this.storage[index];
        // There is nothing in the corresponding bucket
        if (bucket == null) {
            return null;
        }
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] == key) {
                bucket.splice(i, 1);
                this.count -= 1;
                // Return the removed element
                // Reduce the space
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    this.resize(Math.floor(this.limit / 2));
                }
                return tuple[1];
            }
        }
        // Not finding the exact key
        return null;
    }

    HashTable.prototype.resize = function(newLimit) {
        // Store the storage to the variable
        let oldStorage = this.storage;
        // Reset the storage
        this.storage = [];
        this.count = 0;
        // Set the length of hashtable to new one
        // Make sure that the length should be a prime number
        this.limit = this.getPrime(newLimit);
        // Put the old value into new this.storage
        for (let i = 0; i < oldStorage.length; i++) {
            let bucket = oldStorage[i];
            if (bucket == null) {
                continue;
            }
            for (let j = 0; j < bucket.length; j++) {
                let tuple = bucket[j];
                this.put(tuple[0], tuple[1]);
            }
        }
    }

    // Determine whether a number is prime
    HashTable.prototype.isPrime = function (number) {
        let temp = parseInt(Math.sqrt(number));
        for (let i = 2; i < temp; i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }

    // Get the min prime number than number
    HashTable.prototype.getPrime = function (number) {
        while (!this.isPrime(number)) {
            number += 1;
        }
        return number;
    }

    HashTable.prototype.isEmpty = function () {
        return this.count == 0;
    }

    HashTable.prototype.size = function () {
        return this.count;
    }

}

let hashTable = new HashTable();
hashTable.put('ab', 123);
hashTable.put('bc', 234);
hashTable.put('ac', 347);
hashTable.put('ab', 8934);

console.log(hashTable.get('ab'));
console.log(hashTable.get('ac'));

hashTable.remove('ab');
console.log(hashTable.get('ab'));



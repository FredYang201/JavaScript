// Define a queue object;
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

// let queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// console.log(queue.toString());
// console.log(queue.front());
// queue.dequeue();
// console.log(queue.toString());
// console.log(queue.front());



const name = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
function passGame(nameList, number){
    let queue = new Queue();
    let each;
    for (each in name) {
        queue.enqueue(name[each]);
    }
    while (queue.size() > 1){
        for (let i = 1; i < number; i++){
            queue.enqueue(queue.dequeue());
        }
        // Delete the name when it gets to the number
        queue.dequeue();
    }
    return queue.front();
}
console.log(passGame(name, 4));
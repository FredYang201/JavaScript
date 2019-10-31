// Define a priority queue object;
function PriorityQueue() {
    this.items = []

    // Define a queue object to store the element and priority
    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }

    // 1. Add an element to queue;
    PriorityQueue.prototype.enqueue = function(element, priority) {
        let queueElement = new QueueElement(element, priority);

        if (this.isEmpty()) {
            this.items.push(queueElement);
        }else{
            let flag = false;
            for (let i = 0; i < this.items.length; i++){
                // Smaller number has higher priority
                if (this.items[i]['priority'] > queueElement['priority']){
                    flag = true;
                    this.items.splice(i, 0, queueElement);
                    break;
                }
            }
            if (!flag) {
                this.items.push(queueElement);
            }
        }
    }

    // 2. Remove the first element in queue;
    PriorityQueue.prototype.dequeue = function() {
        return this.items.shift();
    }

    // 3. Take out an element from queue;
    PriorityQueue.prototype.front = function() {
        return this.items[0];
    }

    // 4. Determine whether the queue is empty;
    PriorityQueue.prototype.isEmpty = function() {
        return this.items.length == 0;
    }

    // 5. Get the number of elements in queue;
    PriorityQueue.prototype.size = function() {
        return this.items.length;
    }

    // 6. toString method
    PriorityQueue.prototype.toString = function() {
        let len = this.size();
        let string = '';
        for (let i = 0; i < len; i++) {
            string += this.items[i]['element'] + ': ' + this.items[i]['priority'] + ' ';
        }
        return string;
    }
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue(12, 3);
priorityQueue.enqueue(11, 5);
priorityQueue.enqueue(19, 6);
priorityQueue.enqueue(15, 4);
priorityQueue.enqueue(17, 2);
priorityQueue.enqueue(14, 7);
console.log(priorityQueue.toString());
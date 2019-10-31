// Define a constructor for DoubleLinkedList object
function DoubleLinkedList() {

    // 1. Define a constructor for Node object
    function Node(data) {
        // Attributes in Node object
        this.data = data;
        this.next = null;
        this.prev = null;
    }
    // 2. Attributes in DoubleLinkedList object
    this.head = null;
    this.tail = null;
    this.length = 0;

    // 3. Add element in the end
    DoubleLinkedList.prototype.append = function(element) {
        let elementNode = new Node(element);
        // If head is null, then append the new node in the end
        if (!this.head){
            this.head = elementNode;
            this.tail = elementNode;
        }else{        // If head is null, then find the last node in this DoubleLinkedList
            this.tail.next = elementNode;
            elementNode.prev = this.tail;
            this.tail = elementNode;
        }
        // The length of DoubleLinkedList will increase by 1.
        this.length += 1;
    }

    // 4. insert element at certain position
    DoubleLinkedList.prototype.insert = function(position, element) {
        if(position < 0 || position > this.length) return false;

        let elementNode = new Node(element);

        if (this.length === 0) {
            this.head = elementNode;
            this.tail = elementNode;
        }else{
            if (position == 0){
                this.head.prev = elementNode;
                elementNode.next = this.head;
                this.head = elementNode;
            }else if (position === this.length){
                this.tail.next = elementNode;
                elementNode.prev = this.tail;
                this.tail = elementNode;
            }else {
                let current = this.head;
                for (let i = 0; i < position; i++) {
                    current = current.next;
                }
                elementNode.next = current;
                elementNode.prev = current.prev;
                current.prev.next = elementNode;
                current.next.prev = elementNode;
            }
        }
        this.length += 1;
        return true;
    }

    // 5. Get the element at position
    DoubleLinkedList.prototype.get = function(position) {
        if(position < 0 || position >= this.length) return false;

        if (position > this.length / 2){
            let current = this.tail;
            let i = this.length-1;
            while (i > position){
                current = current.prev;
                i -= 1;
            }
            return current.data;
        }else{
            let current = this.head;
            let i = 0;
            while (i < position){
                current = current.next;
                i += 1;
            }
            return current.data;
        }
    }

    // 6. Get the element at last position
    DoubleLinkedList.prototype.getFront = function() {
        return this.head.data;
    }

    // 7. Get the element at first position
    DoubleLinkedList.prototype.getTail = function(position) {
        return this.tail.data;
    }

    // 8. Return the index of specific element
    DoubleLinkedList.prototype.indexOf = function(element) {
        let current = this.head;
        let index = 0;
        while (current){
            if(current.data === element){
                return index;
            }
            index += 1;
            current = current.next;
        }
        return -1;
    }

    // 9. Update the data at specific position to element
    DoubleLinkedList.prototype.update = function(position, element) {
        if(position < 0 || position >= this.length) return false;

        if(position > this.length / 2){
            let current = this.tail;
            let i = this.length - 1;
            while(i > position){
                current = current.prev;
                i -= 1;
            }
            current.data = element;
        }else{
            let current = this.head;
            let i = 0;
            while (i < position){
                current = current.next;
                i += 1;
            }
            current.data = element;
        }
    }

    // 10. Remove the element at specific position
    DoubleLinkedList.prototype.removeAt = function(position){
        if(position < 0 || position >= this.length) return false;

        let current = this.head;
        if(this.length == 1) {
            this.tail = null;
            this.head = null;
        }else {
            if (position == 0) {
                this.head.next.prev = null;
                this.head = this.head.next;
            } else if (this.length - 1 == position) {
                current = this.tail;
                this.tail.prev.next = null;
                this.tail = this.tail.prev;
            } else {
                if (position > this.length / 2) {
                    current = this.tail;
                    let i = this.length - 1;
                    while (i > position) {
                        current = current.prev;
                        i -= 1;
                    }
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }else{
                    let i = 0;
                    while (i < position) {
                        current = current.next;
                        i += 1;
                    }
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
            }
        }
        this.length -= 1;
        return current.data;
    }

    // 11. Remove specific element
    DoubleLinkedList.prototype.remove = function(element){
        position = this.indexOf(element);
        return this.removeAt(position);
    }

    DoubleLinkedList.prototype.isEmpty = function(){
        return this.length == 0;
    }

    DoubleLinkedList.prototype.size = function(){
        return this.length;
    }

    DoubleLinkedList.prototype.toString = function() {
        return this.backwordString();
    }

    DoubleLinkedList.prototype.backwordString = function() {
        let current = this.head;
        let string = '';

        while(current) {
            string += current.data + ' ';
            current = current.next;
        }
        return string;
    }

    DoubleLinkedList.prototype.forwardString = function() {
        let current = this.tail;
        let string = '';

        while(current) {
            string += current.data + ' ';
            current = current.prev;
        }
        return string;
    }
}


let doubleLinkedList = new DoubleLinkedList();

doubleLinkedList.append('abc');
doubleLinkedList.append('bcd');
doubleLinkedList.append('cde');
doubleLinkedList.append('cef');
doubleLinkedList.append('cfe');
doubleLinkedList.append('efv');
doubleLinkedList.append('ecf');

console.log(doubleLinkedList.toString());
console.log(doubleLinkedList.forwardString());
console.log(doubleLinkedList.backwordString());

doubleLinkedList.insert(0, 'cdn');
console.log(doubleLinkedList.toString());
doubleLinkedList.insert(2, 'adc');
console.log(doubleLinkedList.toString());

console.log(doubleLinkedList.get(0));
console.log(doubleLinkedList.get(7));

console.log(doubleLinkedList.indexOf('cfe'));

doubleLinkedList.update(3, 'cnm');
console.log(doubleLinkedList.toString());
doubleLinkedList.update(6, 'mnc');
console.log(doubleLinkedList.toString());

console.log(doubleLinkedList.removeAt(6));
console.log(doubleLinkedList.toString());
console.log(doubleLinkedList.removeAt(4));
console.log(doubleLinkedList.toString());

doubleLinkedList.remove('adc');
console.log(doubleLinkedList.toString());
doubleLinkedList.remove('efv');
console.log(doubleLinkedList.toString());

console.log(doubleLinkedList.size());
console.log(doubleLinkedList.isEmpty());
// Define a constructor for LinkedList object
function LinkedList() {

    // 1. Define a constructor for Node object
    function Node(data) {
        // Attributes in Node object
        this.data = data;
        this.next = null;
    }
    // 2. Attributes in LinkedList object
    this.head = null;
    this.length = 0;

    // 3. Add element in the end
    LinkedList.prototype.append = function(element) {
        let elementNode = new Node(element);
        // If head is null, then append the new node in the end
        if (!this.head){
            this.head = elementNode;
        }else{        // If head is null, then find the last node in this linkedlist
            let current = this.head;
            while (current.next){
                current = current.next;
            }
            current.next = elementNode;
        }
        // The length of linkedlist will increase by 1.
        this.length += 1;
    }

    // 4. insert element at certain position
    LinkedList.prototype.insert = function(position, element) {
        if(position < 0 || position > this.length) return false;

        let elementNode = new Node(element);

        if (position == 0){
            elementNode.next = this.head;
            this.head = elementNode;
        }else{
            let current = this.head;
            let previous = null;
            let i = 0;
            while (i < position){
                previous = current;
                current = current.next;
                i += 1;
            }
            elementNode.next = current;
            previous.next = elementNode;
        }
        this.length += 1;
        return true;
    }

    // 5. Get the element at position
    LinkedList.prototype.get = function(position) {
        // # 越界判断
        if(position < 0 || position >= this.length) return false;

        let current = this.head;
        let i = 0;
        while (i < position){
            current = current.next;
            i += 1;
        }
        return current.data;
    }

    // 6. Return the index of specific element
    LinkedList.prototype.indexOf = function(element) {
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

    // 7. Update the data at specific position to element
    LinkedList.prototype.update = function(position, element) {
        if(position < 0 || position >= this.length) return false;

        let current = this.head;
        let i = 0;
        while (i < position){
            current = current.next;
            i += 1;
        }
        current.data = element;
    }

    // 8. Remove the element at specific position
    LinkedList.prototype.removeAt = function(position){
        if(position < 0 || position >= this.length) return false;

        let current = this.head;

        if (position == 0) {
            this.head = this.head.next;
        }else{
            let previous = null;
            let i = 0;
            while (i < position){
                previous = current;
                current = current.next;
                i += 1;
            }
            previous.next = current.next;
        }
        this.length -= 1;
        return current.data;
    }

    // 9. Remove specific element
    LinkedList.prototype.remove = function(element){
        position = this.indexOf(element);
        return this.removeAt(position);
    }

    LinkedList.prototype.isEmpty = function(){
        return this.length == 0;
    }

    LinkedList.prototype.size = function(){
        return this.length;
    }
    
    LinkedList.prototype.toString = function() {
        let current = this.head;
        let string = '';

        while(current) {
            string += current.data + ' ';
            current = current.next;
        }
        return string;
    }
}


linkedList = new LinkedList();

linkedList.append('abc');
linkedList.append('bcd');
linkedList.append('cde');

linkedList.insert(0, 'cdn');
linkedList.insert(2, 'adc')

console.log(linkedList.toString());
console.log(linkedList.get(0));
console.log(linkedList.get(4));
console.log(linkedList.indexOf('aef'));

linkedList.update(3, 'cnm');
console.log(linkedList.toString());

linkedList.remove('cnm');
console.log(linkedList.toString());

console.log(linkedList.size());
console.log(linkedList.isEmpty());

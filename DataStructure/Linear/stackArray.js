// Define a stack class
function Stack(){
    // Storage of stack
    this.items = [];

    // Operations of stack
    // 1. Add a new element to the top of stack;
    Stack.prototype.push = function (element){
        this.items.push(element);
    }

    // 2. Remove the element from stack and return it;
    Stack.prototype.pop = function (){
        return this.items.pop();
    }

    // 3. View the element on the top of stack;
    Stack.prototype.peek = function (){
        return this.items[this.items.length - 1];
    }

    // 4. Determine whether the stack is empty;
    Stack.prototype.isEmpty = function (){
        return this.items.length == 0;
    }

    // 5. Get the number of elements on the stack;
    Stack.prototype.size = function (){
        return this.items.length
    }

    // 6. toString method
    Stack.prototype.soString = function (){
        let resultString = '';
        const len = this.items.length;
        for (let i = 0; i < len; i ++ ){
            resultString += this.items[i] + ' ';
        }
        return resultString;
    }
}


// Application for digital conversion

var stack = new Stack();

function dec2bin(decNumber){
    // 1. Define a stack instance;
    stack = new Stack();

    // 2. Store the digitals into stack;
    while (decNumber > 0){
        stack.push( decNumber % 2);
        decNumber = Math.floor(decNumber / 2);
    }

    // 3. Take out the elements from stack;
    let binaryString = '';
    while (!stack.isEmpty()) {
        binaryString += stack.pop();
    }
    return binaryString;
}

console.log(dec2bin(100));
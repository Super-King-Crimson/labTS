export class LinkedList {
    value: number;
    private next: LinkedList | null;

    constructor(value: number, next?: LinkedList) {
        this.value = value;
        this.next = next || null;
    }
    
    toNext(times?: number): LinkedList | null {
        let count =  !times || times < 1 ? 
            1 : Math.trunc(times)
        ;

        //not stack overflow.
        if (count === 1) {
            return this.next;
        }
        
        let node: LinkedList = this;        

        for (let i = 0; i < count; i++) {
            //not stack overflow
            let next = node.toNext();            

            if (next) {
                node = next;
            } else {
                return null;
            }
        }
        
        return node;
    }

    /**
     * Returns the tail of the linked list.
     * 
     * # Examples
     * ```ts
     * let list = LinkedList.fromTail(1, 2, 3, 4, 5) //[5, 4, 3, 2, 1]
     * assert.strictEqual(1, list.last().value)
     * ```
     */
    last(): LinkedList {
        let current: LinkedList = this;
        
        while (true) {
            let next = current.toNext();

            if (next) {
                current = next;
            } else {
                break;
            }
        }

        return current;
    }

    /**
     * Checks if the LinkedList has any loops (any nodes that point to previously defined nodes) using a tortoise and hare algorithm.
     * 
     * # Examples
     * ```ts
     * let list1 = LinkedList.fromTail(1, 2, 3, 4, 5); //[5, 4, 3, 2, 1]
     *  
     * assert.strictEqual([false], list1.hasLoop());
     * 
     * let list2 = LinkedList.fromHead(6, 7, 8, 9, 10);     
     *                                                 
     * list2.last().connect(list2.toNext(2)); //8
     * 
     * assert.strictEqual([true, list2Tail], list2.hasLoop());
     * ```
     */
    hasLoop(): [result: boolean, entryPoint: LinkedList | null] {
        let slow: LinkedList | null = this;
        let fast: LinkedList | null = this;      

        while (fast) {
            //NOT NULL: only fast needs to be checked for as it travels faster and therefore will become null earlier
            slow = slow!.toNext();            
            fast = fast.toNext(2);

            if (fast && slow === fast) {
                let traceHead: LinkedList = this;
                let traceMeeting: LinkedList = fast;                

                while (traceHead !== traceMeeting) {
                    //NOT NULL: by now we know that we're in a loop, therefore toNext() will never return null
                    traceHead = traceHead.toNext()!;
                    traceMeeting = traceMeeting.toNext()!;
                }

                return [true, traceHead];
            }
        }

        return [false, null];
    }

    /**
     * [1, 2, 3] will make 1 -> 2 -> 3 
    */ 
    static fromHead(...values: number[]): LinkedList {         
        let head = new LinkedList(values[0]);
        let connection = head;

        for (let i = 1; i < values.length; i++) {
            let next = new LinkedList(values[i]);
            
            connection.connect(next);
            connection = next;
        }

        return head;
    }

    /**
     * [1, 2, 3] will make 3 -> 2 -> 1 
    */ 
    static fromTail(...values: number[]): LinkedList {
        let value = values.pop()!;

        //last value initialized as head of linked list
        if (values.length === 0) {
            return new LinkedList(value);
        } else {
            return new LinkedList(value, LinkedList.fromTail(...values));
        }
    }

    static display(list: LinkedList) {
        let acc = "";
        let [_, loopNode] = list.hasLoop();        
        let reachedLoop = false;

        while (true) {
            let current = list;
            let val = current.value;
            let next = list.toNext();

            if (next) {
                if (current === loopNode) {
                    if (reachedLoop) {
                        acc += "start)";
                        break;
                    }

                    acc += "(start: ";
                    reachedLoop = true;                    
                }

                acc += `${val} -> `;
            } else {
                acc += val;
                break;
            }

            list = next;
        }

        console.log(acc);
    }
    
    /**
     * Connects `this` to `other` so that calling `this.next()` returns `other`.
     * 
     * # Examples
     * ```ts
     * let list1 = new LinkedList(1);
     * let list2 = new LinkedList(2);
     * list1.connect(list2);
     * 
     * assert.strictEqual(list1.next(), list2); 
     * ```
     */
    connect(other: LinkedList) {
        if (this.next) {
            new Error("Cannot connect through an error");
        } else {
            this.next = other;
        }
    }

    private reconnect(other: LinkedList) {
        this.next = other;
    }

    *[Symbol.iterator]() {
        let current: LinkedList | null = this;

        while (current) {
            yield current;

            current = current.toNext();
        }            
    }
}

let list1 = LinkedList.fromTail(5, 4, 3, 2, 1);
let list2 = LinkedList.fromHead(10, 20, 30, 40, 50);

LinkedList.display(list1);
LinkedList.display(list2);

let list3 = LinkedList.fromTail(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
list3.last().connect(list3.toNext(5)!);

LinkedList.display(list3);
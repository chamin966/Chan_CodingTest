class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.heap = [];
    this.compare = compare;
  }

  getLeftChildIndex = parentIndex => 2 * parentIndex + 1;
  getRightChildIndex = parentIndex => 2 * parentIndex + 2;
  getParentIndex = childIndex => Math.floor((childIndex - 1) / 2);

  hasParent = childIndex => this.getParentIndex(childIndex) >= 0;
  hasLeftChild = parentIndex => this.getLeftChildIndex(parentIndex) < this.heap.length;
  hasRightChild = parentIndex => this.getRightChildIndex(parentIndex) < this.heap.length;

  leftChild = parentIndex => this.heap[this.getLeftChildIndex(parentIndex)];
  rightChild = parentIndex => this.heap[this.getRightChildIndex(parentIndex)];
  parent = childIndex => this.heap[this.getParentIndex(childIndex)];

  swap = (index1, index2) => [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];

  heapifyDown = () => {
    let currentIndex = 0;
    while (this.hasLeftChild(currentIndex)) {
      let childIndexToSwap = this.getLeftChildIndex(currentIndex);
      if (this.hasRightChild(currentIndex) && this.compare(this.rightChild(currentIndex), this.leftChild(currentIndex)) > 0) {
        childIndexToSwap = this.getRightChildIndex(currentIndex);
      }

      if (this.compare(this.heap[currentIndex], this.heap[childIndexToSwap]) >= 0) {
        break;
      }

      this.swap(currentIndex, childIndexToSwap);
      currentIndex = childIndexToSwap;
    }
  }

  enq(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    while (this.hasParent(currentIndex) && this.compare(this.parent(currentIndex), this.heap[currentIndex]) < 0) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  deq() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return top;
  }

  peek() { return (this.heap.length === 0) ? null : this.heap[0]; }

  size() { return this.heap.length; }
}

// 예제 사용:
const pqMax1 = new PriorityQueue((a, b) => a - b); // 최대 힙 (a - b)
pqMax1.enq(10);
pqMax1.enq(5);
pqMax1.enq(20);
pqMax1.enq(3);

console.log(pqMax1.deq()); // 출력: 20
console.log(pqMax1.deq()); // 출력: 10
console.log();


const pqMin1 = new PriorityQueue((a, b) => b - a); // 최소 힙 (b - a)
pqMin1.enq(10);
pqMin1.enq(5);
pqMin1.enq(20);
pqMin1.enq(3);

console.log(pqMin1.deq()); // 출력: 3
console.log(pqMin1.deq()); // 출력: 5
console.log();

// 최대힙(Max Heap) (a-b)
let pqMax2 = new PriorityQueue((a, b) => a.cash - b.cash);
pqMax2.enq({ cash: 250, name: 'Doohyun Kim' });
pqMax2.enq({ cash: 300, name: 'Gildong Hong' });
pqMax2.enq({ cash: 150, name: 'Minchul Han' });
console.log(pqMax2.size()); // 3
console.log(pqMax2.deq()); // {cash: 300, name: 'Gildong Hong'}
console.log(pqMax2.peek()); // {cash: 250, name: 'Doohyun Kim'}
console.log(pqMax2.size()); // 2
console.log();


// 최소힙(Min Heap) (b-a)
let pqMin2 = new PriorityQueue((a, b) => b.cash - a.cash);
pqMin2.enq({ cash: 250, name: 'Doohyun Kim' });
pqMin2.enq({ cash: 300, name: 'Gildong Hong' });
pqMin2.enq({ cash: 150, name: 'Minchul Han' });
console.log(pqMin2.size()); // 3
console.log(pqMin2.deq()); // {cash: 150, name: 'Minchul Han'}
console.log(pqMin2.peek()); // {cash: 250, name: 'Gildong Hong'}
console.log(pqMin2.size()); // 2
console.log();

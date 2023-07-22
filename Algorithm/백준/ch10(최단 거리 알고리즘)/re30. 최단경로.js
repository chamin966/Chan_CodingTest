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

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [v, e] = input[0].split(' ').map(v => Number(v));
let start = input[1]
const data = Array.from({length: v + 1}, () => []);
for (let i = 2; i < e + 2; i++) {
  let [u, v, w] = input[i].split(' ').map(v => Number(v));
  data[u].push([v, w]);
}

function solution(graph, start, v){
  let INF = Infinity;
  const distance = new Array(v + 1).fill(INF);
  const minHeap = new PriorityQueue((a, b) => b[1] - a[1]); // 최소힙
  minHeap.enq([start, 0]);
  distance[start] = 0;
  
  while(minHeap.size() > 0){
    let [cur, curCost] = minHeap.deq();
    if(distance[cur] < curCost) continue;
    for(let [nextNode, nextCost] of graph[cur]){
      let newCost =  curCost + nextCost;
      if(newCost < distance[nextNode]){
        distance[nextNode] = newCost;
        minHeap.enq([nextNode, newCost]);
      }
    }
  }

  let answer = ''
  for(let i = 1; i <= v; i++){
    if(distance[i] === Infinity) answer += 'INF' + '\n'
    else answer +=  distance[i] + '\n';
  }

  return answer;
}

console.log(solution(data, start, v));

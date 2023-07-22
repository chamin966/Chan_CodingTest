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

let [city, load, k] = input[0].split(' ').map(v => Number(v));
const data = Array.from({length: city + 1}, () => []);
for (let i = 1; i <= load; i++) {
  let [a, b, c] = input[i].split(' ').map(v => Number(v));
  data[a].push([b, c]);
  data[b].push([a, c]);
}

function solution(graph, city, load, k){
  let answer = Number.MAX_VALUE;
  let INF = Infinity
  let start = 1;
  // 외부 인덱스가 노드 번호, 내부 인덱스는 포장 횟수
  // distance[nodeNum][pavedCnt] === 포장한 횟수에 따른 최솟값
  const distance = Array.from({length: city + 1}, () => new Array(k + 1).fill(INF))

  const pq = new PriorityQueue((a, b) => b[1] - a[1]); //최소힙
  pq.enq([start, 0, 0]); //(노드 번호, 비용, 포장 횟수)
  distance[start][0] = 0;
  
  while(pq.size() > 0){
    let [curNode, curCost, pavedCnt] = pq.deq();
    if(distance[curNode][pavedCnt] < curCost) continue;
    for(let [nextNode, nextCost] of graph[curNode]){
      let newCost = curCost + nextCost;
      if(newCost < distance[nextNode][pavedCnt]){
        distance[nextNode][pavedCnt] = newCost;
        pq.enq([nextNode, newCost, pavedCnt]);
      }
      if(pavedCnt < k && curCost < distance[nextNode][pavedCnt + 1]){
        distance[nextNode][pavedCnt + 1] = curCost;
        pq.enq([nextNode, curCost, pavedCnt + 1]);
      }
    }
  }
  
  return Math.min(...distance[city]);
}

console.log(solution(data, city, load, k));

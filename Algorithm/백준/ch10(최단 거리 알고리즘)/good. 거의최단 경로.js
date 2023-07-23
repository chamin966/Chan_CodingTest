class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enq(item) { this.items[this.tail++] = item; }
  deq() {
    const item = this.items[this.head];
    delete this.items[this.head++];
    return item;
  }
  peek() { return this.items[this.head] }
  size() { return this.tail - this.head; }
}

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
let line = 0;

while(true){
  let [nodeCnt, edgeCnt] = input[line].split(' ').map(v => Number(v));
  if(nodeCnt === 0 && edgeCnt === 0) break;
  
  let [start, end] = input[line + 1].split(' ').map(v => Number(v));
  
  const graph = Array.from({length: nodeCnt}, () => []);
  const reversed_graph = Array.from({length: nodeCnt}, () => []); // 경로 추적을 위한 역순 그래프
  for (let i = line + 2; i < line + edgeCnt + 2; i++) {
    let [a, b, c] = input[i].split(' ').map(v => Number(v));
    graph[a].push([b, c]);
    reversed_graph[b].push([a, c])
  }

  let INF = Infinity;
  let distance = new Array(nodeCnt).fill(INF);
  const dijkstra = (grp) => {
    const pq = new PriorityQueue((a, b) => b[1] - a[1]);
    pq.enq([start, 0]);
    distance[start] = 0;
    while(pq.size() > 0){
      let [curNode, curCost] = pq.deq();
      if(distance[curNode] < curCost) continue;
      for(let [nextNode, nextCost] of grp[curNode]){
        let newCost = curCost + nextCost;
        if(newCost < distance[nextNode]){
          distance[nextNode] = newCost;
          pq.enq([nextNode, newCost]);
        }
      }
    }
  }

  const bfs = () => {
    const q = new Queue();
    const visited = new Set();
    const path = [];
    q.enq(end);
    while(q.size() > 0){
      let cur = q.deq();
      if(start === cur) continue;
      for(let [prev, prevCost] of reversed_graph[cur]){
        let nowCost = distance[prev] + prevCost;
        if(distance[cur] === nowCost){
          path.push([prev, cur]);
          if(visited.has(prev) === false){
            q.enq(prev);
            visited.add(prev);
          }
        }
      }
    }
    return path;
  }

  dijkstra(graph)

  const shortCut = bfs();
  distance = new Array(nodeCnt).fill(INF);
  const newGraph = Array.from({length: nodeCnt}, () => []);

  for (let i = line + 2; i < line + edgeCnt + 2; i++) {
    let [a, b, c] = input[i].split(' ').map(v => Number(v));
    let flag = false;
    for(let [pCur, pNext] of shortCut){
      if(a === pCur && b === pNext){
        flag = true;
        break;
      }
    }
    if(flag === false) newGraph[a].push([b, c]);
  }
  
  dijkstra(newGraph)

  if(distance[end] === INF) console.log(-1);
  else console.log(distance[end]);
  line += edgeCnt + 2;
}


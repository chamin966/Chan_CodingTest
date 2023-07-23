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

let [nodeCnt, edgeCnt]= input[0].split(' ').map(v => Number(v));
const data = Array.from({length: nodeCnt + 1}, () => []);
for (let i = 1; i <= edgeCnt; i++) {
  let [a, b, c] = input[i].split(' ').map(v => Number(v));
  data[a].push([b, c]);
  data[b].push([a, c]);
}

let [v1, v2] = input[edgeCnt + 1].split(' ').map(v => Number(v));

function solution(graph, nodeCnt, v1, v2){
  let [start, end] = [1, nodeCnt];
  let INF = Infinity;

  // 중간에 꼭 들러야 하는 노드(A, B)가 있다면
  // 다익스트라 알고리즘으로,
  // 시작점에서 K까지 한 번, K부터 도착지까지 한번으로 나누면 된다.
  const dijkstra = (start) => {
    let distance = Array.from({length: nodeCnt + 1}, () => INF);
    // 최소힙, b-a, 1번 인덱스 기준 
    const pq = new PriorityQueue((a, b) => b[1] - a[1]);
    pq.enq([start, 0]);
    distance[start] = 0;
    while(pq.size() > 0){
      let [curNode, curCost] = pq.deq();
      if(distance[curNode] < curCost) continue;
      for(let [nextNode, nextCost] of graph[curNode]){
        let newCost = curCost + nextCost;
        if(distance[nextNode] > newCost){
          distance[nextNode] = newCost;
          pq.enq([nextNode, newCost]);
        }
      }
    }
    return distance;
  }

  const allPath = dijkstra(1);
  const v1Path = dijkstra(v1);
  const v2Path = dijkstra(v2);

  let answer = Math.min(
    allPath[v1] + v1Path[v2] + v2Path.at(-1),
    allPath[v2] + v2Path[v1] + v1Path.at(-1));
  
  return answer >= INF ? -1 : answer;
}

console.log(solution(data, nodeCnt, v1, v2));

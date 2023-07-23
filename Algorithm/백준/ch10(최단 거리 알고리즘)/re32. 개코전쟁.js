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

let [nodeCnt, loadCnt] = input[0].split(' ').map(v => Number(v));
const data = Array.from({ length: nodeCnt + 1 }, () => []);
for (let i = 1; i <= loadCnt; i++) {
  let [a, b, c] = input[i].split(' ').map(v => Number(v));
  data[a].push([b, c]);
  data[b].push([a, c]);
}

function solution(graph, nodeCnt) {
  let INF = Infinity;
  let [start, end] = [1, nodeCnt];
  // 최단 거리 테이블을 모두 무한으로 초기화
  let distance = new Array(nodeCnt + 1).fill(INF);

  // 일반적인 다익스트라와 동일하지만, ds ↔ de 간선은 무시하는 함수
  const dijkstra = (ds, de) => {
    // 최소힙(Min Heap, b - a) 1번 인덱스값 기준
    let pq = new PriorityQueue((a, b) => b[1] - a[1]); 
    // 시작 노드로 가기 위한 최단 거리는 0으로 우선순위 큐에 삽입
    pq.enq([start, 0]);
    distance[start] = 0;
    while (pq.size() > 0) { // 우선순위 큐가 비어있지 않다면
      // 가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
      let [curNode, curCost] = pq.deq();
      // 현재 노드가 이미 처리된 적이 있는 노드라면 무시
      if (distance[curNode] < curCost) continue;
      // 현재 노드와 연결된 다른 인접한 노드들을 확인
      for (let [nextNode, nextCost] of graph[curNode]) {
        // ds ↔ de 간선은 무시
        if (nextNode == ds && curNode == de) continue;
        else if(nextNode == de && curNode == ds) continue;
        let newCost = curCost + nextCost;
        // 현재 노드를 거쳐서, 다른 노드로 이동하는 거리가 더 짧은 경우
        if (newCost < distance[nextNode]) {
          distance[nextNode] = newCost;
          pq.enq([nextNode, newCost]);
        }
      }
    }
  }

  // 최단 경로 역추적 함수
  const bfs = () => {
    let q = new Queue();
    let visited = new Set(); // 특정한 노드 방문 여부
    q.enq(end); // 도착 지점(end)을 큐에 삽입
    let removes = []; // 삭제할 간선들(결과)
    while (q.size() > 0) { // 큐가 빌 때까지 반복하기
      let cur = q.deq();
      if (cur == start) { // 시작점에 도착한 경우
        continue; // 모든 최단 경로를 확인하기 위해 break 대신 continue
      }
      for (let [next, nextCost] of graph[cur]) { // 현재 노드와 연결된 간선들 확인
        let newCost = distance[next] + nextCost;
        // 만약 newCost가 현재 노드 cur의 비용과 같다면,
        // 이 간선은 도착 노드 end로부터 현재 노드 cur까지의 최단 경로에 속하는 간선
        if (newCost == distance[cur]) { // 최단 경로에 포함된 간선인 경우 삭제 목록에 추가
          removes.push([next, cur]);
          // 각 "직전 노드"는 한 번씩만 방문
          if (!visited.has(next)) {
            q.enq(next);
            visited.add(next);
          }
        }
      }
    }
    return removes;
  }

  // 다익스트라 알고리즘을 수행
  dijkstra(-1, -1);

  // 최단 경로 역추적: 모든 최단 경로에 포함된 간선 쌍 (destStart, destEnd)들을 계산
  let removes = bfs();
  let answer = 0;
  // 모든 최단 경로에 포함된 간선 쌍 (destStart, destEnd)들을 확인
  for ([destStart, destEnd] of removes) {
    // 최단 거리 테이블을 모두 무한으로 다시 초기화
    distance = new Array(nodeCnt + 1).fill(INF);
    // destStart ↔ destEnd 간선은 무시하는 다익스트라 알고리즘을 수행
    dijkstra(destStart, destEnd);
    answer = Math.max(answer, distance[end])
  }
  
  return answer;
}

console.log(solution(data, nodeCnt));

/** 
 "만약 newCost가 현재 노드 cur의 거리와 같다면, 이 간선은 도착 노드 end로부터 현재 노드 cur까지의 최단 경로에 속하는 간선입니다."라는 문장은 다익스트라 알고리즘의 동작 원리에 기반한 설명입니다. 이를 설명하기 위해 다익스트라 알고리즘의 작동 방식을 간단히 설명하겠습니다.

다익스트라 알고리즘은 최단 경로를 찾는 알고리즘으로, 하나의 출발 노드로부터 다른 모든 노드까지의 최단 거리를 계산합니다. 이 알고리즘은 그리디한 방법을 사용하여 점진적으로 최단 거리를 갱신해가면서 목적지 노드에 도달합니다.

위 문장에서 언급한 newCost는 다음 노드(next)까지의 새로운 거리를 의미하며, 다익스트라 알고리즘의 동작 중에 현재 노드(cur)로부터 다음 노드(next)까지의 거리를 계산하는 데 사용됩니다.

만약 newCost가 현재 노드 cur의 거리와 같다는 것은, 현재 노드 cur로부터 다음 노드 next까지의 거리가 현재까지 이미 계산한 최단 거리와 같다는 의미입니다. 즉, 이 간선의 비용이 현재까지 알려진 최단 거리와 동일하다는 것을 의미합니다.

이때, newCost가 현재까지 알려진 최단 거리와 같다면, 해당 간선은 이미 최단 경로에 속하는 간선이라고 할 수 있습니다. 왜냐하면 다익스트라 알고리즘은 그리디한 방법을 사용하여 최단 거리를 갱신하기 때문에, 이미 최단 거리로 계산된 노드들은 더 짧은 거리로 갱신될 수 없기 때문입니다.

따라서, "만약 newCost가 현재 노드 cur의 거리와 같다면, 이 간선은 도착 노드 end로부터 현재 노드 cur까지의 최단 경로에 속하는 간선입니다."라는 문장은 다익스트라 알고리즘이 최단 경로를 찾아가는 과정에서 이미 최단 거리로 계산된 노드들에 해당 간선이 속해 있으므로 해당 간선은 최단 경로에 포함된다는 사실을 설명하는 것입니다.
*/

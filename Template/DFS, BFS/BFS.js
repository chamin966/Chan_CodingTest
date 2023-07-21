// 큐 사용
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

// DFS와 달리 재귀함수 호출이 없다.
function bfs(graph, start, visited) {
  q = new Queue();
  q.enq(start);
  visited[start] = true; // 반드시 시작지점 방문처리!
  // 큐가 빌 때까지 반복
  while (q.getLength() !== 0) {
    v = q.deq();
    console.log(v);
    for (let x of graph[v]) {
      if (visited[x] === false) {
        q.enq(x);
        visited[x] = true;
      }
    }
  }
}

const graph = [
  [],
  [2, 3, 4],
  [1],
  [1, 5, 6],
  [1, 7],
  [3, 8],
  [3],
  [4],
  [5]
];
// 각 노드가 방문된 정보를 표현
const visited = Array(9).fill(false);
// 비용이나 시간의 최소, 최댓값을 찾는 문제라면 -1로 초기화하고
// 단순 모든 노드의 탐색이라면 true, false로 초기화한다.
// 정의된 BFS 함수 호출
bfs(graph, 1, visited);
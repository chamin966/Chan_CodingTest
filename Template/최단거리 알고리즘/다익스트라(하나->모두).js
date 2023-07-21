/** 
다익스트라 최단 경로 알고리즘 동작 과정
  : 일반적으로 노드는 문제 상황에서 나라, 도시, 국가와 같이
  특정한 위치 형태로서 제시되는 경우가 많다.
  : 각 노드들을 연결하는 간선들은 서로 다른 가중치를 가질 수 있다.
  : 이러한 그래프는 인접 리스트 방식으로 표현될 수 있다.

  1. 일단 인접리스트에 각 노드(행 번호)에 따른 거리(열)를 infinity로 초기화한다.
  2. 출발 노드를 거리 0으로 하여 우선 순위 큐(최소힙)에 넣고, 방문 처리한다.
    -> 자기 자신 노드까지의 거리(비용)은 0이기 때문이다. 
  3. 이제 출발 노드가 가지고 있는 인접 노드들의 노드 번호와 거리를 큐에 넣는다.
    -> [노드 번호, 비용] 형태로 큐에 삽입.
    -> 최소힙에 의해 가장 작은 비용을 가진 노드가 맨 앞으로 이동된다.
    -> 최소힙을 사용하기 때문에, 넣었다 빼는 것만으로 가장 최소 비용을 얻을 수 있다.
  4. deq를 실행하면 최소힙에 의해 이전 노드에서 최소 비용으로 이동한 노드가 배출되고,
     현재 노드(now)에 인접한 노드들(graph[now])을 순환하며,
     이동할 가치가 있는 노드인지 확인(현재 최단 거리 테이블에 저장된 비용보다 작은 비용을 가진 노드)하고,
     가치가 있는 노드들의 거리와 현재 노드가 지나온 거리의 합(cost = 거리 + next[1])을 구한다.
  5. 그 합이 최단 거리 테이블에 저장된 해당 노드가 가진 비용(distance[next[0]])보다 작다면
     (기존 a -> b로 가는 최소 비용보다 현재 노드를 거쳐서 a -> now -> b로 가는 비용이 더 작다면)
     최단 거리 테이블의 비용을 갱신하고, 큐에 노드와 비용 정보[cost, next[0]]를 삽입한다.
  6. 다시 인접 노드들의 번호와 거리를 큐에 넣는다.
  7. while문으로 큐가 빌 때까지, 4 ~ 6번 과정을 반복한다.
*/

function dijkstra() { // 다익스트라 (Dijkstra) 알고리즘 수행
  let pq = new PriorityQueue((a, b) => b[0] - a[0]); // 최소힙(Min Heap)
  // 시작 노드로 가기 위한 최단 거리는 0으로 우선순위 큐에 삽입
  pq.enq([start, 0]);
  distance[start] = 0;
  while (pq.size() != 0) { // 우선순위 큐가 비어있지 않다면
    // 가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
    let [now, dist] = pq.deq();
    // 현재 노드가 이미 처리된 적이 있는 노드라면 무시
    if (distance[now] < dist) continue;
    // 현재 노드와 연결된 다른 인접한 노드들을 확인
    for (let i of graph[now]) {
      let cost = dist + i[1];
        // 현재 노드를 거쳐서, 다른 노드로 이동하는 거리가더 짧은 경우
      if (cost < distance[i[0]]) {
        distance[i[0]] = cost;
        pq.enq([i[0], cost]);
      }
    }
  }
}

let INF = Infinity;
let n = 7; // 노드의 개수
let start = 1; // 시작 노드 번호
//각 노드에 연결되어 있는 노드에 대한 정보를 담는 리스트를 만들기
let graph = [ //각 간선은[노드, 비용] 형태
  [],
  [[2, 3], [3, 1], [4, 2]], // 1번 노드의 간선들
  [[1, 3], [3, 1], [5, 1]], // 2번 노드의 간선들
  [[1, 1], [2, 1], [4, 3], [6, 5]], // 3번 노드의 간선들
  [[1, 2], [3, 3], [7, 1]], // 4번 노드의 간선들
  [[2, 1], [6, 2]], // 5번 노드의 간선들
  [[3, 5], [5, 2]], // 6번 노드의 간선들
  [[4, 1]] // 7번 노드의 간선들
]

// 최단 거리 테이블을 모두 무한으로 초기화
let distance = new Array(n + 1).fill(ㅑ);

// 다익스트라 알고리즘을 수행
dijkstra(start);
// 모든 노드로 가기 위한 최단 거리를 출력
for (let i = 1; i <= n; i++) {
  // 도달할수 없는 경우 무한(INFINITY)이라고 출력
  if (distance[i] == INF) console.log('INFINITY')
  // 도달수 있는 경우 거리를 출력
  else console.log(distance[i]);
}

// 주석 제거
function dijkstra(start) {
  let pq = new PriorityQueue((a, b) => b[0] - a[0]);
  pq.enq([start, 0]);
  distance[start] = 0;
  while (pq.size() != 0) {
    let [now, dist] = pq.deq();
    if (distance[now] < dist) continue;
    for (let i of graph[now]) {
      let cost = dist + i[1];
      if (cost < distance[i[0]]) { 
        distance[i[0]] = cost;
        pq.enq([i[0], cost]);
      }
    }
  }
}

let INF = Infinity;
let n = 7;
let graph = [
  [],
  [[2, 3], [3, 1], [4, 2]],
  [[1, 3], [3, 1], [5, 1]],
  [[1, 1], [2, 1], [4, 3], [6, 5]], 
  [[1, 2], [3, 3], [7, 1]], 
  [[2, 1], [6, 2]],
  [[3, 5], [5, 2]],
  [[4, 1]]
]

let distance = new Array(n + 1).fill(INF);

dijkstra(1);

for (let i = 1; i <= n; i++) {
  if (distance[i] == ㅑ) console.log('INFINITY')
  else console.log(distance)
}
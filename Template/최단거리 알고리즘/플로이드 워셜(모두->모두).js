/** 
플로이드 워셜 알고리즘의 동작 과정
  1. 최단거리 저장을 위한 2차원 테이블을 초기화한다.
     D[i][j]: i번 노드에서 출발하여, j노드에 도착할 때의 비용
     이때, 깊이가 2 이상으로 닿을 수 있는 노드들은 INF로 초기화한다.
  2. 최단거리 테이블을 순회하면서
     점화식 D[A][B] = MIN(D[A][B], D[A][K] + D[K][B])을
     사용하여 테이블을 갱신한다.
  3. 1부터 N(모든 노드 개수)까지 반복하여
     K 노드를 거쳐갈 때와 거쳐가지 않을 때의 비용을 비교하여
    최단 거리 테이블을 완성한다.
  => A노드에서 K노드로 도착하는 D[A][K]와
     K에서 출발하여 B노드로 가는 D[K][B]를 더하면
     A에서 K를 거쳐 B에 도달하는 최소 비용을 알 수 있다.
     이미 1, 2, ...K로 K가 증가하면서,
     D[A][K]에는 이미 A에서 K로 가는 최솟값이 저장되어있고,
     D[K][B]에는 이미 K에서 B로 가는 최솟값이 저장되어있기 때문이다.
     따라서 K를 거쳐가는 것과
     다른 노드를 거쳐 가거나, 직접 연결되는 D[A][B]를
     비교하여 최단 거리 테이블을 갱신하면
     A에서 출발하여 B에 도착하는 모든 경우의 수 중에서 최단 거리를 알 수 있다.
     위와 같은 과정을 1 ~ N까지 반복함으로써,
     모든 노드에서 모든 노드로 향하는 최단 거리 테이블을 도출할 수 있게 된다.
     모든 행렬 요소 개수인 K^2에 대한 비교를 K번 시행하므로 시간복잡도는 O(N^3)이 된다.
*/

let INF = Infinity;
let n =5; // 노드의 개수
// graph[i][j]는i에서j로 가기 위한 초기 비용(간선 비용)
let graph = [ // 자기 자신으로 가는 비용은0으로 초기화
  [INF, INF, INF, INF, INF, INF], // 인덱스0은 사용하지 않음
  [INF,0,1,5, INF, INF], // 1번 노드의 간선들
  [INF,7,0,2,2, INF], // 2번 노드의 간선들
  [INF,2, INF,0, INF,6], // 3번 노드의 간선들
  [INF, INF,2, INF,0, INF], // 4번 노드의 간선들
  [INF, INF, INF,1, INF,0] // 5번 노드의 간선들
]

/** 
입력으로 그래프를 만들어야 한다면 행과 열이 같은 지점에는 0을 넣어주고
a행 b열에 a에서 b로 바로 갈 수 있을 때의 최소 비용을 넣어준다.
a에서 b로 가는 비용이 여러 개 있을 수 있으므로
그 중에서 최솟값을 넣어서 초기 테이블을 만들어준다.
const data = Array.from({length: n + 1}, (_, i) => {
  let tmp = new Array(n + 1).fill(INF);
  tmp[i] = 0;
  return tmp;
})

for(let i = 2; i < bus + 2;  i++){
  let [a, b, c] = input[i].split(' ').map(v => Number(v));
  data[a][b] = Math.min(data[a][b], c);
}
*/


// 점화식에 따라 플로이드 워셜 알고리즘을 수행
for(let k = 1; k <= n; k++) {
  for(let a = 1; a <= n; a++) {
    for(let b = 1; b <= n; b++) {
      let cost = graph[a][k] + graph[k][b];
      graph[a][b] = Math.min(graph[a][b], cost);
    }
  }
}

// 수행된 결과를 출력
for (let a = 1; a <= n; a++) {
  let line = '';
  for (let b = 1; b <= n; b++) {
  // 도달할 수 없는 경우, 무한(INFINITY)이라고 출력
  if (graph[a][b] == INF) line += 'INF ';
  // 도달할 수 있는 경우 거리를 출력
  else line += graph[a][b] + ' ';
  }
  console.log(line);
}

//주석 제거
let INF = Infinity;
let n =5;
let graph = [ 
  [INF, INF, INF, INF, INF, INF],
  [INF,0,1,5, INF, INF],
  [INF,7,0,2,2, INF],
  [INF,2, INF,0, INF,6],
  [INF, INF,2, INF,0, INF],
  [INF, INF, INF,1, INF,0]
]

for(let k = 1; k <= n;k++) {
  for(let a = 1; a <= n;a++) {
    for(let b = 1; b <= n;b++) {
      let cost = graph[a][k] + graph[k][b];
      graph[a][b] = Math.min(graph[a][b], cost);
    }
  }
}


for (let a = 1; a <= n; a++) {
  let line = '';
  for (let b = 1; b <= n; b++) {
    if (graph[a][b] == INF) line += 'INF ';
    else line += graph[a][b] + ' ';
  }
  console.log(line);
}
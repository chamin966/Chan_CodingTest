// DFS 메서드 정의
function dfs(graph, v, visited) {
  // 현재 노드를 방문 처리
  visited[v] = true;
  console.log(v);
  // 현재 노드와 연결된 다른 노드를 재귀적으로 방문
  for (i of graph[v]) {
    if (!visited[i]) dfs(graph, i, visited);
  }
}

// 각 노드가 연결된 정보를 표현
// 0번의 빈 []을 사용하지 않더라도
// 접근과 표기의 편의를 위해 삽입하고 사용은 1부터 하는 방식을 추천
graph = [
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
visited = Array(9).fill(false);
// 정의된 DFS 함수 호출
// 1번 노드와 연결된 모든 노드를 알 수 있다.
dfs(graph, 1, visited)
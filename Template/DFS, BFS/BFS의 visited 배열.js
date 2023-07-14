function solution(n, k) {
  let answer = 0;
  const MAX = 100001;
  // 문제에서 정해준 최대값의 크기만큼 0으로 초기화 해준다.
  // 체스판과 같은 문제에서도 마찬가지로 초깃값이 0인
  // 2차원 배열을 생성해주고 dx, dy를 활용하여 nx, ny를 생성하여 접근하면 된다.
  const visited = new Array(MAX).fill(0);
  // 입력 범위가 너무 크다면 visited 으로 Map을 사용해야 한다.
  // visited 배열로 Map을 활용할 수 있는지 문제를 보고 생각해보는 것이 좋다.
  
  const q = new Queue();

  const bfs = (x) => {
    q.enq(x);
    while(q.getLength() !== 0){
      let cur = q.deq();
      // 목표 위치에 도달하면 방문 배열의 위치 인덱스에 저장된
      // 경로에 소요된 시간(거리)를 꺼내면 된다.
      if(cur === k) return visited[cur];
      for(let move of [cur-1, cur+1, cur*2]){
        if(move < 0 || move > MAX) continue;
        // 아직 방문하지 않았다면,
        // 방문할 위치에 이전 위치까지 도달하는 데 걸렸던 시간 + 1 을 해준다.
        // 모든 간선의 값이 동일한 BFS이므로 가능하다.
        // 방문했던 노드는 방문 당시에 이미 최단 경로로 도착해있으므로
        // 더 이상 값을 변경할 필요가 없다.
        if(visited[move] === 0){
          visited[move] = visited[cur] + 1; 
          q.enq(move);
        }
      }
    }
  }

  
  return bfs(n);
}
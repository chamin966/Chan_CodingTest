function solution(graph){
  let answer = 0;
  const visited = new Array(graph.length).fill(-1);
  // 체스판과 같은 문제에서도 마찬가지로 초깃값이 0인
  // 2차원 배열을 생성해주고 dx, dy를 활용하여 nx, ny를 생성하여 접근하면 된다.
  // 방문하지 않았을 경우 -1로 초기화하고,
  // bfs while문 이전에 시작 지점의 값을 visited[start] = 0;(방문 처리)으로 만든다.
  
  // 단순히 순환 탐색이라면 0으로 초기화해도 무방하지만,
  // 값을 더해서 최솟값, 최댓값을 만들 것이라면 -1로 초기화하는 것이 직관적이다.
  // 만약 0으로 초기화한다면, visited[start] = 0; 로 방문처리하고
  // 찾는 값에 +1 을 해준 값을 찾아해서 가독성이 떨어지고 비효율적이다.
  
  // 입력 범위가 너무 크다면 visited 으로 Map을 사용해야 한다.
  // visited 배열로 Map을 활용할 수 있는지 문제를 보고 생각해보는 것이 좋다.

  const bfs = (start) => {
    const q = new Queue();
    q.enq(start);
    visited[start] = 0; // 반드시 시작지점을 방문했다는 의미로 0으로 방문 처리해야 한다!!!
    while(q.getLength() > 0){
      let curNode = q.deq();
      // visited 배열의 curNode 인덱스의 값을 꺼내서 조건을 충족하는지 확인한다.
      if(visited[curNode] === 1 || visited[curNode] === 2) answer += 1;
      for(let nextNode of graph[curNode]){
        // 혹시나 값의 범위가 정해져 있다면 아래와 같이 커팅 가능
        // if(nextNode < 0 || nextNode > MAX) continue; 

        // 아직 방문하지 않았다면,
        // 방문할 위치에 이전 위치까지 도달하는 데 걸렸던 시간 + 1 을 해준다.
        // 모든 간선의 값이 동일한 BFS이므로 가능하다.
        // 방문했던 노드들은 방문 당시에 이미 최단 경로로 도착해있으므로
        // 더 이상 값을 변경할 필요가 없다.
        if(visited[nextNode] === -1){
          visited[nextNode] = visited[curNode] + 1;
          q.enq(nextNode);
        }
      }
    }
  }

  bfs(1); // 1번 노드가 시작점.
  return answer;
}

console.log(solution(data));

// 주석 제거 버전
function solution(graph){
  let answer = 0;
  const visited = new Array(graph.length).fill(-1);

  const bfs = (start) => {
    const q = new Queue();
    q.enq(start);
    visited[start] = 0; 
    while(q.getLength() > 0){
      let curNode = q.deq();
      if(visited[curNode] === 1 || visited[curNode] === 2) answer += 1;
      for(let nextNode of graph[curNode]){
        if(visited[nextNode] === -1){
          visited[nextNode] = visited[curNode] + 1;
          q.enq(nextNode);
        }
      }
    }
  }

  bfs(1); // 1번 노드가 시작점.
  return answer;
}

console.log(solution(data));
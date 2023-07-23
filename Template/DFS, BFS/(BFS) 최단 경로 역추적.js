  const bfs = () => {
    const q = new Queue();
    const visited = new Set();
    const path = [];
    q.enq(end);
    while(q.size() > 0){
      let cur = q.deq();
      if(start === cur) continue;
      // 단방향 그래프의 경우, 
      // 기존 그래프를 뒤집은 reversed_graph가 필요하다.
      for(let [prev, prevCost] of graph[cur]){
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

  // reversed_graph는 graph 생성 시에 함께 만들어 둔다.
  const graph = Array.from({length: nodeCnt}, () => []);
  const reversed_graph = Array.from({length: nodeCnt}, () => []); // 경로 추적을 위한 역순 그래프
  for (let i = line + 2; i < line + edgeCnt + 2; i++) {
    let [a, b, c] = input[i].split(' ').map(v => Number(v));
    graph[a].push([b, c]);
    reversed_graph[b].push([a, c])
  }

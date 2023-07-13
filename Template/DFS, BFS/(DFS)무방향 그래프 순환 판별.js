function solution(graphs){
  let answer = [];
  
  const isCycle = (graph, visited, now, prev) => {
    visited[now] = true;
    for(let next of graph[now]){
      if(visited[next] === false){
        if(isCycle(graph, visited, next, now)) return true;
      }
      else if (next !== prev) return true;
    }
    return false
  }

  for(let graph of graphs){
    let tmp = 0;
    const visited = Array.from({length: graph.length}, () => false);
    for(let i = 1; i < graph.length; i++){
      if (!visited[i]){
        if(!isCycle(graph, visited, i, 0)) tmp += 1
      }
    }
    answer.push(tmp);
  }

/** 
입력
6 3
1 2
2 3
3 4
6 5
1 2
2 3
3 4
4 5
5 6
6 6
1 2
2 3
1 3
4 5
5 6
6 4
0 0

출력
Case 1: A forest of 3 trees.
Case 2: There is one tree.
Case 3: No trees.
*//

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let line = 0
const datas = [];
while(true){
  let [n, m] = input[line].split(' ').map(v => Number(v));
  if(n === 0 && m === 0) break;
  const g = Array.from({length: n + 1}, () => []);
  for(let i = 1; i < m + 1; i++){
    let [x, y] = input[line + i].split(' ').map(v => Number(v));
    g[x].push(y);
    g[y].push(x);
  }
  datas.push(g);
  line += m + 1;
}


function solution(graphs){
  let answer = [];
  
  const isCycle = (graph, visited, now, prev) => {
    visited[now] = true;
    for(let next of graph[now]){
      if(visited[next] === false){
        if(isCycle(graph, visited, next, now)) return true;
      }
      else if (next !== prev) return true;
    }
    return false
  }

  for(let graph of graphs){
    let tmp = 0;
    const visited = Array.from({length: graph.length}, () => false);
    for(let i = 1; i < graph.length; i++){
      if (!visited[i]){
        if(!isCycle(graph, visited, i, 0)) tmp += 1
      }
    }
    answer.push(tmp);
  }

  for(let i = 0; i < answer.length; i++){
    if(answer[i] === 0) console.log(`Case ${i+1}: No trees.`);
    else if(answer[i] === 1) console.log(`Case ${i+1}: There is one tree.`);
    else console.log(`Case ${i+1}: A forest of ${answer[i]} trees.`);
  }

  return;
}

solution(datas);
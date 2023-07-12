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
  
  const isCycle = (grr, vrr, x, prev) => {
    vrr[x] = true;
    for(let y of grr[x]){
      if(!vrr[y]){
        if(isCycle(grr, vrr, y, x)) return true;
      }
      else if (y !== prev) return true;
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
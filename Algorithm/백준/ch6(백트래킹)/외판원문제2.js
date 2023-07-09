let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  const tmp = input[i].split(' ').map(v => Number(v));
  const arr = []
  for(let j = 0; j < tmp.length; j++){
    arr.push([i - 1, j, tmp[j]]);
  }
  data.push(arr);
}

function solution(arr, n){
  let min = Number.MAX_VALUE;
  let visited = [];

  const dfs = (dep, next, sum) => {
    if(dep === arr.length - 1){
      let lastNodeW = arr[next][visited[0]][2];
      if(lastNodeW === 0) return;
      return min = Math.min(min, sum + lastNodeW);
    }
    for(let x of arr[next]){
        let [now, node, w] = x;
        if(visited.includes(node) || w === 0) continue;
        if(sum + w >= min) continue;
        visited.push(now)
        dfs(dep + 1, node, sum + w);
        visited.pop();
    }
  }

  for(let i = 0; i < n; i++){
    dfs(0, i, 0);
    visited = [];
  }
  return min;
}

console.log(solution(data, n));

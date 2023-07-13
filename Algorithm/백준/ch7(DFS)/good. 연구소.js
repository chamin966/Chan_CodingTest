let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0].split(' ')[0]);
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(input[i].split(' ').map(v => Number(v)));
}

function solution(graph){
  let answer = 0;
  let n = graph.length;
  let m = graph[0].length;
  const zeroPos = [];
  const pickZero = [];
  const dx = [-1, 0, 1, 0]; 
  const dy = [0, 1, 0, -1];
  
  for(let i = 0; i < n; i++){
    for(let j = 0; j < m; j++){
      if(graph[i][j] === 0) zeroPos.push([i, j]);
    }
  }
  
  const dfs = (grr, r, c) => {
    grr[r][c] = 'X';
    for(let i = 0; i < 4; i++){
      let nx = r + dx[i];
      let ny = c + dy[i];
      if(nx >= 0 && nx < n && ny >= 0 && ny < m){
        if(grr[nx][ny] === 0) dfs(grr, nx, ny);
      }
    }
    return;
  }

  const combi = (start) => {
    if(pickZero.length === 3){
      const newGraph = graph.map(v => [...v]);
      let tmp = 0;
      
      for(let [x, y] of pickZero){
        newGraph[x][y] = 1;
      }

      for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
          if(newGraph[i][j] === 2) dfs(newGraph, i, j);
        }
      }

      for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
          if(newGraph[i][j] === 0) tmp += 1;
        }
      }
      
      return answer = Math.max(answer, tmp);
    }
    for(let i = start; i < zeroPos.length; i++){
      pickZero.push(zeroPos[i]);
      combi(i+1);
      pickZero.pop();
    }
  }

  combi(0);
  return answer;
}

console.log(solution(data));

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

const datas = [];
let testCase = Number(input[0]);
let line = 1;

while(testCase--){
  let [m, n, k] = input[line].split(' ').map(v => Number(v));
  const graph = Array.from({length: m}, () => Array(n).fill(0));
  
  for(let i = 1; i < k + 1; i++){
    let [x, y] = input[line + i].split(' ').map(v => Number(v));
    graph[x][y] = 1;
  }
  datas.push(graph);
  line += k + 1;
}

function solution(graphs){
  let answer = [];
  // 행, 열 상우하좌
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  
  const dfs = (arr, r, c) => {
    // 이미 검사한 지역은 다시 검사되지 않도록 한다.
    arr[r][c] = -1;
    for(let i = 0; i < 4; i++){
      let nx = dx[i] + r;
      let ny = dy[i] + c;
      if(nx < 0 || nx >= arr.length || ny < 0 || ny >= arr[0].length) continue;
      if(arr[nx][ny] === 1){
        dfs(arr, nx, ny);
      }
    }
  }
  
  for(let grr of graphs){
    let tmp = 0
    for(let i = 0; i < grr.length; i++){
      for(let j = 0; j < grr[0].length; j++){
        // 모든 경우를 dfs 탐색하는 것이 아니라
        // 배추가 심어진 곳에서만 인접 배추가 있는지
        // 확인하는 것임에 주의한다.
        if(grr[i][j] === 1){
          dfs(grr, i, j);
          tmp += 1;
        }
      }
    }
    
    answer.push(tmp);
  }
  
  return answer.join('\n');
}

console.log(solution(datas));

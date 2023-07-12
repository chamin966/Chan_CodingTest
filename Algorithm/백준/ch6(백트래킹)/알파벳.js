let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0].split(' ')[0]);
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(input[i].split(''));
}

function solution(arr){
  let max = 1;
  // 중복된 것 들어오지 않을 것이므로 탐색 시간을 줄이기 위해 Set 사용
  const visited = new Set;
  const dx = [-1, 1, 0, 0]; // 행 상하좌우
  const dy = [0, 0, -1, 1]; // 열 상하좌우
  
  const dfs = (dep, row, col) => {
    max = Math.max(dep, max);
    for(let i = 0; i < 4; i++){
      let nx = dx[i] + row;
      let ny = dy[i] + col;
      // nx >= 0 && nx < arr.length && ny >= 0 && ny < arr[0].length
      // 위 식을 벗어난 경우는 전부 해당하므로 아래와 같이 바꾸면 더 빠르다.
      if(nx < 0 || nx >= arr.length || ny < 0 || ny >= arr[0].length) continue;
      if(!visited.has(arr[nx][ny])){
        visited.add(arr[nx][ny]);
        dfs(dep + 1, nx, ny);
        visited.delete(arr[nx][ny]);
      }
    }
  }

  visited.add(arr[0][0])
  dfs(1, 0, 0);
  return max;
}

console.log(solution(data));

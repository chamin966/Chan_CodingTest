let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);
const data = [];
for (let i = 1; i < n + 1; i++) {
  data.push(input[i].split('').map(v => Number(v)));
}

function solution(arr){
  const answer = [0];
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const dfs = (k, r, c) => {
    arr[r][c] = -1;
    answer[k] += 1
    for(let i = 0; i < 4; i++){
      let nx = r + dx[i];
      let ny = c + dy[i];
      // 그냥 이렇게 하는데 실수 가능성이 더 줄어듦.
      if(nx >= 0 && nx < arr.length && ny >= 0 && ny < arr[0].length){
        if(arr[nx][ny] === 1) dfs(k, nx, ny);
      }
    }
    return;
  }

  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr[0].length; j++){
      if(arr[i][j] === 1){
        answer[0] += 1;
        answer.push(0)
        dfs(answer.length - 1, i, j);
      }
    }
  }

  return answer[0] + '\n' + answer.slice(1).sort((a, b) => a - b).join('\n');
}

console.log(solution(data));

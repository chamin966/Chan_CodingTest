let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(input[i].split(' ').map(v => Number(v)));
}

function solution(tri, N){
  const memo = Array.from({length: N}, (_, i) => new Array(i + 1).fill(0));
  memo[0][0] = tri[0][0];

  for(let i = 1; i < N; i++){
    for(let j = 0; j < i + 1; j++){
      // 왼쪽 위에서 내려오는 경우
      let upLeft = 0;
      if(j !== 0) upLeft = memo[i-1][j-1];
      // 바로 위에서 내려오는 경우
      let up = 0;
      if(j !== i) up = memo[i-1][j];
      
      memo[i][j] = Math.max(up, upLeft) + tri[i][j];
    }
  }


  return Math.max(...memo[N-1]);
}

console.log(solution(data, n));

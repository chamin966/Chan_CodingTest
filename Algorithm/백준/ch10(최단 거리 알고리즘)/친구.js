let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let INF = Infinity
let n = Number(input[0]);
const data = [];
for (let i = 1; i <= n; i++) {
  let tmp = input[i].split('').map(v => {
    if(v === 'Y') return 1;
    return INF;
  });
  tmp[i-1] = 0;
  data.push(tmp);
}

function solution(graph, n){
  for(let k = 0; k < n; k++){
    for(let a = 0; a < n; a++){
      for(let b = 0; b < n; b++){
        graph[a][b] = Math.min(graph[a][k] + graph[k][b], graph[a][b])
      }
    }
  }

  let answer = 0;
  for(let x of graph){
    answer = Math.max(x.filter(v => v === 1 || v === 2).length, answer);
  }

  return answer;
}

console.log(solution(data, n));
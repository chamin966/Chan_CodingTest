let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let INF = Infinity;
let n = Number(input[0]);
let bus = Number(input[1]);

const data = Array.from({length: n + 1}, (_, i) => {
  let tmp = new Array(n + 1).fill(INF);
  tmp[i] = 0;
  return tmp;
})

for(let i = 2; i < bus + 2;  i++){
  let [a, b, c] = input[i].split(' ').map(v => Number(v));
  data[a][b] = Math.min(data[a][b], c);
}

function solution(graph, n){
  for(let k = 1; k <= n; k++){
    for(let a = 1; a <= n; a++){
      for(let b = 1; b <= n; b++){
        let cost = graph[a][k] + graph[k][b];
        if (graph[a][b] > cost) {
          // K를 거쳐갈 때 비용이 더 저렴하다면 테이블 갱신
          graph[a][b] = cost;
        }
      }
    }
  }


  for(let i = 1; i <= n; i++){
    const tmp = []
    for(let j = 1; j <= n; j++){
      if(graph[i][j] === INF) tmp.push(0);
      else tmp.push(graph[i][j]);
    }
    console.log(tmp.join(' '));
  }
}

solution(data, n);

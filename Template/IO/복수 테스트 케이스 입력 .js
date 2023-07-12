/** 
2
10 8 17
0 0
1 0
1 1
4 2
4 3
4 5
2 4
3 4
7 4
8 4
9 4
7 5
8 5
9 5
7 6
8 6
9 6
10 10 1
5 5
*/

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
  return graphs;
}

console.log(solution(datas));

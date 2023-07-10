let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let data = Number(input[0]);

function solution(n){
  let answer = 0;
  const queens = [];

  const possible = (x, y) => {
    for(let [r, c] of queens){
      if(r === x || c === y) return false;
      if(Math.abs(x - r) === Math.abs(y - c)) return false;
    }
    return true;
  }
  
  const dfs = (row) => {
    if(row === n) return answer += 1;
    for(let i = 0; i < n; i++){
      if(!possible(row, i)) continue;
      queens.push([row, i]);
      dfs(row + 1);
      queens.pop();
    }
  }

  dfs(0);
  return answer;
}

console.log(solution(data));

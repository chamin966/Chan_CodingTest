let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);
const data = [0];
for (let i = 1; i < n + 1; i++) {
  data.push(Number(input[i]));
}

function solution(arr){
  const answer = [];
  const n = arr.length;
  const visited = new Array(n).fill(false);
  const finished = new Array(n).fill(false);
  
  const dfs = (now) => {
    visited[now] = true;
    let next = arr[now];
    if(visited[next] === false) dfs(next);
    else if(finished[next] === false){
      while(now !== next){
        answer.push(next);
        next = arr[next];
      }
      answer.push(next);
    }
    finished[now] = true;
  }

  for(let i = 1; i < n; i++){
    if(visited[i] === false) dfs(i);
  }

  console.log(answer.length);
  return answer.sort((a, b) => a - b).join('\n');
}

console.log(solution(data));

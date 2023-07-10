let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);
const data = input[1].split(' ');

function solution(arr){
  let max = 0;
  let min = 10000000000;
  const visited = [];
  const check = Array.from({length: 10}, () => false);
  
  const dfs = (dep) => {
    if(dep === arr.length + 1){
      let flag = true;
      for(let i = 0; i < arr.length; i++){
        if(arr[i] === '<'){
          if(visited[i] > visited[i+1]) flag = false;
        }
        if(arr[i] === '>'){
          if(visited[i] < visited[i+1]) flag = false;
        }
      }
      if(flag){
        max = Math.max(Number(visited.join('')), max);
        min = Math.min(Number(visited.join('')), min);
      }
      return;
    }
    for(let i = 0; i < 10; i++){
      if(check[i]) continue;
        visited.push(i);
        check[i] = true;
        dfs(dep + 1);
        visited.pop();
        check[i] = false;
    }
  }

  dfs(0);
  if(String(min).length < String(max).length) min = '0' + min;
  return max+'\n'+min;
}

console.log(solution(data));

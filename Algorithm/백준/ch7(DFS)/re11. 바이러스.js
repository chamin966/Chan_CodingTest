let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [computers, links] = [Number(input[0]), Number(input[1])];
const data = Array.from({length: computers + 1}, () => []);
for (let i = 2; i < links + 2; i++) {
  let [start, end] = input[i].split(' ').map(v => Number(v))
  data[start].push(end); // 무방향 그래프이기 때문에 a -> b 이면
  data[end].push(start); // a <- b 도 가능하기 때문이다.
}

function solution(arr){
  let answer = 0;
  const visited = Array.from({length: arr.length}, () => false);
  
  const dfs = (c) => {
    visited[c] = true;
    for(let x of arr[c]){
      if(!visited[x]){
        answer += 1;
        dfs(x)
      }
    }
  }

  // 1번 노드에서 갈 수 있는 모든 노드 탐색
  dfs(1);
  return answer;
}

console.log(solution(data));

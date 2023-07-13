function solution(arrs){
  const answer = [];
  
  const dfs = (visited, finished, arr, now, result) => {
    visited[now] = true;
    let next = arr[now];
    if(visited[next] === false) dfs(visited, finished, arr, next, result);
    else if(finished[next] === false){
      while(now !== next){
        result.push(next);
        next = arr[next];
      }
      result.push(next);
    }
    finished[now] = true;
  }

  for(let i = 0; i < arrs.length; i++){
    const arr = arrs[i];
    const n = arr.length;
    const visited = new Array(n + 1).fill(false);
    const finished = new Array(n + 1).fill(false);
    const result = [];

    // 각 위치에서 연결 요소 계산 및 사이클 판단
    // arr을 순환하는 것이 아니라 1 ~ N(0 추가돤 길이이므로 arr 인덱스 끝까지 감)까지 순서대로
    // 순환해야 함에 주의한다. arr 자체를 순환하면 편의상 넣은 0이 값을 망친다.
    for(let i = 1; i < n; i++){
      if(visited[i] === false) dfs(visited, finished, arr, i, result);
    }


    answer.push(n - result.length);
  }

  return answer.join('\n');
}
/** 
입력
2
7
3 1 3 7 3 4 6
8
1 2 3 4 5 6 7 8

출력
3
0
*/

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let testCase = Number(input[0]);
let line = 2;
const data = [];

while(testCase--){
  data.push([0, ...input[line].split(' ').map(v => Number(v))]);
  line += 2;
}

function solution(arrs){
  const answer = [];
  
  const dfs = (visited, finished, arr, now, result) => {
    visited[now] = true;
    let next = arr[now];
    if(visited[next] === false) dfs(visited, finished, arr, next, result);
    else if(finished[next] === false){
      while(now !== next){
        result.push(next);
        next = arr[next];
      }
      result.push(next);
    }
    finished[now] = true;
  }

  for(let i = 0; i < arrs.length; i++){
    const arr = arrs[i];
    const n = arr.length;
    const visited = new Array(n + 1).fill(false);
    const finished = new Array(n + 1).fill(false);
    const result = [];

    for(let i = 1; i < n; i++){
      if(visited[i] === false) dfs(visited, finished, arr, i, result);
    }


    answer.push(n - result.length);
  }

  return answer.join('\n');
}
console.log(solution(data));

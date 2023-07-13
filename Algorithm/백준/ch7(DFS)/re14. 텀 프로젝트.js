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
    const visited = new Array(n).fill(false);
    const finished = new Array(n).fill(false);
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
console.log(solution(data));

// 해설 풀이
// let file = require('fs').readFileSync('/dev/stdin');
// let input = file.toString().split('\n');
// let testCases = Number(input[0]); // 테스트 케이스의 수
// let line = 1;

// function dfs(x, graph, visited, finished, result) {
//   visited[x] = true; // 현재 노드 방문 처리
//   let y = graph[x]; // 다음 노드
//   if (!visited[y]) { // 다음 노드를 아직 방문하지 않았다면
//     dfs(y, graph, visited, finished, result);
//   }
//   // 다음 노드를 방문한 적 있고, 완료되지 않았다면
//   else if (!finished[y]) {
//     // 사이클이 발생한 것이므로 사이클에 포함된 노드 저장
//     while (y != x) {
//       result.push(y);
//       y = graph[y];
//     }
//     result.push(x);
//   }
//   finished[x] = true; // 현재 노드의 처리가 완료됨
// }

// while (testCases--) {
//   let n = Number(input[line]);
//   let graph = [0, ...input[line + 1].split(' ').map(Number)];
//   let visited = new Array(n + 1).fill(false);
//   let finished = new Array(n + 1).fill(false);
//   let result = [];
//   for (let x = 1; x <= n; x++) { // 각 위치에서 연결 요소 계산 및 사이클 판단
//     if (!visited[x]) dfs(x, graph, visited, finished, result);
//   }
//   line += 2; // 다음 테스트 케이스로 이동
//   console.log(n - result.length);
// }

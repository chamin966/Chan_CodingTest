// let fs = require('fs')
// let input = fs.readFileSync('/dev/stdin').toString().split('\n')

// let n = input[0];
// const data = [];
// for (let i = 1; i <= n; i++) {
//   const tmp = input[i].split(' ').map(v => Number(v));
//   const arr = []
//   for(let j = 0; j < tmp.length; j++){
//     arr.push([i - 1, j, tmp[j]]);
//   }
//   data.push(arr);
// }

// function solution(arr, n){
//   let min = Number.MAX_VALUE;
//   let visited = [];

//   const dfs = (dep, next, sum) => {
//     if(dep === arr.length - 1){
//       let lastNodeW = arr[next][visited[0]][2];
//       if(lastNodeW === 0) return;
//       return min = Math.min(min, sum + lastNodeW);
//     }
//     for(let x of arr[next]){
//         let [now, node, w] = x;
//         if(visited.includes(node) || w === 0) continue;
//         if(sum + w >= min) continue;
//         visited.push(now)
//         dfs(dep + 1, node, sum + w);
//         visited.pop();
//     }
//   }

//   for(let i = 0; i < n; i++){
//     dfs(0, i, 0);
//     visited = [];
//   }
//   return min;
// }

// console.log(solution(data, n));

// 순열 이용
let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  const tmp = input[i].split(' ').map(v => Number(v));
  const arr = []
  for(let j = 0; j < tmp.length; j++){
    arr.push([j, tmp[j]]);
  }
  data.push(arr);
}

function solution(arr){
  const nums = Array.from({length: arr.length}, (_, i) => i);
  const check = Array.from({length: arr.length}, () => false);
  const tmp = [];
  let min = Number.MAX_VALUE;
  
  const permutation = (dep) => {
    if(dep === arr.length){
      const paths = [...tmp, tmp[0]];
      let v = 0;
      let flag = true;
      
      for(let i = 0; i < paths.length - 1; i++){
        let now = paths[i];
        let next = paths[i+1];
        if(arr[now][next][1] === 0 || v >= min) return;
        v += arr[now][next][1];
      }
      
      return min = Math.min(v, min);
    }
    for(let x of nums){
      if(check[x]) continue;
      tmp.push(x);
      check[x] = true;
      permutation(dep + 1);
      tmp.pop();
      check[x] = false;
    }
  }

  permutation(0);
  return min;
}

console.log(solution(data));


// 해설 풀이
// 2부터 N까지의 수를 하나씩 골라 나열하는 모든 순열을 계산
// function dfs(depth) {
//   if (depth == n - 1) { // 현재 순열에 대한 처리
//   let totalCost = 0; // 1번 노드에서 출발
//   let cur = 1; // 1번 노드에서 출발
//   for (let i = 0; i < n - 1; i++) { // 현재 순열에 따라서 노드 이동
//     let nextNode = result[i]; // 다음 이동 노드까지의 비용 계산
//     let cost = graph[cur][nextNode];
//     if (cost == 0) return; // 이동 불가능하면 무시
//     totalCost += cost; // 이동 가능하면, 비용을 더하고 노드 이동
//     cur = nextNode;
//   }
//   // 마지막 노드에서 1로 돌아오는 것이 필수
//   let cost = graph[cur][1];
//   if (cost == 0) return; // 이동 불가능하면 무시
//   totalCost += cost; // 이동 가능하면, 비용을 더하고 노드 이동
//   minValue = Math.min(minValue, totalCost); // 경로의 최소 비용 저장
//   }
//   for (let i = 2; i <= n; i++) {
//     if (visited[i]) continue;
//     result.push(i); // 방문 처리
//     visited[i] = true;
//     dfs(depth + 1); // 재귀 함수 호출
//     result.pop(); // 방문 처리 해제
//     visited[i] = false;
//   }
// }

// let fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split('\n');
// let n = Number(input[0]);
// let graph = []; // 전체 그래프(graph) 정보 입력
// for (let i = 0; i <= n; i++) graph.push([0]);
// for (let i = 1; i <= n; i++) {
//   line = input[i].split(' ').map(Number);
//   for (let j = 0; j < n; j++) graph[i].push(line[j]);
// }
// let visited = new Array(11).fill(false); // 방문 처리 배열
// let result = []; // 순열 정보 배열
// let minValue = 1e9;
// dfs(0);
// console.log(minValue)
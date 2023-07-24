let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let N = Number(input[0]);
const nums = input[1].split(' ').map(v => Number(v));
const intervals = [];
let M = Number(input[2]);
for (let i = 3; i < M + 3; i++) {
  intervals.push(input[i].split(' ').map(v => Number(v)));
}

function solution(nums, intervals){
  const answer = [];
  const prefixSum = [0];
  let summary = 0;
  for(let x of nums){
    summary += x;
    prefixSum.push(summary);
  }

  for(let [s, e] of intervals){
    answer.push(prefixSum[e] - prefixSum[s - 1]);
  }

  return answer.join('\n');
}

console.log(solution(nums, intervals));

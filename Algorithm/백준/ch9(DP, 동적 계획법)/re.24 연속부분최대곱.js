let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);
const data = [0];
for (let i = 1; i <= n; i++) {
  data.push(Number(input[i]));
}

function solution(nums, N) {
  for(let i = 2; i < N; i++){
    nums[i] = Math.max(nums[i], nums[i-1] * nums[i]);
  }
  return Math.max(...nums).toFixed(3);
}

console.log(solution(data, n));

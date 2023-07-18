let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(Number(input[i]));
}

function solution(nums) {
  const answer = [];
  const memo = [0, 1, 1, 1];
  let max = Math.max(...nums);

  for(let i = 4; i <= max; i++){
    memo[i] = memo[i-3] + memo[i-2];
  }

  for(let num of nums){
    answer.push(memo[num]);
  }

  return answer.join('\n');
}

console.log(solution(data));

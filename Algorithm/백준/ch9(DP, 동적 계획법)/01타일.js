let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);

function solution(number){
  const memo = [0, 1, 2];

  for(let i = 3; i <= number; i++){
    memo[i] = (memo[i-2] + memo[i-1]) % 15746;
  }

  return memo[number];
}

console.log(solution(n));

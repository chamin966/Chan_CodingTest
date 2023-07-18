let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(Number(input[i]));
}

function solution(arr){
  const answer = [];

  const memo = new Array(40 + 1).fill(0);
  memo[0] = 1;
  memo[1] = 1;

  for(let i = 2; i <= 40; i++){
    memo[i] = memo[i-1] + memo[i-2];
  }

  for(let fiboNum of arr){
    if(fiboNum === 0) answer.push('1 0');
    else if(fiboNum === 1) answer.push('0 1');
    else answer.push(memo[fiboNum-2] + ' ' + memo[fiboNum-1]);
  }

  return answer.join('\n');
}

console.log(solution(data));

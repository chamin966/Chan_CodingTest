let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let total = Number(input[0]);
let vipCnt = Number(input[1]);

// 입력받는 값으로 부분으로 나누기 
const data = [];
let start = 0;
for (let i = 2; i < vipCnt + 2; i++) {
  let end = Number(input[i]);
  data.push(end - start - 1);
  start = end;
}
data.push(total - start);

function solution(arr){
  let answer = 1;
  const memo = new Array(41).fill(0);
  memo[0] = 1;
  memo[1] = 1;
  memo[2] = 2;

  const dp = (x) => {
    if(memo[x] !== 0) return memo[x]
    memo[x] = dp(x-1) + dp(x-2);
    return memo[x];
  }
  
  for(let len of arr){
    answer *= dp(len);
  }

  return answer;
}

console.log(solution(data));

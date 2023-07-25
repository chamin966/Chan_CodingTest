let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);

function solution(n){
  const dp = new Array(n+1).fill(0);
  
  for (let x = 2; x <= n; x++) {
    dp[x] = dp[x - 1];
    if (x % 2 == 0) dp[x] = Math.min(dp[x], dp[parseInt(x / 2)]);
    if (x % 3 == 0) dp[x] = Math.min(dp[x], dp[parseInt(x / 3)]);
    dp[x] += 1;
  }

  return dp[n];
}

console.log(solution(n));

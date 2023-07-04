let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(Number(input[i]));
}

function solution(arr) {
  const answer = [];
  
  const memo = [0, 1];
  const fibo = n => {
    if(memo[n] !== undefined) return memo[n];
    return memo[n] = fibo(n - 1) + fibo(n - 2);
  }

  let p = 2;
  while(fibo(p) < 1000000000) p += 1;

  for(let x of arr){
    const tmp = [];

    let k = 0;
    while(x !== 0){
      if(memo[k] > x){
        tmp.push(memo[k - 1])
        x -= memo[k - 1];
        k = 0;
      }else k++;
    }
    
    answer.push(tmp.reverse().join(' '));
  }

  return answer.join('\n');
}

console.log(solution(data));
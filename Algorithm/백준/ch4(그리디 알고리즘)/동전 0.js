let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [n, k] = input[0].split(' ');
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(Number(input[i]));
}

const solution = (arr, k) => {
  arr.reverse();
  let answer = 0;
  
  for(let x of arr){
    let r = parseInt(k / x);
    if(r < 1) continue;
    answer += r;
    k %= x;
    if(k === 0) break;
  }

  return answer;
}

console.log(solution(data, k));
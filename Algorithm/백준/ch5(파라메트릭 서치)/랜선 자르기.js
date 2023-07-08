let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [n, k] = input[0].split(' ').map(v => Number(v));
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(Number(input[i]));
}

function solution(arr, require){
  let answer = 0;
  
  const ps = (left, right) => {
    if(left > right) return;
    let mid = Math.floor((left + right) / 2);
    
    let total = 0;
    for (let x of arr) total += Math.floor(x / mid);
    
    if(total < require) return ps(left, mid - 1);
    answer = mid;
    return ps(mid + 1, right);
  }

  ps(0, Math.max(...arr));
  return answer;
}

console.log(solution(data, k));

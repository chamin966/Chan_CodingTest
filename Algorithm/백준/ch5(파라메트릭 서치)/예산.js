let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = input[1].split(' ').map(v => Number(v));
let m = input[2];

function solution(arr, limit){
  let answer = 0;
  
  const parametricSearch = (left, right) => {
    if(left > right) return;
    let mid = Math.floor((left + right) / 2);
    
    let total = 0;
    for(let x of arr) total += Math.min(x, mid);
    
    if(total > limit) return parametricSearch(left, mid - 1)
    answer = mid;               
    return parametricSearch(mid + 1, right);
  }

  parametricSearch(0, Math.max(...arr));
  return answer;
}

console.log(solution(data, m));

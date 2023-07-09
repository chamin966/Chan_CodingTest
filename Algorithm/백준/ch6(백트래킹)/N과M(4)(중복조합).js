let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [d1, d2]  = input[0].split(' ').map(v => Number(v));

function solution(n, m){
  const answer = [];
  const nums = Array.from({length: n}, (_, i) => i + 1);
  const picked = [];

  const combinationR = (dep, start) => {
    if(dep === m) return answer.push(picked.join(' '));
    for(let i = start; i < nums.length; i++){
      picked.push(nums[i]);
      combinationR(dep + 1, i);
      picked.pop();
    }
  }

  combinationR(0, 0);
  return answer.join('\n');
}

console.log(solution(d1, d2));

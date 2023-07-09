let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [d1, d2]  = input[0].split(' ').map(v => Number(v));

function solution(n, m){
  const answer = [];
  const nums = Array.from({length: n}, (_, i) => i + 1);
  const picked = [];

  const permutationR = (dep) => {
    if(dep === m) return answer.push(picked.join(' '));
    for(let x of nums){
      picked.push(x);
      permutationR(dep + 1);
      picked.pop();
    }
  }

  permutationR(0);
  return answer.join('\n');
}

console.log(solution(d1, d2));

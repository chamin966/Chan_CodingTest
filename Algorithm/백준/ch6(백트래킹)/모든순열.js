let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let data  = Number(input[0]);

function solution(n){
  const answer = [];
  const nums = Array.from({length: n}, (_, i) => i + 1);
  const picked = [];
  const check = Array.from({length: n + 1}, () => false);

  const permutation = (dep) => {
    if(dep === n) return answer.push(picked.join(' '));
    for(let x of nums){
      if(check[x]) continue;
      picked.push(x);
      check[x] = true;
      permutation(dep + 1);
      picked.pop();
      check[x] = false;
    }
  }

  permutation(0);
  return answer.join('\n');
}

console.log(solution(data));

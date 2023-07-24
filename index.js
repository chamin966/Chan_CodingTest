let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [N, M] = input[0].split(' ').map(v => Number(v));
const nums = input[1].split(' ').map(v => Number(v));

function solution(nums, N, M){
  let answer = 0;
  const prefixSum = [0];
  let sum = 0;
  for(let x of nums){
    sum += x;
    prefixSum.push(sum);
  }

  const pick = [];
  const numArr = Array.from({length: N}, (_, i) => i + 1);
  const combi  = (dep, start) => {
    if(dep === 2){
      let [s, e] = pick;
      if((prefixSum[e] - prefixSum[s - 1]) % M === 0) answer += 1
      return;
    }
    for(let i = start; i < numArr.length; i++){
        pick.push(numArr[i]);
        combi(dep + 1, i);
        pick.pop();
    }
  }

  combi(0, 0);
  return answer;
}

console.log(solution(nums, N, M));

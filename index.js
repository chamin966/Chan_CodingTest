let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);
const data = [0, ...input[1].split(' ').map(v => Number(v))];

function solution(nums){
  let answer = 0
  const dpt = [];
  dpt[1] = nums[1];

  for(let i = 2; i < nums.length; i++){
    if(dpt[i-1] < nums[i]){
      answer += 1;
      dpt[i] = nums[i];
    }
    else dpt[i] = Math.min(dpt[i-1], nums[i])
  }

  return answer;
}

console.log(solution(data));

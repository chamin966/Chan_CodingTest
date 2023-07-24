let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [N, target] = input[0].split(' ').map(v => Number(v));
const data = input[1].split(' ').map(v => Number(v));

function solution(nums, N, target){
  let cnt = 0;
  let sum = 0;
  
  for(let start = 0, end = 0; start < N; start++){
    while(end < N && sum < target){
      sum += nums[end];
      end++;
    }
    if(sum === target) cnt++;
    sum -= nums[start];
  }

  return cnt;
}

console.log(solution(data, N, target));

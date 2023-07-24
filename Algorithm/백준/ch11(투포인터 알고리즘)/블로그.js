let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [dayTotal, X] = input[0].split(' ').map(v => Number(v));
const data = input[1].split(' ').map(v => Number(v));

function solution(nums, dayTotal, X){
  let [end, sum, max, cnt] = [0, 0, 0, 0];

  for(let start = 0; start + X <= dayTotal; start++){
    while(end < start + X){
      sum += nums[end];
      end++;
    }
    if(sum > max){
      max = sum;
      cnt = 1;
    }
    else if(sum === max) cnt++;
    sum -= nums[start];
  }

  if(max === 0) return 'SAD';
  return max + '\n' + cnt;
}

console.log(solution(data, dayTotal, X))
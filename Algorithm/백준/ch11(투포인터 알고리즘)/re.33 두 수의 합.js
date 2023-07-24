let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0]);
const data = input[1].split(' ').map(v => Number(v));
let target = Number(input[2]);

function solution(nums, N, target){
  // 오름차순 정렬시키면
  // start = 0, end = N - 1로 초기화하고
  // 시작점을 증가시키면 최종 합산이 증가하고
  // 끝점을 감소시키면 최종 합산이 감소한다.
  nums.sort((a, b) => a - b);
  let cnt = 0;

  for(let start = 0, end = N - 1; start < N; start++){
    while(start < end){
      let sum = nums[start] + nums[end]
      if(sum > target) end--;
      else if(sum <= target){ 
        if(sum === target) cnt++;
        break;
      }
    }
  }

  return cnt;
}

console.log(solution(data, n, target));
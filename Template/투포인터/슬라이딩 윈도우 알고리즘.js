let dayTotal = 5;
let X = 2;
let nums = [1, 4, 2, 5, 1]

function solution(nums, dayTotal, X){
  let [end, sum, max] = [0, 0, 0];

  
  for(let start = 0; start + X <= dayTotal; start++){
    while(end < start + X){
      sum += nums[end];
      end++;
    }
    if(sum > max) max = sum;
    sum -= nums[start];
  }

  return max;
}

console.log(solution(nums, dayTotal, X))
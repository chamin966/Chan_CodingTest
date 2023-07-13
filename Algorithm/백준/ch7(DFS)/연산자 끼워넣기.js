let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

const d1 = input[1].split(' ').map(v => Number(v));
const tmp = input[2].split(' ').map(v => Number(v));
const d2 = [];
d2.push(...(('+').repeat(tmp[0]).split('')));
d2.push(...(('-').repeat(tmp[1]).split('')));
d2.push(...(('*').repeat(tmp[2]).split('')));
d2.push(...(('/').repeat(tmp[3]).split('')));

function solution(nums, opers){
  let max = Number.NEGATIVE_INFINITY;
  // Number.MIN_VALUE는 JavaScript에서 표현할 수 있는
  // 양의 최소값을 나타내는 것이 아니라, 양수 중에서 가장 작은 값을 의미합니다.
  // 따라서 음수로 최소값을 나타내고 싶다면 Number.NEGATIVE_INFINITY을 선택해야 합니다.
  let min = Number.MAX_VALUE;
  const visited = new Array(opers.length).fill(false);
  const picked = [];

  const permut = (dep) => {
    if(dep === opers.length){
      let sum = nums[0];
      for(let i = 0; i < picked.length; i++){
        switch(picked[i]){
          case '+':
            sum += nums[i+1];
            break;
          case '-':
            sum -= nums[i+1];
            break;
          case '*':
            sum *= nums[i+1];
            break;
          case '/':
            sum = Math.trunc(sum / nums[i+1]);
            break;
        }
      }
      min = Math.min(min, sum);
      max = Math.max(max, sum);
    }
    for(let i = 0; i < opers.length; i++){
      if(visited[i]) continue;
      visited[i] = true;
      picked.push(opers[i]);
      permut(dep + 1);
      picked.pop()
      visited[i] = false;
    }
  }

  permut(0)
  return [max, min].join('\n');
}

console.log(solution(d1, d2));

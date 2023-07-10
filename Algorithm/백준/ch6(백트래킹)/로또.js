let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

const data = [];
for (let i = 0; i < input.length; i++) {
  if(input[i] === '0') break;
  data.push(input[i].split(' ').map(v => Number(v)).slice(1));
}

function solution(arr){
  // 배열에서 6개 뽑는 조합
  let answer = []
  const pick = [];
  const combi = (nums, dep, start) => {
    if(dep === 6){
      answer.push(pick.join(' '));
    }
    for(let i = start; i < nums.length; i++){
      pick.push(nums[i]);
      combi(nums, dep + 1, i + 1);
      pick.pop();
    }
  }

  for(let i = 0; i < arr.length; i++){
    combi(arr[i], 0, 0);
    answer.push('');
  }

  // console로 하나 하나 찍을 경우에 출력양이 많으면 시간이 초과될 수 있음
  // 한번에 바로 출력하는 것이 좋다.
  return answer.join('\n');
}

console.log(solution(data));

/** 

*/

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

const data = input[1].split(' ').map(v => Number(v));

function solution(nums){
  let answer = 0;
  const picked = [];
  // 방문 배열을 생성한다.
  const visited = new Array(nums.length).fill(false);

  const permut = (dep) => {
    if(dep === nums.length){
      let sum = 0;
      for(let i = 0; i < picked.length - 1; i++){
        sum += Math.abs(picked[i] - picked[i + 1]);
      }
      return answer = Math.max(sum, answer);
    }
    for(let i = 0; i < nums.length; i++){
      // 검사는 index로 검사하고
      if(visited[i]) continue;
      // picked에는 nums[i]를 사용하여 그 값을 삽입한다.
      picked.push(nums[i]);
      visited[i] = true;
      permut(dep + 1);
      picked.pop()
      visited[i] = false;
    }
  }

  permut(0);
  return answer;
}

console.log(solution(data));
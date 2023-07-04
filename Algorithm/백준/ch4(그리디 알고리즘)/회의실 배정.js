// 회의 시간 빨리 끝나는 순 + 빨리 시작하는 순
// 다음 시작 시간이 이전 끝 시간보다 크거나 같으면 사용 가능

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(input[i].split(' ').map(v => Number(v)));
}

const solution = arr => {
  let answer = 0;
  arr.sort((a, b) =>{
    if(a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1]
  });

  let endTime = 0;
  for(let x of arr){
    if(x[0] >= endTime){
      endTime = x[1];
      answer += 1;
    }
  }

  return answer;
}

console.log(solution(data));

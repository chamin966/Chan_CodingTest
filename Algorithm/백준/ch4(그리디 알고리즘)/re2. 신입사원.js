let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// 백준에서 프로그래머스로 넘어가야 하는 이유..
// 입력값 전처리 하다가 시간 다쓰겠네..
let totalCaseCnt = Number(input[0]);
let index = 1;
const data = [];
for(let i = 0; i < totalCaseCnt; i++){
  let n = Number(input[index]);
  let arr = [];
  for(let j = index + 1; j <= index + n; j++){
    arr.push(input[j].split(' ').map(v => Number(v)));
  }
  index = index + n + 1;
  data.push(arr);
}

const solution = arr => {
  answer = [];
  
  for(let x of arr){
    let paperRank = x.sort((a, b) => a[0] - b[0]);
    let minInterview = paperRank[0][1]; 

    // paperRank로 정렬된 순위에서 하나의 기준의 상위 점수로 정렬되어 있다면
    // 모든 사원 보다이므로 상위 등수의 다른 기준 합격 점수를 갱신하고
    // 그보다 높은 등수를 받아야 함.
    answer.push(paperRank.filter(v => {
      if(v[1] <= minInterview){
        minInterview = v[1];
        return true;
      }
      return false;
    }).length)
  }
  
return answer.join('\n');
}

console.log(solution(data));

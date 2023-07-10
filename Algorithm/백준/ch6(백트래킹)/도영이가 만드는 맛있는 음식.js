let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(input[i].split(' ').map(v => Number(v)))
}

function solution(arr){
  let min = Number.MAX_VALUE;
  const picked = [];
  
  const combi = (dep, start) => {
    if(dep >= 1){
      /**
      dep 가 일정 값 이상이 되도록 설정하면
      해당 개수 이상의 경우의 경우의 수를 모두 구할 수 있다.
      */
      let sin = 1;
      let ssn = 0;
      console.log(picked)
      for(let x of picked){
        sin *= x[0];
        ssn += x[1];
      }
      // 이때 주의할 점은 return을 쓰면 안된다는 것이다.
      min = Math.min(Math.abs(sin - ssn), min);
    }
    for(let i = start; i < arr.length; i++){
      picked.push(arr[i]);
      combi(dep + 1, i + 1);
      picked.pop();
    }
  }

  combi(0, 0)
  return min;
}

console.log(solution(data));

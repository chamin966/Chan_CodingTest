let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

const data = input[1].split(' ').map(v => Number(v));

const solution = arr => {
  arr.sort((a, b) => a - b)
  
  let sum = 0;
  let answer = 0;
  for(let x of arr){
    sum += x;
    answer += sum;
  }

  return answer;
}

console.log(solution(data));
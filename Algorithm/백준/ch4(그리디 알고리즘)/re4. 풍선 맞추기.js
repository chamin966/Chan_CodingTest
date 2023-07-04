let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

const data = input[1].split(' ').map(v => Number(v)); 

const solution = arr => {
  let answer = 0;
  const arrow = Array.from({length: 1000001}, () => 0)
  
  for(let x of arr){
    if(arrow[x] > 0){
      arrow[x] -= 1;
      arrow[x - 1] += 1;
    }else{
      arrow[x - 1] += 1;
      answer += 1;
    }
  }
  
  return answer;
}

console.log(solution(data));
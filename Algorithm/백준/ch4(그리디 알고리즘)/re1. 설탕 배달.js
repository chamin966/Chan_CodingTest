let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let data = Number(input[0]);

const solution = n => {
  let cnt = 0;
  
  while(n > 0){
    if(n % 5 === 0){
      cnt += n / 5;
      return cnt;
    }
    
    n -= 3;
    cnt += 1;
  }

  if(n === 0) return cnt;
  return -1;
}

console.log(solution(data));

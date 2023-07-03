let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')


const data = input[0];

const solution = arr => {
  const f1 = arr.split('-');
  
  const f2 = [];
  for(let x of f1){
    f2.push(x.split('+').map(v => Number(v)).reduce((acc, cur) => acc + cur, 0))
  }
  
  return f2.reduce((acc, cur) => acc - cur);
}

console.log(solution(data));

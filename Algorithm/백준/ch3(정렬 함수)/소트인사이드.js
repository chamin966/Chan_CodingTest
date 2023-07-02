let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString();

let data = input.split('').map(v => Number(v));
data.pop();

const solution = arr => {
  return arr.sort((a,b) => b - a).join('');
}

console.log(solution(data));
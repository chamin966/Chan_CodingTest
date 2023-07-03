let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [d, p] = [input[1].split(' ').map(v => Number(v)), input[2].split(' ').map(v => Number(v))];
p.pop();



const solution = (dist, price) => {
 let answer = 0;

  return answer;
}

console.log(solution(d, p));

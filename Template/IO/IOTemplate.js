let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(input[i]);
}

function solution(param){

}

console.log(solution(data));

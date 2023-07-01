// 백준 15552
let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
let result = '';

for(let i = 1; i < Number(input[0]); i++){
  let [a, b] = input[i].split(' ').map(v => Number(v));
  result += (a + b) + '\n'; 
}

console.log(result);
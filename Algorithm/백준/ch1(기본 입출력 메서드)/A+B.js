// 백준 1000

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const line = input[0].split(' ');
const result = parseInt(line[0]) + parseInt(line[1]);
console.log(result);
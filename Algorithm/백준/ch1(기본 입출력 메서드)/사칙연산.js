// 백준 10869

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
let a = input[0]
let b = input[1]

console.log(parseInt(a) * parseInt(b[2]))
console.log(parseInt(a) * parseInt(b[1]))
console.log(parseInt(a) * parseInt(b[0]))
console.log(parseInt(a) * parseInt(b))
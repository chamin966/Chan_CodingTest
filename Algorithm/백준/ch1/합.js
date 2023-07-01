// 백준 8393
let fs = require('fs')
let n = Number(fs.readFileSync('/dev/stdin').toString())
let result = 0;

for(let i = 1; i <= n; i++) result += i;

console.log(result)
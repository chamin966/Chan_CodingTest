let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
input.pop();
let result = input.slice(1).sort((a, b) => a - b);
for(let x of result) console.log(x);
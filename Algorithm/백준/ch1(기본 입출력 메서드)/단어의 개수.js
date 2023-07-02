let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

if (input[0] === '') return console.log(0)
return console.log(input.length)
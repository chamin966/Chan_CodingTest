// 백준 2525
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [h, m] = input[0].split(' ').map(v=>Number(v));
let cooking = parseInt(input[1]);

let total = h * 60 + m + cooking;
h = parseInt(total / 60);
m = total % 60;
if(h >= 24) h -= 24;

console.log(h + ' ' + m)
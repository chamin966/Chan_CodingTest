// 백준 2480

let fs = require('fs');
let [a, b, c] = fs.readFileSync('/dev/stdin').toString().split(' ').map(v => Number(v));

if(a === b && b === c) console.log(10000 + 1000 * a);
else if (a === b) console.log(1000 + 100 * a);
else if (b === c) console.log(1000 + 100 * b);
else if (a === c) console.log(1000 + 100 * c);
else console.log(100 * Math.max(a, b, c))
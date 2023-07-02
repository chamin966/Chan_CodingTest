// 백준 2884
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ');
let h = parseInt(input[0]);
let m = parseInt(input[1]);

if(m < 45){
  h -= 1;
  if(h < 0) h = 23;
  m += 15
}
else console.log(h + ' ' + m)
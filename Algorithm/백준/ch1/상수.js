let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

input.shift();
input.pop();

let answer = input.filter(str => {
  const check = [];
  for(let i = 0; i < str.length - 1; i++){
    if(str[i] !== str[i + 1]){
      check.push(str[i]);
      if(check.includes(str[i+1])) return false;
    }
  }
  return true;
}).length

console.log(answer);
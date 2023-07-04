let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(input[i]);
}

function solution(arr){
  const isPldr = (str) => {
    if(str === str.split('').reverse().join('')) return true;
    return false;
  }

  const answer = [];

  for(let x of arr){
    if(isPldr(x)) answer.push(0);
    else{
      let flag = false;
      let len = x.length;
        
      for(let i = 0; i < Math.floor(len / 2); i++){
        if(x[i] !== x[len - 1 - i]){
          if(isPldr(x.slice(0, i) + x.slice(i + 1))) flag = true;
          if(isPldr(x.slice(0, len - 1 - i) + x.slice(len - i))) flag = true;
          break;
        }
      }

      if(flag) answer.push(1);
      else answer.push(2);
    }
  }

  return answer.join('\n');
}

console.log(solution(data));

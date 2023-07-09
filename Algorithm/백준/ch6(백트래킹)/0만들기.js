let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(Number(input[i]));
}

function solution(arr){
  const answer = [];
  const tmp = [];
  const dfs = (m, opers, dep) => {
    if(dep === m - 1) {
      let result = ''
      for(let i = 0; i < opers.length; i++)
        result += (i + 1) + opers[i]
      result += dep + 1;
      let sum = result.split(' ').join('');
      if(eval(sum) === 0) console.log(result)
      return;
    }
    for(let x of [' ', '+', '-']){
      opers.push(x);
      dfs(m, opers, dep + 1);
      opers.pop();
    }
  }

  for(let x of arr){
    dfs(x, [], 0);
    console.log();
  }

  return;
}

solution(data);

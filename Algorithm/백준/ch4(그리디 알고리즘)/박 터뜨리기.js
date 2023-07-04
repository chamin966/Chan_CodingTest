let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [b, t] = input[0].split(' ').map(v => Number(v));

function solution(ball, team){
  let min = 0;
  for(let i = 1; i <= team; i++) min += i;

  if(ball >= min){
    ball -= min;
    if(ball % team === 0) return team - 1; 
    return team;
  }
  return -1;
}

console.log(solution(b, t));
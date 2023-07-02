let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n').slice(1);

let coord = input.map(v => v.split(' '));
coord.pop()

let solution = arr => {
  return arr.sort((a, b) => {
    if(a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0]
  }).map(v => `${v[0]} ${v[1]}`).join('\n')
}

console.log(solution(coord));
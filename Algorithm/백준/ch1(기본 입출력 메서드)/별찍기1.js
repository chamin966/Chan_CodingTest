// 백준 2438

let fs = require('fs')
let n = Number(fs.readFileSync('/dev/stdin').toString())

for(let i = 0; i < n; i++){
  let stars = ''
  for(let j = 0; j <= i; j++) stars += '*'
  console.log(stars);
}
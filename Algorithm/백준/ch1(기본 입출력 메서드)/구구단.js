// 백준 2739

let fs = require('fs')
//문자열을 수로 변환할 때 parseInt 에 비하여 Number 의 속도가 더 빠르게 동작
let n = Number(fs.readFileSync('/dev/stdin').toString())

for(let i = 1; i <= 9; i++){
  console.log(`${n} * ${i} = ${n * i}`);
}
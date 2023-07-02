const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const k = input[0].split(' ')[1];
const nums = input[1].split(' ').map(v => Number(v));

function solution(arr, n){
  return arr.sort((a,b) => a - b)[n - 1];
}

console.log(solution(nums, k));
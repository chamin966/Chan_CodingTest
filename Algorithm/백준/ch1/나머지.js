// 백준 3052
let fs = require('fs')
let nums = fs.readFileSync('/dev/stdin').toString().split('\n').map(v => Number(v))

let set = new Set();
for(let i = 0; i < nums.length - 1; i++) set.add(nums[i] % 42);

console.log(set.size);
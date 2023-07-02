//백준 2562
let fs = require('fs')
let nums = fs.readFileSync('/dev/stdin').toString().split('\n').map(v => Number(v));

// let max = 0
// let index = 0;
// for(let i = 0; i < nums.length - 1; i++){
//   if(nums[i] > max){
//     max = nums[i];
//     index = i + 1;
//   }
// }

// console.log(max + '\n' + index)

let max = Math.max(...nums)
console.log(max + '\n' + (nums.indexOf(max) + 1))
// 백준 10818
let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const nums = input[1].split(' ').map(v => Number(v));

// Math.min(), Math.max()는 배열이 아닌 각각의 숫자를 ,로 구분해서 넣어야 한다.
console.log(Math.min(...nums), Math.max(...nums))

// // 백준 10818
// let fs = require('fs')
// let input = fs.readFileSync('/dev/stdin').toString().split('\n');
// const nums = input[1].split(' ').map(v => Number(v));
// let min = 1000000;
// let max = -1000000;
// // Math.min(), Math.max()는 배열이 아닌 각각의 숫자를 ,로 구분해서 넣어야 한다.
// for(let i = 0; i < nums.length; i++){
//   if(nums[i] < min) min = nums[i];
//   if(nums[i] > max) max = nums[i];
// }

// console.log(min, max)
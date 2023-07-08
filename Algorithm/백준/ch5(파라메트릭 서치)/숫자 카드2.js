let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

const data1 = input[1].split(' ').map(v => Number(v)).sort((a, b) => a - b);
const data2 = input[3].split(' ').map(v => Number(v));

function solution(arr, targets) {
  const lowerBound = (target, left, right) => {
    if (left === right) return right;
    let mid = Math.floor((left + right) / 2);
    if (target <= arr[mid]) return lowerBound(target, left, mid);
    return lowerBound(target, mid + 1, right);
  }
  const upperBound = (target, left, right) => {
    if (left === right) return right;
    let mid = Math.floor((left + right) / 2);
    if (target < arr[mid]) return upperBound(target, left, mid);
    return upperBound(target, mid + 1, right);
  }
  const countByRange = (lowerV, upperV) => {
    let lowerIndex = lowerBound(lowerV, 0, arr.length);
    let upperIndex = upperBound(upperV, 0, arr.length);
    return upperIndex - lowerIndex;
  }

  let answer = '';
  for (let x of targets) {
    answer += countByRange(x, x) + ' ';
  }

  return answer;
}

console.log(solution(data1, data2));

// 데이터 개수가 100만개 이상이면 이진탐색이 아니면 시간 안에 풀 수 없다.
// let fs = require('fs')
// let input = fs.readFileSync('/dev/stdin').toString().split('\n')

// const data1 = input[1].split(' ').map(v => Number(v)).sort((a, b) => a- b); 
// const data2 = input[3].split(' ').map(v => Number(v));

// function solution(arr, targets){
//   let answer = '';
//   for(let x of targets){
//     let lowerIndex = arr.indexOf(x);
//     let upperIndex = arr.lastIndexOf(x);
//     if(lowerIndex + upperIndex < 0) answer += 0 + ' ';
//     else answer += (upperIndex - lowerIndex + 1) + ' ';
//   }

//   return answer;
// }

// console.log(solution(data1, data2));
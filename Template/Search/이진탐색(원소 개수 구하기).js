// let fs = require('fs')
// let input = fs.readFileSync('/dev/stdin').toString().split('\n')

// const data1 = input[1].split(' ').map(v => Number(v)).sort((a, b) => a- b); 
// const data2 = input[3].split(' ').map(v => Number(v));

// function solution(arr, targets){
//   const lowerBound = (left, right) => {

//   }
// }

// console.log(solution(data1, data2));

/** 
숫자 범위가 아니라 특정 문자, 또는 문자열의 개수를 구할 때는,
split('특정문자열').length - 1을 사용하고
특정 문자 각각의 개수를 구해야 한다면,
match(정규표현식).filter(v => v  !== '').length 으로 구할 수 있다.
*/

// 연속된 숫자 범위를 구할 경우,
function lowerBound(arr, target, left, right) {
  if (left === right) return right;
  let mid = Math.floor((left + right) / 2);
  // 현재의 값을 포함하면서 최대한 왼쪽으로 이동
  // 동일한 값이 있다면 가장 왼쪽으로 가기 위함
  // 반드시 return 해야 함
  if (target <= arr[mid]) return lowerBound(arr, target, left, mid)
  else return lowerBound(arr, target, mid + 1, right);
}

function upperBound(arr, target, left, right) {
  if (left === right) return right;
  let mid = Math.floor((left + right) / 2);
  // 현재의 값에 가장 가까운 다음 값을 찾기 위해 최대한 오쪽으로 이동
  // 동일한 값이 있다면 가장 오른쪽으로 가기 위해 등호가 없음
  // 반드시 return 해야 함
  // 등호 없는 것 빼고 lowerBound와 동일
  if (target < arr[mid]) return upperBound(arr, target, left, mid)
  else return upperBound(arr, target, mid + 1, right);
}

function countByRange(arr, lowerValue, upperValue) {
  // lowerBound, upperBound 함수는 삽입할 인덱스를 찾는다는 로직이므로,
  // arr.length - 1이 아닌 arr.length 를 사용해야 한다.
  let lowerIndex = lowerBound(arr, lowerValue, 0, arr.length);
  let upperIndex = upperBound(arr, upperValue, 0, arr.length);
  return upperIndex - lowerIndex;
}

let test = [6, 4, 3, 1, 9, 8, 8, 9, 8, 9, 8, 7, 5];
test.sort((a, b) => Number(a) - Number(b));


console.log(countByRange(test, 8, 8)); // 4
console.log(countByRange(test, 8, 9)); // 7
console.log(countByRange(test, 9, 9)); // 3


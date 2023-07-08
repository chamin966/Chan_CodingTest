/** 
최장 증가 부분 수열(LIS, Longest Increasing Subsequence)란?
: 원소가 n개인 배열의 일부 원소를 골라내서 만든 부분 수열 중, 각 원소가 이전 원소보다 크다는 조건을 만족하고, 그 길이가 최대인 부분 수열을 최장 증가 부분 수열이라고 합니다.
*/

function solution(arr){
  const lowerBound = (target, left, right) =>{
    if(left === right) return right;
    let mid = Math.floor((left + right) / 2);
    if(target <= arr[mid]) return lowerBound(target, left, mid);
    else return lowerBound(target, mid + 1, right);
  }

  const newArr = [0];
  for(let x of arr){
    if(newArr.at(-1) < x) newArr.push(x);
    else{
      let index = lowerBound(x, 0, newArr.length);
      newArr[index] = x;
    }
  }

  return arr.length - (newArr.length - 1);
}

console.log(solution(data));

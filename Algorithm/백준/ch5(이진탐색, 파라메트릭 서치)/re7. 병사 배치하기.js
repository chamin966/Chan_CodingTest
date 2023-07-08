let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = input[1].split(' ').map(v => Number(v));

function solution(arr){
  arr.reverse(); //최장 증가 부분 수열(LIS) 알고리즘을 사용하기 위함이다.
  
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

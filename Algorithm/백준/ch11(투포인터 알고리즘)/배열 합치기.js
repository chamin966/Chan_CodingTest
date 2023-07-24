let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

const arr1 = input[1].split(' ').map(v => Number(v)); 
const arr2 = input[2].split(' ').map(v => Number(v)); 

function solution(arr1, arr2){
  //arr1, arr2는 이미 정렬되어 있다.
  let left = 0;
  let right = 0;
  const newArr = [];
  
  while(left < arr1.length && right < arr2.length){
    if(arr1[left] < arr2[right]){
      newArr.push(arr1[left]);
      left++;
    }else{
      newArr.push(arr2[right]);
      right++;
    }
  }

  while(left < arr1.length){
    newArr.push(arr1[left]);
    left++;
  }

  while(right < arr2.length){
    newArr.push(arr2[right]);
    right++;
  }

  return newArr.join(' ');
}

console.log(solution(arr1, arr2));

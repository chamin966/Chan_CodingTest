let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

/*
sort의 콜백 함수의 인자로 (a, b)를 넣으면 자동으로
a와 b를 문자 -> 숫자로 타입 캐스팅 해주지만,
애초부터 숫자로 넣어주면 알고리즘이 훨씬 빠르게 동작한다.
*/

const data = input[1].split(' ').map(Number);

const solution = arr => {
  const newArr = [...new Set(arr)].sort((a, b) => a - b);
  const m = new Map;
  
  for(let i = 0; i < newArr.length; i++){
    m.set(newArr[i], i);
  }

  let answer = '';
  for(let i = 0; i < arr.length; i++){
    answer += m.get(arr[i]) + ' ';
  }

  return answer;
}

console.log(solution(data));


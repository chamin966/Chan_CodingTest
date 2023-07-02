/*
숫자형태의 문자열이 아닌 단순 문자열은
뺄셈 연산이 아니라 직접 대소 비교를 수행하여야 한다.

Number('123') //123
Number('a') //NaN

'a'.charCodeAt() //97
String.fromCharCode(97, 98, 99) //'abc'
*/

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(input[i]);
}

const solution = arr => {
  const ext = Array.from(new Set(arr));
  // const ext = [...new Set(arr)];
  // Set에 전개연산자 쓰면 바로 배열로 바뀜

  return ext.sort((a, b) => {
    if (a.length === b.length) {
      if (a < b) return -1;
      return 1;
    };
    return a.length - b.length;
  }).join('\n')
}

console.log(solution(data));

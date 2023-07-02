let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let n = input[0];
const data = [];
for (let i = 1; i <= n; i++) {
  let [age, name] = input[i].split(' ')
  // 정렬 전에 미리 숫자로 타입 캐스트 해주면 더 빠름
  data.push([Number(age), name]);
}

const solution = arr => {
    // 0을 반환하면 기존 순서가 유지된다.
  return arr.sort((a, b) => a[0] - b[0]).map(v => `${v[0]} ${v[1]}`).join('\n');
}

console.log(solution(data));
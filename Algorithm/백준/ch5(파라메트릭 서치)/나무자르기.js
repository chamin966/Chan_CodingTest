let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let w = Number(input[0].split(' ')[1]);
const data = input[1].split(' ').map(v => Number(v))

function solution(arr, want) {
  let answer = 0;

  const ps = (left, right) => {
    if (left > right) return;
    let mid = Math.floor((left + right) / 2);

    let timber = 0;
    for (let x of arr) timber += Math.max(0, x - mid);

    if (timber < want) return ps(left, mid - 1);
    answer = mid;
    return ps(mid + 1, right);
  }

  ps(0, Math.max(...arr));
  return answer;
}

console.log(solution(data, w));

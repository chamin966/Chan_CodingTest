// 실패함 다시 해야 함
let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [l, w, h] = input[0].split(' ').map(v => Number(v));
let n = input[1];
const data = [];
for (let i = 1; i <= n; i++) {
  const [len, cnt] = input[i + 1].split(' ').map(v => Number(v))
  data.push([2 ** len, cnt]);
}

function solution(length, width, height, arr) {
  console.log(length, width, height, arr)

  const maxEdge = (x) => {
    let r = 0;
    while (2 ** r <= x) r += 1;
    return 2 ** (r - 1);
  }

  let limitEdge = 2 ** 19;
  limitEdge = Math.min(limitEdge, maxEdge(length));
  limitEdge = Math.min(limitEdge, maxEdge(width));
  limitEdge = Math.min(limitEdge, maxEdge(height));

  arr.reverse();
  let target = length * width * height;
  let answer = 0;

  for (let x of arr) {
    let [e, c] = x;
    if (e > limitEdge) continue;
    let v = e ** 3;
    let used = Math.min(c, Math.floor(target / v));
    console.log('빼기 전: ', target);
    target -= v * used;
    console.log('뺀 후: ', target, e, used);
    answer += used;
    if (target <= 0) break;
  }

  if (target === 0) return answer;
  return -1;
}

console.log(solution(l, w, h, data));

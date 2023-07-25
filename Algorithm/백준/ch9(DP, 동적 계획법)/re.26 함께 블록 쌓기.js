// readline 모듈보다는 fs를 이용해 파일 전체를 읽기
let file = require('fs').readFileSync('/dev/stdin');
let input = file.toString().split('\n');

let [studentCnt, maxBlockCnt, h] = input[0].split(' ').map(Number);
let blocks = [];

let dp = new Array(h + 1).fill(0);
for (let i = 1; i <= studentCnt; i++) {
  blocks.push(input[i].split(' ').map(Number));
}

dp[0] = 1;
// 모든 학생에 대하여 처리
for (let i = 0; i < studentCnt; i++) {
  let tmp = [];
  // 0부터 h까지의 모든 높이에 대하여 처리
  for (j = 0; j <= h; j++) {
    for (let k = 0; k < blocks[i].length; k++) { // 해당 학생의 모든 블록을 확인하며
      // 현재 학생의 블록으로 특정 높이의 탑을 쌓을 수 있는 경우
      if (dp[j] != 0 && j + blocks[i][k] <= h) {
        console.log('i:', i, 'j:', j, 'k:', k,'blocks[i][k]:', blocks[i][k])
        tmp.push([j + blocks[i][k], dp[j]]);
      }
    }
  }
  console.log('i:', i, 'tmp:', tmp)
  // 쌓을 수 있는 높이에 대하여, 경우의 수 증가
  for ([height, value] of tmp) {
    dp[height] = (dp[height] + value) % 10007;
  }
}
console.log(dp[h]);
let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [A, B] = input[0].split(' ').map(v => Number(v));

const solution = (n, k) => {
  let cnt = 0;
  
  while(k > n){
    if(k % 2 === 0) k /= 2;
    else if(String(k).at(-1) === '1'){
      let strK = String(k)
      k = Number(strK.slice(0, strK.length - 1))
    }
    else break;

    cnt += 1;
    if(k === n) return cnt + 1;
  }
  
  return -1;
}

console.log(solution(A, B));

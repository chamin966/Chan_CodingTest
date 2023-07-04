let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [d, p] = [input[1].split(' ').map(v => Number(v)), input[2].split(' ').map(v => Number(v))];


const solution = (dist, price) => {
  let min = 1000000001;
  for(let i = 0; i < price.length - 1; i++){
    min = Math.min(price[i], min);
    price[i] = min;
  }
  
  let answer = BigInt(0);
  for(let i = 0; i < dist.length; i++){
    answer += BigInt(price[i]) * BigInt(dist[i]);
  }
  
  return String(answer);
}

console.log(solution(d, p));

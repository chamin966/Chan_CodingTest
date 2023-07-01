// 백준 4344
let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

for(let i = 1; i <= input[0]; i++){
  const arr = input[i].split(' ').map(v => Number(v));
  let cases = arr[0];
  const scores = arr.slice(1)
  const avrg = parseInt(scores.reduce((acc, cur) => acc + cur) / cases);
  let higher = scores.filter((v)=> v > avrg).length
  
  console.log((higher / cases * 100).toFixed(3) + '%');
}
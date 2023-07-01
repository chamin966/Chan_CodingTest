let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

for(let i = 1; i <= input[0]; i++){
  let result = '';
  const [num, str] = input[i].split(' ');
  for(let x of str){
    result += x.repeat(num);
  }
  console.log(result);
}
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const result = input[0].split(' ').sort((a, b) => Number(a) - Number(b));

console.log(...result);

/*
sort() 함수의 콜백 함수에서 a - b를 사용하면 자바스크립트는 문자열을 숫자로 암시적으로 변환하여 연산을 수행한다. 따라서 ['10', '5', '8', '2', '1'] 배열을 sort((a, b) => a - b)로 정렬할 때, 각 요소가 숫자로 변환되어 비교되며 숫자 순서대로 정렬된다.
하지만 결과값이 숫자가 아닌 문자열로 배열에 저장되는 것에 주의해야 한다.
*/
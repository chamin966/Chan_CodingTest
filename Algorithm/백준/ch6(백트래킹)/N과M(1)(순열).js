let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [d1, d2]  = input[0].split(' ').map(v => Number(v));

/** 
for(let i = 0; i < nums.length; i++){
  if(picked.includes(nums[i])) continue;
  picked.push(nums[i]);
  permut();
  picked.pop()
}

만약 위와 같이, 방문 배열 없이 이미 선택된 요소를 기준으로
dfs를 실행하게 되면 안된다.

선택하고자 하는 숫자 배열에 중복된 숫자가 있는 경우,
"picked.includes()" 조건에 의해 해당 숫자가 두 번째 이후로 선택될 수 없기 때문이다.
따라서 모든 순열을 탐색하는 것이 아니라 일부 순열만을 생성하게 됩니다.

결국 순열에는 반드시 방문 체크 배열이 필요하다. 
*/

function solution(n, m){
  const answer = [];
  const nums = Array.from({length: n}, (_, i) => i + 1);
  const picked = [];
  const check = Array.from({length: n + 1}, () => false);

  const permutation = (dep) => {
    if(dep === m) return answer.push(picked.join(' '));
    for(let x of nums){
      if(check[x]) continue;
      picked.push(x);
      check[x] = true;
      permutation(dep + 1);
      picked.pop();
      check[x] = false;
    }
  }

  permutation(0);
  return answer.join('\n');
}

console.log(solution(d1, d2));

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [n, m] = input[0].split(' ').map(v => Number(v));
const data = Array.from({length: n}, ()=>[]);
for (let i = 1; i < n + 1; i++) {
  data[i-1].push(...input[i].split(' ').map(v => Number(v)))
}

const h = [];
const ch = [];

for(let i = 0; i < n; i++){
  for(let j = 0; j < n; j++){
    if(data[i][j] === 1) h.push([i, j]);
    else if(data[i][j] === 2) ch.push([i, j]);
  }
}

function solution(home, chkn, max){
  let min = Number.MAX_VALUE;
  const pickChkn = [];

  const getDist = (r1, c1, r2, c2) => {
    return Math.abs(r1 - r2) + Math.abs(c1 - c2);
  }
  
  const dfs = (dep, start) => {
    if(dep > m) return;
    if(dep <= m){
      let chickenDist = 0;
      
      for(let h of home){
        let minDist = Number.MAX_VALUE;
        let [hx, hy] = h;
        for(let ch of pickChkn){
          let [chx, chy] = ch;
          minDist = Math.min(getDist(hx, hy, chx, chy), minDist);
        }
        chickenDist += minDist;
      }
      
      min = Math.min(chickenDist, min);
    }
    for(let i = start; i < chkn.length; i++){
      pickChkn.push(chkn[i]);
      dfs(dep + 1, i + 1)
      pickChkn.pop();
    }
  }

  dfs(0, 0);
  return min;
}

console.log(solution(h, ch, m));

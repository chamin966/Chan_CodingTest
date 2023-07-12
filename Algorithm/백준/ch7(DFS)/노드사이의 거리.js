let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [n, m] = input[0].split(' ').map(v => Number(v));

const d1 = Array.from({length: n + 1}, () => []);
for (let i = 1; i < n; i++) {
  let [s, e, w] = input[i].split(' ').map(v => Number(v));
  d1[s].push([e, w]);
  d1[e].push([s, w]);
}

const d2 = [];
for(let i = n; i < n + m; i++){
  d2.push(input[i].split(' ').map(v => Number(v)));
}

function solution(tree, qrr){
  const answer = [];
  
  const dfs = (vrr, now, target, sum) => {
    if(now === target) return answer.push(sum);
    // 현재 노드에 도착했으니 방문 처리 해줘야 함
    // 여기서 방문처리 안해주면 시작점이 미방문 처리로 남게 됨.
    vrr[now] = true;
    for(let [ne, w] of tree[now]){
      if(vrr[ne]) continue;
      dfs(vrr, ne, target, sum + w);
    }
  }

  for(let i = 0; i < qrr.length; i++){
    let [s, t] = [qrr[i][0], qrr[i][1]];
    const visited = Array.from({length: tree.length}, ()=>false);
    dfs(visited, s, t, 0);
  }

  return answer.join('\n');
}

console.log(solution(d1, d2));

class Queue{
  constructor(){
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enq(item) {this.items[this.tail++] = item;}
  deq(){
    const item = this.items[this.head];
    delete this.items[this.head++];
    return item;
  }
  peek() {return this.items[this.head];}
  getLength() {return this.tail - this.head;}
}

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let testCase = Number(input[0]);
let line = 1;
const data = [];
while(testCase--){
  let [v, e] = input[line].split(' ').map(v => Number(v));
  const temp = Array.from({length: v + 1}, () => []);
  
  for(let i = line + 1; i <= line + e; i++){
    let [x, y] = input[i].split(' ').map(v => Number(v));
    temp[x].push(y);
    temp[y].push(x);
  }
  
  data.push(temp);
  line += e + 1;
}

function solution(arrs){
  const answer = [];

  // 미방문(color: -1), 빨강(color: 0), 파랑(color: 1)
  const bfs = (arr, visited, now) => {
    const q = new Queue();
    q.enq(now);
    visited[now] = 0; //처음 노드는 빨간색으로 칠하기
    while(q.getLength() !== 0){
      now = q.deq();
      for(let next of arr[now]){
        if(visited[next] === -1){
          visited[next] = (visited[now] + 1) % 2; // 빨강 <-> 파랑
          q.enq(next)
        }
      }
    }
  }

  const isBipartite = (arr, visited) => {
    for(let x = 1; x < visited.length; x++){
      // x의 인접 노드들이 담긴 arr[x]를 y로 순환하면서
      // 자신의 색상이 담긴 visited 배열에서
      // 인접노드들 끼리의 색상이 같은지 판별한다.
      for(let adj of arr[x]) if (visited[x] === visited[adj]) return false;
    }
    return true;
  }

  for (let arr of arrs){
    const visited = new Array(arr.length).fill(-1);
    for(let i = 1; i <= arr.length; i++){
      if(visited[i] === -1) bfs(arr, visited, i);
    }
    console.log('arr: ', arr)
    console.log('visited: ', visited)
    if(isBipartite(arr, visited)) answer.push('YES');
    else answer.push('NO');
  }

  return answer.join('\n');
}

console.log(solution(data));

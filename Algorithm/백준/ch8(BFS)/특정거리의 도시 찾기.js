class Queue{
  constructor(){
    this.items = {};
    this.head = 0;
    this. tail = 0;
  }
  enq(item) {this.items[this.tail++] = item}
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

let [n, m, k, x] = input[0].split(' ').map(v => Number(v));
const data = Array.from({length: n + 1}, ()=>[]);
// 도시의 개수만큼이 아니라
// 간선의 개수만큼 돌아야 하므로 m만큼이다.
for (let i = 1; i <= m; i++) {
  // 방향 그래프
  let [a, b] = input[i].split(' ').map(v => Number(v));
  data[a].push(b);
}

function solution(graph, minDist, start){
  const answer = [];
  const visited = new Array(graph.length).fill(-1);
  visited[start] = 0;
  
  const bfs = (start) => {
    const q = new Queue();
    q.enq(start);
    while(q.getLength() !== 0){
      let cur = q.deq();      
      for(let next of graph[cur]){
        if(visited[next] === -1){
          visited[next] = visited[cur] + 1;
          q.enq(next);
        }
      }
    }
  }

  bfs(start);
  for(let i = 1; i < visited.length; i++){
    if(visited[i] === minDist) answer.push(i);
  }

  if(answer.length === 0) return -1;
  return answer.sort((a, b) => a - b).join('\n');
}

console.log(solution(data, k, x));

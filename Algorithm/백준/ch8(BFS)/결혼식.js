class Queue{
  constructor(){
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enq(item) {this.items[this.tail++] = item}
  deq() {
    const item = this.items[this.head];
    delete this.items[this.head++];
    return item;
  }
  peek(){return this.items[this.head]}
  getLength(){return this.tail - this.head};
}

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let line = 0;
let totoalCnt = Number(input[line++]);
let friendsCnt = Number(input[line++]);

const data = Array.from({length: totoalCnt + 1}, () => []);
for (let i = line; i < friendsCnt + line; i++) {
  let [fa, fb] = input[i].split(' ').map(v => Number(v));
  data[fa].push(fb);
  data[fb].push(fa);
}

function solution(graph){
  let answer = 0;
  const visited = new Array(graph.length).fill(-1);

  const bfs = (start) => {
    const q = new Queue();
    q.enq(start);
    visited[start] = 0;
    while(q.getLength() > 0){
      let curNode = q.deq();
      if(visited[curNode] === 1 || visited[curNode] === 2) answer += 1;
      for(let nextNode of graph[curNode]){
        if(visited[nextNode] === -1){
          visited[nextNode] = visited[curNode] + 1;
          q.enq(nextNode);
        }
      }
    }
  }

  bfs(1);
  return answer;
}

console.log(solution(data));

class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enq(item) { this.items[this.tail++] = item; }
  deq() {
    const item = this.items[this.head];
    delete this.items[this.head++];
    return item;
  }
  peek() { return this.items[this.head]; }
  getLength() { return this.tail - this.head; }
}

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [N, K] = input[0].split(' ').map(v => Number(v));

function solution(n, k) {
  let answer = 0;
  const MAX = 100001;
  const visited = new Array(MAX).fill(0);
  const q = new Queue();

  const bfs = (x) => {
    q.enq(x);
    while(q.getLength() !== 0){
      let cur = q.deq();
      if(cur === k) return visited[cur];
      for(let move of [cur-1, cur+1, cur*2]){
        if(move < 0 || move > MAX) continue;
        if(visited[move] === 0){
          visited[move] = visited[cur] + 1; 
          q.enq(move);
        }
      }
    }
  }

  
  return bfs(n);
}

console.log(solution(N, K));

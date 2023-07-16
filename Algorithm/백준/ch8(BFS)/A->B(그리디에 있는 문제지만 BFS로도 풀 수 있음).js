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
  peek() { return this.items[this.head] }
  getLength() { return this.tail - this.head; }
}

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [d1, d2] = input[0].split(' ').map(v => Number(v));


function solution(startNum, targetNum){
  let answer = -1;
  const visited = new Map();
  const MAX = 1000000000;

  const bfs = () => {
    const q = new Queue();
    q.enq(startNum);
    visited.set(startNum, 1);
    while(q.getLength() > 0){
      let curNum = q.deq();
      if(curNum === targetNum) answer = visited.get(targetNum);
      for(let calcNum of [curNum * 2, Number(String(curNum) + 1)]){
        if(calcNum > MAX) continue;
        if(visited.has(calcNum) === false){
          q.enq(calcNum)
          visited.set(calcNum, visited.get(curNum) + 1);
        }
      }
    }
    
  }

  bfs();
  return answer;
}

console.log(solution(d1, d2));

class Queue{
  constructor(){
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enq(item){this.items[this.tail++]=item;}
  deq(){
    const item = this.items[this.head];
    delete this.items[this.head++];
    return item;
  }
  peek(){return this.items[this.head]}
  getLength(){return this.tail - this.head};
}

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [s, t] = input[0].split(' ').map(v => Number(v));

function solution(start, target){
  if(start === target) return 0;
  let MAX = 1000000000;
  let answer = -1;
  const opers = ['*', '+', '-', '/'];
  // 방문 배열이 너무 크기 때문에 Map 객체 사용
  const visited = new Map();
  
  const bfs = () => {
    const q = new Queue();
    q.enq(start);
    visited.set(start, '');
    
    while(q.getLength() !== 0){
      let cur = q.deq();
      if(cur === target){
        answer = visited.get(cur);
        break;
      }
      for(let op of opers){
        let result = cur;
        if(op === '*') result *= cur;
        else if(op === '+') result += cur;
        else if(op === '-') result -= cur;
        else{ //op === '/'
          if(cur === 0) continue;
          result /= cur;
        }
        if(result <= 0 || result > MAX) continue;
        if(!visited.has(result)){
          visited.set(result, visited.get(cur) + op);
          q.enq(result);
        }
      }
    }
  }

  bfs();
  return answer;
}

console.log(solution(s, t));

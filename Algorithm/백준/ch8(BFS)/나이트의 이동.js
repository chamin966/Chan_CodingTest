class Queue{
  constructor(){
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enq(item){this.items[this.tail++] = item}
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

let testCase = Number(input[0]);
let line = 1;
const data = [];

while(testCase--){
  const temp = [];
  temp.push(Number(input[line++]));
  temp.push(input[line++].split(' ').map(v => Number(v)));
  temp.push(input[line++].split(' ').map(v => Number(v)));
  data.push(temp);
}

function solution(arrs){
  let answer = [];

  const bfs = (arr, visited, len, sr, sc, tr, tc) =>{
    q = new Queue();
    q.enq([sr, sc]);
    while(q.getLength() !== 0){
      let [cx, cy] = q.deq();
      if(cx === tr && cy === tc){
        answer.push(visited[cx][cy]);
        break;
      }
      const dx = [-2, -2, -1, -1, 1, 1, 2, 2];
      const dy = [1, -1, 2, -2, 2, -2, 1, -1];

      for(let i = 0; i < 8; i++){
        let nx = cx + dx[i];
        let ny = cy + dy[i];
        if(nx >= 0 && nx < len && ny >= 0 && ny < len){
          if(visited[nx][ny] === 0){
            q.enq([nx, ny]);
            visited[nx][ny] = visited[cx][cy] + 1;
          }
        }
      }
    }
  }

  for(let arr of arrs){
    let [n, [sr,sc], [tr, tc]] = arr;
    const visited = Array.from({length: n}, () => new Array(n).fill(0));
    bfs(arr, visited, n, sr, sc, tr, tc);
  }

  return answer.join('\n');
}

console.log(solution(data));

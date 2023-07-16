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

let [N, M] = input[0].split(' ').map(v => Number(v));
const data = [];
for (let i = 1; i <= N; i++) {
  data.push(input[i].split(' ').map(v => Number(v)));
}

function solution(graph, rowLen, colLen){
  let time = 0;
  let totalCheeseCnt = 0;
  for(let i = 0; i < rowLen; i++){
    for(let j = 0; j < colLen; j++){
      if(graph[i][j] === 1) totalCheeseCnt += 1;
    }
  }

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];


  const bfs = (initX, initY) => {
    const q = new Queue();
    q.enq([initX, initY]);
    const visited = Array.from({length: rowLen}, () => new Array(colLen).fill(false))
    visited[initX][initY] = true; // 반드시 초기 노드 방문처리!
    
    while(q.getLength() > 0){
      let [curX, curY] = q.deq();
      for(let i = 0; i < 4; i++){
        let nx = curX + dx[i];
        let ny = curY + dy[i];
        if(nx >= 0 && nx < rowLen && ny >= 0 && ny < colLen){
          if(visited[nx][ny] === false){
            if(graph[nx][ny] >= 1) graph[nx][ny] += 1;
            else{
              q.enq([nx, ny]);
              visited[nx][ny] = true;
            }
          }
        }
      }
    }
  }

  const melt = () => {
    time += 1;
    for(let i = 0; i < rowLen; i++){
      for(let j = 0; j < colLen; j++){
        if(graph[i][j] > 2){
          graph[i][j] = 0;
          totalCheeseCnt -= 1;
        }
        else if(graph[i][j] === 2) graph[i][j] = 1;
      }
    }
  }

  // 특정 조건이 충족될 때까지 bfs를 계속 돌릴 수도 있다.
  while(totalCheeseCnt > 0){
    bfs(0, 0);
    melt();
  }
  return time;
}

console.log(solution(data, N, M));

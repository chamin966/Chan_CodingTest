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

const applePos = [];
const changeDir = [];

let N = Number(input[0]);
let line = 1;
let inputCnt = Number(input[line]);
for(let i = line + 1; i <= line + inputCnt; i++){
  applePos.push(input[i].split(' ').map(v => Number(v)));
}

line += inputCnt + 1;
inputCnt = Number(input[line]);
for(let i = line + 1; i <= line + inputCnt; i++){
  let [sec, nextDir] = input[i].split(' ')
  changeDir.push([Number(sec), nextDir]);
}

let data = Array.from({length: N + 2}, () => new Array(N + 2).fill(0));
for(let [appleX, appleY] of applePos){
  data[appleX][appleY] = 1;
}

for(let i = 0; i < N + 2; i++){
  for(let j = 0; j < N + 2; j++){
    data[0][j] = -1;
    data[i][0] = -1;
    data[N+1][j] = -1;
    data[i][N+1] = -1;
  }
}

function solution(graph, changeDir){
  let sec = 0;
  let gLen = graph.length; 
  const dx = [0, 1, 0, -1] // 우하좌상(오른쪽부터 이동하므로)
  const dy = [1, 0, -1, 0] // 우하좌상(오른쪽부터 이동하므로)
  let dirIndex = 0;
  let dxdyIndex = 0;
  

  const bfs = (startX, startY) => {
    const q = new Queue();
    q.enq([startX, startY]);
    graph[startX][startY] = 2;
    let [headX, headY] = [startX, startY]
    
    while(q.getLength() > 0){
      let nx = headX + dx[dxdyIndex];
      let ny = headY + dy[dxdyIndex];
      if(nx >= 0 && nx < gLen && ny >= 0 && ny < gLen){
        if(graph[nx][ny] === 0){ // 사과 없는 곳 
          let [tailX, tailY] = q.deq();
          graph[tailX][tailY] = 0;
          q.enq([nx, ny]);
          graph[nx][ny] = 2;
        }
        else if(graph[nx][ny] === 1){ // 사과 있는 곳
          q.enq([nx, ny]);
          graph[nx][ny] = 2;
        }
        else { // 벽이나 자기 자신
          sec += 1;
          break;
        }
        sec += 1;
        [headX, headY] = [nx, ny]; //다음 위치로 머리를 이동
      }

      if(dirIndex < changeDir.length && sec === changeDir[dirIndex][0]){
        if(changeDir[dirIndex][1] === 'D') dxdyIndex = (dxdyIndex + 1) % 4;
        if(changeDir[dirIndex][1] === 'L'){
          dxdyIndex -= 1;
          if (dxdyIndex == -1) dxdyIndex = 3;
        }
        dirIndex += 1;
      }
    }
  }
  
  bfs(1, 1);
  return sec;
}

console.log(solution(data, changeDir));

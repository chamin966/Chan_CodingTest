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
  peek(){return this.items[this.head];}
  getLength(){return this.tail - this.head}
}

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let n = Number(input[0].split(' ')[0]);
const data = [];
for (let i = 1; i <= n; i++) {
  data.push(input[i].split(' ').map(v => Number(v)));
}
let [s, x, y] = input[n+1].split(' ').map(v => Number(v))

function solution(graph, sec, r, c){
  let gLen = graph.length;
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const virusInfo = [];
  
  const bfs = (virusInfo) => {
    const q = new Queue();
    for(let virus of virusInfo){
      let [v, x, y, t] = virus;
      q.enq([v, x, y, t]);
    }
    while(q.getLength() !== 0){
      let [cv, cx, cy, t] = q.deq();
      if(t === sec) break;
      for(let i = 0; i < 4; i++){
        let nx = cx + dx[i];
        let ny = cy + dy[i];
        if(nx >= 0 && nx < gLen && ny >= 0 && ny < gLen){
            // 이미 증식한 후에는 다른 바이러스가 들어갈 수 없다.
          if(graph[nx][ny] === 0){
            graph[nx][ny] = cv;
            q.enq([cv, nx, ny, t + 1]);
          }
        }
      }
    }
  }

  for(let i = 0; i < gLen; i++){
    for(let j = 0; j < gLen; j++){
      // 모든 바이러스에 초기값으로 0초를 부여하고
      // 자신이 이동하면 +1초 하는 방식
      if(graph[i][j] > 0) virusInfo.push([graph[i][j], i, j, 0]);
    }
  }
  // 낮은 번호의 바이러스가 먼저 증식함
  // 증식할 때는 숫자가 작은 게 들어간다.
  virusInfo.sort((a, b) => a[0] - b[0]);
  bfs(virusInfo);
  return graph[x-1][y-1];
}


console.log(solution(data, s, x, y));

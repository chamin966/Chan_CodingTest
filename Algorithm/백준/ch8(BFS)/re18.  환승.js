class Queue{
  constructor(){
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enq(item){this.items[this.tail++] = item;}
  deq(){
    const item = this.items[this.head];
    delete this.items[this.head++];
    return item;
  }
  peek(){return this.items[this.head];}
  getLength(){return this.tail - this.head;}
}

let fs = require('fs')
let input = fs.readFileSync('/dev/stdin').toString().split('\n')

let [stationsCnt, linksCnt, tubesCnt] = input[0].split(' ').map(v => Number(v));

const test = Array.from({length: stationsCnt + tubesCnt + 1}, () => []);

const data = Array.from({length: stationsCnt + tubesCnt + 1}, () => []);
for (let i = 1; i <= tubesCnt; i++) {
  const linkedTubes = input[i].split(' ').map(v => Number(v));
  /** 
  하이퍼튜브도 역(노드)으로 보고 그래프를 작성할 수 있다.
  각 노드에서 갈 수 있는 하이퍼 튜브와
  각 하이퍼 튜브에서 갈 수 있는 노드들을 기록하는 방식
  만약, 일일이 양방향 그래프를 만든다면 메모리 초과로 문제를 통과할 수 없다.
  */
  for (let x of linkedTubes) {
    data[x].push(stationsCnt + i); // 노드 → 하이퍼 튜브
    data[stationsCnt + i].push(x); // 하이퍼 튜브 → 노드
  }
}

function solution(graph, targetStation){
  let answer = -1;
  const visited = new Array(graph.length).fill(-1);

  const bfs = (start) => {
    const q = new Queue();
    q.enq(start);
    visited[start] = 0;
    console.log(curNode, targetStation)
    while(q.getLength() > 0){
      let curNode = q.deq();
      if(curNode === targetStation){
        answer = parseInt(visited[curNode] / 2) + 1;
        break;
      }
      for(let nextNode of graph[curNode]){
        if(visited[nextNode] === -1){
          visited[nextNode] = visited[curNode] + 1;
          q.enq(nextNode);
        }
      }
    }
  }

  bfs(1);
  // 하이퍼튜브를 통해서만 이동이 가능하므로, 계산된 최단 거리 값을 2로 나누면 그것이 정답이다.
  // 1 → H → 3 → H → 5로 갔다고 하면 거리가 4이므로, 지나야 하는 역의 개수는 2개다
  // 따라서 2+1을 해야 총 지나온 역의 개수가 된다.
  // 절반은 하이퍼 튜브이기 때문에 나누기 2, 간선의 개수가 아닌 노드의 개수이므로 +1.
  return answer;
}

console.log(solution(data, stationsCnt));

class Queue{
  constructor(){
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }
  enq(item) {this.items[this.tailIndex++] = item;}
  deq() {
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex++];
    return item;
  }
  peek() {return this.items[this.headIndex]}
  getLength() {return this.tailIndex - this.headIndex;}
}

q = new Queue();

q.enq(5);
q.enq(4);
q.enq(3);
q.enq(2);
q.enq(1);
q.deq();
q.deq();
q.enq(6);
q.enq(7);

while(q.getLength() !== 0){
  console.log('peek:', q.peek()) // 현재 큐의 가장 첫 인덱스에 저장된 값
  console.log(q.deq());
}
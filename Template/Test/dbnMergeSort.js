
function merge(arr, left, mid, right){
  let i = left;
  let j = mid + 1;
  let k = left;
  while(i <= mid && j <= right){
    if(arr[i] <= arr[j]) sorted[k++] = arr[i++];
    else sorted[k++] = arr[j++]
  }
  if(i>mid) for(; j<=right; j++) sorted[k++] = arr[j];
  else for(; i<=mid; i++) sorted[k++] = arr[i];
  for(let x = left; x <= right; x++) arr[x] = sorted[x];
}

function mergeSort(arr, left, right){
  if(left < right){
    let mid = parseInt((left+right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right)
  }
}
// const testArr = [1, 4, 2, 3, 6, 5, 9, 0];
let arr = Array.from({length: 100000}, ()=> Math.floor(Math.random() * 1000));
const sorted = Array.from({length: arr.length}, ()=>0);
startTime = new Date().getTime();
const result = mergeSort(arr, 0, arr.length - 1);
endTime = new Date().getTime();
console.log(endTime - startTime);

startTime = new Date().getTime();
const result = arr.sort((a,b) => a -b);
endTime = new Date().getTime();
console.log(endTime - startTime);

// 자바스크립트 내장 정렬 함수랑 크게 속도 차이 없다. 둘 다 O(NlogN)
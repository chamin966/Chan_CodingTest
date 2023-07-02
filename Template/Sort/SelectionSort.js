/*
매 단계에서 가장 작은 원소를 선택해서 앞으로 보내는 정렬 방법
앞으로 보내진 원소는 더 이상 위치가 변경되지 않는다.
시간복잡도 O(N^2), 비효율적

로직
1. 각 단계에서 가장 작은 원소를 선택한다.
2. 현재까지 처리 되지 않은 원소들 중 가장 앞의 원소와 위치 교체
*/

function selectionSort(arr){
  for (let i = 0; i < arr.length; i++){
    let minIndex = i;
    
    for (let j = i + 1; j < arr.length; j++) {
      if(arr[minIndex] > arr[j]) minIndex = j;
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
}
const testArr = [1, 4, 2, 3, 6, 5, 9, 0]
selectionSort(testArr);
console.log(testArr);
/*
매 단계에서 인접한 두 원소를 비교하여 정렬이 되어 있지 않다면, 서로 위치를 변경한다.
매 단계에서 가장 큰(작은) 원소가 맨 뒤로 이동한다.
=> 따라서 매 단계마다 맨 뒤로 이동한 데이터는 다음 단계에서 제외된다. 
시간복잡도 O(N^2), 선택정렬보다 비효율적

로직
1. 각 단계에서 인접한 두 요소를 비교하여, 정령되지 않았다면 스왑
2. 각 단계마다 맨 뒤의 요소는 제외
*/

function bubbleSort(arr){
  for (let i = arr.length; i > 0; i--){
    for(let j = 0; j < i; j++){
      if(arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
    }
  }
}
const testArr = [1, 4, 2, 3, 6, 5, 9, 0]
bubbleSort(testArr);
console.log(testArr);
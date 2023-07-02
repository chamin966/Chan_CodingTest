/*
시간복잡도 O(N^2), 비효율적(이미 정렬된 배열의 경우에는 빠름)

로직
0. 시작 시 첫 번째 원소는 정렬된 것으로 가정한다
1. 각 단계에서 현재 원소가 삽입될 위치를 찾는다.
2. 적절한 위치에 도달할 때까지 이미 정렬된 구간 내에서 앞으로 이동한다. 
*/

function insertionSort(arr){
  for(let i = 1; i < arr.length; i++){
    for( let j = i; j > 0; j--){
      if(arr[j] < arr[j-1]) [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
      else break;
    }
  }
}
const testArr = [1, 4, 2, 3, 6, 5, 9, 0]
insertionSort(testArr);
console.log(testArr);
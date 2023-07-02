/*
분할 정복 알고리즘 => 재귀 함수로 구현
시간복잡도 O(NlogN)

로직
1. 분할: 정렬할 배열(큰 문제)을 같은 크기의 부분 배열(작은 문제) 2개로 분할한다.
2. 정복: 부분 배열을 정렬한다. (작은 문제를 해결한다.) 
3. 조합: 정렬된 부분 배열을 하나의 배열로 다시 병합한다. 

분할 O(logN)
=> 단순히 배열의 크기를 절반으로 계속 쪼개는 것
정복 + 조합 O(N)
=> 두 개의 부분 배열을 '정렬된 하나의 배열'로 만드는 것
=> 이때 각 배열은 이미 정렬된 것으로 보며, 작은 부분들끼리 비교하여
작은 것을 결과 배열에 집어 넣는 것을 반복하다가,
하나의 배열이 처리가 완료되면 나머지 배열을 그대로 집어넣는다.
(이미 정렬된 상태이기 때문에 그대로 집어 넣는 것)

따라서 전체 시간복잡도는 O(NlogN)이 된다.
*/

function merge(left, right) { // 정렬된 왼쪽과 오른쪽 배열을 받아서 하나로 합치는 순수한 함수
	// left, right already sorted
	const result = [];
	while (left.length !== 0 && right.length !== 0) {
		left[0] <= right[0] ?
      result.push(left.shift())
      : result.push(right.shift());	
	}

	return [...result, ...left, ...right]; // 아래 세줄과 같은 역할을 하는 코드
    // if(left.length === 0) results.push(...right);
    // if(right.length === 0) results.push(...left);
    // return results;
}

function mergeSort(array) {
	// ending condition: length === 1 인 배열이 들어올 때, 정렬이 끝난 것. 
	if (array.length === 1) return array;

	// 2로 나누고 내림을 해야
	// length 가 2일 때도 안전하게 배열을 slice 할 수 있다.
	const middleIndex = Math.floor(array.length / 2); 
	const left = array.slice(0, middleIndex);
	const right = array.slice(middleIndex);

	// 재귀로 계속해서 반으로 나누면서 length 가 1이 될때까지 쪼개고, 
	// 결국 함수가 아닌 쪼개진 배열이 merge 함수에 인자로 들어가고,
  // 쪼개진 이진 트리를 점차 병합하면서 거슬러 올라오는 방식으로 최종값을 리턴한다.
	return merge(mergeSort(left), mergeSort(right));
}

// const testArr = [1, 4, 2, 3, 6, 5, 9, 0];

let arr = Array.from({length: 100000}, ()=> Math.floor(Math.random() * 1000));

startTime = new Date().getTime();
const result = mergeSort(arr);
endTime = new Date().getTime();
console.log(endTime - startTime);

arr = Array.from({length: 100000}, ()=> Math.floor(Math.random() * 1000));
startTime = new Date().getTime();
arr.sort((a,b) => a -b);
endTime = new Date().getTime();
console.log(endTime - startTime);